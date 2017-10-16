<template>
    <div class="tmpl">
        <!-- 标题 -->
        <div class="title">
            <p class="maintitle">
                {{newsDetail.title}}
            </p>
            <p class="subtitle">
                {{newsDetail.add_time | fmtdate('YYYY-MM-DD')}}&nbsp;{{newsDetail.click}}次浏览&nbsp;分类:经济民生
            </p>
        </div>

        <!-- 内容 -->
        <div class="content" v-html="newsDetail.content">

        </div>
    </div>
</template>


<style scoped>
    .title{
        height: 100%;
        padding: 5px;
        border-bottom: 2px solid rgba(92,92,92,0.1);
    }

    .title .maintitle{
        font-size: 16px;
        font-weight: bold;
        color: #0094ff;
    }

    .title .subtitle{
        font-size: 12px;
        color: rgba(92,92,92,0.6);
    }

    .content{
        padding: 5px;
    }
</style>

<script>

    //导入common.js
    import common from '../../kits/common.js';
    export default{
        data(){
            return {
                newsDetail:{}
            }
        },
        created(){
            this.getDetailInfo();
        },
        methods:{
            getDetailInfo(){
                const newsId = this.$route.params.newsId;

                //拼接url
                const url = common.apihost + '/api/getnew/'+newsId;

                //发送请求
                this.$http.get(url).then(res => {
                    //console.log(res.body.message[0]);
                    this.newsDetail = res.body.message[0];
                },res => {
                    console.log("数据返回有误");
                });
            }
        }
    }
</script>
