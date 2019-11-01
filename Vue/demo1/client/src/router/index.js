import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '@/views/GoodsList'
import User from '@/views/user/index'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path:'/cart',//?代表可写，也可以不写
      component:Cart
    },
    {
      path:'/address',
      component:Address 
    },
    {
      path:'/orderConfirm',
      component:OrderConfirm
    },
    {
      path:'/orderSuccess',
      component:OrderSuccess
    }
  ]
})
