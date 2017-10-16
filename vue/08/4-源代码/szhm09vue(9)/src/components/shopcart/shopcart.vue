<template>
  <div>
      <!-- 1.0 展示商品列表 -->
      <div class="goodsListStyle">
        <div class="goodsItemStyle" v-for="(item,index) in goodsList" :key="item.id">
            <!-- Switch开关 -->
            <mt-switch @change="statisticsTotalCountAndTotalPrice" v-model="item.isSelected"></mt-switch>
            <!-- 图片 -->
            <div class="thumbImageStyle">
              <img :src="item.thumb_path" alt="">
            </div>
            <!-- 商品信息 -->
            <div class="goodsInfoStyle">
              <p class="titleStyle">{{item.title}}</p>
              <p class="priceAndCountStyle"><span>{{item.sell_price}}</span>&nbsp;&nbsp;商品数量{{item.count}}</p>
            </div>
            <!-- 删除按钮 -->
            <mt-button :disabled="!item.isSelected" @click="deleteGoodsByIndex(index)" class="deleteButtonStyle" size="small" type="danger">删 除</mt-button>
        </div>
      </div>

      <!-- 2.0 展示提示信息 -->
      <div class="statisticsGoodsInfoStyle">
          <div class="tipsStyle">
            <h6>总计(不含运费)</h6>
            <p>已经勾选商品 <span>{{totalCount}}</span> 件,总价 <span>{{totalPrice}}</span> 元</p>
          </div>
          <mt-button class="goToPay" type="danger">去结算</mt-button>
      </div>
  </div>
</template>

<style scoped>
  .goodsItemStyle{
    display: flex;
    height: 100px;
    padding: 5px;
    border-bottom: 1px solid rgba(92,92,92,0.3);
    align-items: center;
  }

  img{
    width:60px;
    height:60px;
  }

  .thumbImageStyle{
    border: 1px solid rgba(92,92,92,0.3);
    border-radius: 5px;
    padding: 5px;
    margin-left: 10px;
  }

  .deleteButtonStyle{
    margin-right: 5px;
  }

  .goodsInfoStyle{
    margin-left: 10px;
    flex: 1;
  }

  .titleStyle{
    font-size: 14px;
    color: #0094ff;
    line-height: 16px;
  }

  .priceAndCountStyle{
    font-size: 14px;
  }

  .priceAndCountStyle span{
    font-size: 16px;
    color: red;
  }

  .statisticsGoodsInfoStyle{
    display: flex;
    align-items: center;
    height: 100px;
    background-color:rgba(92,92,92,0.2);
  }

  .goToPay{
    margin-right: 10px;
  }

  .tipsStyle{
    margin-left: 10px;
    flex: 1;
  }

  .tipsStyle h6{
    color: black;
    font-size: 16px;
    font-weight: 900;
  }

  .tipsStyle span{
    color: red;
    font-size: 14px;
  }
</style>


<script>
  import common from '../../common/common.js'

  import { MessageBox } from 'mint-ui'

  export default{
    data(){
      return {
        goodsList:[],
        totalCount:0,//总件数
        totalPrice:0//总价格
      }
    },
    created(){
      this.getGoodsListData()
    },
    methods:{
      //获取购物车列表数据
      getGoodsListData(){
        //1.把我们原先保存在Vuex中的数组取出来
        /**
         * [
              {goodsId:"87",count:2},
              {goodsId:"88",count:3},
					    {goodsId:"87",count:3}
				   ]
         */
        var originalGoodsList = this.$store.getters.getGoodsList
        if(originalGoodsList.length<=0){
          return
        }
        console.log(originalGoodsList)
        
        //2.把上面原始数组，转成一个对象{"87":5,"88":3}
        var tempObj = {}
        originalGoodsList.forEach(item=>{
          if(tempObj[item.goodsId]){//有
              tempObj[item.goodsId] += item.count
          }else{//没有
              tempObj[item.goodsId] = item.count
          }
        })

        //3.把对象中的key提取出来，放入一个数组中
        var tempArray = []
        for(var key in tempObj){
            tempArray.push(key)
        }

        //4.把数组的id拼接成后台需要的数据
        var idsString = tempArray.join(',')

        //5.发送网络请求
        const url = common.apihost+"api/goods/getshopcarlist/"+idsString

        this.$http.get(url).then(response=>{
          response.body.message.forEach(item=>{
            item.isSelected = true
            item.count = tempObj[item.id]  
          })
          
          this.goodsList = response.body.message

          //统计总数量和总价格
          this.statisticsTotalCountAndTotalPrice()
        })
      },
      //统计信息
      statisticsTotalCountAndTotalPrice(){
        let tempTotalCount = 0
        let tempTotalPrice = 0
        this.goodsList.forEach(item=>{
          if(item.isSelected){//选中
              tempTotalCount+=item.count
              tempTotalPrice+=item.sell_price*item.count
          }
        })

        this.totalCount = tempTotalCount
        this.totalPrice = tempTotalPrice
      },
      //删除商品
      deleteGoodsByIndex(index){
        MessageBox.confirm('确定执行此操作?').then(action => {
            //1.根据index取到id，把Vuex中对应的数据干掉
            const goodsId = this.goodsList[index].id

            this.$store.commit('deleteGoodsById',goodsId)

            //2.把点击删除的那一行也干掉
            this.goodsList.splice(index,1)

            //3.重新统计
            this.statisticsTotalCountAndTotalPrice()
        },cancel=>{
          
        });
      }
    }
  }
</script>
