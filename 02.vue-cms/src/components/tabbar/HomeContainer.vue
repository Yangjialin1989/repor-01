<template>
	<div>
		<!-- 轮播图 -->
		<mt-swipe :auto="4000">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<!-- 九宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../../images/menu1.png" alt="">
					<div class="mui-media-body">新闻资讯</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../../images/menu2.png" alt="">
					<div class="mui-media-body">图片分享</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../../images/menu3.png" alt="">
					<div class="mui-media-body">商品购买</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../../images/menu4.png" alt="">
					<div class="mui-media-body">留言反馈</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../../images/menu5.png" alt="">
					<div class="mui-media-body">视频专区</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../../images/menu6.png" alt="">
					<div class="mui-media-body">联系我们</div>
				</a></li>
		</ul>
		<pre> {{ content }}</pre>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default {
		name:'HomeContainer',
		data(){
			return {
				content:'hhhh'
			}
		},
		mounted(){
			this.axios.post('http://api.komavideo.com/news/list').then(body => {
				this.content = body.data;
				console.log(content)
			})
		}
	}
</script>

<style lang="less" scoped>
	.mint-swipe {
		height: 200px;

		.mint-swipe-item {
			&:nth-child(1) {
				background-color: red;
			}

			&:nth-child(2) {
				background-color: green;
			}

			&:nth-child(3) {
				background-color: yellow;
			}
		}

	}
	.mui-grid-view.mui-grid-9{
		background-color: #fff;
		border: none;
		img{
			width:50%;
			height:50%;
		}
		.mui-media-body{font-size:13px;}
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: none;
	}
	
</style>
