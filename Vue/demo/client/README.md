# demo

> Vue.js

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
项目结构

    前端：     vue axios
         模块：
              商品列表
              登录
                  第一个阶段使用cookie
                  第二个阶段增加jwt权限验证
              购物车
              结账
                  结账页面
              地址
                  选择地址
              提交订单
                  生成订单号
                  订单信息


    后端：     express
                 middleware passport
    数据库：   mongodb   redis：做缓存session用户信息
    服务器：   linux +
              pm2启动node(node是单线程，pm2可以管理线程，自动重启) +
              web githook (git钩子，当我们把代码提交到github，需要去服务器把代码拉取下来，可以自动监听这个push事件。)
    上线       使用nginx 反向代理
    docker    集装箱容器 把你的环境都集成在一起



1.初始化项目 ；
   Vue
   vue init webpack client
   1.cd client （客户端）
   2.npm run dev
2.静态文件拉取下来
   1.在src下创建views视图文件，下面创建商品列表模板 GoodsList
   2.组件可以修改名称：  “改后的名字在前”：改完的名字
   3.开放数据node
   ```
   var express = require('express')
   var app = express()
   //设置跨域
   app.all('*',function(req,res,next){
     res.header('Access-Control-Allow-Origin','*')
     res.header('Access-Control-Allow-Headers','X-Requested-With')
     res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
     res.header('X-Powered-By','3.2.1')
     res.header('Content-type','application/json;charset=utf-8')
     next()
   })
   var questions={
     "status":"0",
     "result":[
       {
         "productId":"10001",
         "productName":"小米6",
         "productPrice":"2499",
         "productImg":"mi6.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       }
     ]}
   app.get('/goods',function(req,res){
     res.status(200),
     res.json(questions)
   })
   var server = app.listen(3000,function(){
     console.log('server is success')
   })
```
   5.懒加载图片：使用 vue插件 vue-lazyload
    5.1 下载插件         npm i vue-lazyload -D
    5.2 main.js 引入插件 import VueLazyLoad from 'vue-lazyload'
    5.3 挂载到Vue        Vue.use(VueLazyLoad,{ loading:'/static/img/ok-2.png'})
    5.4 模板修改         <img :src="'/static/img/'+item.productImage" alt="">
                        <img v-lazy="'/static/img/'+item.productImage" alt="">

   6.利用vue做本地数据接口
    6.1 client目录下创建mock临时数据文件夹
    6.2 配置build文件夹下的 webpack.dev.conf.js

        //第一步
        const express = require('express')
        const app = express()//请求server
        var appData = require('../mock/data.json')//加载本地数据文件
        var seller = appData.seller//获取对应的本地数据
        var goods = appData.goods
        var ratings = appData.ratings
        var apiRoutes = express.Router()
        app.use('/api', apiRoutes)//通过路由请求数据

        devServer: {
        app.get('/api/ratings', (req, res) => {
          res.json({
            errno: 0,
            data: ratings
          })
        })

   7.使用express-genderator生成项目
    7.1 npm i express-genderator -g
    7.2 express server 本地生成server文件夹 在demo下
    7.3 cd server/
    7.4 npm i
    7.5 npm start

   8.express链接数据库并查询商品
    8.1 在server目录下，routes 目录下，创建goods.js
        ``` var express = require('express')
        var router = express.Router()
        var mongoose = require('mongoose')
        var Goods = require('../models/goods')
        mongoose.connect('mongodb://localhost:27017/goods')
        mongoose.connection.on('connected',function(){
        	console.log('mongodb connected !')
        })
        mongoose.connection.on('error',function(){
        	console.log('mongodb error !')
        })
        mongoose.connection.on('disconnected',function(){
        	console.log('mongodb disconnected !')
        })

        router.get('/list',function(req,res,next){
        	Goods.find({},function(err,doc){
        		res.json({status:0,result:doc})
        	})
        })

        module.exports = router ```
     8.2在server 下创建models 数据模型 goods.js
       var mongoose =require('mongoose')
       var Schema = mongoose.Schema
       var productSchema = new Schema({
       	"productId"    : Number,
       	"productName"  : String,
       	"salePrice"    : Number,
       	"productImage" : String
       })
       module.exports = mongoose.model('Goods',productSchema)
     8.3 导出数据模型Goods，再在路由模型中加载该模块
       var Goods = require('../models/goods')
     8.4 配置路由
       server下面的app.js
       app.use('/goods',goodsRouter)
     8.5 启动服务器 npm start  localhost:3000/goods/list

    9 前端与后端交互 json xml

     9.1 解决跨域 Access to XMLHttpRequest at 'localhost:3000/goods/list' from origin 'http://localhost:8081' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
         client -- config -- index.js
         '/goods/**':{
             target:'http://localhost:3000'

         client -- src -- views --GoodList.vue
         methods: {
           getGoodsList() {//http://localhost:8081/api/good
             axios.get('/goods/list')
               .then(res => {

                 res = res.data.result
                 console.log(res)
                 this.list = res


               })
           }
         }

      10. 实现商品价格排序
       10.1  前端  点击触发一个事件，访问一个接口；  后端  通过前端传过来的参数，写业务逻辑，返回前端需要的数据，渲染页面
       10.2  业务逻辑：sort({})
3.协助工具  git  teambition pubu

4.后端还没有给api接口，使用mock模拟数据
