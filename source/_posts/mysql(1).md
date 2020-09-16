---
title: mysql-1
tags:
- sql
- mysql
---
## mysql安装
https://blog.csdn.net/Very666/article/details/98594227
## 连接mysql
MySQL Client的可执行程序是mysql，MySQL Server的可执行程序是mysqld。
MySQL Client中输入的SQL语句通过TCP连接发送到MySQL Server。默认端口号是3306，即如果发送到本机MySQL Server，地址就是127.0.0.1:3306。
也可以只安装MySQL Client，然后连接到远程MySQL Server。假设远程MySQL Server的IP地址是10.0.1.99，那么就使用-h指定IP或域名：
mysql -h 10.0.1.99 -u root -p
## mysql常用命令
SHOW DATABASES;
CREATE DATABASE test;//创建数据库
USE test;
CREATE TABLE students;//创建一个表
DROP TABLE students;//删除一个表
SHOW TABLES;//列出当前数据库中所有表
DESC students;//查看一个表的结构
SHOW CREATE TABLE students;//查看创建表的SQL语句
ALTER TABLE students ADD COLUMN birth VARCHAR(10) NOT NULL;//增加一列
ALTER TABLE students CHANGE COLUMN birth birthday VARCHAR(20) NOT NULL;//修改列信息
ALTER TABLE students DROP COLUMN birthday;//删除列
DROP DATABASE test; //删除一个数据库
EXIT; //断开mysql客户端和服务器的连接
### 参考链接
https://www.runoob.com/mysql/mysql-tutorial.html
https://juejin.im/post/5ae55861f265da0ba062ec71
## [node.js 库 `mysql` 用法](https://github.com/mysqljs/mysql)
### 连接mysql
方式一(推荐)：返回一个connection对象
```js
//Connection options可以参考文档
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'example.org',
  user     : 'bob',
  password : 'secret'
});
```
方式二：ssl连接方式，需要读取SSL profiles配置文件
方式三：Pooling connections
一次性创建多个连接,返回一个pool对象，详情参考文档
```js
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password        : 'secret',
  database        : 'my_db'
});
```
### 断开mysql连接
两种方法
```js
//方式一：优雅的断开连接
connection.end(function(err) {
  // The connection is terminated now
  //if err,an err argument will be provided to the callback, but the connection will be terminated regardless of that.
});
//方式二：不推荐
connection.destroy();
```
### 查询数据库
连接对象connection 和pool 都提供了 query(sqlString, callback) 方法用于执行sql语句查询,三种方式
```js
//方式一：简单查询
connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});
//方式二：query(sqlString, values, callback) comes when using placeholder values 
//方式三：query(options, callback) comes when using various advanced options
```
### Escaping query values 转义查询语句
These methods of escaping values only works when the NO_BACKSLASH_ESCAPES SQL mode is disabled (which is the default state for MySQL servers).
为了防止SQL注入，用户执行的sql语句都应该先进行转义，mysql.escape(), connection.escape() or pool.escape() 这三个方法都可以使用
 ```js
 //方法一：
var userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
connection.query(sql, function (error, results, fields) {
if (error) throw error;
// ...
});
//方法二：use ? characters as placeholders ，这个本质上也是调用connection.escape()方法
connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
  if (error) throw error;
  // ...
});
//多个占位符映射到数组
connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
  if (error) throw error;
  // ...
});
```
### Escaping query identifiers转义数据库/表/列 名
if you can't trust an SQL identifier (database / table / column name) because it is provided by a user, you should escape it with mysql.escapeId(identifier), connection.escapeId(identifier) or pool.escapeId(identifier)
```js
var sorter = 'date';
var sql    = 'SELECT * FROM posts ORDER BY ' + connection.escapeId(sorter);
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  // ...
});
```
使用 ?? 占位符
```js
var userId = 1;
var columns = ['username', 'email'];
var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function (error, results, fields) {
  if (error) throw error;
  // ...
});

console.log(query.sql); // SELECT `username`, `email` FROM `users` WHERE id = 1
```
### 预定义查询语句格式
You can use mysql.format to prepare a query with multiple insertion points, utilizing the proper escaping for ids and values. A simple example of this follows:
```js
var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts);
```