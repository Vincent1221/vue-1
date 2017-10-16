//1.导入Vue
import Vue from 'vue';

//2.导入App.vue
import App from './App.vue';

//3.导入mint-ui及mint-ui的css
import MintUI from 'mint-ui';
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//4.路由的设置及使用
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入resource
import vueResource from 'vue-resource';
Vue.use(vueResource);


//全局过滤器
//在Vue上注册一个全局过滤器名称叫做 fmtdate
//导入moment
import moment from 'moment';
Vue.filter('fmtdate',function (input,datefmtstring) {
    //这里由于传入的datefmtstring的格式种类很多，我们自己实现起来是比较复杂，要做很多的if判断，所以
    //我们使用moment.js的日期格式化插件 :http://momentjs.cn/
    return moment(input).format(datefmtstring);
});

//路由规则需要的模块
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import ShopCart from './components/ShopCart/ShopCart.vue';
import Settings from './components/Settings/Settings.vue';
import NewsList from './components/News/NewsList.vue';
import NewsDetail from './components/News/NewsDetail.vue';
import PhotoList from './components/Photo/PhotoList.vue';

//路由规则设置
var routers = new VueRouter({
    routes:[
      {name:'/', path: '/', redirect:'/Home'},
      {name:'Home', path: '/Home', component: Home},
      {name:'Member', path: '/Member', component: Member},
      {name:'ShopCart', path: '/ShopCart', component: ShopCart},
      {name:'Settings', path: '/Settings', component: Settings},
      {name:'NewsList', path: '/News/NewsList', component: NewsList}, 
        {name:'NewsDetail', path: '/News/NewDetail/:newsId', component: NewsDetail},
        {name:'PhotoList', path: '/Photo/PhotoList', component: PhotoList}
    ],
    linkActiveClass:'mui-active'
});

//5.导入mui
import '../statics/mui/css/mui.min.css';
import '../statics/mui/css/icons-extra.css';

//6.导入自己的css,注意自己的css必须在最后,到时候好覆盖mint-ui及mui相关的css文件
import '../statics/css/site.css';

//7.创建Vue对象
new Vue({
    el:"#app",
    router:routers,
    render:c=>c(App)
});