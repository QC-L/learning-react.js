# HTML中的React安装及使用
> 本文通过教你如何在 HTML 中直接使用 React ，便于 React 基本语法的学习

### 配置安装
创建一个文件夹 first-react ，作为练习项目目录，并创建 index.html
```
mkdir first-react
cd first-react
touch index.html
```
在 first-react 中，初始化 package.json
```
npm init -y
```
在 first-react 中，下载 React 在HTML使用所必要的依赖
```
npm install --save react react-dom babel-standalone
```
### 使用
在 index.html 中，先编写基本内容
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>First-React</title>
</head>
<body>
</body>
</html>
```
#### 使用
1. 引入依赖
      在 index.html 的 head 中引入刚刚所下载的依赖
	```
	 <!-- 引入react核心库 -->
	 <script src="node_modules/react/dist/react.js"></script>
	 <!-- 引入 react-dom 库 -->
	 <script src="node_modules/react-dom/dist/react-dom.js"></script>
	 <!-- 引入 babel预编译 库 -->
	 <script src="node_modules/babel-standalone/babel.js"></script> 
	```
2. 在 body 中，编写 Hello World
    ```
    <div id="example"></div>
   <script type="text/babel">
    // 通过 ReactDOM 渲染
    // 参数1: 要渲染的内容
    // 参数2: 渲染位置
    ReactDOM.render(
        <h1>Hello, World!</h1>,
        document.getElementById('example')
    );
   </script>
    ```
至此，我们通过 React 在HTML实现了一个 Hello, World! 的效果