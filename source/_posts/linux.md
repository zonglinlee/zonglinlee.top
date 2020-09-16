---
title: Linux-2
tags: 
- linux
---
Ctrl+ALT+t 打开终端

```shell
# /usr/src 系统级的源码目录。 /usr/local/src 用户级的源码目录。
# /usr/local/bin  用于存放用户的软件安装软连接
cd /home/lee/Downloads/
wget nodejs-url
tar -Jxvf filename
mv nodejs-directory /usr/local/src
# 创建软连接要使用绝对路径？？
sudo ln -s /usr/local/src/nodejs-direcory/bin/node /usr/local/bin/
node --version
```
