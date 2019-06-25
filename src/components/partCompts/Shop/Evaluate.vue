<template>
  <transition>
    <div class="evaluate">
      <div class="evaluate-header">
        <p class="sum-sorce">
          {{ratingScoresData.overall_score.toFixed(1)}}
        </p>
        <p class="shop-sorce">
          <span>商家评分</span>
            <span class="iconfont icon-xingxing"></span>
            <span class="iconfont icon-xingxing"></span>
            <span class="iconfont icon-xingxing"></span>
            <span class="iconfont icon-xingxing"></span>
            <span class="iconfont icon-xingxing"></span>
        </p>
        <p class="shop-taste">
          <span>味道</span>
          <span style="font-size:16px;color:#000">{{ratingScoresData.food_score.toFixed(1)}}</span>
        </p>
        <p class="shop-package">
          <span>包装</span>
          <span style="font-size:16px;color:#000">{{ratingScoresData.service_score.toFixed(1)}}</span>
        </p>
        <p class="shop-delivery">
          <span>配送</span>
          <span style="font-size:16px;color:#000">{{ratingScoresData.service_score.toFixed(1)}}</span>
        </p>
      </div>
      <div class="evaluate-nav">
        <ul class="clearfix">
          <li v-for="(item,index) in ratingTagsList" :key="index" class="evaluate-nav-li" :class="{active:tagsActive==index}" @click='toggle(index,item.name)'>
            {{item.name}}({{item.count}})
          </li>
        </ul>
      </div>
      <div class="evaluate-detail">
        <ul>
          <li class="evaluate-detail-li" v-for="(item,index) in ratingList" :key="index">
              <img :src="getImgPath(item.avatar)">
              <div class="evaluate-detail-right">
                  <div class="username_star">
                      <p class="username">{{item.username}}</p>
                      <p class="star_desc">
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                      </p>
                      <span class="rated_at">{{item.rated_at}}</span>
                  </div>
                 <ul class="food_img_ul clearfix">
                     <li v-for="(item, index) in item.item_ratings" :key="index">
                         <img :src="getImgPath(item.image_hash)" v-if="item.image_hash">
                     </li>
                 </ul>
                 <ul class="food_name_ul">
                     <li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">
                         {{item.food_name}}
                     </li>
                 </ul>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import {getImgPath} from "../../../assets/myJs/getImageUrl"
export default {
  data() {
    return {
      ratingList: null, //评论列表
      ratingScoresData: null, //评价总体分数
      shopId:null,
      ratingTagsList:null,
      tagsActive:0,
      ratingOffset:0,
    };
  },
  components:{

  },
  created(){
    this.initEluData();
  },
  methods: {
    getImgPath,
    async initEluData() {
      this.shopId = this.$route.params.id;
      await axios({
        //请求评价分数
        method: "get",
        url:
          "https://elm.cangdu.org/ugc/v2/restaurants/" +
          this.shopId +
          "/ratings/scores"
      }).then(res => {
        this.ratingScoresData = res.data;
      });
      await axios({
        //请求评论数据
        method: "get",
        url:"https://elm.cangdu.org/ugc/v2/restaurants/"+this.shopId+'/ratings',
      }).then(res => {
        this.ratingList = res.data;
      });
      await axios({
        method:'get',
        url:'https://elm.cangdu.org/ugc/v2/restaurants/'+this.shopId+'/ratings/tags'
      }).then(res=>{
        this.ratingTagsList=res.data;
      });
    },
    async toggle(i,name){
      this.tagsActive=i;
      this.ratingOffset=0;
      await axios({
        //请求评论数据
        method: "get",
        url:"https://elm.cangdu.org/ugc/v2/restaurants/"+this.shopId+'/ratings',
        params:{
          offset:this.ratingOffset,
          tag_name:name,
        }
      }).then(res=>{
        this.ratingList=res.data;
      });
    }
  }
};
</script>

<style lang='less' scoped>
p{
  margin: 0;
}
.iconfont{
   font-size: 12px;
   color:orange;
}
.evaluate{
  .evaluate-header{
    display: flex;
    align-items: center;
    height: 50px;
    p{
      margin-left:15px;
      text-align: center;
    }
    .sum-sorce{
      font-size: 30px;
      color: rgba(255, 0, 0, 0.8);
    }
    .shop-sorce{
      font-size: 12px;
      
    }
  }
  .evaluate-nav{
    border-bottom: 1px solid #ccc;
    .evaluate-nav-li{
      float: left;
      font-size: 12px;
      color: #333;
      margin:2px 5px;
      background-color: #eee;
      padding: 2px 5px;
    }
    .evaluate-nav-li.active{
      background-color: #3190e8;
      color:#fff;
    }
  }
  .evaluate-detail{
    .evaluate-detail-li{
      display: flex;
      margin-bottom: 10px;
      padding: 5px;
      border-bottom: 1px solid #ccc;
      img{
        width: 20px;
        height: 20px;
        margin:5px;
      }
      .evaluate-detail-right{
        flex-grow: 1;
        .username_star{
          position: relative;
          .time_spent_desc{
            font-size: 12px;
            margin-left:5px;
          }
          .rated_at{
            position: absolute;
            right: 10px;
            font-size: 12px;
            bottom: 0;
          }
        }
        .food_img_ul{
          li{
            float: left;
            margin-right: 5px;
            img{
              width: 50px;
              height: 50px;
            }
          }
        }
        .food_name_ul{
          font-size: 14px;
        }
      }
    }
  }
}
</style>

