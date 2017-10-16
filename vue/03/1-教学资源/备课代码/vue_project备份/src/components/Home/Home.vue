<template>
    <div class="tmpl">
        <!-- 轮播图 -->
        <mt-swipe :auto="2000">
          <mt-swipe-item v-for="item in imagelist">
            <img :src="item.img" >
          </mt-swipe-item>
        </mt-swipe>

        <!-- 九宫格视图 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/News/NewsList">
                        <span class="mui-icon mui-icon-home">
                        </span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link href="/Photo/PhotoList">
                        <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </a>
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

<script>

    //导入common.js
    import common from '../../kits/common.js';

    export default{
        data(){
            return {
                imagelist:[]
            }
        },
        created(){
            this.getlunbo();
        },
        methods:{
            getlunbo(){
                const url = common.apihost + "/api/getlunbo";

                //发送请求
                this.$http.get(url).then(res=>{
                    console.log(res.body.message);
                    this.imagelist = res.body.message;
                },res =>{
                    console.log("数据请求错误");
                });
            }
        }
    }
</script>

<style scoped>

/**轮播图样式**/

img{
    width: 100%;
    height: 100%;
}

.mint-swipe {
    overflow: hidden;
    position: relative;
    height: 250px;
    width:100%;
}

    /**九宫格样式**/
    .mui-content{
        background-color : #fff;
    }

    .mui-grid-view.mui-grid-9{
        background-color : #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right : 0px;
        border-bottom:0px;
    }

    .mui-table-view:before .mui-table-view:after{
        background-color : #fff;
    }

    /**
        替换成自己的图标
    */
    .mui-icon{
        width: 50px;
        height: 50px;
    }

    .mui-icon-home{
        background-image: url("../../../statics/images/menu10.png");
        background-repeat: round;
    }

    .mui-icon-email{
        background-image: url("../../../statics/images/menu4.png");
        background-repeat: round;
    }

    .mui-icon-chatbubble{
        background-image: url("../../../statics/images/menu5.png");
        background-repeat: round;
    }

    .mui-icon-location{
        background-image: url("../../../statics/images/menu6.png");
        background-repeat: round;
    }

    .mui-icon-search{
        background-image: url("../../../statics/images/menu9.png");
        background-repeat: round;
    }

    .mui-icon-phone{
        background-image: url("../../../statics/images/menu3.png");
        background-repeat: round;
    }

    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content: '';
    }

</style>