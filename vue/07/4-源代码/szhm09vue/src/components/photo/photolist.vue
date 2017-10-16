<template>
   <div>
       <!-- 1.0 图片的分类 -->
       <div class="photoCategoryStyle">
           <ul>
               <li @click="getPhotoListDataByCategoryId(0)">全 部</li>
               <li @click="getPhotoListDataByCategoryId(item.id)" v-for="item in imageCategoryArray" :key="item.id">{{item.title}}</li>
           </ul>
       </div>

       <!-- 2.0 分类下面对应的图片列表 -->
       <div class="photoListStyle">
           <ul>
               <li v-for="item in photoList" :key="item.id">
                   <router-link :to="'/photo/photoinfo/'+item.id">
                        <img :src="item.img_url" alt="">
                        <p>
                            <span>{{item.title}}</span><br/>
                            {{item.zhaiyao}}
                        </p>
                   </router-link>
               </li>
           </ul>
       </div>
   </div>
</template>
   
<style scoped>
   /**
   * 图片分类的样式
   */
    .photoCategoryStyle{
        overflow-x: auto;
    }

    .photoCategoryStyle ul{
        white-space: nowrap;
        padding: 0px 0px 15px 0px;
        margin: 3px 0px;
    }

   .photoCategoryStyle li{
       list-style: none;
       display: inline-block;
       margin:0px 3px;
       color: #0094ff;
   }

   /**
    * 图片列表样式
   */
   .photoListStyle ul{
       padding: 0px;
       margin:3px 0px;
   }

   .photoListStyle li{
       list-style: none;
       padding: 2px;
       position: relative;
   }

   img{
       width:99%;
       height: 400px;
   }

   .photoListStyle p{
       position: absolute;
       color: #ffffff;
       left: 3px;
       bottom: 0px;
       width:97%;
       background-color: rgba(0,0,0,0.2);
   }

   .photoListStyle p span{
       font-size: 16px;
       font-weight: 900;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   import { Indicator } from 'mint-ui'

   export default {
       data() {
           return {
               imageCategoryArray:[],//图片分类的列表
               photoList:[]//分类下面的图片列表
           }
       },
       created() {
           this.getPhotoCategoryData()
           //获取全部数据
           this.getPhotoListDataByCategoryId(0)
       },
       methods: {
           //获取图片分类数据
           getPhotoCategoryData(){
               const url = common.apihost+"api/getimgcategory"

               this.$http.get(url).then(response=>{
                   this.imageCategoryArray = response.body.message
               })
           },
           //根据分类id去加载分类id对应的图片列表
           getPhotoListDataByCategoryId(categoryId){
               Indicator.open({
                    text: '小妹正在拼命加载中...',
                    spinnerType: 'triple-bounce'
               })

               const url = common.apihost+"api/getimages/"+categoryId

               this.$http.get(url).then(response=>{
                   Indicator.close()
                   this.photoList = response.body.message
               },err=>{
                   Indicator.close()
               })
           }
       }
   }
</script>