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

                // 清空所有chunks
                chunks.splice(0, chunks.length);

                // 把common chunk移回来
                chunks.push(compilation.namedChunks.common);
                
                // 按module建立chunk
                modules.forEach(m => {

                    // 将module的路径设置为名字
                    var name = m.resource.replace(root, '');

                    // 根据名字创建chunk
                    var chunk = compilation.addChunk(name, m)
                    chunk.id = name.replace(/\//g,"_");//路径分割都换成下划线,以免webpackJSONP报错
                    chunk.isInitial(true);
                    chunk.entryModule = m;
                    chunk.filenameTemplate = name+ '_[chunkhash].js'

                    // 建立一个自定义属性oneByone 一一对应chunk和module
                    chunk.oneByone = m;
                    m.oneByone = chunk;

                    // 建立护指
                    chunk.addModule(m);
                    m.addChunk(chunk);

                    // module 的id改成与那么相同，以免数字排序
                    m.id = name;
                })
                cb();
            })

        });
    }
}

module.exports = SplitChunks;
