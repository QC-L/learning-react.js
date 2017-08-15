# React生命周期
> Each component has several "lifecycle methods" that you can override to run code at particular times in the process. Methods prefixed with will are called right before something happens, and methods prefixed with did are called right after something happens.   --- React官方文档

#### 挂载
初始化过程如下:
* constructor
* componentWillMount
* render
* componentDidMount
#### 更新
当父组件给子组件传值时，会触发如下更新过程:
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* render
* componentDidUpdate
#### 卸载
当一个组件被从DOM中移除时，该方法别调用:
* componentWillUnmount
具体加载过程参考如下图:
![](http://otuabc0ck.bkt.clouddn.com/learning-reactjs/image/png/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)