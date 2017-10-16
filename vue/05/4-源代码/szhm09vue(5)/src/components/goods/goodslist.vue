<template>
   <div>
       <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="(item,index) in goodsList" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <div class="goodsContentStyle">
                        <router-link :to="'/goods/goodsinfo/'+item.id">
                            <img class="mui-media-object" :src="item.img_url">
                            <div class="mui-media-body">
                                <!-- 标题 -->
                                <div class="cccStyle">{{item.title}}</div>
                                <!-- 价格信息 -->
                                <div class="priceStyle">
                                    <span>{{item.sell_price}}</span>&nbsp;&nbsp;<s>{{item.market_price}}</s>
                                </div>
                                <!-- 提示信息 -->
                                <div class="tipStyle">
                                    <span>热卖中</span>

                                    <span>剩余{{item.stock_quantity}}件</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>    
	   </div>
   </div>
</template>
   
<style scoped>
    .goodsContentStyle{
        border:1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
        padding: 6px;
        box-shadow: 0px 0px 5px rgba(92,92,92,.3);
    }

    .mui-grid-view .goodsContentStyle .mui-media-body{
        height: 100px;
    }

    .cccStyle{
        font-size: 12px;
       color: black;
       /* white-space: normal; */
       text-align: left;
       overflow:hidden; 
       text-overflow:ellipsis;
       display:-webkit-box;
       -webkit-box-orient:vertical;
       -webkit-line-clamp:2;
       /* 两行显示不下...
       /* http://blog.csdn.net/bing0728004/article/details/51509435 */
    }

    .priceStyle{
        height: 35px;
        text-align: left;
        line-height: 35px;
        background-color: #f0f0f0;
    }

    .priceStyle span{
        font-size: 16px;
        color: red;
    }

    .tipStyle{
        font-size: 12px;
        height: 35px;
        text-align: left;
        line-height: 35px;
        background-color: #f0f0f0;
        display: flex;
        justify-content: space-between;
    }
   
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               goodsList:[]
           }
       },
       created() {
           this.getGoodsListData()
       },
       methods: {
           getGoodsListData(){
               const url = common.apihost+"api/getgoods"

                this.$http.get(url).then(response=>{
                    this.goodsList = response.body.message
                })
           }
       }
   }
</script>