---
title: Learning-Hexo
tags: 
 - Hexo
 - markdown
 
categories: Hexo
top_img: 
abbrlink: 2e10121f
date: 2020-03-07 11:05:25
keywords:
description:
mathjax:
katex:
hide: 
---


# Hexo 使用说明 

## Hexo的个人设置

1. [Butterfly主题](https://jerryc.me/posts/21cfbf15/) [配置优化](https://www.lucfzy.com/2020/02/butterfly-theme/)
1. 使用 hexo-deployer-git 发布到Github上
1. 使用 hexo-abbrlink 修改文章的链接地址 :abbrlink
1. 使用 hexo-generator-search 提供本地搜索功能
1. 使用 hexo-renderer-markdown-it 替换原有的 markdown 功能
1. 使用 hexo-asset-image 图片插件



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
清除缓存文件 (db.json) 和已生成的静态文件 (public)。
在某些情况（尤其是更换主题后），如果发现您对站点的更改无论如何也不生效，您可能需要运行该命令。

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

### Hexo三连
```batch
hexo clean && hexo g && hexo d
```

# MarkDown 语法

1. [在线阅读](http://xianbai.me/learn-md/)

2. [Code on Github](https://github.com/LearnShare/Learning-Markdown/tree/v2)




