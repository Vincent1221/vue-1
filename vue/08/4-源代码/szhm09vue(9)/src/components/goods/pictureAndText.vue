<template>
   <div>
       <!-- 1.0 标题 -->
       <div class="titleStyle">
           <h4>{{pictureAndTextInfo.title}}</h4>
       </div>

       <!-- 2.0 内容 -->
       <div class="contentStyle">
           <p v-html="pictureAndTextInfo.content"></p>
       </div>
   </div>
</template>
   
<style scoped>
    h4{
        color: #0094ff;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

   .titleStyle,.contentStyle{
       padding:6px;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               pictureAndTextInfo:{}
           }
       },
       created() {
           this.getPictureAndTextInfoData()
       },
       methods: {
           //获取图文消息数据
           getPictureAndTextInfoData(){
               const url = common.apihost+"api/goods/getdesc/"+this.$route.params.goodsId

               this.$http.get(url).then(response=>{
                   this.pictureAndTextInfo = response.body.message[0]
               })
           }
       }
   }
</script>