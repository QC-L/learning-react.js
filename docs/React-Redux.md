# React-Redux
> Redux 是一种状态管理机制，将组件的状态交由中央统一管理。Redux 是一个有用的架构，但不是非用不可。

### Redux的基本概念
Redux 的三大核心概念:
* reducer
* store
* action
#### Store
Store 是中央数据管理，Store 职能如下:
1. 用于管理所有状态
2. 提供 `getState()` 获取 state
3. 通过 `dispatch()` 更新 state
#### Reducer
告诉 store 如何更新状态。
#### Action
Action 本质上是 JavaScript 普通对象。 Store 通过 dispatch 携带 Action ，触发 reducer 修改状态。
参数:
action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
其它参数，由你自己制定。

### 安装
在需要使用 redux 的地方安装 redux、react-redux
```
yarn add redux react-redux
```
or
```
npm i -S redux react-redux
```
### 使用
```
create-react-app react-redux-test
yarn add redux react-redux
```
在 src 下创建一个store.js，文件内容如下:
```
import { createStore } from 'redux'
import rootReducer from './reducers'

// 创建 状态管理器(仓库)
// 参数: reducer
const store = createStore(rootReducer)
export default store
```