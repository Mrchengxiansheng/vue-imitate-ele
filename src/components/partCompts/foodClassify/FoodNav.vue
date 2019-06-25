<template>
  <div class="food-nav">
    <ul class="food-nav-ul clearfix">
      <li class="food-nav-li" @click="showList('classification')">
        <span :class="{active:sortBy=='classification'}">分类</span>
        <span :class="{transactive:sortBy=='classification'}" class="mui-icon mui-icon-arrowdown"></span>
      </li>
      <li class="food-nav-li" @click="showList('sort')">
        <span :class="{active:sortBy=='sort'}">排序</span>
        <span :class="{transactive:sortBy=='sort'}" class="mui-icon mui-icon-arrowdown"></span>
      </li>
      <li class="food-nav-li" @click="showList('select')" >
        <span :class="{active:sortBy=='select'}">筛选</span>
        <span :class="{transactive:sortBy=='select'}" class="mui-icon mui-icon-arrowdown"></span>
      </li>
    </ul>
    <!-- 分类 -->
    <transition name="show-list">
      <div class="classification show-part" v-show="sortBy=='classification'">
        <div class="classification-left">
          <ul class="classification-left-ul">
            <li
              class="classification-left-li"
              :class="{
                classificationa_left_li_ctive: categoryDetailId == item.id
              }"
              v-for="(item, index) in resCategory"
              :key="index"
              @click="selectSubCategory(item.id, index)"
            >
              <img
                :src="getImgPath(item.image_url)"
                class="classification-left-img"
              />
              <span class="classification-left-span-first">{{
                item.name
              }}</span>
              <div class="classification-left-span-second">
                <span class="classification-left-count">{{ item.count }}</span>
                <span class="mui-icon mui-icon-arrowright"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="classification-right">
          <ul class="classification-right-ul">
            <li
              class="classification-right-li"
              v-for="(item, index) in categoryDetail"
              :key="index"
            >
              <span>{{ item.name }}</span>
              <span style="float:right">{{ item.count }}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 排序 -->
    <transition name="show-list">
      <div class="sort show-part" v-show="sortBy=='sort'">
        <ul class="sort-ul">
          <li
            class="sort-li"
            v-for="(item, index) in sortPartData"
            :key="index"
          >
            <span :class="item.icont" :style="item.icontColor"></span>
            <p class="sort-p">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 筛选 -->
    <transition name="show-list">
      <div class="select show-part" v-show="sortBy=='select'">
        <div class="select-one ">
          配送方式
        </div>
        <div class="select-two">
          <ul class="clearfix">
            <li v-for="(item, index) in deliveryMethod" :key="index">
              <span
                class="iconfont icon-fengniao"
                :style="'color:#' + item.color"
              ></span>
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
        <div class="select-three">
          <p>商家属性(可多选)</p>
          <ul class="clearfix">
            <li v-for="(item, index) in restaurantsActivity" :key="index">
              <span
                :style="
                  'margin-right:5px;' +
                    'color:#' +
                    item.icon_color +
                    ';' +
                    'border:1px solid #' +
                    item.icon_color
                "
                >{{ item.icon_name }}</span
              >
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="select-four">
          <button
            type="button"
            class="mui-btn"
            style="margin-right:10%;width:40%;"
          >
            清空
          </button>
          <button class="mui-btn mui-btn-success" style="color:#fff;width:40%;">
            确定
          </button>
        </div>
      </div>
    </transition>
    <transition name="show-cover">
      <div class="show-cover" v-show="sortBy"></div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { getImgPath } from "../../../assets/myJs/getImageUrl";
export default {
  data() {
    return {
      baseImgUrl: "https://fuss10.elemecdn.com/",
      resCategory: [],
      categoryDetail: [],
      categoryDetailId: 0,
      sortBy:'',
      activeClass:'',
      sortPartData: [
        {
          icont: "iconfont icon-px-",
          name: "智能排序",
          icontColor: "color:rgb(59, 135, 200)"
        },
        {
          icont: "iconfont icon-location",
          name: "距离最近",
          icontColor: "color:rgb(42, 155, 211)"
        },
        {
          icont: "iconfont icon-fire-o",
          name: "销量最高",
          icontColor: "color:rgb(240, 115, 115)"
        },
        {
          icont: "iconfont icon-qian1",
          name: "起送最低",
          icontColor: "color:rgb(230, 182, 26)"
        },
        {
          icont: "iconfont icon-zhong",
          name: "配送最快",
          icontColor: "color:rgb(55, 199, 183)"
        },
        {
          icont: "iconfont icon-xingxing",
          name: "评分最高",
          icontColor: "color:rgb(235, 165, 59)"
        }
      ],
      deliveryMethod: [],
      restaurantsActivity: []
    };
  },
  created() {
    this.initData();
    axios({
      method: "get",
      url:
        "https://elm.cangdu.org/shopping/v2/restaurant/category?latitude=31.22967&longitude=121.4762"
    }).then(res => {
      this.resCategory = res.data;
      this.resCategory.forEach(item => {
        if (this.categoryDetailId === item.id) {
          this.categoryDetail = item.sub_categories;
        }
      });
    });
    axios({
      method: "get",
      url: "https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes"
    }).then(res => {
      this.deliveryMethod = res.data;
    });
    axios({
      method: "get",
      url: "https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes"
    }).then(res => {
      this.restaurantsActivity = res.data;
    });
  },

  methods: {
    initData() {
      this.categoryDetailId = this.$route.query.id;
    },
    showList(type) {
      if(this.sortBy!==type){
        this.sortBy=type;
      }else{
        this.sortBy='';
      }
    },
    getImgPath,
    selectSubCategory(id, index) {
      this.categoryDetailId = id;
      this.categoryDetail = this.resCategory[index].sub_categories.slice(1);
    }
  }
};
</script>


<style lang='less' scoped>
span {
  font-size: 14px;
  color: #777;
}
.icont {
  font-size: 14px;
}
.show-list-enter-active, .show-list-leave-active{
  transition: all 0.5s;
  opacity: 1;
  transform: translateY(0px);
}
.show-list-enter, .show-list-leave-to{
  opacity: 0;
  transform: translateY(-100%);
}

.food-nav {
  margin-top: 32px;
  background-color: #fff;
  position: relative;
  .classification,.sort,.select{
    width: 100%;
    background-color: #fff;
  }
   .show-part{
    position: absolute;
    top:31px;
    left:0;
    z-index: 999;
  }
  .food-nav-ul {
    border-bottom: 1px solid #f1f1f1;
    .food-nav-li {
      float: left;
      width: 33.33%;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      color: #555;
      .mui-icon {
        font-size: 14px;
        transition: all 0.5s;
      }
      .active{
        color:#3190e8;
      }
      .transactive{
        color: #3190e8;
        
        transform: rotate(180deg);
      }
    }
  }
  .classification-left {
    float: left;
    width: 50%;
    height: 360px;
    overflow-y: scroll;
    background-color: #f1f1f1;
    .classification-left-li {
      height: 40px;
      line-height: 30px;
      font-size: 14px;
      color: #777;
      padding: 5px;
      .classification-left-span-first {
        margin-left: 5px;
      }
      .classification-left-span-second {
        float: right;
        .mui-icon-arrowright {
          font-size: 16px;
        }
        .classification-left-count {
          background-color: #ccc;
          border-radius: 50%;
          color: #fff;
        }
      }
      .classification-left-img {
        width: 18px;
        height: 18px;
        margin-left: 10px;
      }
    }
    .classificationa_left_li_ctive {
      background: #fff;
    }
  }
  .classification-right {
    width: 50%;
    float: right;
    height: 360px;
    overflow-y: scroll;

    .classification-right-li {
      height: 40px;
      line-height: 30px;
      font-size: 14px;
      color: #777;
      padding: 5px 10px;
    }
  }
  .sort {
    .sort-li {
      height: 40px;
      line-height: 40px;
      display: flex;
      .iconfont {
        margin: 0 10px 0 15px;
      }
      .sort-p {
        flex-grow: 1;
        font-size: 14px;
        margin: 0;
        color: #777;
        border-bottom: 1px solid #e4e4e4;
      }
    }
  }
  .select {
    padding-left: 15px;
    .select-one {
      font-size: 14px;
      color: #777;
      height: 30px;
      line-height: 30px;
    }
    .select-two {
      li {
        float: left;
        height: 30px;
        line-height: 30px;
        border: 1px solid #e4e4e4;
        border-radius: 10px;
        padding: 0 10px;
      }
    }
    .select-three {
      margin: 10px 0;
      p {
        margin-bottom: 5px;
      }
      li {
        float: left;
        padding: 0 10px;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 10px;
        height: 30px;
        line-height: 30px;
      }
    }
    .select-four{
      margin-bottom: 10px;
    }
  }
  .show-cover-enter-active,.show-cover-leave-active{
    transition: all 0.5s;
  }
  .show-cover-enter,.show-cover-leave-to{
    opacity: 0;
  }
  .show-cover{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.2);
  }
}
</style>
