<template>
  <div>
    <div id="header">
      <Row class="header_content">
        <Col span="8" class="logo">
          <img :src="data.avatar">
        </Col>
        <Col span="16">
          <p>
            <img src="../assets/images/brand@2x.png">
            <span class="wordname">{{data.name}}</span>
          </p>
          <p>{{data.description}}</p>
          <p>
            <img src="../assets/images/decrease_1@2x.png">
            <span class="wordsales">{{salesinfo}}</span>
          </p>
        </Col>
      </Row>
      <div class="header_bottom"><img src="../assets/images/bulletin@2x.png"><span>{{data.bulletin}}</span>></div>
    </div>

    <div id="nav">
      <router-link to="/" :class="{status:statusresurt=='/'}">
        <span @click="clickStatu('/')">商品</span>
      </router-link>
      <router-link to="/evaluate" :class="{status:statusresurt=='/evaluate'}">
        <span @click="clickStatu('/evaluate')">评价</span>
      </router-link>
      <router-link to="/merchant" :class="{status:statusresurt=='/merchant'}">
        <span @click="clickStatu('/merchant')">商家</span>
      </router-link>
    </div>
    <!-- 出口 -->
    <router-view></router-view>
    
   </div>
   
</template>

<script>
import { getSeller } from "../apis/apis.js";

export default {
  data() {
    return {
      statusresurt: "/",
      data: {}
    };
  },
  async created() {
    var res = await getSeller();
    this.data = res.data.data;
  
    
  },
  methods: {
    clickStatu(str) {
      this.statusresurt = str;
    }
  },
  computed: {
    salesinfo() {
      if (this.data.supports) {
        return this.data.supports.map(item => item.description).join(",");
      }
      return "";
    }
  }
};
</script>

<style lang="less" scoped>
#header {
  height: 12rem;
  width: 100%;
  background: rgba(66, 66, 68, 0.4);
  padding-top: 24px;
  .header_content {
    margin-left: 20px;
    height: 110px;
    .logo > img {
      width: 100px;
      height: 110px;
    }
    
    p {
      font-size: 16px;
      height: 36px;
      line-height: 36px;
      color: #fff;
    }
    p:first-of-type {
      display: flex;
      justify-content: flex-start;
      align-items: center;

        .wordname {
          font-size: 18px;
          margin-left: 4px;
          margin-top: 2px;
          font-weight: 700;
        }
      img {
        height: 28px;
        margin-top: 4px;
      }
    }
    p:last-of-type {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 10px;
      .wordsales {
        display: inline-block;
        height: 36px;
        overflow: hidden;
        margin-left: 4px;
      }
       img {
       align-self:center;
         width: 24px;
         height: 24px;
      }
    }
    

  }
  .header_bottom{
       display: flex;
       justify-content: flex-start;
       margin-top: 17px;
       padding: 0 10px;
       height: 40px;
       line-height: 40px;
       overflow: hidden;
       width: 100%;
       color: wheat;
       background: rgba(66, 66, 68, 0.4)
       }
       img{
         align-self:center;
         width: 40px;
         height: 24px;
         
       }
       span{
         display: inline-block;
         margin-left: 4px;
       }
}
#nav {
  height: 4rem;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  font-size: 28px;
  background: #fff;
  line-height: 4rem;
  .status {
    color: red;
  }
  a {
    color: rgb(77, 85, 93);
  }
}
</style>