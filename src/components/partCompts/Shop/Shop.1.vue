<template>
  <div class="shop"  >
    <!-- 头部 -->
    <div class="shop-header">
      <span class="iconfont icon-left" @click="goBack"></span>
      <span>{{ shopDetails.name }}</span>
      <span class="iconfont icon-weibiaoti--"></span>
    </div>
    <!-- 商家信息 -->
    <div class="shop-info">
      <div class="shop-img">
        <img :src="imgBaseUrl + shopDetails.image_path" />
      </div>
      <div class="shop-infos">
        <p class="shop-infos-name">{{ shopDetails.name }}</p>
        <p>
          <span>评分{{ shopDetails.rating }}</span>
          <span>月售{{ shopDetails.rating_count }}单</span>
          <span>商家配送约&nbsp;{{ shopDetails.order_lead_time }}分钟</span>
        </p>
        <p>
          <span :style="'backgroundColor:#' + shopDetails.activities[0].icon_color +';color:#fff;'">{{ shopDetails.activities[0].name }}</span>
          <span style="color:#000;">{{shopDetails.activities[0].description}}</span>
          <span @click="showFade">{{ activeLength }}个优惠<span class="mui-icon mui-icon-arrowright"></span></span>
        </p>
        <P> 公告：{{ shopDetails.promotion_info }} </P>
      </div>
    </div>
    <div class="shop-detail-info">
      <div class="shop-detail-nav" :class="{ active: shopDetailNav }">
        <ul class="clearfix">
          <li>
            <span :class="{ active: isActiveSpan == 'goods' }" @click="spanClick('goods')">商品</span>
          </li>
          <li>
            <span :class="{ active: isActiveSpan == 'evaluate' }" @click="spanClick('evaluate')">评价</span>
          </li>
          <li>
            <span :class="{ active: isActiveSpan == 'merchant' }" @click="spanClick('merchant')">商家</span>
          </li>
        </ul>
      </div>
      <div class="shop-detail-goods clearfix">
        <div class="shop-detail-goods-left" ref="goodsNavLeft">
          <ul>
            <li v-for="(item, index) in menuList" :key="index" :class="{ active: menuActive == index }" @click="menuChange(index)">
              <img :src="getImgPath(item.icon_url)" v-if="item.icon_url" />
              <span>{{ item.name }}</span>
              <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
            </li>
          </ul>
        </div>
        <div class="shop-detail-goods-right" ref="goodsMenuList">
          <ul class="shop-detail-goods-right-ul">
            <li class="shop-detail-goods-right-li clearfix" v-for="(items, index) in menuList" :key="index">
              <div class="shop-detail-goods-header">
                <p>
                  <span class="shop-detail-goods-header-name">{{items.name}}</span>
                  <span class="shop-detail-goods-header-description">{{items.description}}</span>
                </p>
              </div>
              <div class="shop-detail-goods-content" v-for="(item, i) in items.foods" :key="i">
                <router-link :to="{ path: 'shop', query: { id: item.item_id } }">
                  <div class="show-left">
                    <img :src="imgBaseUrl + item.image_path" />
                  </div>
                  <div class="show-right">
                    <div class="show-right-header">
                      <span class="shop-name">{{ item.name }}</span>
                      <!-- <ul v-if="item.attributes.length" class="attributes_ul">
                        <li v-for="(attribute, j) in item.attributes" :key="j"  :style="{color: '#' + attribute.icon_color,borderColor:'#' + attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                          <p :style="{color: attribute.icon_name == '新'? '#000':'#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                        </li>
                      </ul> -->
                    </div>
                    <div class="show-right-mid-left">
                      <p class="show-right-mid-left-description">{{ item.description }}</p>
                      <p>
                        <span class="count">月售{{ item.month_sales }}单</span>
                        <span class="score">好评率{{ item.satisfy_rate }}%</span>
                      </p>
                      <p v-if="item.activity">
                        <span class="show-right-mid-left-description" :style="{
                            border: '1px solid #' + item.activity.icon_color,
                            color: '#' + item.activity.icon_color,
                            borderRadius: '20%',
                            padding: '0px 5px'
                          }">{{ item.activity.image_text }}</span
                        >
                      </p>
                    </div>
                  </div>
                </router-link>
                <div class="show-right-footer clearfix">
                      <div class="show-right-footer-left">
                        <span style="color:orange">￥{{ item.specfoods[0].price }}</span>
                        <span v-if="item.specifications.length">起</span>
                      </div>
                      <div class="add-to-cart-module">
                          <div class="cart-button" v-if="!item.specifications.length">
                            <span class="iconfont icon-jianhao-copy" v-if="foodNum(item)" @click.stop="removeOutCart(item.category_id,item.item_id,item.specfoods[0].food_id)"></span>
                            <span class="goods-number" v-if="foodNum(item)" >{{foodNum(item)}}</span>
                            <span class="iconfont icon-jiahao" @click.stop="addToCart(item.category_id,item.item_id,item.specfoods[0].food_id,item.specfoods[0].name, item.specfoods[0].price,'', item.specfoods[0].packing_fee, item.specfoods[0].sku_id, item.specfoods[0].stock)"></span>
                          </div>
                          <div class="choose-specification" v-else>
                            <span class="iconfont icon-jianhao-copy" v-if="foodNum(item)==1" @click.stop="removeOutCart(item.category_id,item.item_id,item.specfoods[specsIndex].food_id)"></span>
                            <span class="iconfont icon-jianhao-copy" style="color:#ccc" v-if="foodNum(item)>1" @click.stop="showTip"></span>
                            <span class="goods-number" v-if="foodNum(item)" >{{foodNum(item)}}</span>
                            <span class="choose-button" @click.stop="showChooseList(item)">选规格</span>
                          </div>
                        </div>
                    </div>
              </div> 
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 购物车 -->
    <cart :deliveryFee='deliveryFee' :minimumOrderAmount='minimumOrderAmount' :totalNum='totalNum' :orderAmount='shopDetails.float_minimum_order_amount' :totalPrice='totalPrice' @showCartDetail='showCartDetail'></cart>
      <!-- 隐藏的优惠活动 -->
      <transition name="fade">
        <div class="activities-details" v-if="fadeValue">
          <h4> 优惠活动<span @click="showFade" class="mui-icon mui-icon-closeempty"></span></h4>
          <ul>
            <li class="activities-details-li" v-for="(item, index) in shopDetails.activities" :key="index">
              <span class="active-left-span" :style="{ backgroundColor: '#' + item.icon_color }">{{ item.name }}</span>
              <span class="active-right-span">{{ item.description }}</span>
            </li>
          </ul>
        </div>
      </transition>
    <!-- 优惠项弹出时的 遮板 -->
    <transition name="cover">
      <div class="cover" v-if="fadeValue" @click="showFade"></div>
    </transition>
    <transition name='cover' >
        <div class="cover" v-if="showSpace"></div>
    </transition>
     <transition name="specs-list">
                <div class="specs-list" v-if="showSpace">
                  <div class="specs-list-header">
                    <p>{{choosedFoods.name}}</p>
                    <span class="mui-icon mui-icon-closeempty" @click="closeSpecs"></span>
                  </div>
                  <div class="specs-list-content">
                    <p>{{choosedFoods.specifications[0].name}}</p>
                    <ul class="clearfix">
                      <li v-for="(fooditem,index) in choosedFoods.specifications[0].values" :key="index" @click="changeSpaceLi(index)" :class="{active:specsIndex==index}">
                        {{fooditem}}
                      </li>
                    </ul>
                  </div>
                  <div class="specs-list-footer clearfix" >
                    <span class="specs-price">￥{{choosedFoods.specfoods[specsIndex].price}}</span>
                    <span class="specs-add-cart" @click="addSpecs(choosedFoods.category_id, choosedFoods.item_id, choosedFoods.specfoods[specsIndex].food_id, choosedFoods.specfoods[specsIndex].name, choosedFoods.specfoods[specsIndex].price, choosedFoods.specifications[0].values[specsIndex], choosedFoods.specfoods[specsIndex].packing_fee, choosedFoods.specfoods[specsIndex].sku_id, choosedFoods.specfoods[specsIndex].stock)">加入购物车</span>
                  </div>
                </div>
    </transition>
    <div class="tip" v-if="tipValue">多规格商品需要去购物车里删除哦</div>
     <transition name='cover' >
        <div class="cover" v-if="showCartList&&cartFoodList.length" @click="toggleCart"></div>
    </transition>
    <transition name="toggle-cart">
    <!-- 点击购物车弹出的部分-->
      <div class="cart_food_list" v-if="showCartList && cartFoodList.length">
      <div class="cart_food_list_header">
        <h4>购物车</h4>
        <div @click="clearCartAll">
          <span class="mui-icon mui-icon-trash"></span>
          <span class="clear_cart">清空</span>
        </div>
      </div>
      <div class="cart_food_details" id="cartFood">
        <ul>
          <li  v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
            <div class="cart_list_num">
              <p class="ellipsis">{{ item.name }}</p>
              <p class="ellipsis">{{ item.specs }}</p>
            </div>
            <div class="cart_list_price">
              <span>¥{{ item.price }}</span>
            </div>
            <div class="cart_list_control">
                <span class="iconfont icon-jianhao-copy"  @click="removeOutCart(item.category_id,item.item_id,item.food_id, item.name, item.price, item.specs)"></span>
                <span class="goods-number" >{{item.num}}</span>
                <span class="iconfont icon-jiahao" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
import axios from "axios";
import { getImgPath } from "../../../assets/myJs/getImageUrl";
import cart from "../../common/Cart";
import {mapMutations,mapState} from 'vuex';
export default {
  data() {
    return {
      shopId: null, //商铺id
      shopDetails: "", //商家详情
      imgBaseUrl: "https://elm.cangdu.org/img/", //图片路径
      fadeValue: false, //隐藏的
      isActiveSpan: "goods", //商品、评价、商家 导航条
      shopDetailInfo: [], //食品分类列表
      goodsData: [], //具体每一个食品信息
      scrollTop: 0, //滚动出去的高度
      shopDetailNav: false, //导航栏固定
      menuActive: 0, //商品左边active
      menuList: [], //食品列表
      ratingList: null, //评论列表
      ratingScoresData: null, //评价总体分数
      shopListTop: [], //每个食品列表的高度
      shopDetailGoodsLeftHeight: 0, //左边导航栏的高度
      showLoading:true,  //加载动画
      categoryNum: [], //商品类型右上角已加入购物车的数量
      cartFoodList: [], //购物车此商店的商品总列表
      totalPrice: 0, //总共价格
      choosedFoods:null,  //选规格的食品
      showSpace:false,  //选规格的弹出切换
      specsIndex:0,   //选规格时选项
      tipValue:false,  //多规格商品去购物车删除
      showCartList:false, //点击购物车时 
    };
  },
  components: {
    cart
  },
  created() {
    this.intiData();
    this.sj++;
  },
  mounted(){
    
  },
  computed: {
    ...mapState([
      'cartList'
    ]),
    activeLength: function() {
      var len = this.shopDetails.activities;
      if (len) {
        return this.shopDetails.activities.length;
      } else {
        return 0;
      }
    }, 
    //购物车信息
    shopCart: function (){
        return {...this.cartList[this.shopId]}; //拿到本商店的食品列表
        
    },
    //商店配送费
    deliveryFee: function () {
      if (this.shopDetails) {
          return this.shopDetails.float_delivery_fee;
      }else{
          return null;
      }
   },
   //还差多少元起送，为负数时显示去结算按钮
    minimumOrderAmount: function () {
        if (this.shopDetails) {
            return this.shopDetails.float_minimum_order_amount - this.totalPrice;
        }else{
            return null;
        }
     },
   //购物车中总共商品的数量
   totalNum: function (){
      let num = 0;
      this.cartFoodList.forEach(item => {
         num += item.num;
        })
       return num;
     },
  },
  watch:{
    showLoading: function (value){
      if (!value) {
        this.$nextTick(() => {
            this.intiCategoryNum();
              this.sj;
          })
        }
    },
    shopCart:function(){
      this.intiCategoryNum();
    },
    cartFoodList:function(value){
      if(!value.length){
        this.showCartList=false;
      }
    }
  },
  methods: {
    getImgPath,
    ...mapMutations ([
      'REDUCE_CART','ADD_CART','CLEAR_CART'
    ]),
    async intiData() {
      this.shopId = this.$route.query.id;
      await axios({
        //请求商家的全部信息
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurant/" + this.shopId
      }).then(res => {
        this.shopDetails = res.data;
      });
      await axios({
        //请求商家 商品菜单
        method: "get",
        url: "https://elm.cangdu.org/shopping/v2/menu",
        params: {
          restaurant_id: this.shopId
        }
      }).then(res => {
        this.menuList = res.data;
      });
      this.hideLoading();
    },
    //隐藏动画
    hideLoading(){
      this.showLoading = false;
    },
    //初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList
    intiCategoryNum(){
      let newArr=[];//存储 此商店购物车各个品种的数量
      let cartFoodNum=0;//表示购物的商品的品种数
      this.totalPrice=0;
      this.cartFoodList=[];
      this.menuList.forEach((item,index)=>{
        if(this.shopCart && this.shopCart[item.id]){
          let num=0;
          Object.keys(this.shopCart[item.id]).forEach(itemid=>{
            Object.keys(this.shopCart[item.id][itemid]).forEach(foodid=>{
              let foodItem=this.shopCart[item.id][itemid][foodid]; //拿到最里面的food信息
              num+=foodItem.num;
              if(item.type==1){
                this.totalPrice+=foodItem.price * foodItem.num;
                if(foodItem.num>0){
                  this.cartFoodList[cartFoodNum] = {};
                  this.cartFoodList[cartFoodNum].category_id = item.id.toString();
                  this.cartFoodList[cartFoodNum].item_id = itemid;
                  this.cartFoodList[cartFoodNum].food_id = foodid;
                  this.cartFoodList[cartFoodNum].num = foodItem.num;
                  this.cartFoodList[cartFoodNum].price = foodItem.price;
                  this.cartFoodList[cartFoodNum].name = foodItem.name;
                  this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                  cartFoodNum++;
                }
              }
            })
          })
          newArr[index]=num;
        }else{
          newArr[index]=0;
        }
      })
      this.totalPrice=this.totalPrice.toFixed(2);
      this.categoryNum=[...newArr];
    },
    //某一类商品的加入购物车的数量
    foodNum: function(element){
        let category_id=element.category_id;
        let item_id=element.item_id;
        if(this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]){
          let num=0;
          Object.values(this.shopCart[category_id][item_id]).forEach((v)=>{
            num+=v.num;
          })
          return num;
        }else{
          return 0;
        }
    },
    showFade() {
      //隐藏的优惠活动切换
      this.fadeValue=!this.fadeValue;
    },
    spanClick(type) {
      //商品 评价，商家切换
      if (this.isActiveSpan != type) {
        this.isActiveSpan = type;
      }
    },
    // getShopGoodsLeftHeight() {                //获取右边商品的高度
    //     const shopGoodsList = this.$refs.goodsMenuList; //取到的是 shop-detail-goods-right
    //     if (shopGoodsList) {
    //       const listArr = Array.from(this.shopGoodsList.children[0].children); //取到的 shop-detail-goods-right 下面的 li 要转成数组 不然不能用forEach
    //       listArr.forEach((v, i) => {
    //         this.shopListTop[i] = v.offsetTop;
    //       });
    //     }
    // },
    // getGoodsNavHeight() {  //获取左边导航的高度
    //   const goodsNav = this.$refs.goodsMenuList;
    //   if (goodsNav) {
    //     this.shopDetailGoodsLeftHeight = goodsNav.offsetHeight;
    //   }
    // },
    removeOutCart(category_id, item_id, food_id,name, price, specs){
         this.REDUCE_CART({shopid: this.shopId, category_id, item_id, food_id,name, price, specs});
    },
    addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
      this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
    },
    addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
      this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
      this.closeSpecs();
    },
    handleScroll() {
      // var scrollTop = window.pageYOffset;
    },
    showChooseList(food){
      if(food){
        this.choosedFoods=food;
      }
      this.showSpace=!this.showSpace
    },
    closeSpecs(){
      this.showSpace=!this.showSpace
    },
    changeSpaceLi(i){
      this.specsIndex=i;
    },
    showTip(){
      this.tipValue=true;
      setTimeout(() => {
        this.tipValue=false;
      }, 2000);
    },
    showCartDetail(){
      this.toggleCart();
    },
    toggleCart(){
      this.cartFoodList.length? this.showCartList=!this.showCartList: false;
    },
    clearCartAll(){
      // this.toggleCart();
      this.CLEAR_CART(this.shopId);
    },
    menuChange(i) {
      //左边导航栏切换
      this.menuActive = i;
    },
    goBack() {
      if (window.history.length) {
        this.$router.go(-1);
      }
    }
  }
};
</script>


<style lang='less' scoped>
span {
  font-size: 14px;
}
.iconfont {
  font-size: 14px;
}
p {
  margin: 0;
}
.shop {
  background-color: #fff;
  position: relative;
  .shop-header {
    height: 32px;
    line-height: 32px;
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #fff;
    span {
      flex-grow: 1;
      text-align: center;
    }
    .iconfont {
      color: #3190e8;
      font-size: 16px;
    }
  }
  .shop-info {
    padding-top: 32px;
    .shop-img {
      width: 100%;
      height: 180px;
      background: url("../../../assets/img/073.jpg") no-repeat;
      background-size: contain;
      position: relative;
      img {
        position: absolute;
        bottom: -10px;
        width: 60px;
        height: 60px;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
    .shop-infos {
      margin-top: 20px;
      p {
        text-align: center;
        margin-bottom: 5px;
        font-size: 12px;
        span {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      .shop-infos-name {
        font-size: 18px;
        color: #000;
      }
    }
  }
  .shop-detail-info {
    position: relative;
    .shop-detail-nav {
      border-bottom: 1px solif #eee;
      ul {
        display: flex;
        li {
          flex-grow: 1;
          float: left;
          text-align: center;
          span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
          }
          .active {
            border-bottom: 2px solid #ccc;
          }
        }
      }
    }
    .shop-detail-nav.active {
      position: fixed;
      top: 0;
    }
    .shop-detail-goods {
      .shop-detail-goods-left {
        width: 30%;
        float: left;
        height: 500px;
        overflow-y: scroll;
        ul {
          background-color: #f5f5f5;
        }
        li {
          height: 40px;
          line-height: 30px;
          padding: 5px 10px;
          border-bottom: 1px solid #eee;
          position: relative;
          img {
            width: 12px;
            height: 12px;
            margin: 0 2px 20px 0;
          }
          span {
            display: inline-block;
            width: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .category_num{
            position: absolute;
            right: 5px;
            top: 5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: rgba(255,0,0,0.8);
            color: #fff;
            font-size: 10px;
            line-height: 12px;
            text-align: center;
          }
        }
        .active {
          background-color: #fff;
          border-left: 2px solid #3190e8;
        }
      }
      .shop-detail-goods-right {
        width: 70%;
        height: 500px;
        overflow-y: scroll;
        float: left;
        background-color: #fff;
        .shop-detail-goods-right-ul {
          list-style: none;
          margin: 0;
          padding: 0;
          .shop-detail-goods-right-li {
            padding: 10px 5px;
            border-bottom: 1px solid #ccd;
            .shop-detail-goods-header {
              padding: 5px;
              border-bottom: 1px solid #eee;
              .shop-detail-goods-header-name {
                margin-right: 5px;
                font-weight: bold;

                vertical-align: text-bottom;
              }
            }
            .shop-detail-goods-header-description,
            .show-right-mid-left-description,
            .shop-name {
              display: inline-block;
              font-size: 10px;
              max-width: 150px;
              line-height: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .shop-detail-goods-content {
              position: relative;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
              .router-link-active {
                display: flex;
                .show-left {
                  margin-right: 5px;
                  img {
                    width: 40px;
                    height: 40px;
                  }
                }
                .show-right {
                  flex-grow: 1;
                  color: #666;
                  .show-right-header {
                    .shop-name {
                      font-size: 14px;
                      font-weight: bold;
                    }
                  }
                  .show-right-mid-left {
                    .score,
                    .count {
                      font-size: 12px;
                      margin-right: 5px;
                    }
                  }
                }
              }
              .show-right-footer {
                    position: relative;
                    display: flex;
                    .show-right-footer-left {
                      flex-grow: 1;
                      margin-left:40px;
                      span {
                        font-size: 12px;
                        margin-right: 2px;
                      }
                    }
                    .add-to-cart-module{
                      .cart-button, .choose-specification{
                        text-align: right;
                        margin-right:30px;
                        .choose-button{
                        background-color: #3190e8;
                        color:#fff;
                        border-radius: 10px;
                        padding:2px 5px;
                      }
                      .iconfont{
                          color: #3190e8;
                          font-size: 20px;
                        }
                        .goods-number{
                          margin:0 5px;
                          font-size: 16px;
                        }
                      }
                      
                    }
                  }
            }
          }
        }
      }
    }
  }
}
.activities-details {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  background-color: #eee;
  h4 {
    width: 100%;
    text-align: center;
    position: relative;
    font-size: 16px;
    span {
      font-size: 30px;
      position: absolute;
      right: 10px;
      top: -8px;
    }
  }
  .activities-details-li {
    margin-bottom: 10px;
    .active-left-span {
      margin: 0 10px;
      color: #fff;
      display: inline-block;
    }
    .active-right-span {
      display: inline-block;
      width: 70%;
      word-wrap: break-word;
    }
  }
}
.cover {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.cover-enter-active,
.cover-leave-active {
  transition: all 0.5s;
  opacity: 1;
}
.cover-enter,
.cover-leave-to {
  opacity: 0;
}
.fad-enter-active,
.fade-leave-active {
  transition: all 0.5s;
  opacity: 1;
  transform: translateY(0);
}
.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.specs-list{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 333;
  width: 70%;
  border-radius: 10px;
  background-color: #fff;
  .specs-list-header{
    position: relative;
    p{
      text-align: center;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.8);
    }
    .mui-icon-closeempty{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 30px;
    }
  }
  .specs-list-content{
    p{
      line-height: 30px;
      color: rgba(0, 0, 0, 0.8);
      padding-left:10px;
    }
    li{
      float: left;
      border: 1px solid #ddd;
      border-radius:5px;
      padding: 2px 5px;
      margin:0 10px; 
      font-size: 14px;
    }
    li.active{
      color: #3190e8;
      border: 1px solid #3190e8;
    }
  }
  .specs-list-footer{
    .specs-price{
      float: left;
      margin: 10px;
      padding: 2px 5px;
      color: orange;
    }
    .specs-add-cart{
      float: right;
      padding: 2px 5px;
      background-color: #3190e8;
      color: #fff;
      border-radius: 5px;
      margin:10px;
    }
  }
}
 .tip{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 222;
    text-align: center;
    padding: 2px 5px;
    color: #fff;
    border-radius: 10px;
    font-size: 14px;
  }
  .cart_food_list{
    background-color: #fff;
    width: 100%;
    position: fixed;
    bottom: 40px;
    .cart_food_list_header{
      height: 30px;
      background-color: #eceff1;
      h4{
        float: left;
        padding:5px 10px;
        font-size: 14px;
      }
      div{
        float: right;
        padding:5px 10px;
      }
    }
    .cart_food_details{
      .cart_food_li{
        display: flex;
        width: 100%;
        padding: 5px 10px;
        border-bottom: 1px solid #eee;
        align-items: center;
        .cart_list_num{
          flex-grow: 1;
          
        }
        .cart_list_price{
          margin-right: 10px;
          color: orange;
        }
        .cart_list_control{
          .iconfont{
            color: #3190e8;
            font-size: 16px;
          }
         .goods-number{
            margin:0 5px;
            font-size: 14px;
         }
        }
      }
    }
  }
</style>
