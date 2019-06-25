import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/myCss/base.less'

// 引入字体只要css 
import './assets/icons/iconfont.css'

//引入mui样式
import './assets/dist/css/mui.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
