<template>
    <div class="home-merchant-show">
      <ul class="merchant-ul">
        <li class="merchant-li clearfix" v-for="(item, index) in shopData" :key="index">
          <router-link :to="{path:`/shop/${item.id}`}">
            <div class="show-left">
              <img :src="imgBaseUrl + item.image_path" alt="" />
            </div>
            <div class="show-right">
              <div class="show-right-header">
                <span class="shop-name">{{ item.name }}</span>
              </div>
              <div class="show-right-mid clearfix">
                <div class="show-right-mid-left">
                  <span class="mui-icon iconfont icon-xingxing"></span>
                  <span class="score">{{ item.rating }}</span>
                  <span class="count">月售{{ item.recent_order_num }}单</span>
                </div>
                <div class="show-right-mid-right">
                  <span class="span-left">准时达</span>
                  <span class="span-right">蜂鸟专送</span>
                </div>
              </div>
              <div class="show-right-footer clearfix">
                <div class="show-right-footer-left">
                  <span
                    >起送￥{{ item.float_minimum_order_amount }}&nbsp;&nbsp;{{
                      item.piecewise_agent_fee.tips
                    }}</span
                  >
                </div>
                <div class="show-right-footer-right">
                  <span>{{ item.distance }}&nbsp;&nbsp;</span>
                  <span>{{ item.order_lead_time }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      imgBaseUrl: "//elm.cangdu.org/img/",
      shopData: []
    };
  },
  created() {
    axios({
      method: "get",
      url:
        "https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762"
    }).then(res => {
      this.shopData = res.data;
    });
  }
};
</script>
<style lang='less' scoped>
.home-merchant-show {
  background-color: #fff;
    .merchant-ul{
      list-style: none;
      margin: 0;
      padding: 0;
      .merchant-li{
        padding: 0.7rem 0.5rem;
        border-bottom: 0.1rem solid #ccd;
        .show-left {
          margin-right: 0.4rem;
          float: left;
          img {
            width: 4rem;
            height: 4rem;
          }
        }
        .show-right {
          float: right;  
          max-width: 230px;
          color: #666;
          .show-right-header {
            .shop-name {
              font-size: 14px;
              font-weight: bold;
            }
          }
          .show-right-mid {
            .show-right-mid-left {
              float: left;
              .icon-xingxing {
                font-size: 16px;
                color: orange;
              }
              .score {
                color: orange;
              }
              .score,
              .count {
                font-size: 12px;
                margin-left: 5px;
              }
            }
            .show-right-mid-right {
              float: right;
              .span-left,
              .span-right {
                font-size: 12px;
                border: 1px solid #3190e8;
                border-radius: 3px;
              }
              .span-left {
                color: #3190e8;
              }
              .span-right {
                background-color: #3190e8;
                color: #fff;
              }
            }
          }
          .show-right-footer {
            .show-right-footer-left,
            .show-right-footer-right {
              font-size: 12px;
            }
            .show-right-footer-left {
              float: left;
            }
            .show-right-footer-right {
              float: right;
            }
          }
        }
      }
    }
  }
</style>
