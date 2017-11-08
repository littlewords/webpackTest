"use strict";


class chunkIDsByFilePath {
    constructor(options) {
    }

    apply(compiler) {

        compiler.plugin("compilation", (compilation) => {
            console.log(Object.keys(compilation));
            console.log(compilation.name);
            debugger
            compilation.plugin("before-chunk-ids", (chunks) => {
                debugger
                chunks.forEach((chunk) => {
                    chunk.id = chunk.name.replace(/\//g,"_");//路径分割都换成下划线,以免webpackJSONP报错
                });
            });
        });
    }
}

module.exports = chunkIDsByFilePath;
