<template>
    <div>
        <EachHeader>订单中心</EachHeader>

        <Footer></Footer>
        <div v-if="isLogin">
            
        </div>
        <div v-else class="no-login">
            <img src="../assets/img/260.jpg">
            <p>登录后查看外卖订单</p>
            <button class="login-btn">立即登录</button>
        </div>
    </div>
</template>
<script>
import Footer from './partCompts/Footer'
import EachHeader from "./common/EachHeader";
export default {
    data(){
        return{
            isLogin:false,
        }
    },
    components:{
        Footer,
        EachHeader
    }
}
</script>


<style lang='less' scoped>
.no-login{
    margin-top: 200px;
    text-align: center;
    img{
        width: 160px;
        height: 90px;
    }
    p{
        margin-top: 10px;
        color: #000;
    }
    .login-btn{
        background-color: #00DB00;
        color: #fff;
    }
}
</style>
