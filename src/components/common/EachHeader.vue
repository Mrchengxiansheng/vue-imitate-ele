<template>
  <div class="each-header">
    <span class="mui-icon iconfont icon-left" @click="goBack"></span>
    <span class="each-header-mid"><slot></slot></span>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      if (window.history.length) {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang='less' scoped>
.each-header {
  height: 2rem;
  background-color: #008de1;
  width: 100%;
  position: fixed;
  top: 0;
  line-height: 2rem;
  text-align: center;
  color: #fff;
  .icon-left {
    font-size: 18px;
    position: absolute;
    top: 8px;
    left: 10px;
    color: #fff;
  }
}
</style>
