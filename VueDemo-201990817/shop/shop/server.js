const express = require('express')
const app = express()
app.use(require('cors')())
app.use('/',express.static('public'))
app.get('/ablut',function(req,res){
  res.send({page:'About Us'})
})
app.get('/products',function(req,res){
  res.send([
    {id:1,title:'Product A'},
    {id:2,title:'Product B'},
    {id:3,title:'Product C'},
  ])
})
app.listen(4000,function(){
	console.log('服务器启动成功，可以通过http:127.0.0.1:3000/来进行访问')
/*
C:\Users\72985\Documents\HBuilderProjects\Node>node node-04-http-开外部服务器.js
服务器启动成功，可以通过http:127.0.0.1:3000/来进行访问

*/
})
