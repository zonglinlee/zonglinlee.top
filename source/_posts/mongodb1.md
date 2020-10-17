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
By default, the db.collection.update() method updates a single document. Include the option multi: true to update all documents that match the query criteria.
如果不提供options选项，则视为 更新整篇文档，MongoDB会使用update文档内容完全替换query筛选出的第一篇文档
文档主键 _id是不可更改的，如果一定要在update中写入_id值，它必须和更新之前的值一样，否则会报 writeError 错误，因为_id是immutable的
在更新文档时候，不管查询条件会筛选到几个文档，只有第一篇文档会被更新，更新整篇文档的操作只能用在单一文档上面

`db.districts.update({},{$set:{domainName:"义务教育动态检测平台"}},{multi:true})`

更新特定字段(提供options选项,不提供update文档对象)
更新操作符
`$set`	Sets the value of a field in a document.
{ $set: { <field1>: <value1>, ... } }
`$rename`	Renames a field.
`$unset`	Removes the specified field from a document.
`$inc`  $inc operator increments a field by a specified value // 只能用于数字字段上
`$mul` Multiply the value of a field by a number. // 只能用于数字字段上
`$min` The $min updates the value of the field to a specified value if the specified value is less than the current value of the field.
`$max` The $max operator updates the value of the field to a specified value if the specified value is greater than the current value of the field. 
db.products.update({ _id: 200 },{ name: "lee" }) // 更新整篇文档(替换)
db.products.update({ _id: 100 },{ $set: { "details.make": "zzz" } })
db.accounts.update({name:"bob"},{$set:{contact.0: "12345678"}) //更新contact数组第一个元素
数组更新操作符
$	Acts as a placeholder to update the first element that matches the query condition.
$[]	Acts as a placeholder to update all elements in an array for the documents that match the query condition.
$[<identifier>]	Acts as a placeholder to update all elements that match the arrayFilters condition for the documents that match the query condition.
$addToSet	Adds elements to an array only if they do not already exist in the set.
$pop	Removes the first or last item of an array.
$pull	Removes all array elements that match a specified query.
$push	Adds an item to an array.
$pullAll	Removes all matching values from an array.
Update Operator Modifiers
$each	Modifies the $push and $addToSet operators to append multiple items for array updates.
$position	Modifies the $push operator to specify the position in the array to add elements.
$slice	Modifies the $push operator to limit the size of updated arrays.
$sort	Modifies the $push operator to reorder documents stored in an array.

- 删除操作
db.collection.remove(query,options)
db.accounts.remove({balance:50}) // 删除所有余额等于50的文档
db.accounts.remove({}) // 删除accounts集合中的所有文档,但是集合还在
db.accounts.drop() // 删除整个集合
日常操作中如果集合文档太多 ，通过db.accounts.remove({})进行删除效率不高，可以使用drop命令先删除整个集合，然后再创建这个集合

- 聚合操作
aggregation
Any of a variety of operations that reduces and summarizes large sets of data. MongoDB’s aggregate() and mapReduce() methods are two examples of aggregation operations. 

Pipeline stages have a limit of 100M内存. If a stage exceeds this limit, MongoDB will produce an error. To allow for the handling of large datasets, use the `allowDiskUse` option to enable aggregation pipeline stages to write data to temporary files

`db.collection.aggregate(pipeline, options)`
pipeline	array	
A sequence of data aggregation operations or stages

$$<variable> 使用$$来表示系统变量
$<field> 表示document中的某个字段
$<field>.subfield 表示内嵌文档中的字段
- 常用系统变量
$$CURRENT 表示管道中当前操作的文档
- 常量操作符
由于MongoDB会将 `$<field>`当做一个文档字段，所以如果我们要将 `$name`当做一个常量，我们要使用
`$literal: <value>` 即 `$literal："$name"`
- 聚合管道阶段
`$match` - 对文档进行筛选
`$group` - 对文档进行分组
`$project` - 对文档进行投影
`$skip`  - 跳过管道内前N篇文档
`$unwind` - Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.
{
  $unwind:
    {
      path: <field path>,
      includeArrayIndex: <string>,
      preserveNullAndEmptyArrays: <boolean>
    }
}
$unwind操作会将源文档中数组字段展开，比如有一个document是这样的
`{goods:['tv','computer']}`
展开操作之后就会变成`{goods:'tv'}` 和 `{goods:'computer'}`,展开的文档之中除了要展开的数组字段之外，其余的字段和原有文档一致，包括文档主键_id
当要展开的数组字段为 `空数组/null/不存在该数组字段` 这几个选项的时候，该文档会被unwind阶段给剔除掉，即unwind之后并不会包含这几个文档。如果需要保留的话，需要添加`preserveNullAndEmptyAarrys: true`
`$lookup`
Performs a left outer join to an unsharded collection in the same database to filter in documents from the “joined” collection for processing. To each input document, the $lookup stage adds a new array field whose elements are the matching documents from the “joined” collection. The $lookup stage passes these reshaped documents to the next stage
$lookup 用法一 
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}
等同于以下sql语句
SELECT *, <output array field>
FROM collection
WHERE <output array field> IN (SELECT *
                               FROM <collection to join>
                               WHERE <foreignField>= <collection.localField>);
// 以下会先对accounts 集合的currency字段进行展开，展开之后，再对当前管道中的文档进行外连接，它会对accounts文档中的currency字段和forex集合中的ccy字段进行比较，如果相同就会将匹配的文档作为数组的一项添加到到当前文档的forexData数组字段中
db.accounts.aggregate([
	{
		$unwind: {
			path: "$currency"
		},
	}，
	{
		$lookup: {
			from: "forex", 
			localField: "currency", 
			foreignField: "ccy",
			as："forexData"
		}
	}
])

$lookup 用法二 
{
   $lookup:
     {
       from: <collection to join>,
       let: { <var_1>: <expression>, …, <var_n>: <expression> },
       pipeline: [ <pipeline to execute on the collection to join> ],
       as: <output array field>
     }
}

SELECT *, <output array field>
FROM collection
WHERE <output array field> IN (SELECT <documents as determined from the pipeline>
                               FROM <collection to join>
                               WHERE <pipeline> );


`$group`
Groups input documents by the specified _id expression and for each distinct grouping, outputs a document. The _id field of each output document contains the unique group by value. The output documents can also contain computed fields that hold the values of some accumulator expression.
`$out`
Takes the documents returned by the aggregation pipeline and writes them to a specified collection.
`$merge`
Writes the results of the aggregation pipeline to a specified collection. The $merge operator must be the last stage in the pipeline.


mongodb对聚合顺序的优化
$sort  +  $match 
如果pipline中$sort在$match步骤前面，MongoDB会把 $match阶段会尽可能的提前，因为$match之后，管道中的文档数量会减少。
同样的道理 `$project  +  $skip `,$skip阶段也会提前
MongoDB对聚合阶段合并的优化
$sort + $limit 
如果两者之间没有夹杂会改变当前文档数量的聚合阶段，$sort和$limit阶段可以合并

## mongodb 索引
索引：对数据库中指定字段进行排序的数据结构，每个索引都指向特定的内存地址，用来快速定位内存中的数据记录。
单键索引：数据库中单个字段进行排序
复合键索引：多个数据库字段进行排序，如果有两个字段['name','age']进行索引创建，其中name为主要的字段先进索引建立，然后在针对name字段相同的记录 ，再进行另一个age字段进行排序

### mongoshell 索引操作函数
创建索引： `db.collection.createIndex()`
获取索引： `db.collection.getIndexes()`
Returns an array that holds a list of documents that identify and describe the existing indexes on the collection, including hidden indexes. 
查看索引效果： `db.collection.explain()`
db.accounts.explain().find({name:'bob'})
返回的结果中有一个 `winningPlan.stage` 字段，这个是数据库认为的最好的查询方式
Stages are descriptive of the operation; 
`COLLSCAN` for a collection scan (从头到尾遍历当前集合进行查询)
`IXSCAN` for scanning index keys
`FETCH` for retrieving documents (从集合中获取查询记录，有时候如果我们只需要当前索引所对应的键值对，就直接从索引中返回即可，不用再读取内存地址中的完整记录了)
`SHARD_MERGE` for merging results from shards
`SHARDING_FILTER` for filtering out orphan documents from shards

删除索引： `db.collection.dropIndex()`

索引的特性
- 默认MongoDB会自动创建一个文档主键_id的索引
- 唯一性索引，如果创建单键索引时候，给了`unique:true`,就创建了唯一索引，意味着当前字段的每个value值在整篇文档中都是唯一的，不能有重复。如果已有文档中某个字段存在重复，就不可以在这个字段上创建唯一索引。如果新增的文档中不包含唯一性索引的字段，就只有第一篇缺失该字段的文档会被写入数据库，并且索引中该文档键值会被设置为null，后续的写入会报错。
- 复合键索引也可以具有唯一性，在这种情况下，不同文档之间其所包含的复合键字段的组合，不可以重复
- 索引的稀疏性：只将包含索引字段的文档加入到索引中（即使索引字段值为null），需要在创建索引的时候提供`sparse:true`选项。索引可以同时具有唯一性和稀疏性，这样就可以保存多篇缺失索引键值的文档了
- 索引的生存时间：针对日期字段，或者包含日期元素的数组字段，可以在当前字段创建索引，并设置一个生存时间`expireAfterSeconds`，从该文档插入之后计算，如果超过该时间设定，数据库会自动删除当前文档
索引的生存时间只针对单键索引有效，复合键索引没有生存时间的特性
数据库使用一后台线程来监测和删除一个过期文档，删除操作可能有延迟

## 复制集(高可用性)
可以启动多个mongod进程，每个进程为一个节点，组成集群
主节点负责处理所有的写入请求(一个复制集只有一个主节点)
副节点从主节点(或者符合条件的副节点)处复制数据
主节点(默认情况下)和副节点都可以处理读请求
默认情况下节点之间会每隔2s互相发送心跳请求，超过10s则请求超时，这个用以侦测节点的健康程度
复制集中最多有50个节点(如果节点过多，节点之间的通讯就会占用大量系统资源)
当原有主节点挂掉之后，会选举出副节点作为新的主节点来代替
复制集中最多可以有7个投票节点，并不是所有节点都有投票的权利
3个节点是创建一个复制集的最少节点
特殊的节点：投票机节点，它不会从主节点复制任何数据，它只给其它节点投票，它没有数据，它不可能成为主节点
副节点不直接复制数据，而是复制写库记录，然后对数据进行同步

## 数据库分片(扩展性)
分片集群中的每个数据库中存储一部分数据，整个集群的数据合并起来才是一个完整的数据库
mongos: 它提供路由功能，它向配置服务器请求分片数据库中的元数据，当客户端发送读取文档请求时候，mongos会导向最终的读库数据库。
