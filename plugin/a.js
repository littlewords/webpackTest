"use strict";


class chunkIDsByFilePath {
    constructor(options) {
    }

    apply(compiler) {

        compiler.plugin("compilation", (compilation, data) => {

            // data.normalModuleFactory.plugin('parser', (parse, options) => {
            //     parse.plugin('program', ast => {
            //         console.log(ast);
            //     })
            // })
            compilation.plugin('optimize-tree', (chunks, modules) => {
                // var mychunk = compilation.addChunk('tangyan',modules[0])

            })
            // compilation.plugin("before-chunk-ids", (chunks) => {
            //     chunks.forEach((chunk) => {
            //         chunk.id = chunk.name.replace(/\//g,"_");//路径分割都换成下划线,以免webpackJSONP报错
            //     });
            // });
        });
    }
}

module.exports = chunkIDsByFilePath;
