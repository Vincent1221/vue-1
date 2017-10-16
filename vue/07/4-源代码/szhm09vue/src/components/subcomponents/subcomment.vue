<template>
  <div>
      <!-- 1.0 提交评论区域 -->
      <div class="postCommentStyle">
        <h4>提交评论</h4>
        <textarea ref="textAreaRef" cols="30" rows="5" placeholder="请输入评论的内容"></textarea>
        <mt-button @click="postComment" type="primary" size="large">提交评论</mt-button>
      </div>

      <!-- 2.0 展示评论列表这一块 -->
      <div class="commentListStyle">
        <h4>评论列表</h4>
        <div v-for="(item,index) in commentList" :key="index" class="commentItemStyle">
            <p style="color:black;margin-top:8px;">{{item.content}}</p>
            <p class="commentUserAndTime">
                <span class="left">{{item.user_name}}</span>
                <span class="right">{{item.add_time | fmtDate}}</span>
            </p>
        </div>
        <mt-button @click="loadMore" style="margin-top:15px;" type="danger" plain size="large">加载更多</mt-button>
      </div>
  </div>
</template>

<style scoped>
    .postCommentStyle,.commentListStyle{
        padding: 8px; 
    }

    h4{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .commentItemStyle{
        border-bottom: 1px solid rgba(92,92,92,0.3);
        min-height: 80px;
        overflow-y: auto;
    }

    .commentUserAndTime{
        color:#0094ff;
        margin-top: 40px;
    }

    .left{
        float: left;
    }

    .right{
        float: right;
    }
</style>


<script>
    import common from '../../common/common.js'

    import { Toast } from 'mint-ui'

    //import $ from 'jquery'

    export default{ //隐式的创建和导出
        data(){
            return{
                pageIndex : 1,
                commentList : []
            }
        },
        beforeCreate(){
            console.log("---beforeCreate---")
        },
        created(){
            //刚进来加载第一页的数据
            console.log("---created---")
            this.getCommentListByPageIndex()
        },
        beforeMount(){
            console.log("---beforeMount---")
        },
        mounted(){
            console.log("---mounted---")
        },
        beforeUpdate(){
            console.log("---beforeUpdate---")
        },
        updated(){
            console.log("---updated---")
        },
        beforeDestroy(){
            console.log("---beforeDestroy---")
        },
        destroyed(){
            console.log("---destroyed---")
        },
        methods:{
            //根据页面来加载对应页数的数据
            //1也展示10条
            getCommentListByPageIndex(){
                const url = common.apihost + "api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex

                this.$http.get(url).then(response=>{
                    if(this.pageIndex==1){
                        this.commentList = response.body.message
                    }else{
                        this.commentList = this.commentList.concat(response.body.message)
                    }
                })
            },
            //加载更多
            loadMore(){
                this.pageIndex++
                this.getCommentListByPageIndex()
            },
            //提交评论
            postComment(){
                //获取评论内容
                const content = this.$refs.textAreaRef.value
            
                if(content==null ||content.length<=0){
                    Toast({
                        message: '评论内容不能为空',
                        position: 'middle',
                        duration: 3000
                    });

                    return
                }

                //提交评论
                const url = common.apihost + "api/postcomment/"+this.commentId

                this.$http.post(url,{content:content}).then(response=>{
                    //成功之后，给用户一个提示
                    Toast({
                        message: '提交成功',
                        position: 'middle',
                        duration: 3000
                    });

                    //清空textarea中的内容
                    this.$refs.textAreaRef.value = ''

                    //重新加载第一页的数据
                    this.pageIndex = 1
                    this.getCommentListByPageIndex()
                })
            }
        },
        props:['commentId']
    }
</script>