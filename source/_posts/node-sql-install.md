---
title: centOS8 下安装 node
comments: true
tags: 
- Linux

categories:
- [CentOS8,Install]
---
# CentOS8 install node 
## 安装node
```shell
cd /home
wget https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-x64.tar.xz
tar -Jxvf node-v12.14.1-linux-x64.tar.xz
ln -s /home/node-v12.14.1-linux-x64/bin/node /usr/local/bin
ln -s /home/node-v12.14.1-linux-x64/bin/npm  /usr/local/bin
ln -s /home/node-v12.14.1-linux-x64/bin/npx  /usr/local/bin
node -v
```
## 开放80端口
`firewall-cmd --zone=public --permanent --add-port=80/tcp && firewall-cmd --reload`
## node 后台运行
vim /etc/systemd/system/http1.service
```json
[Unit]
Description=http1 daemon
[Service]
ExecStart=/usr/local/bin/node  /home/my-server/app.js
Restart=always
[Install]
WantedBy=graphical.target
```