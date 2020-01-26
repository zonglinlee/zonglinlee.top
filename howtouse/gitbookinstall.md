# Gitbook安装

## [gitbook 简介](https://baike.baidu.com/item/GitBook)
GitBook 是一个基于 Node.js 的命令行工具，可使用 Github/Git 和 Markdown 来制作精美的电子书，GitBook 并非关于 Git 的教程。
GitBook支持输出多种文档格式：

- 静态站点：GitBook默认输出该种格式，生成的静态站点可直接托管搭载Github Pages服务上
- PDF：需要安装gitbook-pdf依赖

使用GitBook制作电子书，必备两个文件：README.md和SUMMARY.md 
## gitbook-cli

gitbook 命令行工具，用来操控gitbook
```shell
npm install gitbook-cli -g
```
执行 `git init` 时会自动安装gitbook,耗时较长，请耐心等待
常用命令
```shell
#Create the directories and files for a book from its SUMMARY.md file (if existing) using

gitbook init

#You can serve a repository as a book using:

gitbook serve

#Or simply build the static website using:

gitbook build
```
## 须知
- 不再使用git作为版本管理工具
- 可以在gitbook space 中导入GitHub的仓库
- 不再支持 gitbook-cli 工具了

## 参考链接
https://yuzeshan.gitbooks.io/gitbook-studying/content/index.html
https://docs.gitbook.com/getting-started/quick-start
https://docs.gitbook.com/resources/gitbook-legacy/v2-differences

