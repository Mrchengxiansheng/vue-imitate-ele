<template>
  <div class="info-page">
    <EachHeader>账户信息</EachHeader>
    <div class="main">
      <div class="top">
        <ul>
          <li class="img-li clearfix">
            <input type="file" class="file-upload" />
            <span class="left">头像</span>
            <div class="right">
              <img class="top-img" :src="avatar" alt="" />
              <span class="iconfont icon-zuoyoujiantou"></span>
            </div>
          </li>
          <li>
            <span class="left">用户名</span>
            <span class="right">{{ username }}</span>
          </li>
          <li>
            <span class="left">收货地址</span>
            <span class=" right iconfont icon-zuoyoujiantou"></span>
          </li>
          <li class="special-li">
              <span>账号绑定</span>
          </li>
          <li>
              <span class="iconfont icon-shouji"></span>
              <span>手机</span>
              <span class=" right iconfont icon-zuoyoujiantou"></span>
          </li>
           <li class="special-li">
              <span>安全设置</span>
          </li>
          <li>
              <span class="left">密码登入</span>
              <span class="right iconfont icon-zuoyoujiantou"></span>
              <span class="right">修改</span>
          </li>
        </ul>
      </div>
      <div class="footer">
          <p>退出登入</p>
      </div>
    </div>
  </div>
</template>
<script>
import EachHeader from "../../common/EachHeader";
import { mapState } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  props: ["mobile", "avatar", "username"],
  components: {
    EachHeader
  },
  created() {
    //   this.initData();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    initData() {
      this.avatar = this.userInfo.avatar;
      this.user_id = this.userInfo.user_id;
      this.username = this.userInfo.username;
      this.mobile = this.userInfo.mobile || "暂无绑定手机号";
    }
  }
};
</script>
<style lang='less' scoped>
li {
  height: 40px;
  padding: 5px 10px;
  line-height: 30px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
span {
  color: #333;
  font-size: 12px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.iconfont {
  font-size: 12px;
  font-weight: bold;
}
.info-page {
  // 四个方向全定就能定大小 去是 0 则撑满
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 111;

  .main {
    margin-top: 32px;
    .top {
      .img-li {
        height: 60px;
        line-height: 50px;
        .file-upload {
          position: absolute;
          opacity: 0;
          top: 32px;
          left: 0;
          width: 100%;
          height: 60px;
        }
        .top-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .special-li{
          background-color: #f2f2f2;
      }
      .icon-shouji{
          color:#2894FF;
      }
    }
  }
  .footer p{
      margin-top: 10px;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #FF5151;
      color: #fff;
      
  }
}
</style>

