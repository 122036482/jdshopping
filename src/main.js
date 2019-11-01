import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'
// 懒加载
import VueLazyload from 'vue-lazyload'

import 'assets/scss/index.scss'
import 'swiper/dist/css/swiper.css'

// fastclick.attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1, // 何时加载
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1 // 尝试加载几次
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
