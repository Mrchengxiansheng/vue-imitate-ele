<template>
    <div>
        <div class="delivery-info">
            <p class="first-p">配送信息</p>
            <p>由蜂鸟快送提供配送，约{{order_lead_time}}分钟送达，距离{{distance}}km</p>
            <p>配送费&nbsp;&nbsp;￥{{shopDetails.float_delivery_fee}}</p>
        </div>
        <div class="shop-service">
            <p class="first-p">商家服务</p>
            <p>
                <span style="border:1px solid #ccc;margin-right:2px;padding:1px;">保</span>
                <span>该商户食品安全已由国泰产险承担，食品安全有保障</span>
            </p>
        </div>
        <div class="shop-real-scene">
            <p class="first-p">商家实景</p>
            <img src="../../../assets/img/224.jpg" alt="">
            <span class="first-span">门面(1张)</span>
            <img src="../../../assets/img/227.jpg" alt="">
            <span class="secend-span">大堂(1张)</span>
        </div>
        <div class="shop-info">
            <p class="first-p">商家信息</p>
            <ul>
                <li style="font-size:12px;color:#8f8f94">{{shopDetails.description}}</li>
                <li class="clearfix">
                    <span class="left-span">品类</span>
                    <span class="right-span">{{shopDetails.category}}</span>
                </li>
                <li class="clearfix">
                    <span class="left-span">商家电话</span>
                    <span class="right-span">{{shopDetails.phone}}</span>
                </li>
                <li class="clearfix">
                    <span class="left-span">地址</span>
                    <span class="right-span">{{shopDetails.address}}</span>
                </li>
                <li class="clearfix">
                    <span class="left-span">营业时间</span>
                    <span class="right-span">{{shopDetails.opening_hours[0]}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        };
    },
    props:['shopDetails'],
    computed:{
        order_lead_time:function(){
           return this.shopDetails.order_lead_time?this.shopDetails.order_lead_time:40
        },
        distance:function(){
           return  this.shopDetails.distance?this.shopDetails.distance:1
        }
    }
}
</script>
<style lang='less' scoped>
p{
    margin: 0;
}
.delivery-info,.shop-service,.shop-real-scene,.shop-info{
    margin:10px 0;
    padding: 0 10px;
    p{
       font-size: 12px; 
    }
    
    
}
.shop-real-scene{
    position: relative;
    img{
        width: 96px;
        height: 54px;
        margin-right:10px; 
    }
    .first-span,.secend-span{
        position: absolute;
        width: 96px;
        background-color: rgba(0, 0, 0, 0.3);
        font-size: 14px;
        text-align: center;
        left: 10px;
        bottom: 0;
    }
    .secend-span{
        left: 116px; 
    }
}
.shop-info{
    span{
        font-size: 12px;
    }
    li{
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
    }
    .left-span{
        float: left;
    }
    .right-span{
        float: right;
        color:#8f8f94
    }
}
.first-p{
        font-size: 16px;
        color: #000;
        margin-bottom: 5px;
    }
</style>

