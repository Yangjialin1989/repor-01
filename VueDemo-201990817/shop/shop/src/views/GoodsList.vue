<template>
  <div>
    这是商品列表页面
    <br>
    <span>商品id:{{ $route.params.goodsId }}</span>
    <br>
    <span>用户名:{{ $route.params.name}}</span>
    <router-link to='/goods/title'>显示商品标题</router-link>
    <router-link to='/goods/image'>显示商品图片</router-link>
    <div>
      <router-view></router-view>
    </div>
    <router-link :to="{name:'cart',params:{cartId:123}}">跳转到购物车页面</router-link>
    <button @click='jump'>jump</button>
  </div>
</template>

<script>
  export default{
	  data(){
		  return{
			  msg:'hello vue'
		  }
	  },
    created:function(){
      //fetch 解决跨域问题
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => res.json())
        .then(data => console.log(data))
    },
    methods:{
      jump(){
        //this.$router.push({path:'/cart?goodsId=123'})
        this.$router.go(-2);
      }
    }
  }
</script>

<style>
</style>
