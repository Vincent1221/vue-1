import Vue from 'vue'

//导入组件(使用es6新语法)
import App from './App.vue' //相当于 var App = require('./App.vue')


new Vue({
    el:"#app", //把我们组件的内容放在id=app的div去显示
    /**
     * createElement它是一个函数
     */
    render:function(createElement){
        return createElement(App)
    }
})