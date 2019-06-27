<template>
  <div>
    <EachHeader>密码登录</EachHeader>
    <form class="login-content">
      <ul>
        <li>
          <input type="text" nama="accountnumber" placeholder="账号" v-model.lazy="userAccount">
        </li>
        <li>
          <input class="mui-input-clear" type="password" name="password" placeholder="密码" v-model="passWord">
        </li>
        <li>
          <input
            type="text"
            name="verificationcode"
            maxlength="4"
            placeholder="验证码"
            v-model="codeNumber"
          >
        </li>
      </ul>
      <div class="login-code">
        <img 
          class="login-code-img"
          :src="captchaCodeImg"
        />
        <div @click="getCaptchaCode">
          <p>看不清</p>
          <p class="see">换一张</p>
        </div>
      </div>
    </form>
    <div>
      <p class="prompt">温馨提示：未注册过的账号，登录时将自动注册</p>
      <p class="prompt">注册过的用户可凭账号密码登录</p>
    </div>
    <div class="button">
      <button type="button" class="mui-btn mui-btn-success" @click="mobileLogin">登录</button>
    </div>
    <div class="login-forget">
      忘记密码？
    </div>
    <div v-if="showAlert" class="alert">
      <p>{{alertText}}</p>
      <button @click="closeAlert">确定</button>
    </div>
    <transition name="alert-cover">
      <div v-if="showAlert" class="alert-cover"></div>
    </transition>
  </div>
</template>

<script>
import EachHeader from "../common/EachHeader";
import {mapMutations} from "vuex"
import axios from "axios";
axios.defaults.withCredentials = true; //保证能登录成功 不知道为什么。。。
export default {
  data() {
    return {
      captchaCodeImg:null,
      userAccount:null,
      passWord:null,
      codeNumber:null,
      showAlert:false,
      userInfo:null,
      alertText:null,
    };
  },
  components: {
    EachHeader
  },
  created(){
    this.getCaptchaCode();
  },
  methods:{
    ...mapMutations([
      "RECORD_USERINFO",
    ]),
    async getCaptchaCode(){
      await axios({
        method:"post",
        url:"https://elm.cangdu.org/v1/captchas",
        data:{
        }
      }).then(res=>{
        this.captchaCodeImg=res.data.code;
      });
    },
    async mobileLogin(){
      if(!this.userAccount){
        this.showAlert=true;
        this.alertText='请输入手机号/邮箱/用户名';
        return
      }else if(!this.passWord){
        this.showAlert=true;
        this.alertText='请输入密码';
        return
      }else if(!this.codeNumber){
        this.showAlert=true;
        this.alertText='请输入验证码';
        return
      }
      await axios({
        method:"post",
        url:"https://elm.cangdu.org/v2/login",
        data:{
          username:this.userAccount,
          password:this.passWord,
          captcha_code:this.codeNumber
        }
      }).then(res=>{
        this.userInfo=res.data;
      });
      // 若返回的值不正确（代表错误），弹出提示框 否则返回上一页
      if(!this.userInfo.user_id){
        this.showAlert=true;
        this.alertText=this.userInfo.message;
        this.getCaptchaCode();//重新获取验证码
      }else{
        this.RECORD_USERINFO(this.userInfo);//vuex 记录用户名
        this.$router.go(-1);
      }
    },
    closeAlert(){
      this.showAlert=!this.showAlert;
    }
  },
};
</script>

<style lang="less" scoped>
.login-content {
  margin-top: 42px;
  background-color: #fff;
  position: relative;
  li {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    input {
      border: none;
      padding: 0 5px;
      margin: 0;
      outline-style: none;
      font-size: 14px;
    }
  }
  .login-code {
    position: absolute;
    bottom: 0;
    right: 10px;
    .login-code-img {
      width: 70px;
      height: 30px;
      float: left;
      margin-top: 5px;
    }
    div {
      float: right;
      margin-left: 5px;
      p {
        text-align: center;
        font-size: 12px;
        margin: 0;
      }
      .see{
          color: #008de1;
      }
    }
  }
}
.prompt {
  color: red;
  margin-top: 10px;
  padding: 0 10px;
  font-size: 12px;
}
.button {
  text-align: center;
  .mui-btn-success {
    width: 90%;
  }
}
.login-forget {
  margin-top: 10px;
  color: blue;
  padding-right: 20px;
  float: right;
  font-size: 12px;
}
.alert{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 333;
  width: 70%;
  border-radius: 10px;
  background-color: #fff;
  p{
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    color: #FF5151;
  }
  button{
    margin-left:50%;
    margin-bottom:10px;
    transform: translateX(-50%);
    padding: 5px 30px;
    background-color: #00DB00;
    color: #fff;
    border-radius: 5px;
  }
}
.alert-cover {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.alert-cover-enter-active,
.alert-cover-leave-active {
  transition: all 0.5s;
  opacity: 1;
}
.alert-cover-enter,
.alert-cover-leave-to {
  opacity: 0;
}
</style>



