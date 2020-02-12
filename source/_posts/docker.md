docker架构
Linux 容器（Linux Containers，缩写为 LXC）。
docker 是基于 Linux容器的一种封装
docker启动了之后，本地 docker host(运行一个docker 后台服务，里面有docker containers和docker images)
docker container 是由 docker image 实例化产生的，比如有一个node镜像(image),可以从这个node镜像同时生成多个实例(container)

阿里 centos7 按时付费 下安装 docker
yum install -y docker-io
systemctl start docker (启动本地docker服务)
docker info
docker search node   (搜寻node的docker镜像)
docker pull node (从官网docker镜像仓库中拉取镜像到服务器)
docker run node (会运行node这个镜像名,生成一个不完整的Linux运行环境)
docker ps -a (查看所有运行的container)
docker exec -it containerID  /bin/bash (进入docker容器)

端口映射：比如我们的vps主机上运行了一个nginx的docker container，我们`curl http://localhost`是访问的此vps上的80端口，但是vps本身没有启动nginx服务，我们需要将请求映射到docker container中，即当有请求访问80端口的时候，我们转交给docker 中的nginx服务来处理

## 制作docker image
docker image是一层层加上去的，你可以基于别人的镜像叠加创建你自己的image
docker inspect node (查看镜像)

Dockerfile 文件(文件名就叫做Dockerfile,docker 打包的时候就会找这个文件，根据里面的配置来打包)
比如我们在vps 上创建了一个app文件夹
|_ _ _app(文件夹)
|       |_ _server.js(一个express服务器)
|       |_ _package.json
|_ _ _Dockerfile

```shell
#Dockerfile文件内容
FROM node   (由node镜像演变而来)
COPY ./app /app  (将当前目录下的app文件夹内的文件拷贝到镜像中根目录下的app文件夹中)
WORKDIR /app    (定义镜像中的工作目录)
RUN npm install  (打包阶段会执行此命令，安装项目依赖并打包到镜像中)
EXPOSE 3000     (暴露镜像中的端口)
CMD node server.js (运行镜像实例时候会执行此命令)
```

在当前目录下执行`docker build -t zonglinlee/node-server:latest  .` 
打包镜像，-t 用来指定镜像名称， . 表示在当前目录下找Dockerfile文件

打包完成之后运行镜像
`docker run -p 80:3000 -it zonglinlee/node-server `

## 发布image
docker login  (登录docker服务器仓库)
docker push zonglinlee/node-server (只会将新添加的层推送到服务器，其余的是基于node扩展的，node的部分不会推送)

## 指定数据盘
在执行 `docker rm containerID` 之后，会销毁容器，此时容器中的所有数据就丢失了
如果我们想在容器销毁之后还有数据备份在vps上，可以通过 -v 或 --volume 指定数据盘，此相当于一个硬链接，链接container中的一个文件夹到本地vps上，我们在所有container中更改的东西都会同样复制一份在vps上，并且container销毁后，本地主机上的还存在
`docker run -v ~/logger:/mnt -it ubuntu /bin/bash`
~/logger 指定的是vps上的文件夹
/mnt      指定的是container中的数据盘
此时如果执行 `docker inspect containerID`
会看到有个 Mounts 属性里面有source和destination字段，分别指的是vps上的源目录和container中的目标目录，即source为 ~/logger,destination 为 /mnt

```shell
cd ~ 
mkdir blog
cd blog
mkdir nodeserver
mkdir nginx
cd nodeserver
vim Dockerfile
# nodeserver 下的Dockerfile
FROM node
RUN npm i express-generator -g
RUN express app
WORKDIR app
RUN npm install
EXPOSE 3000
CMD ["npm","start"]

cd ../nginx
vim nginx.conf
# nginx.conf 文件
events{  
    use epoll;  
}
http {
  server {
    listen 80;                  #nginx监听80端口，转交 / 给blog服务，即http服务器。
    location / {
      proxy_pass http://blog:3000;   #这里的blog主机名就是docker-compose.yml中配置的服务
    }
  }
}

vim Dockerfile
# nginx 下的Dockerfile
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80


cd ../

vim docker-compose.yml 
# docker-compose.yml文件
#这个版本号很重要，它对应docker的版本，一定要去官网上查看，否则会报错。
# https://docs.docker.com/compose/compose-file/
version: '3.6'
services:               #一共有两个服务  blog  和 nginx服务
   blog:
     build: nodeserver    #这个express会开启一个localhost:3000的http服务器
     ports:
      - "3000:3000"    #端口映射

   nginx:
     build: nginx
     ports:
      - "80:80"



# 启动服务
pip install docker-compose

docker-compose up -d

# 查看服务启动是否成功
curl  http://locolhost:80  #会返回 `welcome to express` html

```