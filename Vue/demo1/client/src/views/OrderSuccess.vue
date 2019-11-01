<template>
  <div>
    <HeadNav></HeadNav>
    <NavBread><span>订单</span></NavBread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{ orderId}}</span>
            <span>Order total：{{ orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">购物车列表</router-link>
             
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m"to="/">商品列表</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import HeadNav from '@/components/Head'
  import NavBread from '@/components/NavBread'
  import Footer from '@/components/Footer'
  import Modal from '@/components/Modal'
  export default {
    data() {
      return {
        orderTotal:0,
        orderId:''

      }
    },
    methods:{

    },
    mounted(){
      var orderId = this.$route.query.orderId
      if(!orderId){
        return
      }
      this.$http.get('/api/users/orderDetail',{
        params:{
          orderId:orderId
        }
      }).then((response)=>{
        let res = response.data
        if(res.status == '0'){
          this.orderId = orderId
          this.orderTotal = res.result.orderTotal
        }
      })
    },
    components:{
      HeadNav,
      NavBread,
      Footer
    }
  }
</script>

<style>
</style>
