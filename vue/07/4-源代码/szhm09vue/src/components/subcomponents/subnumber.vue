<template>
   <div style="margin-bottom:8px;">
       <div @click="substrict" class="left">-</div>
       <div class="middle">{{count}}</div>
       <div @click="add" class="right">+</div>
   </div>
</template>
   
<style scoped>
   .left,.middle,.right{
       display: inline-block;
       border: 1px solid rgba(92, 92, 92, 0.3);
   }

   .left,.middle,.right{
       width: 30px;
       height: 30px;
       text-align: center;
       line-height: 30px;
   }

   .middle{
       width: 40px;
   }
</style>
   
<script>
   
   export default {
       data() {
           return {
               count:1
           }
       },
       created() {
           
       },
       methods: {
           substrict(){
               if(this.count<=1){
                   return
               }

               this.count--
               this.notify()
           },
           add(){
               //你要考虑到库存量
               this.count++
               this.notify()
           },
           notify(){
               /**
                * 参数1：自定义事件的名称，注意不要写类似于click这种系统事件
                * 参数2：要传递的值，可以是任何js数据类型
                */
               this.$emit('numberChange',this.count)
           }
       }
   }
</script>