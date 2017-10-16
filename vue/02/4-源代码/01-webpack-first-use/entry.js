document.write("...我是打包入口文件呀...<br/>")

//导入我们module.js中的内容
var name = require('./module.js')
document.write(name)

//导入项目中的样式文件
require('./site.css')