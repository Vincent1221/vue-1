var webpack = require('webpack')

module.exports = {
    entry:'./entry.js', //项目打包的入口文件
    output:{//输出文件
        path: __dirname,
        filename: 'bundle.js'
    },
    module:{ //配置loader
        loaders: [
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader' //loader执行顺序是从后往前
            }
        ]
    },
    plugins:[//插件
        new webpack.BannerPlugin('...这个文件是被我打包的...')
    ]
}