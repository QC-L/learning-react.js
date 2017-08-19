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
![](http://otuabc0ck.bkt.clouddn.com/learning-reactjs/image/png/cycle-life.png)

#### 具体代码
挂载生命周期具体代码如下:
```
    class CycleLife extends React.Component {
        // 挂载过程
        // 1.构造器函数
        constructor(props) {
            super(props);
            console.log('构造器函数');
        }
        // 组件将要挂载
        componentWillMount() {
            console.log('组件将要被挂载');
        }
        // 组件渲染
        render() {
            console.log('组件被渲染');
            return (
                <h1>Hello, World</h1>
            );
        }
        // 组件已经挂载
        componentDidMount() {
            console.log('组件已经被挂载');
        }
    }
```