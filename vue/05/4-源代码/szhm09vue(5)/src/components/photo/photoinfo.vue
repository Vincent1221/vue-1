<template>
   <div>
       <!-- 1.0 标题部分 -->
       <div class="titleStyle">
           <h5>{{photoInfo.title}}</h5>
           <p>{{photoInfo.add_time | fmtDate('YYYY-MM-DD')}}&nbsp;&nbsp;{{photoInfo.click}}次浏览</p>
       </div>

       <!-- 2.0 缩略图 -->
       <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in thumbImages" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <img @click="$preview.open(index, thumbImages)" class="preview-img" height="100" width="100" :src="item.src">
                </li>
            </ul> 
		</div>

       <!-- 3.0 内容 -->
       <div class="contentStyle">
           <p v-html="photoInfo.content"></p>
       </div>

       <!-- 4.0 评论子组件 -->
       <subcomment :commentId="this.$route.params.photoId"></subcomment>
   </div>
</template>
   
<style scoped>
   .titleStyle,.contentStyle{
       padding: 8px;
   }

   h5{
       font-size: 16px;
       color:#0094ff;
   }

   /**
   * 缩略图样式
   */
   .mui-grid-view.mui-grid-9 .mui-table-view-cell{
       border-bottom: 0px;
       border-right: 0px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

    //1.0 导入子组件
   import subcomment from '../subcomponents/subcomment.vue'
   
   export default {
       data() {
           return {
               photoInfo : {},
               thumbImages:[]
           }
       },
       created() {
           this.getPhotoInfoData(),
           this.getThumbImagesData()
       },
       methods: {
           //获取图片详细信息的数据
           getPhotoInfoData(){
               const url = common.apihost+"api/getimageInfo/"+this.$route.params.photoId

               this.$http.get(url).then(response=>{
                    this.photoInfo = response.body.message[0]
               })
           },//获取图片的缩略图数组
           getThumbImagesData(){
               const url = common.apihost+"api/getthumimages/"+this.$route.params.photoId

               this.$http.get(url).then(response=>{
                   response.body.message.forEach(item=>{
                       item.w = 400
                       item.h = 400
                   })
                   this.thumbImages = response.body.message
               })
           }
       },
       components:{//注册子组件
            subcomment
       }
   }
</script>