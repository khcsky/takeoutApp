<template>
  <div class="container">
    <Row class="header">
      <Col class="header_lt" span="8">
        <p>{{sellerdata.foodScore}}</p>
        <p>综合评分</p>
        <p>高于周边商家{{sellerdata.rankRate}}%</p>
      </Col>
      <Col class="header_rt" span="16">
        <p><span>服务态度</span> &ensp;
          <span  v-for="i in 4"><img src="../assets/images/star24_on@2x.png">&ensp;</span>
           <span v-show="sellerdata.deliveryPrice !=5" v-for="i in xhh"><img src="../assets/images/star24_off@2x.png">&ensp;</span>
           {{sellerdata.serviceScore}}</p>
        <p><span>服务态度</span> &ensp;
          <span v-for="i in sellerdata.deliveryPrice"><img src="../assets/images/star24_on@2x.png">&ensp;</span>
          <span v-show="sellerdata.deliveryPrice !=5" v-for="i in xhh"><img src="../assets/images/star24_off@2x.png">&ensp;</span> {{sellerdata.score}}</p>
        <p>
          送达时间 &ensp;
          <span>{{sellerdata.deliveryTime}}分钟</span>
        </p>
      </Col>
    </Row>
    <p class="bg"></p>
    <div class="contbar">
      <Tabs value="name1">
        <TabPane :label="label" name="name1">
            <div class="pjcontent" v-for="item in this.data">
              <div class="pjcontent_left"><img :src="item.avatar"></div>
               <div class="pjcontent_right">
                <p>{{item.username}} &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;{{getLocalTime(item.rateTime)}}</p>
                <p><span v-for="i in item.score"><img src="../assets/images/star24_on@2x.png"></span>
                <span v-show="item.score !=5" v-for="i in (5-item.score)"><img src="../assets/images/star24_off@2x.png"></span> 
                {{item.deliveryTime}}分钟送达</p>
                <p>{{item.text}}</p>
               </div>
            </div>
        </TabPane>
        <TabPane label="满意" name="name2">
           <div>2</div>
        </TabPane>
        <TabPane label="不满意" name="name3">
           <div>3</div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import {getRatings} from '../apis/apis.js'
import {getSeller} from '../apis/apis'
export default {
  data() {
    return {
      data:{},
      sellerdata:{},
      xhh:0,
      label: (h) => {
                    return h('div', [
                        h('span', `全部 (${this.data.length})`),
                        h('Badge', {
                            
                        })
                    ])
                }
            };
          
     
  },
  methods: {
     //转化时间戳
    getLocalTime :function(date){
            var date = new Date(date);  
            var y = date.getFullYear();    
            var m = date.getMonth() + 1;    
            m = m < 10 ? ('0' + m) : m;    
            var d = date.getDate();    
            d = d < 10 ? ('0' + d) : d;    
            var h = date.getHours();  
            h = h < 10 ? ('0' + h) : h;  
            var minute = date.getMinutes();  
            var second = date.getSeconds();  
            minute = minute < 10 ? ('0' + minute) : minute;    
            second = second < 10 ? ('0' + second) : second;   
            return y + '-' + m + '-' + d+' '+h+':'+minute;    
        }
  },
  async created() {
    let res =  await getRatings();
    this.data = res.data.data
  

  
  
    let ress =  await getSeller();
    this.sellerdata = ress.data.data

// 灰色星星个数
    let a = 5-this.sellerdata.deliveryPrice
     this.xhh = a
    
  
  },
 
 
};
</script>

<style lang="less">
.container {
  .header {
    height: 6rem;
    .header_lt {
      border-right: 1px solid #ccc;
      text-align: center;
      margin-top: 0.5rem;
      p:first-of-type{
        font-size:24px ;
        color: rgb(240, 199, 18);
      }
      p:nth-of-type(2){
        font-size:16px ;
        font-weight: 700;
        color:#000;
      }
      p:last-of-type{
       color: rgb(185, 184, 184);
      }
      
    }
    .header_rt {
      margin-top: 0.5rem;
      padding-left: 0.5rem;
      border-left: 1px solid #f4f4f4;
      p {
        height: 1.5rem;
        line-height: 1.5rem;
      }
    }
  }
  .bg {
    height: 1rem;
    width: 100%;
    background: #b6b7b880;
    border: 1px solid rgb(175, 173, 173);
  }
  .contbar{
     .ivu-tabs-nav-container{
      padding: 10px;
      
       
    .ivu-tabs-tab{
      width: 80px;
      height: 38px;
      background-color: rgba(18, 52, 243,.4);
      
    }
    .ivu-tabs-tab:nth-last-child(2){
      background-color: rgb(99, 218, 218)
    }
    .ivu-tabs-tab:nth-last-child(1){
      background-color: rgb(176, 180, 180)
    }
    .ivu-tabs-tab-active{
        color: aliceblue;
       
      }
  }
  .pjcontent{
    display: flex;
    justify-content:flex-start;
   
    .pjcontent_left{
      padding-left: 10px;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .pjcontent_right{
      padding-left: 10px;
      height: 6rem;
      img{
        width: 15px;
        height: 15px;
        margin-right: 4px;
      }
    }

  }
  }
 
  
  
}
</style>