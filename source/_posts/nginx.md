### windows nginx指南
http://nginx.org/en/docs/windows.html
新手指引
http://nginx.org/en/docs/beginners_guide.html
http://nginx.org/en/docs/
nginx配置常见误区
https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/ 
配置指南
https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx/

一定要结合日志查看nginx 服务运行状况
access.log error.log 这两个文件很重要
windows下载nginx目录中开启cmd窗口
start nginx.exe
nginx.exe -s stop  //暴力退出
nginx.exe -s quit  //优雅退出
nginx.exe -s reload  //重新加载配置文件
nginx.exe -V   //查看各个目录
nginx.exe -t   //检查配置文件是否正确 

### Linux下安装nginx

yum install nginx -y

RPM (Red Hat Package Manager) is an default open source and most popular package management utility for Red Hat based systems like (RHEL, CentOS and Fedora).The tool allows system administrators and users to install, update, uninstall, query, verify and manage system software packages in Unix/Linux operating systems. The RPM formerly known as .rpm file, that includes compiled software programs and libraries needed by the packages. This utility only works with packages that built on .rpm format.

rpm -ql nginx #查看配置文件和目录


nginx http 中server模块的配置
root是服务器的根目录，可以在server字段中配置，location中可以覆盖
index 字段在server中配置，location中也可以覆盖
The index variable tells NGINX which file to serve if none is specified.

### location 修饰符
- The = modifier
The requested document URI must match the specified pattern exactly(只能严格匹配一个字符串路径)，不能使用正则
- No modifier
The requested document URI must begin with the specified pattern.不能使用正则
- The ^~ modifier (类似于没有修饰符情况，它比正则匹配享有优先权)
Similar to the no-symbol behavior, the location URI must begin with the specified pattern.
The difference is that if the pattern is matched, Nginx stops searching for other patterns
- The ~ modifier (uri大小写敏感)
The requested URI must be a case-sensitive match to the specified regular expression
- The ~* modifier (uri大小写不敏感)
The requested URI must be a case-insensitive match to the specified regular expression
### location的匹配顺序(Search order and priority)
location 的匹配和先后顺序无关。
Nginx will search for matching patterns in a specific order:

- location blocks with the = modifier: If the specified string exactly matches the
requested URI, Nginx retains the location block.

- location blocks with no modifier: If the specified string exactly matches the
requested URI, Nginx retains the location block.

- location blocks with the ^~ modifier: If the specified string matches the beginning
of the requested URI, Nginx retains the location block.

- location blocks with ~ or ~* modifier: If the regular expression matches the
requested URI, Nginx retains the location block.

- location blocks with no modifier: If the specified string matches the beginning of
the requested URI, Nginx retains the location block.


### [会导致内部重定向的几个命令](https://www.digitalocean.com/community/tutorials/understanding-nginx-server-and-location-block-selection-algorithms)
Some directives that can lead to this type of internal redirect are:
- index
- try_files
- rewrite
- error_page

```shell
        root         /usr/share/nginx/html/data;
        index index.html;
        location  /a {
            root /home;
            #这里如果要留在这个block中可以使用 try_files $uri $uri.html $uri/
            #它会依次匹配/a文件  /a.html文件  /a/目录   

        }
        error_page 404 /404.html;
        location = /40x.html {
        }
```
情况1：假设根目录下只有/home
如果有一个请求 /a 过来，nginx会先匹配第一个location block，此时进入block之后，会重新定义根目录，即 /home ,然后就没有然后了，在access.log中会报404状态码，表示未找到页面，在error.log中它会记录 open() "/home/a" failed (2: No such file or directory)，接着它会走error_page ，导航到/404.html , nginx会匹配 /404.html 这个URI，此时相当于重新寻找要走的block，此时相当于以 / 开头，即根目录，它会去/usr/share/nginx/html/data下寻找404.html
情况2： 根目录下只有/home/a ，a文件夹里面什么都没有
此时nginx会进入a目录，access.log中报"GET /a/ HTTP/1.1" 403 ，error.log中报 directory index of "/home/a/" is forbidden
情况3： a中新建一个index.html文件
access.log 中状态码 200，返回的是a文件夹中的index.html. 它会默认index index.html.


### index 字段
Context: http, server, location. Variables are accepted.(即这几个http server,location 中都存在index字段。默认 index.html)
This defines the default page that Nginx will serve if no filename is specified in the
request (in other words, the index page). You may specify multiple filenames, and the first
file to be found will be served. If none of the specified files are found, and if the
autoindex directive is enabled (check the HTTP Autoindex module), Nginx will attempt to
generate an automatic index of the files. Otherwise, it will return a 403 Forbidden error
page. Optionally, you may insert an absolute filename (such as /page.html, based from
the document root directory) but only as the last argument of the directive.
Syntax: index file1 [file2…] [absolute_file];
Default value: index.html


HTTP 304 未改变说明无需再次传输请求的内容，也就是说可以使用缓存的内容