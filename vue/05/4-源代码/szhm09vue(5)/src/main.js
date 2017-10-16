import Vue from 'vue'
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'

//导入组件(使用es6新语法)
import App from './App.vue' //相当于 var App = require('./App.vue')

//集成基于Vue的第三方包
Vue.use(Mint)
Vue.use(VueRouter) //Vue.prototype.$router = xxx Vue.prototype.$route = xxx 
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

//导入组件
import home from './components/home/home.vue'
import category from './components/category/category.vue'
import shopcart from './components/shopcart/shopcart.vue'
import mine from './components/mine/mine.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import pictureAndText from './components/goods/pictureAndText.vue'
import goodscomment from './components/goods/goodscomment.vue'

//创建路由对象
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/category',component:category},
        {path:'/shopcart',component:shopcart},
        {path:'/mine',component:mine},
        {path:'/news/newslist',component:newslist},
        {path:'/news/newsinfo/:newsId',component:newsinfo},
        {path:'/photo/photolist',component:photolist},
        {path:'/photo/photoinfo/:photoId',component:photoinfo},
        {path:'/goods/goodslist',component:goodslist},
        {path:'/goods/goodsinfo/:goodsId',component:goodsinfo},
        {name:'pictureAndText',path:'/goods/pictureAndText',component:pictureAndText},
        {path:'/goods/goodscomment',component:goodscomment}
    ]
})

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
    router,
    render:h=>h(App)
})
