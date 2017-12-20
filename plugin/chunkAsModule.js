/**
 * author by tangyan
 */
"use strict";

let path = require('path');

class SplitChunks {
    constructor(options) {
    }

    apply(compiler) {
        var root = path.resolve(__dirname, '../');
        compiler.plugin("compilation", (compilation, data) => {

            compilation.plugin('optimize-tree', (chunks, modules, cb) => {
                const newChunksMap = new Map();
                modules.forEach(m => {
                    let isEntry = false;
                    // 将module的路径设置为名字
                    let name = m.resource.replace(root, '');
                    m.id = name;
                    m.chunks.forEach(
                        (chunk) => {
                            if (isEntry) {
                                return;
                            }
                            isEntry = chunk.entryModule === m;
                            if(isEntry) {
                                chunk.id = name;
                            }
                        }
                    );

                    if (isEntry) {
                        return;
                    }

                    
                    let newChunk = newChunksMap.get(name);
                    if(!newChunk) {
                        newChunk = compilation.addChunk();
                        newChunk.name = name;
                        newChunk.id = name;
                        newChunksMap.set(name, newChunk);                    
                    }
                    
                    m.chunks.forEach(chunk => {
                        chunk.split(newChunk);  
                        chunk.moveModule(m, newChunk);
                    })  
                })

                cb();
            })

        });
    }
}

module.exports = SplitChunks;
