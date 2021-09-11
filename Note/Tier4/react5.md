

# 1.redux 基础

### 1.action creators

作用:统一管理所有的Actions

```js
//action creator
export let actions = {
    changeName: (name) => {
        return { type: TYPES.CHANGE_NAME, name: name }
    },
    changeAge: (age) => ({ type: TYPES.CHANGE_AGE, age: age }),
    changeSex: sex => ({ type: TYPES.CHANGE_SEX, sex: sex })
    //异步请求
    changeAge(){
        return (dispatch)=>{
              //异步 请求后
            dispatch(action)
        }
    }
}

```



### 2.action types

作用:统一管理所有的types

```jsx
//action types
const TYPES = {
    CHANGE_NAME: "CHANGE_NAME",
    CHANGE_AGE: "CHANGE_AGE",
    CHANGE_SEX: "CHANGE_S"
}

export const CHANGE_NAME='CHANGE_NAME'
```



### 3.reducer拆分

作用:reducer进行拆分，这样便于后期扩展和维护

Eg:order.js模块

```js
//初始值
const initState={
    list:[]
}

//action types
const TYPES={
    CHANGE_LIST:"CHANGE_ORDER_LIST"
} 

//reducer
const reducer=(state=initState,action)=>{
    switch(action.type){
        //{type:"changeList",arr:[{},{}]}
        case TYPES.CHANGE_LIST:
            return {
                ...state,
                list:action.arr
            }
        default:
            return state;
    }
}
// action creator
export let actions={
    changeList:arr=>{
        return {type:TYPES.CHANGE_LIST,arr:arr}
    }
}
export default reducer
```

Shop.js

```js
//初始值
const initState={
    list:[]
}

//action types
const TYPES={
    CHANGE_LIST:"CHANGE_SHOP_LIST"
}
 
//reducer
const reducer=(state=initState,action)=>{
    switch(action.type){
        //{type:"changeList",arr:[{},{}]}
        case TYPES.CHANGE_LIST:
            return {
                ...state,
                list:action.arr
            }
        default:
            return state;
    }
}
// action creator
export let actions={
    changeList:arr=>{
        return {type:TYPES.CHANGE_LIST,arr:arr}
    }
}
export default reducer
```

通过combineReducers 合并reducer . [src/store/index.js]

```js
import { createStore,combineReducers } from "redux"
//引入模块
import order from "./modules/order"
import shop from "./modules/shop"
import user from "./modules/user"

// 合并reducer
let rootReducer=combineReducers({
    // 模块名：模块对应的reducer
    order:order,
    shop,
    user
})

//创建仓库
let store = createStore(rootReducer)


//导出仓库
export default store
```



### 4.redux devTools调试工具

#### 1.安装扩展程序到浏览器

1.百度--》码云--》搜索：redux-dev-tools --> 选择：“[redux-devtools-extension](https://gitee.com/fork-bucket/redux-devtools-extension)”  --》for Chrome  : [last releases](https://github.com/zalmoxisus/redux-devtools-extension/releases),  --->v2.17.1 firefox.zip 

2.谷歌浏览器 右上角  ...  --->更多工具---》扩展程序---》加载已解压的扩展程序--》选择firefox

#### 2.使用

###### 安装依赖

```cmd
npm install --save redux-devtools-extension
```

###### 使用

```js
import {composeWithDevTools} from "redux-devtools-extension"
//创建仓库
let store = createStore(rootReducer,composeWithDevTools(/*中间件*/))
```



# 2.react-redux

#### 1.安装

```
cnpm i react-redux --save
```

#### 2.入口文件通过Provider组件将store和App组件关联

#### 3.将组件改为容器型组件

```

```



#### 4.容器型组件VS展示型组件

|                 | 容器型组件                  | 展示型组件      |
| --------------- | --------------------------- | --------------- |
| 关注点          | 逻辑[取数据、更新状态]      | UI的展现        |
| 对redux是否感知 | 是                          | 否              |
| 读数据          | 从redux的store中获取        | 从props中获取   |
| 写数据          | 发送redux actions           | 调用props的回调 |
| 如何创建        | 通过react-redux connect创建 | 手写            |

# 3.redux高阶

### 1.bindActionCreators

组件想要所有的actions上的方法进行dispatch

```js
import { actions } from "../store";
import { bindActionCreators } from "redux";
```

```js
const mapDispatchToProos = (dispatch) => {
  //通过bindActionCreators 将actions上的方法统统导入到fn
  return {
    fn: bindActionCreators(actions, dispatch),
    //    changeName:(name)=>dispatch(actions.changeName(name ))
  };
};
```



### 2.selectors

仓库：

```js
//导出 selector 
export const getList = state => state.order.list
export const getFilter = state => state.order.filter;
```

组件：

```js
const mapStateToProps = (state) => {
  return {
    info: getInfo(state),
    orderList: getList(state),
    shopList: getShopList(state),
    name:getName(state)
  };
};
```



### 3.reselect

reselect：只有依赖的项变化了，才重新计算,比如：总价、平均分

###### 安装：

```
npm i reselect --save
```

使用：

```js
import {createSelector} from 'reselect'

//reselect：只有依赖的项变化了，才重新计算
export const getList = state => state.order.list
export const getFilter = state => state.order.filter;

export const getShowList=createSelector(
  [getList,getFilter],
  (list,filter)=>{
    return filter===Status.all?list:list.filter(item=>item.status===filter)
  }
)
```

### 4.redux middleware

![04 redux 中间件](/Users/haoliuting/Desktop/1228/day20-react5/笔记/04 redux 中间件.png)

#### 1.自定义中间件

##### 语法

```js
let myMiddleware=function(store){
  	return function(next){
      return function(action){
        ....
      }
    }
}

let  myMiddleware=store=>next=>action=>{
  ....
}
```

##### 案例：

```js
//打印的中间件
let logger = store => next => action => {
    console.group("本次触发的action:", action)
    console.log("上一个状态：", store.getState());
    next(action)
    console.log("下一个状态：", store.getState());
    console.groupEnd()
}
//处理错误
let error = store => next => action => {
    try{
        next(action)
    }catch(e){
        console.group("错误了！！！！")
        console.log(e);
        console.groupEnd()
    }
}
```

#### 2.第三方中间件

##### redux-logger

1.安装

```
cnpm i redux-logger --save
```

2.引入

```js
//引入第三方中间件
import reduxLogger from "redux-logger"
```

3.使用

```js
// 使用第三方中间件
let store=createStore(rootReducer,composeWithDevTools(applyMiddleware( reduxLogger)))
```

##### redux-thunk

1.安装

```
cnpm i redux-thunk --save
```

2.引入，通过applyMiddleware注入到仓库中

```js
import thunk from "redux-thunk"

// 使用第三方中间件
let store=createStore(rootReducer,composeWithDevTools(applyMiddleware( thunk,reduxLogger)))

```

3.使用[order.js]

```js
export let actions = {
    changeList: arr => {
        return { type: TYPES.CHANGE_LIST, arr: arr }
    },
    //修改filter 的action
    changeFilter: filter => ({ type: TYPES.CHANGE_FILTER, filter }),
    //删除
    del: index => ({ type: TYPES.DEL, index }),
    ////发请求///////////////////////////////////////////////////////////////////////
    /*reqList: () => {
        return (dispatch, getState) => {
            fetch("/mock/order.json").then(res => res.json()).then(res => {
                console.log(res);
                // 改list
                dispatch(actions.changeList(res.d))
            })
        }
    }*/
    reqList: () => (dispatch, getState) => {
        fetch("/mock/order.json").then(res => res.json()).then(res => {
            console.log(res);
            //    改list
            dispatch(actions.changeList(res.d))
        })
    }
}
```



# 4.项目目录结构设计

#### 按类型划分

![05 按照类型划分](/Users/haoliuting/Desktop/1228/day20-react5/笔记/05 按照类型划分.png)

#### 按功能划分



![06 按照功能划分](/Users/haoliuting/Desktop/1228/day20-react5/笔记/06 按照功能划分.png)

#### duck鸭子模式【推荐】

```js
-src
	-store
		index.js //创建仓库并导出
		-modules
			order.js //order的state、types、actions、reducers、selector 、reselect
			shop.js //shop的state、types、actions、reducers、selector 、reselect
		-middleware //中间件
			logger.js
			error.js
	-container //容器型组件- 路由组件
		-order
			order.jsx//订单的路由组件|订单的容器型组件|类定义组件
			-components //订单的展示型组件|函数组件
				-list	
					list.jsx
					list.css
				-nav
					nav.jsx
					nav.css
			
```







