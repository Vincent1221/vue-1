var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.js', //项目打包的入口文件
    output: { //项目打包之后的输出文件
        path: __dirname,
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
            }
        ]
    },
    plugins: [
        //根据参照template.html在浏览器内存中生成一个index.html
        new HtmlWebpackPlugin({
            template: './template.html', //参照文件
            filename: 'index.html'//在内存中生成的文件名称
        })
    ]
}