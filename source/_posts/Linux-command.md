---
title: linux-1
date: 2020-01-02 13:23:35
tags: 
- linux
---
## tar
Linux下常见的压缩包格式有5种:zip tar.gz tar.bz2 tar.xz tar.Z
其中tar是种打包格式,gz和bz2等后缀才是指代压缩方式:gzip和bzip2
`unzip filename.zip`
事实上, 从1.15版本开始tar就可以自动识别压缩的格式,故不需人为区分压缩格式就能正确解压
```shell
# x/extract v/verbose f/filename
tar -xvf filename.tar.gz
tar -xvf filename.tar.bz2
tar -xvf filename.tar.xz
tar -xvf filename.tar.Z
```