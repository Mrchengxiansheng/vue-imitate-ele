import Vue from 'vue'
import Vuex from 'vuex'
import {
  ADD_CART,
  REDUCE_CART,
  CLEAR_CART
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopid: null,//商铺id
    cartList: {}, // 加入购物车的商品  各个商店总列表
    orderParam: null,//订单的参数
    orderMessage: null, //订单返回的信息
    orderDetail: null, //订单详情
    login: true,//是否登录
    cartId: null, //购物车id
    sig: null,//购物车sig
  },
  mutations: {
    [ADD_CART](state, {
      shopid,
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock
    }) {
      let cart = state.cartList;
      let shop = cart[shopid] = (cart[shopid] || {});
      let category = shop[category_id] = (shop[category_id] || {});
      let item = category[item_id] = (category[item_id] || {});
      if (item[food_id]) {
        item[food_id]['num']++;
      } else {
        item[food_id] = {
          "num": 1,
          "id": food_id,
          "name": name,
          "price": price,
          "specs": specs,
          "packing_fee": packing_fee,
          "sku_id": sku_id,
          "stock": stock
        }
      }
      state.cartList = { ...cart }; //添加属性用 set或者解构
    },
    [REDUCE_CART](state, {
      shopid,
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
    }) {
      let cart = state.cartList;
      let shop = (cart[shopid] || {});
      let category = (shop[category_id] || {});
      let item = (category[item_id] || {});
      if (item && item[food_id]) {
        if (item[food_id]['num'] > 0) {
          item[food_id]['num']--;
            state.cartList = { ...cart };
          
        } else {
          item[food_id] = null;
        }
      }
    },
    [CLEAR_CART](state,shopid){
      state.cartList=null;
      state.cartList={...state.cartList};
    }
  },
  actions: {

  }
})
