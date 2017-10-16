<template>
  <div>
    <!-- 1.0 头部 -->
    <mt-header fixed title="买买买"></mt-header>

    <div v-show="isShowBack" @click="goBack" class="backStyle">&lt;返回</div>

    <!-- 2.0 中间内容，动态变化的 -->
    <div class="centerStyle">
      <router-view></router-view>
    </div>

    <!-- 3.0 底部的TabBar -->
    <mt-tabbar :class="isShowTabBar?'':'hiddenTabBarStyle'" fixed>
      <mt-tab-item>
        <router-link to="/home">
          <img src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/category">
          <img src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/shopcart">
          <img src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
          <span v-show="!myCount==0" class="badgeStyle">{{myCount}}</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/mine">
          <img src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<style scoped>
  /* 中间的路由的样式 */
  .centerStyle{
    margin-top: 40px;
  }

  .mint-tabbar>.mint-tab-item.is-selected {
    background-color: #fafafa;
  }

  img {
    width: 42px;
    height: 35px;
  }

  /**
  * 返回按钮样式
  */
  .backStyle{
    position: fixed;
    left: 8px;
    top: 8px;
    z-index: 2;
    font-size: 14px;
    color: #fff;
    font-weight: 700;
  }

  /**
  * 隐藏底部TabBar
  */
  .hiddenTabBarStyle{
    display: none;
  }

  /**
  * 购物车徽标的样式
  */
  .badgeStyle{
    font-size: 11px;
    line-height: 1.3;  
    position: absolute;
    top: 7px;
    left: 63%;
    text-align: center;
    padding: 1px 5px; 
    color: #fff;
    border-radius: 11px; 
    background: red;
  }
</style>

<script>

  export default{
    created(){
      // console.log("----------------App created-----")
      this.isShowOrHidden(this.$route.path)
    },
    /**
     * 1、data中的数据发生了更改
     * 2、当路由发生变化
     */
    updated(){
      // console.log("---------App-----updated--------------")
      this.myCount = this.$store.getters.getTotalGoodsCount
    },
    data(){
      return {
        isShowBack:false, //是否显示返回按钮
        isShowTabBar:true, //是否显示底部TabBar
        myCount:0 
      }
    },
    methods:{
      goBack(){
         this.$router.go(-1)
      },
      //根据路径，决定显示还是隐藏TabBar/返回按钮
      isShowOrHidden(path){
        if(path!='/home'){
          this.isShowBack = true
          this.isShowTabBar = false
        }else{
          this.isShowBack = false
          this.isShowTabBar = true
        }
      }
    },
    watch:{
      //监控Vue路由的变化，当变化之后，调用回调函数
      $route:function(newValue,oldValue){
          this.isShowOrHidden(newValue.path)
      }
    }
  }
</script>