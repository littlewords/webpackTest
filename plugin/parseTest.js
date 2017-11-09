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

            // data.normalModuleFactory.plugin('parser', (parse, options) => {
            //     parse.plugin('program', ast => {
            //         console.log(ast);
            //     })
            // })
            compilation.plugin('optimize-tree', (chunks, modules, cb) => {

                // 清空所有chunks
                chunks.splice(0, chunks.length);

                // 把common chunk移回来
                chunks.push(compilation.namedChunks.common);
                
                // 按module建立chunk
                modules.forEach(m => {
                    var name = m.resource.replace(root, '');
                    var chunk = compilation.addChunk(name, m)
                    chunk.id = name.replace(/\//g,"_");//路径分割都换成下划线,以免webpackJSONP报错
                    chunk.isInitial(true);
                    chunk.addModule(m);
                    chunk.entryModule = m;
                    chunk.filenameTemplate = name+ '_[chunkhash].js'
                    m.addChunk(chunk);
                    m.id = name;
                })
                cb();
            })

        });
    }
}

module.exports = SplitChunks;
