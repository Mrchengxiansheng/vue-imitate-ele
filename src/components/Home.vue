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
      <span class="right" v-if="!isLogin">
        <router-link class="login" to="/login">登录</router-link>
        <span>|</span>
        <router-link class="login" to="/login">注册</router-link>
      </span>
      <span class="right" v-else>
        <router-link class="loginSuccess" :to="{path:`/personal/${userId}`}">
          <img :src="imgBaseUrl+img">
        </router-link>
      </span>
    </div>
    <HomeGrid></HomeGrid>
    <HomeMerchant></HomeMerchant>
    <Footer :userId='userId'></Footer>
  </div>
</template>

<script>
import Footer from './partCompts/Footer'
import HomeGrid from './partCompts/HomeGrid'
import HomeMerchant from './partCompts/HomeMerchant'
import {mapActions,mapState} from 'vuex'
export default {
  data(){
    return {
      isLogin:false,
      imgBaseUrl: "https://elm.cangdu.org/img/", //图片路径
      img:null,
      userId:null,
    }
  },
  components:{
    Footer,
    HomeGrid,
    HomeMerchant
  },
  watch:{
    userInfo:function(){
      this.isLogin=true;
      this.img=this.userInfo.avatar;
      this.userId=this.userInfo.user_id;
    }
  },
  computed:{
    ...mapState([
      'userInfo',
    ])
  },
  created(){
    this.getUserInfo();
    
  },
  methods:{
    ...mapActions([
      'getUserInfo'
    ])
  },
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
      .login,.loginSuccess {
        color: white;
        font-size: 0.7rem;
      }
      .loginSuccess img{
        width: 16px;
        height: 16px;
        border-radius:50%;
      }
    }
  }
  
}
</style>

