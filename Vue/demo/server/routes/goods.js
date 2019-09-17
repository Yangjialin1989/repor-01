var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')
mongoose.connect('mongodb://localhost:27017/goods')
mongoose.connection.on('connected',function(){
	console.log('mongodb connected !')
})
mongoose.connection.on('error',function(){
	console.log('mongodb error !')
})
mongoose.connection.on('disconnected',function(){
	console.log('mongodb disconnected !')
})

router.get('/list',function(req,res,next){
	//接口编写
	// 1.价格排序接口sort
	let sort = req.param('sort')
	
	// 2.
	
	let goodModel = Goods.find({}).sort({ 'salePrice': sort })
	
	goodModel.exec({},function(err,doc){
		res.json({status:0,result:doc})
	})
})

module.exports = router






