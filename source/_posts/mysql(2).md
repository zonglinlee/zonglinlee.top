---
title: mysql-2
tags:
- sql
- mysql
---
## mysql安装
mysql安装完毕之后，默认是不可以远程访问的，只支持localhost登录，需要在mysql 的mysql数据库中，找到user表，修改一下root账户的host
```shell
# 默认root账户的host是localhost，只支持本机登录，修改为 % 代表任意 IP 都可以访问
# 也可以将host指定固定IP地址
use mysql;
select user, host, plugin from user;
```
|user|host|plugin|
|  ----  | ----  | ----  |
|root |localhost|caching_sha2_password|


```shell
select 'host' from user where user='root';
update user set host = '%' where user ='root';
flush privileges;
```
|user|host|plugin|
|  ----  | ----  | ----  |
|root |%|caching_sha2_password|

还要修改一下mysql的配置文件，因为配置中有 `bind-address=127.0.0.1` ，需要将其注释掉
mysql 配置文件目录  `/etc/mysql/my.cnf `

参考链接：
https://stackoverflow.com/questions/25842341/2003-cant-connect-to-mysql-server-on-localhost-10038
解决Navicat for MySQL 连接 Mysql 8.0.11 出现1251- Client does not support authentication protocol 错误
https://blog.csdn.net/qq_35793285/article/details/92597902
## Your password does not satisfy the current policy requirements
密码强度不合规，查看 mysql 初始的密码策略
```shell
SHOW VARIABLES LIKE 'validate_password%';
set global validate_password_policy=LOW; # 降级mysql密码策略为低等级
set global validate_password_length=6;  # 设置密码位数为6位
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456'; # 修改root用户的密码为简易密码
```
参考链接
https://blog.csdn.net/hello_world_qwp/article/details/79551789