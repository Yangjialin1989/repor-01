<template>
  <div>
    <div>{{ msg }}</div>
    <router-link :to="{name: 'blogs'}">blogs</router-link>
    <router-link :to="{name: 'info'}">info</router-link>
    <!-- 当有导航的时候，都放置在router-view 容器里面 -->
    <router-view/>
  </div>

</template>

<script>
  export default {
    name:'About',
    data(){
      return{
        msg:'这是关于我的页面'
      }
    }
  }
</script>

<style>
</style>
