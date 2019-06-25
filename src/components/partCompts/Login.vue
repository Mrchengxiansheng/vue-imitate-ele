<template>
  <div>
    <EachHeader>密码登录</EachHeader>
    <div class="login-content">
      <ul>
        <li>
          <input type="text" nama="accountnumber" placeholder="请输入账号" />
        </li>
        <li>
          <input class="mui-input-clear" type="password" name="password" placeholder="请输入密码" />
        </li>
        <li>
          <input
            type="text"
            name="verificationcode"
            maxlength="4"
            placeholder="请输入验证码"
          />
        </li>
      </ul>
      <div class="login-code">
        <img
          class="login-code-img"
          src="../../assets/img/elmlogo.jpeg"
          alt=""
        />
        <div>
          <p>看不清</p>
          <p class="see">换一张</p>
        </div>
      </div>
    </div>
    <div>
      <p class="prompt">温馨提示：未注册过的账号，登录时将自动注册</p>
      <p class="prompt">注册过的用户可凭账号密码登录</p>
    </div>
    <div class="button">
      <button type="button" class="mui-btn mui-btn-success">登录</button>
    </div>
    <div class="login-forget">
      忘记密码？
    </div>
  </div>
</template>

<script>
import EachHeader from "../common/EachHeader";
export default {
  data() {
    return {
    value:''
    };
  },
  components: {
    EachHeader
  }
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
</style>



