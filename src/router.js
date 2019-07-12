import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Search from './components/Search.vue'
import Order from './components/Order.vue'
import Personal from './components/Personal.vue'
import Login from './components/partCompts/Login.vue'
import Food from './components/partCompts/foodClassify/Food.vue'
import Shop from './components/partCompts/Shop/Shop.vue'
import Evaluate from './components/partCompts/Shop/Evaluate.vue'
import GoodDetail from './components/partCompts/Shop/GoodsDetail.vue'
import ShopInfo from './components/partCompts/Shop/ShopInfo.vue'
import EveryFoodDetail from './components/partCompts/Shop/EveryFoodDetail.vue'
import PersonDetail from './components/partCompts/personal/PersonDetail.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkExactActiveClass:'mui-active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path:'/order',
      name:'order',
      component:Order
    },
    {
      path:'/personal/:userId',
      name:'personal',
      component:Personal,
      children:[
        {
          path:'info',
          name:'userInfo',
          component:PersonDetail
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/food',
      name:'food',
      component:Food
    },
    {
      path:'/shop/:id',
      name:'shop',
      component:Shop,
      children:[
        {
          path:'evaluate',
          name:'evaluate',
          component:Evaluate
        },
        {
          path:'',
          name:'goodDetail',
          component:GoodDetail,
        },
        {
          path:'shopInfo',
          name:'shopInfo',
          component:ShopInfo
        },
      ]
    },
    {
      path:'/shop/:id/everyFoodDetail',
      name:'everyFoodDetail',
      component:EveryFoodDetail
    }
  ]
})
