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
                modules.forEach(m => {
                    // 将module的路径设置为名字
                    let name = m.resource.replace(root, '');
                    let newChunk = compilation.addChunk();

                    m.chunks.forEach( chunk => {
                        chunk.split(newChunk);
                        chunk.moveModule(m, newChunk);
                    })



                })
            })

        });
    }
}

module.exports = SplitChunks;
