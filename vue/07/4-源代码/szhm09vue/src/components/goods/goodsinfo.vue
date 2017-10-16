<template>
   <div>
       <!-- 1.0 轮播 -->
       <div class="lunboStyle">
           <subswipe :lunbo_url="'api/getthumimages/'+this.$route.params.goodsId" :lunbo_time="1000"></subswipe>
       </div>

       <!-- 2.0 商品信息 -->
       <div class="priceStyle">
           <h5>{{goodsInfo.title}}</h5>
           <p>市场价:<s>￥{{goodsInfo.market_price}}</s>&nbsp;&nbsp;销售价:<span>￥{{goodsInfo.sell_price}}</span></p>
           <!-- todo 数量选择子组件 -->
           <subnumber v-on:numberChange="getGoodsCount"></subnumber>
           <mt-button size="small" type="primary">立即购买</mt-button>
           
           <mt-button size="small" @click="addToShopCart" type="danger">加入购物车</mt-button>
       </div>

       <!-- 3.0 参数信息 -->
       <div class="paramsStyle">
           <h6>商品参数</h6>
           <ul>
               <li>商品货号:{{goodsInfo.goods_no}}</li>
               <li>库存情况:{{goodsInfo.stock_quantity}}</li>
               <li>上架时间:{{goodsInfo.add_time | fmtDate}}</li>
           </ul>
       </div>

       <!-- 4.0 图文介绍&商品评论 -->
       <div class="pictureAndTextStyle">
           <mt-button @click="goToPictureAndText" size="large" plain type="primary">图文介绍</mt-button>
           <mt-button @click="goToGoodsComment" class="goodsCommentStyle" size="large" plain type="danger">商品评论</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
    .lunboStyle,.priceStyle,.paramsStyle,.pictureAndTextStyle{
        margin: 10px;
        padding: 6px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
    }

    h5{
        font-size: 16px;
        color: #0094ff;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        padding-bottom: 6px;
    }

    .priceStyle span{
        font-size: 16px;
        color:red;
    }

    h6{
        font-size: 14px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        padding-bottom: 6px;
    }

    ul{
        padding: 0px;
        margin: 6px 0px;
    }

    li{
        font-size: 14px;
        list-style: none;
    }

    .goodsCommentStyle{
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
   
<script>
   //导入公共的js
   import common from '../../common/common.js'

   //导入子组件
   import subswipe from '../subcomponents/subswipe.vue'
   import subnumber from '../subcomponents/subnumber.vue'

   import {Toast} from 'mint-ui'
   
   export default {
       data() {
           return {
               goodsInfo:{},
               goodsCount:1 //子组件中购物车的值
           }
       },
       created() {
           this.getGoodsInfoData()
       },
       methods: {
           //1、获取商品详情信息
           getGoodsInfoData(){
               const url = common.apihost + "api/goods/getinfo/"+this.$route.params.goodsId

               this.$http.get(url).then(response=>{
                   this.goodsInfo = response.body.message[0]
               })
           },
           //跳转到图文介绍组件
           goToPictureAndText(){
               //编程式导航进行跳转
               /**name:命名路由
                * params:是参数
                */
               this.$router.push({name:'pictureAndText',params:{goodsId:this.$route.params.goodsId}})
           },
           //跳转到商品评论组件
           goToGoodsComment(){
               this.$router.push({path:'/goods/goodscomment',query:{goodsId:this.$route.params.goodsId}})
           },
           //接收子组件传递过来的值
           getGoodsCount(count){
               this.goodsCount = count
           },
           //加入购物车
           addToShopCart(){
                Toast({
                    message: '加入购物车成功',
                    position: 'middle',
                    duration: 3000
                });

               //准备好加入购物车的商品对象
               const goods = {goodsId:this.$route.params.goodsId,count:this.goodsCount}

               //调用Vuex中mutations的addGoods方法，把我们的对象保存到State的goodsList中
               //同步的保存
               this.$store.commit('addGoods',goods)

               //异步的保存
            //    const _this = this
            //    setTimeout(function(){
            //        _this.$store.dispatch('asyncAddGoods',goods)
            //    },2000)
           }
       },
       components:{//注册
           subswipe,
           subnumber
       }
   }
</script>