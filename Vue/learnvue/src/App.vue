<template>
  <div id="app">
    <img src="./assets/logo.png">
    <span>hi vue is very good</span>

    <!-- 路由的显示方式
        hash  history
        1.路由普通匹配
        <router-link>渲染为<a>标签
        通过里面的tag属性，可以指定显示的标签类型
         <router-link to="/" tag='li'>index</router-link>

        2.路由精准匹配
         自定义给导航添加激活类
    -->

    <router-link to="/">index</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/work">work</router-link>
    <router-link to="/blog">Blog</router-link>
    
    
    <!-- 当有导航的时候，都放置在router-view 容器里面 -->
    <router-view/>







  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
