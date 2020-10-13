---
title: docker入门
date: 2020-03-02 13:23:35
tags: 
 - docker
---
docker
<!-- more -->
docker架构
Linux 容器（Linux Containers，缩写为 LXC）。
docker 是基于 Linux容器的一种封装
docker启动了之后，本地 docker host(运行一个docker 后台服务，里面有docker containers和docker images)
docker container 是由 docker image 实例化产生的，比如有一个node镜像(image),可以从这个node镜像同时生成多个实例(container)

## [docker常用命令](https://www.runoob.com/docker/docker-command-manual.html)

阿里 centos7 按时付费 下安装 docker
yum install -y docker-io
systemctl start docker (启动本地docker服务)
docker info
docker search node   (搜寻node的docker镜像)
docker pull node (从官网docker镜像仓库中拉取镜像到服务器)
docker run node (会运行node这个镜像名,生成一个不完整的Linux运行环境)
docker ps -a (查看所有运行的container)
docker exec -it containerID  /bin/bash (进入docker容器)

### [docker run [OPTIONS] IMAGE [COMMAND] [ARG...]](https://www.runoob.com/docker/docker-run-command.html)

常用 options
-d: 后台运行容器，并返回容器ID；

-i: 以交互模式运行容器，通常与 -t 同时使用；

-P: 随机端口映射，容器内部端口随机映射到主机的端口

-p: 指定端口映射，格式为：主机(宿主)端口:容器端口

-t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；

--name="nginx-lb": 为容器指定一个名称；

--dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；

-e username="ritchie": 设置环境变量；

-m :设置容器使用内存最大值；

--net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；

--link=[]: 添加链接到另一个容器；

--expose=[]: 开放一个端口或一组端口；

--volume , -v: 绑定一个卷

### [docker build [OPTIONS] PATH | URL | -](https://www.runoob.com/docker/docker-build-command.html)

--tag, -t: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。

使用`当前目录`的 Dockerfile 创建镜像，标签为 runoob/ubuntu:v1。
`docker build -t runoob/ubuntu:v1 .`
使用URL github.com/creack/docker-firefox 的 Dockerfile 创建镜像。
`docker build github.com/creack/docker-firefox`

### [docker push [OPTIONS] NAME[:TAG]](https://www.runoob.com/docker/docker-push-command.html)

docker push : 将本地的镜像上传到镜像仓库,要先登陆到镜像仓库
`docker push myapache:v1`

## [制作docker image](https://cloud.tencent.com/developer/article/1667562)

docker image是一层层加上去的，你可以基于别人的镜像叠加创建你自己的image
docker inspect node (查看镜像)

Dockerfile 文件(文件名就叫做Dockerfile,docker 打包的时候就会找这个文件，根据里面的配置来打包)
Dockerfile是由一系列命令和参数组成的一个文件。其中，每条件命令都要大写（如：FROM），且其后都要跟一个参数（如：centos）。构建镜像时，Dockerfile中的命令会按顺序从上到下执行，在编写Dockerfile文件时应注意各条命令的顺序安排。Dockerfile文件中的每条命令，都会创建一个新的镜像层并会提交镜像。

比如我们在vps 上创建了一个app文件夹

```shell
|___app(文件夹)
|       |_ _server.js(一个express服务器)
|       |_ _package.json
|___Dockerfile
```

Dockerfile文件创建完成后，就可以通过 `docker build` 命令来构建新镜像。执行docker build命令时，Dockerfile中的命令都会被执行和提交，且每次提交都会创建一个新镜像。
新镜像构建完成后，可以将其推送到Docker Hub，这样就可以在需要的时候轻松获取和使用镜像

```shell
docker login
docker push web_test
```

Dockerfile常用命令
![dockerfile](/images/dockerfile.png)

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
`docker run -p 80:3000 -it zonglinlee/node-server`

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

## [docker 容器连接](https://cloud.tencent.com/developer/article/1667560)

在使用Docker容器时，我们需要访问容器的内部网络，或需要在容器间相互访问。Docker 容器默认不会开放任何端口，因此需要将容器与宿主机进行端口映射，使容器可外部访问。而容器间互相访问，除了可以基于端口映射进行访问外，还可以通过容器链接（Link）的方式，也可以通过Docker 网络（Networking）实现

### 一. 端口映射与外部访问容器

比如我们的vps主机上运行了一个nginx的docker container，我们`curl http://localhost`是访问的此vps上的80端口，但是vps本身没有启动nginx服务，我们需要将请求映射到docker container中，即当有请求访问80端口的时候，我们转交给docker 中的nginx服务来处理
容器与宿主机间建立端口映射关系时，可以在运行容器时使用-P或-p参数指定端口映射

### 容器链接（Link）

在执行`docker run`命令时候可以使用--link参数可以让容器间安全的进行互联
`docker run -d --name db -e POSTGRES_PASSWORD=123456  postgres:9.4`
`docker run -d -P --name web --link db:db training/webapp python app.py`
--link表示建立容器互联，参数为name:alias，name是要链接的容器名称，alias是我们取得别名
通过--link，Docker 会在两个互联的容器之间创建了一个安全的隧道，且不用映射它们的端口到宿主主机上。在前面我们启动db容器的时，并没有使用-p和-P参数，从而避免了暴露数据库端口到外部网络上，增加了容器的安全性。

### Docker网络（Networking）

Docker Networking允许用户创建自己的网络，容器间可以通过这个网络互相通讯。Docker Networking允许容器跨越不同的宿主机通讯，且网络配置方式更灵活。
Docker Engine 会在引擎安装时自动创建一个名为bridge（桥接）网络，这个网络会与docker0(Docker内部网络)相对应。
除此之外，用户还可以自行创建bridge或overlay类型的网络。bridge网络适用于单台宿主机运行的单Docker引擎环境，而overlay网络允许我们跨多台宿主机进行通讯。
创建一个网络: `docker network create -d bridge test-net`
-d 参数指定 Docker 网络类型，有 bridge、overlay
查看网络：`docker network ls`
创建网络后，可以在创建容器时通过--network参数指定容器要使用的网络：
`docker run -d --name db2 --network=test-net training/postgres`
查看的网络情况: `docker network inspect test-net`
另外还可以进入容器内部通过 `ping containerName` 的方式查看两个容器是否连通

## [Docker数据卷](https://cloud.tencent.com/developer/article/1667563)

在docker容器中运行的web服务产生的日志,我如何在宿主机上看到?我想安装mysql或者redis等,配置文件如何配置,可以进到容器去设置,但是容器出现问题或者采重启怎么办呢?种种疑问都说明一个问题--数据共享和持久化
在Docker的使用过程中往往需要对数据进行持久化，或者需要在多个容器之间进行数据共享，所以这就涉及到Docker容器的数据操作。容器中数据管理主要有两种方式：数据卷和数据卷容器。
数据卷是一个特殊的目录，它将主机目录直接映射进容器。可供一个或多个容器使用。
数据卷的特性：

- 数据卷在容器启动时初始化，如果容器使用的镜像在挂载点包含了数据，这些数据会拷贝到新初始化的数据卷中
- 数据卷可以在容器之间共享和重用
- 可以对数据卷里的内容直接修改，修改回马上生效，无论是容器内操作还是本地操作
- 对数据卷的更新不会影响镜像的更新
- 数据卷会一直存在，即使挂载数据卷的容器已经被删除

```shell
docker volume create test-vol # 创建数据卷 test-vol
docker volume ls # 查看数据卷
docker volume inspect test-vol #  查看具体数据卷的信息
# 两种挂载数据卷的方式
docker run --name 容器名 -it --mount source=卷名,target=容器内绝对路径(挂载点) 镜像名
docker run --name 容器名 -it -v 卷名:容器内绝对路径(挂载点) 镜像名
docker volume rm test-vol # 删除指定数据卷
```

### 数据卷容器

一个正常的docker容器，专门用来提供数据卷供其它容器挂载的,这个容器不运行应用程序
创建数据卷容器后，我们可以通过 `--volumes-from` 选项，将一个数据容器挂载到其它容器

## docker-compose

Compose 定位是定义和运行多个 Docker 容器的应用。
如果我们的项目需要运行多个docker container，需要一个个实例化对应的docker image文件，运行一个镜像需要一堆的参数，如 --network, --volume, -p 等等，如果有多个容器组合成一个项目，比如一个 webserver，数据库，缓存等等容器，我们就需要一个个的定义网络等参数，然后一个个启动，有了 compose 我们只需要一个简单的 `docker-compose up` ，它就会自动帮我们构建镜像，配置网络等功能。

Compose 有两个重点:
docker-compose.yml  配置文件
docker-compose 命令行工具
Compose 使用的三个步骤：

- 使用 Dockerfile 定义应用程序的环境。
- 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
- 最后，执行 docker-compose up 命令来启动并运行整个应用程序。

```yaml
# https://juejin.im/post/6844903891977371662
version: '3' # 定义版本，不指定默认为版本 1，新版本功能更多

services: # 容器，就像 docker run
   db: # 名称，它也是 network 中 DNS 名称
     image: mysql:5.7 # 镜像，如果像自定义镜像可以不指定这个参数，而用 build
     volumes: # 定义数据卷，类似 -v
       - db_data:/var/lib/mysql
       - .:/aaa # 挂载当前目录到容器中的 /aaa 无需使用绝对路径
     restart: always # 类似 --restart
     # 'no' 默认，不自动重启，以为 no 是 yaml 关键字所以加引号
     # always 总是自动重启
     # on-failure 当失败时自动重启，也就是 exit code 不为 0 时
     # unless-stopped 除非手动停止，否者一直重启
     environment: # 定义环境变量，类似 -e
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
   wordpress: # 第二个容器
     labels:
       com.example.description: "This label will appear on all containers for the web service"
     # 为容器添加 Docker 元数据（metadata）信息。例如可以为容器添加辅助说明信息。
     depends_on: # 帮助 compose 理解容器之间的关系
     # db 将会在 wordpress 之前被启动
     # 关闭时 wordpress 将会在 db 之前关闭
     # 我们指定只启动 wordpress，db 也会跟着启动
       - db
     image: wordpress:latest
     ports: # 端口，类似 -p
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress

volumes: # 可选，需要创建的数据卷，类似 docker volume create
  db_data:

networks: # 可选，需要创建的网络，类似 docker network create

```
