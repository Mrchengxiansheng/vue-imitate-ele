<template>
  <div class="cart">
    <div class="cart-left">
      <div class="cart-left-cart">
        <span
          class="midCircle"
          :class="{ active: totalNum }"
          @click="showCartDetail"
        >
          <span class="iconfont icon-cart"></span>
        </span>
        <span class="smallCircle" v-if="totalNum">{{ totalNum }}</span>
      </div>
      <div class="cart-price">
        <p style="fontSize:16px;">￥{{ totalPrice }}</p>
        <p style="fontSize:12px;">配送费￥{{ deliveryFee }}</p>
      </div>
    </div>
    <div class="cart-right">
      <span v-if="orderAmount == minimumOrderAmount"
        >￥{{ orderAmount }}起送</span
      >
      <span v-if="minimumOrderAmount > 0">还差{{ minimumOrderAmount }}</span>
      <span class="goto-pay" v-if="minimumOrderAmount <= 0">去结算</span>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {};
  },
  props: [
    "deliveryFee",
    "minimumOrderAmount",
    "totalNum",
    "orderAmount",
    "totalPrice"
  ],
  methods: {
    showCartDetail() {
      this.$emit("showCartDetail");
    }
  }
};
</script>

<style lang='less' scoped>
p {
  margin: 0;
}
.cart {
  height: 40px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 10;
  .cart-left {
    width: 70%;
    float: left;
    background-color: #444;
    position: relative;
    .cart-left-cart {
      width: 50px;
      height: 50px;
      position: absolute;
      border-radius: 50%;
      background-color: #777;
      top: -15px;
      left: 20px;
      .midCircle {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #444;
        text-align: center;
        line-height: 40px;
        .icon-cart {
          font-size: 25px;
          color: #fff;
        }
      }
      .midCircle.active {
        background-color: #3190e8;
      }
      .smallCircle {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        right: 0;
        background-color: rgba(255, 0, 0, 0.8);
        color: #fff;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
      }
    }
    .cart-price {
      text-align: center;
      p {
        color: #fff;
        font-weight: bold;
        height: 20px;
        line-height: 20px;
      }
    }
  }
  .cart-right {
    width: 30%;
    float: left;
    text-align: center;

    span {
      display: inline-block;
      width: 100%;
      font-size: 14px;
      background-color: #aaa;
      height: 40px;
      line-height: 40px;
      color: #fff;
    }
    .goto-pay {
      background-color: #4cd964;
    }
  }
}
</style>

