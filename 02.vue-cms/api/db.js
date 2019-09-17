/*
	如何连接mySQL
	1.安装mysql
*/
var mysql      = require('mysql')
var db = {}
var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'admin',
	password:'admin',
	database:'test'
});
connection.connect(function(err){
	if(err){
		console.log(err)
		return
	}
})
db.query = function sqlback(sqllan,fn){
	var sql = sqllan
	if(!sql) return
	connection.query(sql,function(err,rows,fields){
		if(err){
			console.log(err)
			return 
		}
		console.log(fields)
		fn(rows)
	})
	connection.end(function(err){
		if(err){
			return 
		}else{
			console.log('连接关闭')
		}
	})
}
module.exports = db;
	

