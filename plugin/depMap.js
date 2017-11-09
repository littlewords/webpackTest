/**
 * author by tangyan
 */
"use strict";

let path = require('path');

class DepMap {
    constructor(options) {
    }

    chunkToDeps(chunk) {
        try{
            return chunk.oneByone.dependencies;
        }catch(e) {
            return [];
        }
    }

    depToChunk(dep) {
        return dep.module.oneByone
    }

    getfilename(chunk) {
        return chunk.files[0];
    }

    // 递归获取依赖
    getDeps(chunk, dependencies) {
        var self = this;
        dependencies = dependencies || [];
        var deps = self.chunkToDeps(chunk);
        deps.forEach(d => {
            if(d.module) {
                var c = self.depToChunk(d);
                var cName = self.getfilename(c);

                // 检查依赖是否已经引入，避免循环依赖
                if(dependencies.indexOf(cName) >=0) {

                }else {
                    dependencies.push(cName);
                    self.getDeps(c, dependencies);
                }
            }
        });
        return dependencies;
    }

    apply(compiler) {
        var self = this;
        var root = path.resolve(__dirname, '../');

        // 所有assets准备就绪，最后添加assets的时机
        compiler.plugin("emit", (compilation, cb) => {
            var dep = {};
            compilation.chunks.forEach(chunk => {
                var name = self.getfilename(chunk);
                dep[name] = self.getDeps(chunk);
            })

            var depMap = JSON.stringify(dep, null, 4);

            compilation.assets['depmap.json'] = {
                source() {
                    return depMap
                },
                size() {
                    return depMap.length
                }
            }
            cb();
        });
        
    }
}

module.exports = DepMap;
