import Vue from 'vue'
import Vuex from 'vuex'

import {getGoods} from '../apis/apis'

Vue.use(Vuex)



//创建核心仓库
export default new Vuex.Store({
    state:{
        data: [], //商品信息
    },
    // 同步通知（是改变state状态的唯一方式）
    mutations:{
        //初始化数据
        initgetGoods(state,obj){
        state.data = obj.data
        },
        //改变商品的数量
        changeGoodNum(state,obj){

            for(let items of state.data){
                for(let food of items.foods){
                    if(food.id==obj.id){
                        food.num += obj.num
                        return
                    }
                }
            }

        }
        
        
        
    },
    // 异步通知（如果有异步请求，请先在action内拿到数据）
    actions: {
      async initgetGoods(context){
           let res = await getGoods();

           // 给数据增加前端字段
           let id=0;
           for(let obj of res.data.data){
                 for(let food of obj.foods){
                     food.num = 0;
                     food.id=id++
                 }
           }

           context.commit({
               type:'initgetGoods',
               data:res.data.data
               
               
           })
       }
        
    },
    //计算属性
    getters:{
       //购物车的数据
       getShopCarItem(state){
           let arr=[]
         for(let item of state.data){
            for(let food of item.foods){
                if(food.num > 0)
                    arr.push(food)
            }
        }
        console.log(arr);
        
        return arr
       }
    }
})





