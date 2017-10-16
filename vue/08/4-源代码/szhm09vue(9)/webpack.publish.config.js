var HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path')

var webpack = require('webpack')

module.exports = {
    entry: './src/main.js', //项目打包的入口文件
    output: { //项目打包之后的输出文件
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    },
    module: {//配置loaders
        rules: [ //loaders也是可以的
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(ttf|png|svg|gif)$/,
                use: [
                  {
                    loader: 'url-loader'
                  }
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, //排除第三方的
                loader: "babel-loader" 
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        //根据参照template.html在浏览器内存中生成一个index.html
        new HtmlWebpackPlugin({
            template: './template.html', //参照文件
            filename: 'index.html',//在内存中生成的文件名称
            minify:{
                collapseWhitespace:true, //去除空格
                minifyCSS:true,//压缩css
                minifyJS:true,//压缩js
                removeComments:true//去掉注释
            }
        }),
        //把当前环境设置为生产环境
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
        }),
        //压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false //干掉警告
            },
            comments: false //去掉版权信息等注释
        })
    ]
}