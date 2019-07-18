const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admins',{
	useNewUrlParser:true
})
//分类模型
const CategorySchema = new mongoose.Schema({
	name:{type:String}
},{
	toJSON:{virtuals:true}
})
//添加虚拟字段 
CategorySchema.virtual('posts',{
	//从Post数据中查询，关联posts数据 
	ref:'Post',
	//本地键，通过id查询
	localField:'_id',
	//外地键
	foreignField:'categories',
	//查询的数据是否只有一条,false表示不是一条，返回数组
	justOne:false,
})
const Category = mongoose.model('Category',CategorySchema)


// 在文章中记录分类,以其唯一id键为分类，只要定义ref就可以查到
const Post = mongoose.model('Post',new mongoose.Schema({
	title:{type:String},
	body:{type:String},
	//文章的单个分类
	category:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
	//文章的所有分类
	categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}]
}))

//async顾名思义是“异步”的意思，async用于声明一个函数是异步的。而await从字面意思上是“等待”的意思，就是用于等待异步完成。并且await只能在async函数中使用

//通常async、await都是跟随Promise一起使用的。为什么这么说呢？因为async返回的都是一个Promise对象同时async适用于任何类型的函数上。这样await得到的就是一个Promise对象(如果不是Promise对象的话那async返回的是什么 就是什么)；

async function main(){
	/*await Post.insertMany([
	// 	{title:'我的第一篇帖子',category:'nodejs',body:'内容1'},
	// 	{title:'我的第二篇帖子',category:'nodejs',body:'内容2'}
	// ])
    await Category.insertMany([
		{name:'nodejs'},
		{name:'vuejs'}
	])
	//console.log(await Category.find())
	//给帖子设置分类,关联分类
	const cat1 = await Category.findOne({name:'nodejs'})
	const cat2 = await Category.findOne({name:'vuejs'})
	const post1 = await Post.findOne({title:'我的第一篇帖子'})
	const post2 = await Post.findOne({title:'我的第二篇帖子'})
	post1.categories = [cat1,cat2]
	post2.categories = [cat2]
	await post1.save()
	await post2.save()
	//const posts = await Post.find()
	
	//查询出关联数据
	const posts = await Post.find().populate('categories')
	
    console.log(posts[0])*/ 
	const cats = await Category.find().populate('posts').lean()
	console.log(cats)
}

main()













