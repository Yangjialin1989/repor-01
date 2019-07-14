import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from    './components/tabbar/HomeContainer.vue'
import MemberContainer from  './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from  './components/tabbar/SearchContainer.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
		//3.1配置路由规则
		//3.1.1路由重定向到home
		{ path:'/', redirect:'/home'},
		//3.1.2路由通用配置
		{ path: '/home',component: HomeContainer},
		{ path: '/member',component: MemberContainer},
		{ path: '/shopcar',component: ShopcarContainer},
		{ path: '/search',component: SearchContainer}
  ],
	//覆盖默认的路由高亮的类active-link-class 
	linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router