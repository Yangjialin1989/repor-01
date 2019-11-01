var express = require('express')
var app = express()
//设置跨域
app.all('*',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers','X-Requested-With')
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By','3.2.1')
  res.header('Content-type','application/json;charset=utf-8')
  next()
})
var questions={
  "data1":[
    {
      "productId":"10001",
      "productName":"小米6",
      "productPrice":"2499",
      "productImg":"mi6.jpg"
    },
    {
      "productId":"10022",
      "productName":"小米电视机",
      "productPrice":"1999",
      "productImg":"16.jpg"
    },
    {
      "productId":"10102",
      "productName":"小米音箱",
      "productPrice":"3999",
      "productImg":"14.jpg"
    },
    {
      "productId":"10002",
      "productName":"小米笔记本",
      "productPrice":"3999",
      "productImg":"note.jpg"
    },
    {
      "productId":"10002",
      "productName":"小米笔记本",
      "productPrice":"3999",
      "productImg":"note.jpg"
    },
    {
      "productId":"10002",
      "productName":"小米笔记本",
      "productPrice":"3999",
      "productImg":"note.jpg"
    },
    {
      "productId":"20202",
      "productName":"小米自拍杆",
      "productPrice":"99",
      "productImg":"zipai.jpg"
    }
  ],
  "data": [{
          "_id": {
              "$oid": "58c284b13a1bb9aa7033801b"
          },
          "productId": "201710003",
          "productName": "平衡车",
          "salePrice": 1999,
          "productImage": "pingheng.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58c284d7117a2e6599abef5e"
          },
          "productId": "201710004",
          "productName": "头戴式耳机-3",
          "salePrice": 80,
          "productImage": "2.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58c284e6117a2e6599abef5f"
          },
          "productId": "201710005",
          "productName": "小米笔记本",
          "salePrice": 3549,
          "productImage": "note.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58c284f4117a2e6599abef60"
          },
          "productId": "201710006",
          "productName": "小米6",
          "salePrice": 2499,
          "productImage": "mi6.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e704ef98dab115d336b3f1"
          },
          "productId": "201710002",
          "productName": "智能插线板",
          "salePrice": 59,
          "productImage": "6.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7050398dab115d336b3f2"
          },
          "productId": "201710007",
          "productName": "自拍杆",
          "salePrice": 39,
          "productImage": "zipai.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7050c98dab115d336b3f3"
          },
          "productId": "201710008",
          "productName": "小米净水器",
          "salePrice": 1999,
          "productImage": "8.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7051698dab115d336b3f4"
          },
          "productId": "201710009",
          "productName": "IH 电饭煲",
          "salePrice": 999,
          "productImage": "9.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7052198dab115d336b3f5"
          },
          "productId": "201710010",
          "productName": "小米电视4A",
          "salePrice": 2099,
          "productImage": "10.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7052a98dab115d336b3f6"
          },
          "productId": "201710011",
          "productName": "Ear1000",
          "salePrice": 1000,
          "productImage": "11.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7053298dab115d336b3f7"
          },
          "productId": "201710012",
          "productName": "Ear1100",
          "salePrice": 1100,
          "productImage": "12.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7053c98dab115d336b3f8"
          },
          "productId": "201710013",
          "productName": "Ear2000",
          "salePrice": 2000,
          "productImage": "13.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7054798dab115d336b3f9"
          },
          "productId": "201710014",
          "productName": "Ear1600",
          "salePrice": 1600,
          "productImage": "14.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7055198dab115d336b3fa"
          },
          "productId": "201710015",
          "productName": "Ear1200",
          "salePrice": 1200,
          "productImage": "15.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7057798dab115d336b3fb"
          },
          "productId": "201710016",
          "productName": "Ear700",
          "salePrice": 700,
          "productImage": "16.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7058498dab115d336b3fc"
          },
          "productId": "201710017",
          "productName": "小钢炮蓝牙音箱",
          "salePrice": 129,
          "productImage": "1.jpg",
          "productUrl": ""
      },
      {
          "_id": {
              "$oid": "58e7058d98dab115d336b3fd"
          },
          "productId": "201710018",
          "productName": "智能摄像机",
          "salePrice": 389,
          "productImage": "photo.jpg",
          "productUrl": ""
      }
  ]
  }
app.get('/goods',function(req,res){
  res.status(200),
  res.json(questions)
})
 var server = app.listen(3000,function(){
   console.log('server is success')
 })

