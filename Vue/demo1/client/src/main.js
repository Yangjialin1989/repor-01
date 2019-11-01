// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import '@/assets/css/app.css'
import VueLazyLoad from 'vue-lazyload'

import infiniteScroll from 'vue-infinite-scroll'






//挂载到Vue
Vue.use(infiniteScroll)



Vue.use(VueLazyLoad,{
  loading:'/static/img/ok-2.png'
})
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
