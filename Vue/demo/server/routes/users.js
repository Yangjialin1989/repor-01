var express = require('express');
var router = express.Router();
//引入users数据
var Users = require('../models/users')

//加载公共库里的公共js
require('./../util/util')


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//登录接口
router.post('/login', function(req, res, next) {
	//1.传递参数 userName、userPwd
	let param = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	//2.把用户名和密码，去数据库查询看是否存在
	Users.findOne(param, function(err, doc) {

			if (err) {
				res.json({ 
					status: 1,
					msg: '用户名或密码错误！'
				})
			}
			//存去到cookie中
			res.cookie('userId', doc.userId, {
				path: '/',
				maxAge: 1000 * 60 * 60 //过期时间
			})

			res.cookie('userName', doc.userName, {
				path: '/',
				maxAge: 1000 * 60 * 60 //过期时间
			})


			if (doc) {
				res.json({
					status: 0,
					msg: '',
					result: {
						userName: doc.userName
					}
				})
			}
		
	})
})

//登录检测   判断是否已经登录
router.post('/checkLogin',function(req,res,next){
	
	if(req.cookies.userId){
		res.json({
			status:0,
			result:req.cookies.userName
		})
	}else{
		res.json({
			status:1,
			msg:'未登录',
			result:''
		})
	}
})

//退出  清除登录数据
router.post('/logout',function(req,res,next){
	//清除cookies
	res.cookie('userId','',{
		path:'/',
		maxAge:-1
	})
	res.json({
		status:0,
		msg:'',
		result:'退出成功'
	})
})

//获取商品列表
router.post("/cartList",function(req,res,next){
	let param = {
		userId:req.cookies.userId 
	}
	Users.findOne(param,function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.doc,
				result:''
			})
		}else{
			//res.json 响应json格式数据
			res.json({
				status:'0',
				msg:'',
				result:doc.cartList
			})
		}
	})
})
//购物车商品数量变化，更新到数据库
router.post('/cartEdit',function(req,res,next){
	let userId     = req.cookies.userId,
	    productId  = req.body.productId,
		productNum = req.body.productNum,
		checked    = req.body.checked
	Users.update({'userId':userId,'cartList.productId':productId},{
		//加$.  是语法
		'cartList.$.productNum':productNum ,
		'cartList.$.checked':checked
	},function(err,doc){
		if(err){
			res.json({
			status:'1',
			msg:err.message,
			result:''
		  })
		}else{
			res.json({
				status:'0',
				msg:'',
				result:'添加数据成功！'
			})
		}
		
	})
})

//
router.post('/editCheckAll',function(req,res,next){
	let userId = req.cookies.userId,
	    checkAll = req.body.checkAll
	Users.findOne({'userId':userId},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			doc.cartList.forEach((item)=>{
				item.checked = checkAll;
			})
			//保存
			doc.save(function(err1,doc1){
				if(err1){
					res.json({
						status:'1',
						msg:err1.message,
						result:''
					})
				}else{
					res.json({
						status:'0',
						msg:'',
						result:'保存成功！'
					})
				}
			})
			
		}
	})
})

//删除功能
router.post('/cartDel',function(req,res,next){
	var userId = req.cookies.userId,
	    productId = req.body.productId
	Users.update({
		'userId':userId
	},{ //pull 删除数据， push 添加数据
		$pull:{
			'cartList':{
				'productId':productId
			}
		}
	},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:'0',
				msg:'',
				result:'该列商品数据删除成功！'
			})
		}
	})
})

//获取用户地址信息
router.get('/addressList',function(req,res,next){
	var userId = req.cookies.userId
	Users.findOne({"userId":userId},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{ 
			res.json({
				status:'0',
				msg:'',
				result:doc.addressList
			})
		}
	})
})

//设置默认地址
router.post('/setDefault',function(req,res,next){
	var userId = req.cookies.userId,addressId = req.body.addressId 
	//判断用户设置默认地址了吗
	if(!addressId){
		res.json({
			status:'1003',
			msg:'addressId is null',
			result:''
		})
	}else{
		Users.findOne({userId:userId},function(err,doc){
			var addressList = doc.addressList
			addressList.forEach((item)=>{
				if(item.addressId == addressId){
					item.isDefault = true
				}else{
					item.isDefault = false 
				}
			})
			doc.save(function(err1,doc1){
				if(err1){
					res.json({
						status:'1',
						msg:err1.message,
						result:''
					})
				}else{
					res.json({
						status:'0',
						msg:'1',
						result:doc1
					})
				}
			})
		})
	}
})

//生成订单
router.post('/payMent',function(req,res,next){
	var userId = req.cookies.userId,
		addressId = req.body.addressId,
		orderTotal = req.body.orderTotal 
	Users.findOne({userId:userId},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			var address = '',
				goodsList = []
			
			//获取当前用户的地址信息	
		    doc.addressList.forEach((item)=>{
				if(item.addressId == addressId){
					address = item
				}
			})
			
			//获取用户购物车，购物的商品
			doc.cartList.filter((item)=>{
				if(item.checked == '1'){
					//被选中的商品加入列表中
					goodsList.push(item)
				}
			})
			
			//订单号
			//默认单号开头
			var platform = '622'
			//获取两个随机数
			var r1 = Math.floor(Math.random()*10)
			var r2 = Math.floor(Math.random()*10)
			
			var sysDate = new Date().Format('yyyyMMddhhmmss')
			
			var orderId = platform + r1 + sysDate + r2
			
			var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
			
			var order = {
				orderId:orderId,
				orderTotal:orderTotal,
				addressInfo:address,
				goodsList:goodsList,
				orderStatus:'10',
				createDate:createDate
			}
			
			//将order追加到订单列表里面
			doc.orderList.push(order)
			
			//保存
			doc.save(function(err1,doc1){
				if(err1){
					res.json({
						status:'1',
						msg:err1.message,
						result:''
					})
				}else{
					res.json({
						status:'0',
						msg:'订单号保存成功！',
						result:{
							orderId:order.orderId,
							orderTotal:orderTotal						
						}
					})
				}
			})
			
		}
	})
})

//订单详情
router.get('/orderDetail',function(req,res,next){
	var userId = req.cookies.userId,
	    orderId = req.param('orderId')
		Users.findOne({userId:userId},function(err,userInfo){
			if(err){
				res.json({
					status:'1',
					msg:err.message,
					result:''
				})
			}else{
				var orderList = userInfo.orderList
				if(orderList.length > 0){
					var orderTotal = 0
					orderList.forEach((item)=>{
						if(item.orderId == orderId){
							orderTotal = item.orderTotal
						}
					})
					
					if(orderTotal > 0){
						res.json({
							status:'0',
							msg:'',
							result:{
								orderId:orderId,
								orderTotal:orderTotal
							}
						})
					}else{
						res.json({
							status:'1010',
							msg:'订单为空',
							result:''
						})
					}
					
				}
			}
		})
})



module.exports = router;
