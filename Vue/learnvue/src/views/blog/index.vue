<template>
  <div>
    <div v-for="item in list">
        <div>
           <h1>标题：{{item.title}}</h1>
        </div>
        <div v-for="(item,index) in item.images" v-if="index < 1">
            <img :src="attachImageUrl(item)" alt="">
        </div>
    </div>


    <!-- 当有导航的时候，都放置在router-view 容器里面 -->
    <router-view/>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
    <Datetime></Datetime>
    <Upload></Upload>
  </div>

</template>

<script>
  //请求博客 导入 element-ui步骤，1.加载模块；2.挂载模块。
  import axios from 'axios'
  
  import Datetime from '@/components/Datetime'
  import Upload from '@/components/Upload'
  export default {
    data(){
      return {
        title:'',
        content:'',
        list:''
      }
    },
    components:{
      Datetime,
      Upload
    },
    created:function(){
      this.getBlogList()

    },
    methods:{
      getBlogList(){
          // https: //news-at.zhihu.com/api/4/news/latest
           axios.get('/api/news/latest').then(res =>{
                   console.log(res);
                   this.list = res.data.stories


          })

      },
      attachImageUrl(srcUrl){
        if(srcUrl !== undefined){
          return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
        }
      },
      replace(url){
        return str.replace(/http\w(0,1):\/\/p/g,'//images.weserv.nl/?url=p')
      }
    }
  }
</script>

<style>
</style>
