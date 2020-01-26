# CentOS8 install node 
```shell
cd /home
wget https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-x64.tar.xz
tar -Jxvf node-v12.14.1-linux-x64.tar.xz
ln -s /home/node-v12.14.1-linux-x64/bin/node /usr/local/bin
ln -s /home/node-v12.14.1-linux-x64/bin/npm  /usr/local/bin
ln -s /home/node-v12.14.1-linux-x64/bin/npx  /usr/local/bin
node -v
```
firewall-cmd --zone=public --permanent --add-port=80/tcp && firewall-cmd --reload