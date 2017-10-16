//入口文件,初始化vue实例,并且集成所需要的插件

import Vue from 'vue'
//mint-ui资源库
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import moment from 'moment'
//vue-preview预加载库
import VuePreview from 'vue-preview'

//导入组件(使用es6新语法)
import App from './App.vue' //相当于 var App = require('./App.vue')

//集成基于Vue的第三方包
Vue.use(Mint)
Vue.use(VueResource) //Vue.prototype.$http = new VueResource
Vue.use(VuePreview)

//给Vue-Resource的post请求设置全局的{emulateJSON:true}
Vue.http.options.emulateJSON = true

//定义全局的事件格式化过滤器
Vue.filter('fmtDate',(input,formatString)=>{
    const lastFormatString = formatString || "YYYY-MM-DD HH:mm:ss"

    /**
     * input代表要过滤的原始事件，如果不传，就用当前系统事件
     * lastFormatString 要格式化成什么样子
     */
    return moment(input).format(lastFormatString)
})

//导入需要的css
//todo 项目上线之前，换成style.min.css
import 'mint-ui/lib/style.css'
// import './statics/mui/css/mui.css'
import 'muiv3/dist/css/mui.css'
import './statics/css/style.css'

//导入路由
import router from './router/router.js'
//导入store
import store from './store/store.js'

new Vue({
    el:"#app", //把我们组件的内容放在id=app的div去显示
    /**
     * createElement它是一个函数
     */
    /**
    render:function(createElement){
        return createElement(App)
    }
    **/
    // router: router,都是简写
    // stroe: store,
    router,
    store,
    render:h=>h(App)
})
