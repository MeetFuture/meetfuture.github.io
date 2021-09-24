---
title: Learning-Hexo
tags: 
 - Hexo
 - markdown
 
categories: Hexo
top_img: 2020-03-11_215625.png
cover: 2020-03-11_215625.png
abbrlink: 2e10121f
date: 2020-01-01 00:00:00
keywords:
description:
mathjax:
katex:
hide: 
---


# Hexo 使用说明 

## Hexo三连
 1.清理目录   2.生成静态文件   3.打包部署到服务器
```batch
hexo clean && hexo g && hexo d
```

## Hexo的个人设置

1. [Butterfly主题](https://jerryc.me/posts/21cfbf15/) [配置优化](https://www.lucfzy.com/2020/02/butterfly-theme/)
1. hexo-deployer-git 发布到Github上
1. hexo-abbrlink 修改文章的链接地址 :abbrlink
1. hexo-generator-search 提供本地搜索功能
1. hexo-renderer-markdown-it 替换原有的 markdown 功能


## 新建
### 新建文章 
```
hexo new 'title'
```
### 新建页面
```
hexo new page xxx
```

## 部署发布
### clean
```
hexo clean
```
清除缓存文件 (db.json) 和已生成的静态文件 (public)

### generate
```batch
hexo generate
hexo g
```
生成静态文件。

### deploy
```
hexo deploy
```
部署网站。


# MarkDown 语法

1. [在线阅读](http://xianbai.me/learn-md/)

2. [Code on Github](https://github.com/LearnShare/Learning-Markdown/tree/v2)




