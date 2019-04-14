<template>
  <div>
    <h2>购物车</h2>
    <div class="cont" v-for="food in shopcardata">
        <div>{{ food.name }}</div>
        <div class="rt"> 
             <button class="btndec" v-show="food.num!=0" @click="clickDec(food.id)">-</button>
              <label v-show="food.num!=0">{{food.num}}</label>
              <button class="btnadd" @click="clickAdd(food.id)">+</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
    
    //添加商品数量
    clickAdd(id){
      this.$store.commit({
        type:'changeGoodNum',
        id,
        num:1
      })  
    },
     //减少商品数量
    clickDec(id){
      this.$store.commit({
        type:'changeGoodNum',
        id,
        num:-1
      })  
    }
    },
     computed: {
    shopcardata() {
      return this.$store.getters.getShopCarItem;
    }
  },

}
</script>

<style lang="less">

.cont{
    display:flex;
    justify-content: space-between;
       .rt {
        label{
          width: 20px;
          height: 25px;
          display: inline-block;
          line-height: 25px;
          text-align: center;
         
        }
         button{
           width: 25px;
           height: 25px;
           color: #FFF;
           background: skyblue;
           border-radius: 50%;
           outline: none;
           font-size: 14px;
           
         }
        .icon {
          font-size: 20px;
          color: #2caeda;
        }
      }
    
}
</style>