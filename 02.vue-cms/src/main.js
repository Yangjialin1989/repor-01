//入口文件
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由模块
Vue.use(VueRouter)

//2.1 导入 vue-resource 
import VueResource from 'vue-resource'
//2.2 安装vue-resource
Vue.use(VueResource)


//导入MUI的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'



//按需导入Mint-UI组件
import { Header,Swipe,SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)

//1.3 导入自己的router.js 路由模块
import router from './router.js'

/*2019-08-15 axios 注册组件，注册完各个组件可以使用
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)*/


//导入App根组件
import app from './App.vue'

var vm = new Vue({
	el:'#app',
	render:c=>c(app),
	//1.4挂载路由到VM实例上
	router
})

























