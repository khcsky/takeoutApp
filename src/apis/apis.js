/* 封装*/
import axios from 'axios' 

const req = axios.create({
    baseURL:"http://127.0.0.1"
})

//获取商家信息api
export function getSeller(){
 return  req.get('/api/seller')
}
//获取商品
export function getGoods(){
    return  req.get('/api/goods')
   }
//获取评价
 export function getRatings(){
    return  req.get('/api/ratings')
   } 