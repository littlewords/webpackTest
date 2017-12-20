// 一个常见的`webpack`配置文件
const webpack = require('webpack');
const SplitChunks = require('./plugin/chunkAsModule.js');
// const DepMap = require('./plugin/depMap.js')

module.exports = {
    entry: {
        index: __dirname + "/index.js"
    }, //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "[id].js",
        chunkFilename: "[id]-[chunkhash].js"
    },
    module: {
        rules: [{
            // test: /(\.jsx|\.js)$/,
            // use: {
            //     loader: "babel-loader"
            // }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new SplitChunks()
        // new DepMap()
    ],
};