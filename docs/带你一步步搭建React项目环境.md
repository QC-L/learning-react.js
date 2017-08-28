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
### 2. 构建 build/webpack.base.config.js 基础配置
在build中，新建 `webpack.base.config.js` 作为 webpack 的基本构建配置
```
touch webpack.base.config.js
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
在 webpack.base.config.js 同级新建一个 utils.js 工具类
```
const config = require('../config')
const path = require('path')
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
```
在 webpack.base.config.js 文件中编写内容如下
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
npm install --save-dev webpack style-loader stylus-loader css-loader babel-loader url-loader  babel-core babel-preset-env babel-preset-react babel-preset-stage-0 stylus file-loader
```
### 3. 配置 webpack.dev.config.js
下载 webpack.dev.config.js 所需依赖
```
npm install --save-dev html-webpack-plugin friendly-errors-webpack-plugin eventsource-polyfill webpack-hot-middleware
```
创建 dev-client.js 并填写如下代码
```
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
```
创建 webpack.dev.config.js 文件，并填入如下代码
```
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')

baseWebpackConfig.entry = ['./build/dev-client'].concat(baseWebpackConfig.entry)

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
```
### 4.配置 dev-server.js 服务
下载 dev-server.js 对应的依赖文件
```
npm install --save-dev opn express http-proxy-middleware webpack-dev-middleware webpack-hot-middleware html-webpack-plugin-after-emit connect-history-api-fallback
```
创建 dev-server.js 代码内容如下
```
const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.config')

const port = process.env.PORT || config.dev.port
const proxyTable = config.dev.proxyTable

const app = express()

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  noInfo: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

const autoOpenBrowser = !!config.dev.autoOpenBrowser

const uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

let server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
```
### 5. 下载 React、ReactDOM
下载项目依赖
```
npm install --save react react-dom
```
并执行如下代码，查看效果 
```
node build/dev-server.js
```
### 6. 配置 standard-eslint 进行代码规范限制
下载 standard 相关依赖
```
npm install --save-dev standard eslint-config-standard eslint-config-standard-react eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-react eslint-friendly-formatter eslint-loader babel-eslint
```
并配置 webpack.base.config.js 的 rules, 添加如下规则
```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
}
```
在文件夹根目录中创建 `.eslintrc`, 并添加如下代码
```
{
  "extends": ["standard", "standard-react"]
}
```
### 7. 总结
```
.
├── package.json                 
├── README.md                    
├── .gitignore                   // git 忽略文件
├── .eslintrc.js                 // webpack 配置文件
├── test                         // test 目录：测试文件
├── dist                         // dist 目录：打包文件目录
├── build                        // build  目录：放置 build 打包文件
│   ├── dev-client               // 配置热加载 
│   ├── dev-server               // 配置开发服务器
│   ├── utils.js                 // 公用函数
│   ├── webpack.base.js          // webpack基础配置
│   ├── webpack.dev.js           // webpack开发环境配置
│   └── webpack.prod.js          // webpack生产环境配置
├── config
│   ├── dev.env.js               // 开发环境设置
│   ├── index.js                 // webpack所需的一些配置文件
│   └── prod.env.js              // 生产环境设置
├── src                          // 源文件目录
│   ├── assets                   // 资源 目录 
│       ├── images
│       │   ├── home.jpg
│       │   └── login.jpg
│       ├── components
│       │   ├── index
│       │   │   ├── header.js
│       │   ├── login
│       │   │   ├── login.js
│       └── styles               // 样式表
│       │   ├── common           // 共用样式
│       │   │   ├── varables.styl    
│       │   │   ├── index.styl       
│       │   ├── home
│       │   │   ├── home.styl
│   ├── modules                 // 模块目录 
│       ├── index               
│       │   ├── index.js       // 每个页面会有一个入口，统一为 index.js
│       ├── login              // home 页面 js 目录
│       │   ├── index.js       // 每个页面会有一个入口，统一为 index.js
├── static                     // 静态资源目录
│   └── .gitkeep
```