<template>
    <div class="tmpl">
        <!--利用MUI中的图文列表样式实现新闻列表-->
        <ul class="mui-table-view">
            <li v-for="item in list" class="mui-table-view-cell mui-media">
                <router-link v-bind:to='"/News/NewDetail/"+item.id'>
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class="mui-ellipsis">
                            发表时间:{{item.add_time | fmtdate('YYYY-MM-DD')}}
                            <span>点击数:{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .mui-table-view .mui-media-object{
        max-width: 62px;
        height: 62px;
        line-height: 62px;
    }

    .mui-table-view-cell{
        padding-left: 10px;
    }

    .mui-ellipsis{
        margin-top: 20px;
        color: #0094ff;
        font-size: 12px;
    }

    .mui-ellipsis > span{
        position: absolute;
        top: 50px;
        right: 20px;
    }
</style>

<script>

    import common from '../../kits/common.js';

    export default{
        data(){
            return {
                /*list:[
                    {"id":13,"title":"我十一","click":1,"img_url":"http://a4.att.hudong.com/38/47/19300001391844134804474917734_950.png","zhaiyao":"xxxxxxxxxxx"},
                    {"id":15,"title":"我是二","click":2,"img_url":"http://g4.hexunimg.cn/2014-05-27/165154795.jpg","zhaiyao":"ooooooooooo"},
                    {"id":18,"title":"我是三","click":3,"img_url":"http://image91.360doc.com/DownloadImg/2015/11/0823/61290847_12.jpg","zhaiyao":"zzzzzzzzzzz"}
                ]*/
                list:[]
            }
        },
        created(){
            const url = common.apihost + "/api/getnewslist";

            this.$http.get(url).then(res=>{
                this.list = res.body.message;
            },res=>{
                console.log("请求数据错误!!!");
            }
            );
        }
    }
</script>