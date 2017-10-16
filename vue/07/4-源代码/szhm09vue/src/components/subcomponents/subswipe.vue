<template>
   <div>
       <mt-swipe :auto="lunbo_time">
            <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
   </div>
</template>
   
<style scoped>
    /* 1.0 轮播图样式 */
    .mint-swipe {
        height: 250px;
        width: 100%;
    }

    .mint-swipe-item img {
        height: 250px;
        width: 100%;
    }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               lunboArray: []
           }
       },
       created() {
           this.getLunboData()
       },
       methods: {
           getLunboData() {
                const url = common.apihost+this.lunbo_url

                this.$http.get(url).then(response => {
                    this.lunboArray = response.body.message
                })
           }
       },
       props:['lunbo_url','lunbo_time']
   }
</script>