<template>
    <div class="App">
        <!-- 头部 -->
        <mt-header fixed title="vue内容管理系统"></mt-header>

        <!-- 全局返回按钮 -->
        <div class="back" v-if="isShow">
            <a @click="goback">&lt;返回</a>
        </div>

        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>

        <!-- 尾部 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/Home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/Member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/ShopCart">
                <span class="mui-icon mui-icon-info">
                    <span class="mui-badge">2</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/Settings">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
    </div>
</template>

<style scoped>
    .back{
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 50;
    }

    .back a{
        color: #fff;
        font-size: 14px;
        font-weight: bold;
    }
</style>

<script>
    export default{
        data(){
            return {
                 isShow:false
            }
        },
        watch:{
            //监控当前的路由对象 $route ，如果url中的路由规则发生了改变，那么就会触发这个方法
            '$route':function(newval,oldval){
                if(newval.path.toLowerCase() == '/home'){
                    this.isShow=false;
                }else{
                    this.isShow=true;
                }
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);//返回上一个页面
            }
        }
    }
</script>