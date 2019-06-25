<template>
  <div id="Gallery" class="mui-slider" style="margin-top:32px;">
    <div class="mui-slider-group">
      <div class="mui-slider-item">
        <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li
            class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
            v-for="(item, index) in homeGridData1"
            :key="index"
          >
            <router-link
              :to="{
                path: 'food',
                query: { title: item.title, id: getCategoryId(item.link) }
              }"
            >
              <img :src="urlBefore + item.image_url" />
              <div class="mui-media-body">{{ item.title }}</div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mui-slider-item">
        <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li
            class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
            v-for="(item, index) in homeGridData2"
            :key="index"
          >
            <router-link to="/search">
              <img :src="urlBefore + item.image_url" />
              <div class="mui-media-body">{{ item.title }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="mui-slider-indicator">
      <div class="mui-indicator "></div>
      <div class="mui-indicator mui-active"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      urlBefore: "https://fuss10.elemecdn.com",
      homeGridData1: [],
      homeGridData2: []
    };
  },
  created() {
    axios({
      method: "get",
      url: "https://elm.cangdu.org/v2/index_entry"
    }).then(res => {
      this.homeGridData1 = res.data.slice(0, res.data.length / 2);
      this.homeGridData2 = res.data.slice(res.data.length / 2);
    });
  },
  methods: {
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang='less' scoped>
.mui-slider-item {
  margin-top: 2rem;
  .mui-grid-view.mui-grid-9 {
    border: none;
    background-color: #fff;
    .mui-table-view-cell {
      border: none;
    }
  }
  .mui-col-xs-4 {
    width: 25%;
  }
}

.mui-table-view.mui-grid-view .mui-table-view-cell {
  .mui-media-body {
    font-size: 12px;
    line-height: 12px;
  }
  img {
    width: 32px;
    height: 32px;
  }
}
.mui-slider-item {
  margin-top: 0;
}
</style>