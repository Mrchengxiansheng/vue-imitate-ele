<template>
  <div>
    <EachHeader>搜索</EachHeader>
    <div class="search-input">
      <input placeholder="请输入商家或美食名称" />
      <button type="button" class="mui-btn mui-btn-primary">
        搜索
      </button>
    </div>
    <div class="search-list">
        <span class="search-list-header">搜索发现</span>
        <ul class="clearfix">
            <li class="search-list-one" v-for="(item,index) in searchList" :key="index">
                {{item.name}}
            </li>
        </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./partCompts/Footer";
import EachHeader from "./common/EachHeader"
export default {
    data(){
        return{
            searchList:[{name:'小龙虾'},{name:'一点点'},{name:'肯德基'},{name:'奶茶'},{name:'麻辣烫'},{name:'鲜花'}]
        }
    },
  components: {
    Footer,
    EachHeader
  }
};
</script>

<style lang="less" scoped>
div {
  background-color: #f5f5f5;
  .search-input {
    margin-top: 40px;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    input {
      padding: 0 5px;
      margin-left: 10px;
      border-radius: 10px;
      width: 70%;
      height: 30px;
      line-height: 30px;
      font-size:14px;
      background-color: #eee;
    }
    .mui-btn-primary{
        border-radius: 20px;
        margin-left:15px; 
       margin-top:3px;
  }
  }
  .search-list{
      margin-top:5px;
      background-color: #fff; 
      .search-list-header{
          display:inline-block;
          margin:10px 10px;
          font-size: 14px;
          font-weight: 500;
      }
      .search-list-one{
          float: left;
          font-size: 14px;
          height: 30px;
          padding: 0 10px;
          line-height: 30px;
          background-color: #eee;
          border-radius: 15px;
          margin:5px 10px;
      }
  }
}
</style>