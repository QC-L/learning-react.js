# 带你一步步搭建React项目环境
> 此文章内容仿照 `vue-cli` 构建的模板环境搭建，适合已经学过 Vue 的同学或将要学习 Vue 的同学。

### 准备工作
新建项目目录
```
mkdir project-name
```
新建 `build` 、`config`、 `src`、`static`文件夹
```
cd project-name
mkdir build config src static
```
配置 `package.json`
```
npm init -y
```
### 1. 构建 config 配置目录
config 为配置选项目录，`webpack` 的基本的配置选项都在该目录中
新建js文件 `dev.env.js`、`prod.env.js`及`index.js`
```
cd config/
touch dev.env.js prod.env.js index.js
```
其中 `prod.env.js` 为生产环境变量，代码如下:
```
module.exports = {
  NODE_ENV: '"production"'
}
```
添加依赖 `webpack-merge`
```
npm install --save-dev webpack-merge
```
其中 `dev.env.js` 为开发环境变量，代码如下:
```
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
```
此处使用 `webpack-merge` 的原因是，保证两个配置文件使用的是一个对象。

最后, `index.js` 为 `webpack` 环境所需的一些配置选项，随着后续环境的完善，还会继续添加新的选项，其中目前代码如下:
```
module.exports = {
  build: {
    env: require('./prod.env')
  },
  dev: {
    env: require('./dev.env')
  }
}
```
### 2. 构建 build 构建目录
在build中，新建 `webpack-base.js` 作为 webpack 的基本构建配置
```
touch webpack-base.js
```
在 `config/index.js` 文件中修改为如下效果:
```
const path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '',
    assetsSubDirectory: 'static'
  },
  dev: {
    env: require('./dev.env'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}
```
在 webpack.base.js 文件中编写内容如下
```
const path = require('path')
const webpack = require('webpack')

const config = require('../config')
const utils = require('./utils')

module.exports = {
  entry: path.join(__dirname, '../src', 'index.js'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
```
最后，根据需求下载所有需要的开发依赖(dev)
```
npm install --save-dev webpack style-loader stylus-loader css-loader babel-loader url-loader  babel-core babel-preset-env babel-preset-react babel-preset-stage-0 stylus html-webpack-plugin file-loader
```
下载项目依赖
```
npm install --save react react-dom
```





dev-client 配置热加载
dev-server 配置开发环境服务
utils.js 公用函数
webpack.base.js webpack基础配置
webpack.dev.js webpack开发环境配置
webpack.prod.js webpack生产环境配置