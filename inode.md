
## 为什么要切割chunk
1. 细粒度缓存


## inode切割方案

1. inode助手生成路由和```入口表```
2. 根据入口表读取文件，解析语法书分析依赖（同事生成依赖表）
3. 把分析所得module加入entry的chunk表 通过commonsChunkPlugin抽取chunk