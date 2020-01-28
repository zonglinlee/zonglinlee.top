Xshell6 远程登录 vps (OS:CentOS8)
## 检测pip
whereis pip <br>
pip: /usr/bin/pip3.6<br>
这个版本支持 chacha20-ietf-poly1305加密方式

`pip3.6 install https://github.com/shadowsocks/shadowsocks/archive/master.zip -U`

## [安装 libsodium 包](https://www.24kplus.com/linux/287.html)
现在ss服务端还启动不了，需要安装libsodium
```shell
cd /home<br>
wget https://download.libsodium.org/libsodium/releases/libsodium-1.0.18-stable.tar.gz
tar -zxf libsodium-1.0.18-stable.tar.gz
cd libsodium-stable
#编译安装
./configure --prefix=/usr
make && make check
sudo make install
sudo ldconfig
```

解决错误一： configure: error: no acceptable C compiler found in $PATH 

yum install gcc

解决错误二： config.status: error: Something went wrong bootstrapping makefile fragments for automatic dependency tracking. 

yum install make -y


## 配置ss服务端
whereis ssserver<br>
ssserver: /usr/local/bin/ssserver<br>
### 创建shadowsocks启动配置文件
vim /etc/shadowsocks.conf
```json
{
    "server":"0.0.0.0", 
    "server_port":10443,
    "local_port":1080,
    "password":"password",
    "timeout":60,
    "method":"chacha20-ietf-poly1305"
}

```
server_port:服务器监听端口

password:要和客户端ss密码一致

method:加密方式和客户端一致

### 开启端口号
```shell
firewall-cmd --zone=public --permanent --add-port=10443/tcp 
firewall-cmd --reload

#查看开启的端口号
firewall-cmd --zone=public --permanent --list-ports
```

### 将ss添加到Systemd 服务管理中
vim /etc/systemd/system/shadowsocks.service
```service
[Unit]
Description=shadowsocks daemon
[Service]
ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks.conf Restart=always
[Install]
WantedBy=graphical.target
```
开启服务<br>
systemctl enable shadowsocks

启动服务<br>
systemctl start shadowsocks

检查 shadowsocks 服务是否已成功启动<br>
systemctl status shadowsocks -l
## [CentOS8 开启 BBR](https://nodeedge.com/centos8-bbr.html)
开启bbr
```shell
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
sysctl -p
验证bbr
sysctl -n net.ipv4.tcp_congestion_control
lsmod | grep bbr
```
## [安装net-speeder](https://github.com/snooda/net-speeder)
wget https://github.com/snooda/net-speeder/archive/master.zip<br>
unzip master.zip

安装epel 包<br>
wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm<br>
rpm -ivh epel-release-6-8.noarch.rpm

yum install libnet libpcap libnet-devel libpcap-devel

libpcap-devel现有的yum源匹配不到，到 [centos.pkgs.org](https://centos.pkgs.org/8/centos-powertools-x86_64/libpcap-devel-1.9.0-3.el8.i686.rpm.html) 可以找到安装
直接执行 `dnf --enablerepo=PowerTools install libpcap-devel` 即可安装

编译前还要安装一个包
```shell
yum install libnet-devel
编译
cd net-speeder-master/
sh build.sh
查看网卡信息(ens3)
ip address
关闭tso
ethtool -K ens3 tso off
```
开启单边加速(前台运行)<br>
./net_speeder ens3 "ip"

开启单边加速(后台运行)
vim /etc/systemd/system/netspeeder.service
```json
[Unit]
Description=netspeeder

[Service]
TimeoutStartSec=0
ExecStart=/home/net-speeder-master/net_speeder ens3  "ip" 

[Install]
WantedBy=multi-user.target

```
systemctl enable netspeeder<br>
启动服务<br>
systemctl start netspeeder<br>
systemctl status netspeeder

## [vps上安装kcptun](https://blog.kuoruan.com/102.html)
服务端和客户端用同一个版本
在GitHub releas上找到kcptun包，使用wget命令下载到vps上
```shell
cd /home
mkdir kcptun
cd kcptun 
wget https://github.com/xtaci/kcptun/releases/download/v20200103/kcptun-linux-amd64-20200103.tar.gz
# 解压
tar -zxf kcptun-linux-amd64-20200103.tar.gz
```

创建启动配置文件
vim kcptun.conf
```json
{
    "crypt": "salsa20",
    "key": "password",
    "mode": "fast2",
    "listen":":29900",
    "target":"127.0.0.1:10443",
    "nocomp": false,
    "datashard": 70,
    "parityshard": 30
}
```
上面的配置一定要和客户端的一致，key是密码，listen是客户端访问服务端时候监听的端口
target是要加速的vps上的服务，它通信的是vps上的ss，所以ip为127.0.0.1，端口号就是ss服务监听的的端口号
服务端kcptun 和 ss 各自提供自己的服务，各自监听自己的端口 ，kcptun 提供 ss端口的加速服务
### 开启端口号(这个用udp协议)
 firewall-cmd --zone=public --permanent --add-port=29900/udp <br>
 firewall-cmd --reload
 
创建服务脚本
vim /etc/systemd/system/kcptun.service
```json
[Unit]
Description=kcptun

[Service]
TimeoutStartSec=0
ExecStart=/home/kcptun/server_linux_amd64 -c  /home/kcptun/kcptun.conf


[Install]
WantedBy=multi-user.target

```
systemctl enable kcptun<br>
启动服务<br>
systemctl start kcptun<br>
systemctl status kcptun

## 客户端(windows7)安装kcptun
由于没有提供GUI图形界面，解压出来的只有.exe文件，直接执行没有办法传入配置
客户端 ss 访问 kcptun客户端，然后kcptun 访问vps上的kcptun server端
### 创建客户端exe文件的控制VBScript脚本
vim run.vbs
```vbs
Dim RunKcptun
Set fso = CreateObject("Scripting.FileSystemObject")
Set WshShell = WScript.CreateObject("WScript.Shell")
'获取文件路径
currentPath = fso.GetFile(Wscript.ScriptFullName).ParentFolder.Path & "\"
'配置文件路径
configFile = currentPath & "client-config.json"
'日志文件
logFile = currentPath & "kcptun.log"
'软件运行参数
exeConfig = currentPath & "client_windows_amd64.exe -c " & configFile
'拼接命令行
cmdLine = "cmd /c " & exeConfig & " > " & logFile & " 2>&1"
'启动软件
WshShell.Run cmdLine, 0, False
'等待1秒
'WScript.Sleep 1000
'打印运行命令
'Wscript.echo cmdLine
Set WshShell = Nothing
Set fso = Nothing
'退出脚本
WScript.quit
```
创建启动配置脚本
```json
{
    "localaddr": ":12948",
    "remoteaddr": "10.10.10.10:29900",
    "key": "password",
    "crypt": "salsa20",
    "mode": "fast2",
    "conn": 1,
    "autoexpire": 60,
    "mtu": 1350,
    "sndwnd": 128,
    "rcvwnd": 1024,
    "datashard": 70,
    "parityshard": 30,
    "dscp": 46,
    "nocomp": false,
    "acknodelay": false,
    "nodelay": 0,
    "interval": 40,
    "resend": 0,
    "nc": 0,
    "sockbuf": 4194304,
    "keepalive": 10
}

```
localaddr为 :12948,本地监听端口，供ss访问<br>
key为password,需和服务端保持一致<br>
remoteaddr为vps的ip地址以及vps上kcptun监听的端口<br>
### 客户端ss配置
服务器 IP 填写本机：127.0.0.1<br>
服务器端口填写：12948


双击run.vbs启动测试。