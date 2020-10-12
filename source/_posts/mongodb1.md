---
title: mongodb1
date: 2020-06-14 15:55:54
tags:
  - mongodb
---

mongodb(1)

<!-- more -->
名词解释
https://docs.mongodb.com/manual/reference/glossary/
文档主键(_id)
ObjectID 对象主键 
如果不提供 `文档主键`，MongoDB会自动生成 `对象主键`，长度为12字节；
也可以在mongo shell 中执行 `objectId()`生成对象主键，它包含了document创建的时间，可以通过
`objectId(6hfe73j3w93oje934js3gt).getTimestamp()`来获取文档创建时间


mongo shell crud操作
- insert操作
`insertOne/insertMany/insert/save`
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>  // 定义本次文档创建操作的安全写级别，安全写级别越高，丢失数据风险越低，然而写入操作的延迟更高,如果不做更改，使用MongoDB默认安全写级别
   }
)

如果没有相应的collection，MongoDB会自动创建相应的collection，
错误捕捉
try{
 db.collection.insertOne()
}catch(e){
 print(e)
}
db.collection.save 命令会调用 db.collection.insert 命令

复合主键(可以使用文档作为文档主键)
db.accounts.insert({
	_id:{accountNo: '001', type:'savings'}, // 注意文档的字段顺序调换之后，就是不重复的主键了
	name:'bob',
	balance:400
})
- find操作
`find/`
var cursor = db.collection.find(query, projection)
返回值：`文档游标`(A cursor to the documents that match the query criteria. )
可以使用下标的方式访问游标集合中的数据
cursor[3]
遍历完游标中所有的文档，或者10分钟之后，游标会自动关闭，如果想使游标一直有效，可以使用`noCursorTimeout()`函数来保持游标一直有效
var myCursor = db.collection.find().noCursorTimeout()
如果不遍历游标，你需要主动关闭游标 `myCursor.close()`
db.accounts.find() // 读取全部文档，既不筛选，也不投射，会返回当前collection中所有的document
db.accounts.find().pretty() 
筛选
{ <field> : {$<operator> : value} } // field筛选的字段，operator操作符，value(进行筛选的条件值)

比较操作符
` $eq/$ne/$gt/$gte/$lt/$lte ` (等于、不等于、大于、大于等于、小于、小于等于)
`$in` selects the documents where the value of a field equals any value in the specified array.
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
`$nin`

逻辑操作符
`$not/$and/$or/$nor`

element query operators
`$exists`	Matches documents that have the specified field.
`$type`	Selects documents if a field is of the specified type.

数组操作符
`$all`	Matches arrays that contain all elements specified in the query.
`$elemMatch`	Selects documents if element in the array field matches all the specified $elemMatch conditions.
`$size`	Selects documents if the array field is a specified size.

运算操作符(Evaluation Query Operators)
`$expr`	Allows use of aggregation expressions within the query language.
匹配正则表达式语法
`$jsonSchema`	Validate documents against the given JSON Schema.
`$mod`	Performs a modulo operation on the value of a field and selects documents with a specified result.
`$regex`	Selects documents where values match a specified regular expression.
`$text`	Performs text search.
`$where`	Matches documents that satisfy a JavaScript expression.

db.accounts.find({name : {$eq:'bob'})  
db.accounts.find({balance: {$gt : 100})
db.accounts.find({name:{$in:['bob','jim']}}) //读取name值为bob和jim的账户
db.accounts.find({balance:{$not:{$lt:300}}}) // 读取银行账户余额大于500的账户
// 找到tags数组字段中包含appliance、school、book的文档
db.inventory.find( { tags: { $all: [ "appliance", "school", "book" ] } } )

cursor 操作
cursor.forEach()	Applies a JavaScript function for every document in a cursor.
cursor.hasNext()	Returns true if the cursor has documents and can be iterated.
cursor.next()	Returns the next document in a cursor.
cursor.skip()	Returns a cursor that begins returning results only after passing or skipping a number of documents.
cursor.sort()	Returns results ordered according to a sort specification.
cursor.count()	Modifies the cursor to return the number of documents in the result set rather than the documents themselves.

var myCursor = db.accounts.find({name: 'bob'})
while( myCursor.hasNext()){
	printjson(myCursor.next())
}
注意游标操作的顺序，以下操作不会按照书写顺序执行，会先执行skip命令，skip命令优先于limit命令
db.accounts.find().limit(5).skip(3)

projection
投影可以有选择性的返回文档中的部分字段
{field:inclusion} 1表示返回该字段，0表示不返回字段
db.accounts.find({},{name:1,_id:0})
db.accounts.find({},{name:1,balance:0}) 这种写法是错误的
在投影字段中，除了`_id:0` 可以混合使用之外，其它的字段是不可以混合使用的，意思是，要么全使用 1 列出所有要返回的字段，要么使用 0 列出所有不需要返回的字段即可。
投影操作符(以下三个操作符都是针对投影中的数组字段进行操作的)
`$slice` specifies the number of elements in an array to return in the query result.
`$` The positional $ operator limits the contents of an <array> to return either:
The first element that matches the query condition on the array.
The first element if no query condition is specified for the array (Starting in MongoDB 4.4).
`$elemMatch` The $elemMatch operator limits the contents of an <array> field from the query results to contain only the first element matching the $elemMatch condition.

db.inventory.find( {}, { _id: 0, "details.colors": { $slice: 1 } } )
Return an Array with 3 Elements After Skipping the First Element
db.posts.find( {}, { comments: { $slice: [ 1, 3 ] } } )
db.schools.find( { zipcode: "63109" },
                 { students: { $elemMatch: { school: 102, age: { $gt: 10} } } } )
- update操作
`db.collection.update/db.collection.findAndModify/db.collection.save`
db.collection.update(query, update, options)
db.collection.update注意事项
如果不提供options选项，则视为 更新整篇文档，MongoDB会使用update文档内容完全替换query筛选出的第一篇文档
文档主键 _id是不可更改的，如果一定要在update中写入_id值，它必须和更新之前的值一样，否则会报 writeError 错误，因为_id是immutable的
在更新文档时候，不管查询条件会筛选到几个文档，只有第一篇文档会被更新，更新整篇文档的操作只能用在单一文档上面

更新特定字段(提供options选项,不提供update文档对象)
更新操作符
`$set`	Sets the value of a field in a document.
{ $set: { <field1>: <value1>, ... } }
`$rename`	Renames a field.
`$unset`	Removes the specified field from a document.
db.products.update({ _id: 200 },{ name: "lee" }) // 更新整篇文档(替换)
db.products.update({ _id: 100 },{ $set: { "details.make": "zzz" } })
db.accounts.update({name:"bob"},{$set:{contact.0: "12345678"}) //更新contact数组第一个元素
