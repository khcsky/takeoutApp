import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Commodity from './pages/Commodity'


Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'commodity',
      component: Commodity
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./pages/Evaluate')
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('./pages/Merchant')
    }
  ]
})
