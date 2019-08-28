<template>
 <!-- <div>
    这里是购物车页面
    <span>{{$route.query.goodsId}}</span>

  </div> -->
  <div class="hello" style="background: fuchsia">
      <h1>您登陆{{ msg }}</h1>
      <button @click="showDetails">获取20服务器上接收所信息</button>
    </div>
</template>

<script>
  // export default{
  //   data(){
  // 	  return{
  // 		  msg:'hello vue'
  // 	  }
  //   }
  // }
  export default {
    name: 'hello',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      showDetails: function () {
        this.$http.get('http://api.komavideo.com/news/list').then(function (res) {
          console.log(res) // 返回很多的数据,比如执行状态,url,data等等
  console.log(res.data)// 返回的json数据
  console.log(res.data.message)// json对象里面的信息
  this.msg = res.data.message
        })
      }
    }
  }
</script>

<style>
</style>
