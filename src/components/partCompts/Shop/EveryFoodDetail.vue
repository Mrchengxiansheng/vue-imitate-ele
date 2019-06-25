<template>
  <div>
    <EachHeader>{{foodName}}</EachHeader>
    <div class="food-details">
        <img :src="imgBaseUrl+thisFood.image_path" alt="">
        <div style="padding:10px;">{{thisFood.description}}</div>
        <div class="food-details-description">
            <p>{{name}}</p>
            <p>
                <span>评分</span>
                <span class="iconfont icon-xingxing"></span>
                <span class="iconfont icon-xingxing"></span>
                <span class="iconfont icon-xingxing"></span>
                <span class="iconfont icon-xingxing"></span>
                <span class="iconfont icon-xingxing"></span>
                <span class="rating">{{thisFood.rating.toFixed(1)}}</span>
            </p>
            <p>
                <span class="month_sales">月售 {{thisFood.month_sales}}</span>
                <span class="price">售价￥{{thisFood.specfoods[0].price}}&nbsp;<span v-if="thisFood.specfoods.length">起</span></span>
                
            </p>
            <p>
                <span class="rating_count">评论数 {{thisFood.rating_count}}</span>
                <span>好评率 {{thisFood.satisfy_rate}}%</span>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EachHeader from '../../common/EachHeader'
export default {
    data(){
        return{
            category_id:null,
            current_food:null,
            menuList:[],
            shopId:null,
            foodName:null,
            imgBaseUrl: "//elm.cangdu.org/img/", //图片路径
            thisFood:null,
        };
    },
    components:{
        EachHeader
    },
    created(){
        this.category_id=this.$route.query.category_i;
        this.current_food=this.$route.query.current_food;
        this.shopId=this.$route.query.shop_id;
        this.foodName=this.$route.query.foodName;
        axios({
       //请求商家 商品菜单
            method: "get",
            url: "https://elm.cangdu.org/shopping/v2/menu",
            params: {
              restaurant_id: this.shopId
            }
        }).then(res => {
          this.menuList = res.data;
          this.thisFood=this.menuList[this.category_id].foods[this.current_food];
        });
    }
}
</script>
<style lang='less' scoped>
.food-details{
    margin-top: 32px;
    img{
        width: 100%;
    }
    .food-details-description{
        padding: 0 10px;
        .iconfont,.rating{
            color:orange;
        }
        .month_sales,.price,.rating_count{
            margin-right: 5px;
        }
        .price{
            color:#ff0000;
        }
    }
}
</style>
