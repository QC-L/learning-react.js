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
1. 挂载
    ```
        class CycleLife extends React.Component {
            // 挂载过程
            // 1.构造器函数
            constructor(props) {
                super(props);
                console.log('构造器函数');
            }
            // 2.组件将要挂载
            componentWillMount() {
                console.log('组件将要被挂载');
            }
            // 3.组件渲染
            render() {
                console.log('组件被渲染');
                return (
                    <h1>Hello, World</h1>
                );
            }
            // 4.组件已经挂载
            componentDidMount() {
                console.log('组件已经被挂载');
            }
        }
    ```
2. state 变更触发更新
    ```
        class CycleLife extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    time: new Date()
                }
            }
            changeTime = () => {
                this.setState({
                    time: new Date()
                })
            }
            componentDidMount() {
                // 每隔一秒修改时间, 实现时钟效果
                setInterval(this.changeTime, 1000)
            }
            // 1. 判断是否需要组件更新, 默认 true
            shouldComponentUpdate(nextProps, nextState) {
                // 返回 false 时, 后续函数不执行
                return true
            }
            // 2. 组件将要更新
            componentWillUpdate(nextProps, nextState) {
                console.log('nextProps: ', nextProps)
                console.log('nextState: ', nextState)
                console.log('组件将要被挂载')
            }
            // 3. 组件被重新渲染
            render() {
                console.log('组件被重新渲染')
                return (
                    <h1>{this.state.time.toLocaleString()}</h1>
                );
            }
            // 4. 组件已经更新
            componentDidUpdate() {
                console.log('组件已经被挂载')
            }
        }
        ReactDOM.render(
            <CycleLife/>,
            document.getElementById('root')
        );
    ```
3. 父 -> 子 传递属性时, 发生的生命周期
    ```
        class CycleLife extends React.Component {
            static propTypes = {
                content: React.PropTypes.string
            }
            constructor(props) {
                super(props)
            }
            // 1. 父 -> 子传递props时, 触发
            componentWillReceiveProps(nextProps, nextState) {
                console.log('组件属性被父级修改')
                console.log('nextProps: ', nextProps)
                console.log('nextState: ', nextState)
            }
            // 2. 判断是否需要组件更新, 默认 true
            shouldComponentUpdate(nextProps, nextState) {
                console.log('判断组件是否需要更新')
                // 返回 false 时, 后续函数不执行
                return true
            }
            // 3. 组件将要更新
            componentWillUpdate(nextProps, nextState) {
                console.log('nextProps: ', nextProps)
                console.log('nextState: ', nextState)
                console.log('组件将要被挂载')
            }
            // 4. 组件被重新渲染
            render() {
                console.log('组件被重新渲染')
                return (
                    <h1>{this.props.content}</h1>
                );
            }
            // 5. 组件已经更新
            componentDidUpdate() {
                console.log('组件已经被挂载')
            }
        }
        class FatherComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    content: '生命周期展示'
                }
            }
            componentDidMount() {
                this.setState({
                    content: '生命周期展示被改变'
                })
            }
            render() {
                return (
                    <CycleLife content={this.state.content}/>
                )
            }
        }
        ReactDOM.render(
            <FatherComponent />,
            document.getElementById('root')
        );
    ```