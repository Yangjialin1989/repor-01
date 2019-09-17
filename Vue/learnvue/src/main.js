// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'         //从node_modules文件夹查找
import App from './App'       //从上一级目录下查找
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import router from './router' //
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h => h(App),
  router,
  components: { App },//这里的App代表上面的 import App from './App'中的App，使用大括号，表示是变量
  template: '<App/>'  //使用标签，相当于调用
})
