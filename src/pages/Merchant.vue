<template>
  <div>
    <div class="info_top">
      <div class="info_top_left">
        <p>{{sellerdata.name}}</p>
        <p>
          <span v-for="i in sellerdata.deliveryPrice">
            <img src="../assets/images/star24_on@2x.png">&ensp;
          </span>
          <span v-show="sellerdata.deliveryPrice !=5" v-for="i in xhh">
            <img src="../assets/images/star24_off@2x.png">&ensp;
          </span>
          ({{sellerdata.ratingCount}})
          <span>月售{{sellerdata.sellCount}}单</span>
        </p>
      </div>
      <div class="info_top_right">
        <p><Icon type="md-heart-outline" /></p>
        <p>已收藏</p>
      </div>
    </div>
    <div class="info_middle">
      <Row>
        <Col class="lt" span="8">
          <p>起送价</p>
          <p><span class="row">{{sellerdata.minPrice}}</span> 元</p>
        </Col>
         <Col class="md" span="8">
          <p>商家配送</p>
          <p><span class="row">{{sellerdata.deliveryPrice}}</span>元</p>
        </Col>
         <Col class="bt" span="8">
          <p>平均配送时间</p>
          <p><span class="row">{{sellerdata.deliveryTime}}</span>元</p>
        </Col>
      </Row>
    </div>
    <p class="bg"></p>
    <div class="info_bttom">
     <p>
       <h2>活动公告</h2>
       <span>
         {{sellerdata.bulletin}}
       </span>
     </p>
     <p v-for="a in sellerdata.supports">
            {{a.description}}
     </p>
     <p class="bg"></p>
     <div>
        <h2>商家时景</h2>
       <span v-for="p in sellerdata.pics">
      
            <img :src="p" >
        
       </span>
     </div>
     <p class="bg"></p>
     <div class="infoinfo">
        <h2>商家信息</h2>
      <p v-for="b in this.sellerdata.infos">
      
            {{b}}
        
       </p>
     </div>
      
    </div>
  </div>
</template>

<script>
import { getSeller } from "../apis/apis";
export default {
  data() {
    return {
      sellerdata: {},
      xhh: 0
    };
  },
  async created() {
    let ress = await getSeller();
    this.sellerdata = ress.data.data;
    console.log(this.sellerdata);

    // 灰色星星个数
    let a = 5 - this.sellerdata.deliveryPrice;
    this.xhh = a;
  }
};
</script>

<style lang="less" scoped>
.info_top{
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
}
.info_middle{
  text-align: center;
  .lt,.md{
    border-right: 1px solid #ccc;
  }
  .lt,.md,.bt{
    height: 3rem;
  }
  
  .row{
    font-size:18px;
    
  }
}
.bg{
  height: 1rem;
  width: 100%;
  background-color: rgba(146, 145, 145,.5);
  border: 1px solid #bbb;
}
</style>