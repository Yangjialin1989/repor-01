import Vue from 'vue'                                   //引入vue
import Router from 'vue-router'                         //使用路由
import HelloWorld from '@/components/HelloWorld'        //通过引入外部模板的方式
import About from '@/components/About'
import Blog from '@/views/blog/index'
import Datetime from '@/components/Datetime'            //element-ui datetime select

Vue.use(Router)
//const Study = { template:'<div>我是学习的页面</div>'}     //通过页面直接声明的方式
const Work = { template:'<div>我是工作的页面</div>'}

const Blogs = { template:'<div>博客</div>'}
const Info = { template:'<div>个人资料</div>'}
export default new Router({
 // mode: "history",              //可以去掉路由上的 /#/ 号,去掉hash
  routes: [
    {
      path: '/',                // 根路径
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',           //自定义路径
      name: 'About',
      component: About,
      children:[                //嵌套路由
        {
          path:'blogs',          // 如果没有前面的"/"，那么保留根路径"/about"
          name:'blogs',
          component:Blogs
        },
        {
          path:'info',
          name:'info',
          component:Info
        }
      ]
    },
    {
      path: '/work',
      name:'work',
      component:Work
    },
    {
      path:'/blog',
      name:'blog',
      component:Blog
    },
    {
      path:'*',
      redirect:(to) =>{                 // redirect 重定向
        console.log(to.path)
        if(to.path === '/aaa'){
          return '/work'
        }else if(to.path === '/stark'){
          return '/about'
        }else{
          return '/'
        }
      }
    }
  ]
})
