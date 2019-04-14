<template>
  <div class="contents">
    <div class="left">
      <ul class="content">
        <li :class="{active:activeIndex==i}" v-for="(item,i) in data" @click="clickTitle(i)">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="right">
      <ul class="content">
        <dl :id="i" v-for="(item ,i) in data">
          <dt>{{item.name}}</dt>

          <dd v-for="food in item.foods">
            <Col span="6">
              <img :src="food.icon">
            </Col>
            <Col span="12">
              <p>{{food.name}}</p>
              <p>{{food.description}}</p>
              <p>
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </p>
              <p>{{food.price}}</p>
            </Col>
            <Col class="rt" span="6">
              <button class="btndec" v-show="food.num!=0" @click="clickDec(food.id)">-</button>
              <label v-show="food.num!=0">{{food.num}}</label>
              <button class="btnadd" @click="clickAdd(food.id)">+</button>
            </Col>
          </dd>
        </dl>
      </ul>
    </div>

    <div id="footer">
      
     <div>
       <Poptip placement="top-start">
            <!-- 点击某个元素弹出气泡提示 -->
            <img class="icon" :src="shopCarImg" />
            <!-- 点击后显示的元素 -->
            <div class="api" slot="content">
            <Shopcar/>
            </div>
          </Poptip>
     </div>
         
     
      <div class="allprict">￥ {{totalprice}}元
      </div>
      <div>
        另需配送费：{{peisongprice}}元
      </div>
      <div>
         20元起送
      </div>
    </div>
  </div>
</template>

<script>
import Shopcar from '../pages/Shopcar'
import BScroll from "better-scroll";
export default {
  data() {
    return {
      // data: [], //商品信息
      activeIndex: 0,
      newHeightArr: []
    };
  },
  created() {
     this.$store.dispatch("initgetGoods");
      //  console.log( this.$store.state.data);
       
    // var res = await getGoods();
    // this.data = res.data.data;
  },

  computed: {
    // 计算属性
     data(){
       return this.$store.state.data;
     },
     shopCarImg(){
       if(this.$store.getters.getShopCarItem.length == 0)
        return require('../assets/images/shopcar.svg')
         else
       return require('../assets/images/shopcaractive.svg')
     },
    //  总结
      totalprice(){

      let price = 0

      for(let item of this.$store.getters.getShopCarItem){
        price += item.num * item.price
      }

      return price
    },
  // 配送价格
    peisongprice(){
    let psprice = 0
     let price = 0

      for(let item of this.$store.getters.getShopCarItem){
        price += item.num * item.price
      }
      if(price<=20){
        psprice=5
      }else{
        psprice=0
      }

      return psprice
    }
  },
  methods: {
    clickTitle(val) {
      let ele = document.getElementById(val); //获取目标元素

      this.__rightScroll.scrollToElement(ele, 400); //滚动到目标元素

      this.activeIndex = val; //改变激活样式索引
    },
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
    },
    
  },
  mounted() {
    let leftBox = document.querySelector(".left"); //左边列表容器

    let leftScroll = new BScroll(leftBox, {
      click: true
    });

    //右边内容派发滚动事件
    this.__rightScroll = new BScroll(document.querySelector(".right"), {
      probeType: 3
    });
    //监听滚动事件
    this.__rightScroll.on("scroll", pos => {
      //纵坐标滚动距离
      let ordinate = Math.abs(Math.round(pos.y));
      
       
      //定义变量保存纵坐标滚动的总距离
      let totalHeight = 0;
      
      //如果滚动高度小于第一个元素的高度 激活样式索引为0
      if (ordinate < this.newHeightArr[0]) this.activeIndex=0
        
        
      for (let i = 0; i < this.newHeightArr.length; i++) {
        
          totalHeight += this.newHeightArr[i];

          if (ordinate >= totalHeight) this.activeIndex = i + 1;
        }
      
    });
  },
  updated() {
    if (this.newHeightArr.length > 0) return;
    let arr = []; //定义空数组保存 元素节点高度

    for (let i = 0; i < this.data.length; i++) {
      arr.push(document.getElementById(i).offsetHeight);
    }
    this.newHeightArr = arr;

    
  },
  components:{
    Shopcar
  }
};
</script>

<style lang="less">
.contents {
  display: flex;
  height: 22rem;

  .left {
    width: 6rem;
    overflow: scroll;
    ul {
      li {
        list-style: none;
        width: 100%;
        height: 4rem;
        font-size: 14px;
        background: rgb(234, 236, 227);
        font-weight: 500;
        p {
         padding-top: 14px;
          width: 80%;
          height: 100%;
          margin: 0 auto;
          border-bottom: 1px solid rgb(248, 246, 246);
        }
      }
    }
  }
  .right {
    width: 100%;
    overflow: scroll;
    dt {
      height: 36px;
      background: #f0ecec;
      font-size: 16px;
      padding-left: 20px;
      line-height: 36px;
      font-weight: 700;
      border-left: 3px solid rgb(204, 201, 201);
    }
    dd {
      display: flex;
      padding-top:0.8rem ;
      justify-content: space-between;
     
      height: 6rem;
      padding-left: 10px;
      margin: 0 auto;
      width: 100%;
      border-bottom: 1px solid #ccc;
      img {
        width: 70px;
        height: 70px;
      }
      .rt {
        position: relative;
        justify-content: space-between;
        label{
          width: 20px;
          height: 25px;
          display: inline-block;
          line-height: 25px;
          text-align: center;
          position: absolute;
          right: 28px;
          top: 40px
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
         .btnadd{
           position: absolute;
           right: 4px;
           top: 38px
         }
          .btndec{
           position: absolute;
           right: 48px;
           top: 38px
         }
        .icon {
          font-size: 20px;
          color: #2caeda;
        }
      }
    }
    dd:last-of-type {
      border-bottom: none;
    }
  }
  #footer {
    height: 4rem;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size: 16px;
    bottom: 0;
    background: rgb(75, 74, 74);
    color: #fff;
    &>div:first-of-type{
      width: 4rem;
      line-height:4rem ;
      height: 4rem;
      background-color: rgb(105, 105, 105);
      border-radius: 50%;
      position: absolute;
      bottom: 1rem;
      left: 0.5rem;
       color: #000;
        .api{
          padding-left: 2rem;
        }
     

.ivu-poptip-inner {
  width: 400px;
}
    }
     &>div:nth-of-type(2){
       margin-left: 5rem;
     }
  
    &>div:last-of-type{
      text-align: center;
      width: 30%;
      height: 4rem;
      background-color: rgb(199, 195, 195);
      line-height:4rem ;
      font-size: 18px
    }
    img{
      width: 3rem;
      height: 3rem;
      margin-top: 0.5rem;
      margin-left: 0.4rem;
    }
    
   
  }
  .active {
    background: #fff !important;
    
  }
}
</style>