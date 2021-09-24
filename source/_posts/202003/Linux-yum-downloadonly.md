---
title: Linux yum 只下载依赖不安装
tags: 
 - Linux
 - yum
categories: Linux
abbrlink: 9b9da0c4
date: 2020-03-07 22:05:25
top_img: 2020-03-11_215508.png
cover: 2020-03-11_215508.png
keywords:
description:
mathjax:
katex:
hide:
---

# yum --downloadonly
yum命令的参数有很多，其中就有只是下载而不需要安装的命令，并且也会自动解决依赖；通常和 --downloaddir 参数一起使用。

示例：
```bash
yum install --downloadonly --downloaddir=/tmp/ vsftpd

yum reinstall --downloadonly --downloaddir=/tmp/ vsftpd
```

说明：如果该服务器已经安装了需要下载的软件包，那么使用 install下载就不行，可以使用reinstall下载。 放心（不会真的安装和重新安装，因为后面加了 --downloadonly，表明只是下载。

如果提示没有--downloadonly选项则需要安装yum-plugin-downloadonly软件包；
```bash
yum install yum-plugin-downloadonly
```

# yumdownloader

如果只想通过 yum 下载软件的软件包，但是不需要进行安装的话，可以使用 yumdownloader 命令；   yumdownloader 命令在软件包 yum-utils 里面。

```bash
yum install yum-utils -y
```
常用参数说明：
```bash
--destdir 指定下载的软件包存放路径
--resolve 解决依赖关系并下载所需的包
```
示例：
```bash
yumdownloader --destdir=/tmp --resolve httpd
```

# reposync
reposync 可以将远端yum仓库里面的包全部下载到本地。一般在构建自己的yum仓库时使用，同步仓库做成本地yum源，就不会遇到网络经常更新包而头痛的事情了。 该命令也是来自与 yum-utils 里面
```bash
yum install yum-utils -y
```
常用参数说明：
```bash
-r    指定已经本地已经配置的 yum 仓库的 repo源的名称。
-p    指定下载的路径
```
示例：
```bash
reposync -r epel -p /opt/local_epel
```
