# React及webpack环境搭建
> 随着前端技术的快速迭代更新，各种打包工具以及框架打破了传统前端的开发方式。使得前端开发更系统，更工程化。
### 目录
* webpack简介
* webpack如何编译ES6
* webpack如何编译react
* react与webpack搭建工程项目
### webpack简介
webpack 是一个现代 JavaScript 应用程序的模块打包器 (module bundler) 。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图 (dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成少量的 bundle - 通常只有一个，由浏览器加载。

它是高度可配置的，但是，在开始前你需要先理解四个核心概 念：**入口(entry)**、**输出(output)**、**loader**、**插件(plugins)**。