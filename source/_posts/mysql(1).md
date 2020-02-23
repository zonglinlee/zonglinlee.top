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
