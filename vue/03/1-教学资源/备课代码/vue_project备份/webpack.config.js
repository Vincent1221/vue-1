var htmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

module.exports = {
    //页面入口文件配置
    entry:  './src/main.js',
    //入口文件输出配置
    output: {
        path: './dist',
        filename: 'build.js'
    },
    module: {
        //加载器配置
        loaders: [
            { 
                test: /\.vue$/, 
                loader: 'vue-loader' 
            },
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            },
            { 
                test: /\.(png|jpg|ttf)$/, 
                loader: 'url-loader?limit=4000'
            },
            {
                test:/\.js$/, //正则表达式
                loader:'babel-loader',
                exclude:/node_modules/
            }
        ]
    },
    babel:{
        presets:['es2015'],
        plugins:['transform-runtime']
    },
    plugins:[
        new htmlWebpackPlugin({
            title:'index',
            filename:'index.html', //在内存中生成的网页的名称
            template:'index333.html' //生成网页名称的依据
        })
    ]
};