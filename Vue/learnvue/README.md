# learnvue

> learning vue base

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



初始化项目 ；
   Vue    
   vue init webpack client