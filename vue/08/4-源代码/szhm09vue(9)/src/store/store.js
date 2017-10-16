import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)//Vue.prototype.$store

//创建一个仓库
const store = new Vuex.Store({
    state:{
        /** 
         * 我们goodsList数组中存的就是长成这样的数据
         * [{goodsId:"87",count:2},{goodsId:"88",count:3},{goodsId:"87",count:3}] */
        goodsList:[]
    },
    getters:{//从仓库中去数据的所有方法
        getTotalGoodsCount(state){
            let totalCount = 0
            state.goodsList.forEach(item=>{
                totalCount+=item.count   
            })

            return totalCount
        },
        //获取商品列表
        getGoodsList(state){
            return state.goodsList
        }
    },
    mutations:{//同步提交的所有方法
        //goods === {goodsId:"87",count:2}
        addGoods(state,goods){
            state.goodsList.push(goods)
            console.log(state.goodsList)
        },
        deleteGoodsById(state,goodsId){
            //变遍时候历变删除的时候，一定要从后往前
            /**[{goodsId:"87",count:2},{goodsId:"88",count:3},{goodsId:"87",count:3}]**/
            /** 
            for(var i = state.goodsList.length-1;i>=0;i--){
                const everyItem = state.goodsList[i]
                if(goodsId == everyItem.goodsId){
                    state.goodsList.splice(i,1)
                }
            }
            */
            // const tempArray = state.goodsList.filter(function(currentValue, index,arr){
            //     return goodsId!=currentValue.goodsId
            // })

            // state.goodsList = tempArray

            //js filter内部就是这样实现的
            var tempArray = []
            for(var i =0;i<state.goodsList.length;i++){
                const everyItem = state.goodsList[i]
                if(everyItem.goodsId!=goodsId){
                    tempArray.push(everyItem)
                }
            }

            state.goodsList = tempArray
        }
    },
    actions:{//异步提交的方法
        /**
         * context相当于$store
         */
        asyncAddGoods(context,goods){
            //不能直接操作State中的goodsList,只能借助mutations中的同步方法
            context.commit('addGoods',goods)
        }
    }
})

export default store