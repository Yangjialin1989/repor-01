<template>
  <div>
    <HeadNav></HeadNav>
    <NavBread><span>商品</span></NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods()">Price <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur':priceChecked == 'all'}">All</a></dd>
              <dd v-for="(price , index) in priceFilter" :key="index">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in list" :key='index'>
                  <div class="pic">
                    <!-- //将 :src 属性直接改为v-lazy, :key是为了防止刷新页面或图片更改时图片不更新 -->
                    <img v-lazy="'/static/img/'+item.productImage" alt=""  :key="'/static/img/' + item.productImage">
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class='btn btn--m' @click='addCart(item.productId)'>加入购物车</a>

                    </div>
                  </div>
                </li>
                <!-- 瀑布流加载数据          disabled 禁用-->
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                 ...
                </div>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <!-- 在未登录的情况下 -->
    <Modal :mdShow='mdShow'>
      <button class="md-close" slot="close"  @click="mdShow = false">Close</button>

      <p slot="message">请先登录，否则无法加入购物车</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn-login" @click="mdShow = false">关闭</a>
      </div>
    </Modal>

    <!-- 在登录的情况下 -->
    <Modal :mdShow='mdShowLogin'>
      <button class="md-close" slot="close"  @click="mdShowLogin = false">Close</button>

      <p slot="message">加入购物车成功</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShowLogin = false">继续购物</a>
        <router-link class='btn btn--m' to='/cart'>查看购物车</router-link>
      </div>
    </Modal>
  </div>
</template>

<script>
  import HeadNav from '@/components/Head'
  import NavBread from '@/components/NavBread'
  import Footer from '@/components/Footer'
  import Modal  from '@/components/Modal'
  import axios from 'axios'
  import jsonp from 'jsonp'
  export default {
    data() {
      return {
        list: [],
        sortFlag:true,
        priceChecked:'all',
        busy:true,
        page:1,
        pagesize:8,
        flag:false,
        priceFilter:[
          {
            startPrice:'0',
            endPrice:'100'
          },
          {
            startPrice:'100',
            endPrice:'500'
          },
          {
            startPrice:'500',
            endPrice:'1000'
          },
          {
            startPrice:'1000',
            endPrice:'5000'
          }
        ],
        mdShow:false,
        mdShowLogin:false

      }
    },
    components: {
      HeadNav,
      NavBread,
      Footer,
      Modal
    },
    created() {
      this.getGoods()
    },
    methods: {

      getGoods(flag) {//http://localhost:8081/api/good
      //       传递参数 get('/goods/list',{params:{sort:1}})
        let sort = this.sortFlag ? 1 : -1
        let param = {
          sort:       sort,
          priceLevel: this.priceChecked,
          page:       this.page,
          pagesize:   this.pagesize
        }
          axios.get('/api/goods/list',{params:param})
          .then(result => {

           // res = res.data.result
           // console.log(res)
           // this.list = res
           let res = result.data
           if(flag){
             //第二次进入这里，分页的时候，数据追加到数据列表里面。
             this.list = this.list.concat(res.result)
             //判断当数据加载完，让数据截停

             console.log(res.result.length)

             if(res.result.length == 0){
               this.busy = true;
               console.log(this.busy)
             }else{
               this.busy = false
             }
           }else{
             //第一次进入这里
             this.list = res.result
             this.busy = false;
           }
           console.log(res.result)



          })
      },
      sortGoods(){

        this.sortFlag = !this.sortFlag
        this.page = 1
        this.getGoods()

      },
      setPriceFilter(index){
        this.page = 1
        this.priceChecked = index
        this.getGoods()
        this.loadMore()
      },
      //分页请求逻辑
      loadMore: function() {
            this.busy = true;
            setTimeout(() => {
              this.page++
              this.getGoods(true)
            }, 1000);
      },
      addCart:function(productId){
        axios.post('/api/goods/addCart',{
          productId:productId
        }).then((result)=>{
          let res = result.data
          if(res.status == 1){
            this.mdShow = true
          }else{
            this.mdShowLogin = true
          }
        })
      }
    }
  }
</script>

<style>
</style>
