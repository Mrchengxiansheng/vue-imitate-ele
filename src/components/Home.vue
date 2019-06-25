<template>
  <div>
    <div class="home-header">
      <router-link to="/search">
        <span class="left iconfont icon-soushuo">
        </span>
      </router-link>

      <span class="mind">
        杭州电子科技大学第一教学楼
      </span>
      <span class="right">
        <router-link class="login" to="/login">登录</router-link>
        <span>|</span>
        <router-link class="login" to="/login">注册</router-link>
      </span>
    </div>
    <HomeGrid></HomeGrid>
    <HomeMerchant></HomeMerchant>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './partCompts/Footer'
import HomeGrid from './partCompts/HomeGrid'
import HomeMerchant from './partCompts/HomeMerchant'
export default {
  components:{
    Footer,
    HomeGrid,
    HomeMerchant
  }
};
</script>

<style lang="less" scoped>
div {
  background-color: #F5F5F5;
  .home-header {
    height: 2rem;
    background-color: #008de1;
    width: 100%;
    position: fixed;
    top: 0;
    .mind {
      display: inline-block;
      padding: 0 0.5rem;
      width: 50%;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      color: white;
      font-size: 0.7rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .left,
    .right {
      display: inline-block;
      width: 20%;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      color: white;
      font-size: 0.7rem;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
      color: #ccc;
      .login {
        color: white;
        font-size: 0.7rem;
      }
    }
  }
  
}
</style>

