<template>
  <div class="home-merchant">
    <div class="home-merchant-header">
      <span class="mui-icon iconfont icon-fujinshangjia"></span>
      <span>附近商家</span>
    </div>
    <Merchant></Merchant>
  </div>
</template>
<script>
import Merchant from '../common/Merchant'
export default {
  components:{
    Merchant
  }
}
</script>


<style lang='less' scoped>
.home-merchant {
  margin-top: 10px;
  background-color: #fff;

  .home-merchant-header {
    line-height: 2rem;
    height: 2rem;
    span {
      font-size: 16px;
      margin-left: 5px;
    }
  }
  
}
</style>
