<template>
   <div v-if="isShow">
       <!-- 1.0 标题部分 -->
       <div class="titleStyle">
           <h5>{{newsinfo.title}}</h5>
           <p>{{newsinfo.add_time | fmtDate}}&nbsp;&nbsp;{{newsinfo.click}}次浏览&nbsp;&nbsp;分类:民生经济</p>
       </div>

       <!-- 2.0 内容部分 -->
       <div class="contentStyle">
           <p v-html="newsinfo.content"></p>
       </div>

       <!-- 3.0 评论子组件 -->
       <subcomment :commentId="this.$route.params.newsId"></subcomment>
   </div>
</template>
   
<style scoped>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h5{
       font-size: 16px;
       font-weight: 900;
       color: #0094ff;
   }

   .titleStyle{
       border-bottom: 1px solid rgba(92,92,92,0.6);
   }
</style>
   
<script>
   import common from '../../common/common.js'

   //1.0 导入评论子组件
   import subcomment from '../subcomponents/subcomment.vue'

   import { Indicator } from 'mint-ui'
   
   export default {
       data() {
           return {
               newsinfo:{},
               isShow:false
           }
       },
       created() {
           this.getNewsInfoData()
       },
       methods: {
           getNewsInfoData(){
               Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
               });

               const url = common.apihost+"api/getnew/"+this.$route.params.newsId

               this.$http.get(url).then(response=>{
                   this.isShow = true
                   Indicator.close()
                   this.newsinfo = response.body.message[0]
               })
           }
       },
       components:{//2.0 在这里注册子组件
            /**
             * 属性名称是为了到时候在template中使用，展现子组件
             */
            subcomment:subcomment
       }
   }
</script>