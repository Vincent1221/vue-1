<template>
    <div>
        <!-- 1.0 轮播图 -->
        <subswipe lunbo_url="api/getlunbo" :lunbo_time="3000"></subswipe>
        
        <!-- 2.0 九宫格导航 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                        <span class="mui-icon mui-icon-email">
                            <span class="mui-badge">5</span>
                        </span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    /* 1.0 九宫格样式 */
    .mui-grid-view.mui-grid-9{
        border-top:0px;
        border-left:0px;
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right:0px;
        border-bottom:0px;
    }

    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content:'';
    }

    .mui-icon-home{
        background-image: url(../../statics/images/menu3.png);
        background-size: cover;
    }

    .mui-icon-email{
        background-image: url(../../statics/images/menu4.png);
        background-size: cover;
    }

    .mui-icon-chatbubble{
        background-image: url(../../statics/images/menu5.png);
        background-size: cover;
    }

    .mui-icon-location{
        background-image: url(../../statics/images/menu6.png);
        background-size: cover;
    }

    .mui-icon-search{
        background-image: url(../../statics/images/menu9.png);
        background-size: cover;
    }

    .mui-icon-phone{
        background-image: url(../../statics/images/menu10.png);
        background-size: cover;
    }

    .mui-icon{
        height: 50px;
        width: 50px;
    }
</style>


<script>
/**http://es6.ruanyifeng.com/#docs/module#export-default-命令 */

    //导入子组件
    import subswipe from '../subcomponents/subswipe.vue'

    export default { //相当于 module.exports = {}
        data() {
            return {
                
            }
        },
        components:{//注册
            subswipe
        }
    }
</script>

