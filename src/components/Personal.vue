<template>
  <div>
    <EachHeader>个人中心</EachHeader>
    <div class="personal-top">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media">
          <a href="javascript:;">
            <img
              class="mui-media-object mui-pull-left"
              src="../assets/img/elmlogo.jpeg"
            />
            <div class="mui-media-body">
              登录 / 注册
              <p class="mui-ellipsis">
                <span class="iconfont icon-shouji"></span>暂无绑定手机号
              </p>
              <span class="iconfont icon-zuoyoujiantou"></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="personal-mid">
      <ul class="clearfix">
        <li>
          <span><b class="span-big">0.00</b>元</span>
          <span>我的余额</span>
        </li>
        <li>
          <span><b class="span-big">0</b>个</span><span>我的优惠</span>
        </li>
        <li>
          <span><b class="span-big">0</b>分</span><span>我的积分</span>
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
  </div>
</template>

<script>
import Footer from "./partCompts/Footer";
import EachHeader from "./common/EachHeader";
export default {
  components: {
    Footer,
    EachHeader
  }
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
</style>