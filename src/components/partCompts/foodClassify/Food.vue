<template>
  <div class="food-page">
    <EachHeader>{{ $route.query.title }}</EachHeader>
    <FoodNav></FoodNav>
    <Merchant></Merchant>
  </div>
</template>

<script>
import EachHeader from "../../common/EachHeader";
import Merchant from "../../common/Merchant";
import FoodNav from "./FoodNav"
export default {
  data() {
    return {
      foodName: "",
      foodId: []
    };
  },
  components: {
    EachHeader,
    Merchant,
    FoodNav
  }
};
</script>

<style lang='less' scoped>

</style>