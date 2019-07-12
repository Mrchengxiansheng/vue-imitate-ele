<template>
  <div>
    <EachHeader>{{title}}</EachHeader>
    <div class="personal-top">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media">
            <img
              class="mui-media-object mui-pull-left"
              :src="avatar"
            />
            <div class="mui-media-body">
              <router-link class="login" v-if="userInfo&&userInfo.user_id" :to="{path:`/personal/${user_id}/info`}">{{username}}</router-link>
              <router-link class="login" v-else  to='/login' >{{username}}</router-link>
              <p class="mui-ellipsis">
                <span class="iconfont icon-shouji"></span>{{mobile}}
              </p>
              <span class="iconfont icon-zuoyoujiantou" @click="goToDetails"></span>
            </div>
        </li>
      </ul>
    </div>
    <div class="personal-mid">
      <ul class="clearfix">
        <li>
          <span><b class="span-big">{{balance.toFixed(2)}}</b>元</span>
          <span>我的余额</span>
        </li>
        <li>
          <span><b class="span-big" style="color:#FF2D2D">{{count}}</b>个</span><span>我的优惠</span>
        </li>
        <li>
          <span><b class="span-big" style="color:#00DB00">{{pointNumber}}</b>分</span><span>我的积分</span>
        </li>
      </ul>
    </div>
    <div class="personal-bottom">
      <ul>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="iconfont icon-icon--copy" style="color:rgb(102, 102, 102)"></span>
            我的订单
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="iconfont icon-jifenshangcheng" style="color:red"></span>
            积分商城
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="iconfont icon-huiyuan" style="color:rgb(255, 198, 54)"></span>
            饿了么会员
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="iconfont icon-fuwuzhongxin" style="color:rgb(60, 171, 255)"></span>
            服务中心
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="iconfont icon-shouji" style="color:skyblue"></span>
            下载饿了么APP
          </a>
        </li>
      </ul>
    </div>
    <Footer></Footer>
    <transition name="fade" mode="in-out">
      <router-view :mobile='mobile' :avatar='avatar' :username='username'></router-view>
    </transition>
  </div>
</template>

<script>
import Footer from "./partCompts/Footer";
import EachHeader from "./common/EachHeader";
import {mapState,mapActions} from "vuex"
export default {
  data(){
    return{
            title:"个人中心",
            username: '登录/注册',           //用户名
            mobile: '暂无绑定手机号',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: require('../assets/img/elmlogo.jpeg'),             //头像地址
            imgBaseUrl: "https://elm.cangdu.org/img/", //图片路径
            user_id:null,
    }
  },
  components: {
    Footer,
    EachHeader
  },
  computed:{
    ...mapState([
      'userInfo',
    ]),
  },
  watch:{
    userInfo:function(){
      this.initData();
    }
  },
  created(){
    this.initData();
    this.getUserInfo();
  },
  mounted(){
    
  },
  methods:{
    ...mapActions([
      'getUserInfo'
    ]),
    initData(){
      if (this.userInfo && this.userInfo.user_id) {
        if(this.userInfo.avatar){
          this.avatar = this.imgBaseUrl+this.userInfo.avatar;
        }
         this.title=this.userInfo.username
         this.user_id=this.userInfo.user_id;
         this.username = this.userInfo.username;
         this.mobile = this.userInfo.mobile || '暂无绑定手机号';
         this.balance = this.userInfo.balance;
         this.count = this.userInfo.gift_amount;
         this.pointNumber = this.userInfo.point;
      }else{
          this.username = '登录/注册';
          this.mobile = '暂无绑定手机号';
      }
    },
    goToDetails(){
      this.$router.push({path:`/personal/${this.user_id}/info`});
    }
  },
};
</script>

<style lang='less' scoped>
.personal-top {
  margin-top: 32px;
  ul {
    background-color: #008de1;
    .mui-media {
      padding: 15px 15px;
    }
    .mui-pull-left {
      border-radius: 50%;
    }
    .mui-media-body {
      color: #fff;
      position: relative;
      .login{
        color:#fff;
        font-size: 14px;
      }
      .mui-ellipsis {
        margin-top: 5px;
        color: #fff;
      }
      .icon-zuoyoujiantou {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
  .mui-table-view:before {
    background-color: #008de1;
  }
}
.personal-mid {
  ul {
    background-color: #fff;
    li {
      float: left;
      width: 33.33%;
      border-right: 1px solid #f1f1f1;
      text-align: center;
      span {
        display: block;
        font-size: 12px;
        padding-bottom: 5px;
      }
      span:first-child {
        padding: 15px 0 5px 0;
      }
      .span-big {
        font-size: 24px;
        margin-right: 4px;
        color: orange;
      }
    }
    li:last-child {
      border: none;
    }
  }
}
.personal-bottom{
    margin-top:10px;  
    background-color: #fff;
    .mui-navigate-right{
        font-size: 14px;
    }
    .mui-table-view-cell:after{
      left:35px;
    }
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.4s;
}
.fade-enter,.fade-leave-to{
  transform: translateX(-100%);
  opacity: 0;
}
</style>