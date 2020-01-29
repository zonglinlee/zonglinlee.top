---
comments: true
tag: 
- git
---
## [submodule](https://blog.phpgao.com/git_submodule.html)
submodule中文件变更了,在主工作目录中是没有办法add并commit的，分而治之，主模块提交主模块的，子模块提交自己的，子模块提交后，主模块会感知到，从而再在主模块中提交即可
###  添加 `submodule`
将GitHub上这个模块添加到本地git仓库的 usr/plugins/ExternalTool 中作为一个submodule
`git submodule add https://github.com/phpgao/ExternalTool.git   usr/plugins/BaiduSubmit`
信息会被记录在 `.gitmodules` `.git/config` 两个文件中
### 移除 `submodule`
首先我们反初始化,此时 .git/config 已被重写，BaiduSubmit的相关信息已经不存在了
`git submodule deinit usr/plugins/BaiduSubmit`
删除子模块和.gitmodules 文件中的相关信息
`git rm usr/plugins/BaiduSubmit`
## --allow-unrelated-histories
报错：fatal: refusing to merge unrelated histories ,合并不相关的历史记录
`git pull origin master --allow-unrelated-histories`
## 远程合并到本地
`git remote -v`     查询远程的代码版本
### 直接合并
`git pull origin master` 拉取远端origin/master分支并合并到当前分支
`git pull origin dev` 拉取远端origin/dev分支并合并到当前分支
### `git fetch + merge`(需要手动删除分支)
拉取到本地并新建一个分支 然后 手动合并
在本地建立master1分支，并下载远端的origin/master分支到本地的master1分支中
`git fetch origin master:master1`
查看本地master1分支与当前分支的版本差异
`git diff master1`
合并本地分支master1到当前分支
`git merge master1`
删除本地分支master1
`git branch -D master1`