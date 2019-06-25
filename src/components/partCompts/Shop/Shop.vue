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
        <p v-if="shopDetails.activities.length" @click="showFade">
          <span :style="'backgroundColor:#' + shopDetails.activities[0].icon_color +';color:#fff;'">{{ shopDetails.activities[0].name }}</span>
          <span style="color:#000;">{{shopDetails.activities[0].description}}</span>
          <span >{{ activeLength }}个优惠<span class="mui-icon mui-icon-arrowright"></span></span>
        </p>
        <P> 公告：{{ shopDetails.promotion_info }} </P>
      </div>
    </div>
    <div class="shop-detail-info">
      <div class="shop-detail-nav" :class="{ active: shopDetailNav }">
        <ul class="clearfix">
          <li>
            <span :class="{ active: thisRouter == 'goodDetail' }" @click="spanClick('goodDetail')">商品</span>
          </li>
          <li>
            <span :class="{ active: thisRouter == 'evaluate' }" @click="spanClick('evaluate')">评价</span>
          </li>
          <li>
            <span :class="{ active: thisRouter == 'shopInfo' }" @click="spanClick('shopInfo')">商家</span>
          </li>
        </ul>
      </div>
      <router-view :shopDetails='shopDetails' :thisRouter='thisRouter'></router-view>
    </div>
   
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
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      shopId: null, //商铺id
      shopDetails: "", //商家详情
      imgBaseUrl: "//elm.cangdu.org/img/", //图片路径
      fadeValue: false, //隐藏的
      // isActiveSpan: "goods", //商品、评价、商家 导航条
      shopDetailInfo: [], //食品分类列表
      scrollTop: 0, //滚动出去的高度
      shopDetailNav: false, //导航栏固定
      menuActive: 0, //商品左边active
      shopListTop: [], //每个食品列表的高度
      shopDetailGoodsLeftHeight: 0, //左边导航栏的高度
      thisRouter:null,
    };
  },
  components: {
  },
  created() {
    this.intiData();
     this.thisRouter=this.$route.name;
  },
  mounted(){
   
  },
  computed: {
    activeLength: function() {
      var len = this.shopDetails.activities;
      if (len) {
        return this.shopDetails.activities.length;
      } else {
        return 0;
      }
    }, 
  },
  watch:{
  },
  methods: {
    async intiData() {
      this.shopId = this.$route.params.id;
      await axios({
        //请求商家的全部信息
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurant/" + this.shopId
      }).then(res => {
        this.shopDetails = res.data;
      });
      
    },
    getPath(){
      this.thisRouter=this.$route.name;
    },
    //初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList
 
    showFade() {
      //隐藏的优惠活动切换
      this.fadeValue=!this.fadeValue;
    },
    spanClick(type) {
      //商品 评价，商家切换
      if (type=='goodDetail') {
        this.$router.replace({path:'/shop/'+this.shopId});
        this.getPath();
      }else if(type=='evaluate'){
        this.$router.replace({path:'/shop/'+this.shopId+'/'+type});
        this.getPath();
      }else{
        this.$router.replace({path:'/shop/'+this.shopId+'/'+type});
        this.getPath();

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
      border-bottom: 1px solid #eee;
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
</style>
