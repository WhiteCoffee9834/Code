## 1.数据交互

### 0.配置代理

##### 1.package.json配置 ,需要重启项目

```json
{
//配置代理 
  "proxy":"http://localhost:5000",
}
```

```js
axios("后端的路径")
```



##### 2.手动配置

1.安装依赖

```
cnpm i http-proxy-middleware --save
```

2.创建setupProxy.js文件 在src下创建文件【setupProxy.js】，内容如下：

```js
const proxy=require("http-proxy-middleware");
module.exports=(app)=>{
    app.use("/api",proxy.createProxyMiddleware({
        target:"http://localhost:5000",// 你的配置代理的地址
        changeOrigin:true,
        pathRewrite:{
            "^/api":"http://localhost:5000"// 你的配置代理的地址
        }
    }))
}
```

3.使用

```js
axios('/api'+"后端的地址") //开发环境加"/api" 生产环境不需要加"/api"
```



### 1.axios

### 2.fetch

##### get请求

```js
fetch("url?id=1&name=2",{
	//配置项
  headers:{
    token:"token"
  }
}).then(res=>res.json())
.then(res=>{
  console.log(res)
})
```

##### Post 请求

```js
//无文件
import qs from "qs"
fetch("url",{
  method:"post"，
  headers:{
  	"Content-type":"application/x-www-form-urlencoded"
	},
  body:qs.stringify({
 		phone:"123",password:"123"     
  })
}).then(res=>res.json())
.then(res=>{
  console.log(res)
})

//有文件
let data=new FormData()
data.append("pid",0)
data.append("catename","test")
data.append("img",this.file.current.files[0])
data.append("status",1)
fetch("/api/api/cateadd",{
  method:"post",
  body:data
}).then(res=>res.json()).then(res=>{
  console.log(res);
})
```



##### fetch封装 

```js
import querystring from "querystring"
let baseUrl = "";
if (process.env.NODE_ENV === "development") {
    baseUrl = "/api"
}

//响应拦截
function response(url, res) {
    //打印数据
    console.log('本次请求：' + baseUrl + url);
    console.log(res);
    //失败处理
    if (res.code !== 200) {
        alert(res.msg)
        return;
    }
    

}


/**
 * url:"/api/login"
 * params:{phone:11,password:123}----->phone=11&password=123
*/
export const get = (url, params = {}) => {
    //先将参数转换
    params = querystring.stringify(params);
    return new Promise((resolve) => {
        fetch(baseUrl + url + "?" + params, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then(res => res.json()).then(res => {
            //响应拦截
            response(url, res)

            resolve(res)

        })
    })
}
/**
 * url:"/api/login"
*/
export const post = (url, params = {}, isFile = false) => {
    let data = null;
    let headers = {
        authorization: localStorage.getItem("token"),

    }
    if (isFile) {
        //有文件
        data = new FormData();
        for (let i in params) {
            data.append(i, params[i])
        }
    } else {
        //无文件
        data = querystring.stringify(params);
        headers = {
            ...headers,
            "Content-type": "application/x-www-form-urlencoded"
        }
    }
    return new Promise((resolve) => {
        fetch(baseUrl + url, {
            method: "post",
            body: data,
            headers
        }).then(res => res.json())
            .then(res => {
                //响应拦截
                response(url, res);

                resolve(res)
            })
    })
}
```



## 2.redux基础(flux  mobx)

react(组件) ---》react-redux《---- redux(数据)---》redux-thunk(fetch)《  后端

#### 官网

https://www.cntofu.com/book/4/index.html

#### 三大原则：

```
1.单一数据源(只能有一个仓库)
2.state是只读的   
3.只能通过纯函数修改state 
```

#### 安装

```
npm i redux --save
```



#### 核心概念

##### 0.createStore()

创建仓库

```js
import { createStore } from "redux"

// 1.初始化数据
let initState={
    name:"妲己",
    age:20,
    sex:"女"
}
/**
 * state:上一次修改完的状态,第一次设置为初始值
 * action：
        {type:'changeName',name:'王昭君'}
        {type:'changeAge',age:100}
        {type:'changeDiao'}
        {type:'changeSex'}
*/

// 2.唯一修改state的函数
function reducer(state=initState,action){
    switch(action.type){
        case "changeName":
            state.name=action.name;
            return state;
        case "changeAge":
            state.age=action.age;
            return state;
        case "changeDiao":
            state.name="貂蝉"
            return state;
        case "changeSex":
            state.sex="男";
            return state;
        default:
            return state;

    }  
}

// 3.创建仓库
let store = createStore(reducer);

// 4.导出仓库
export default store;
```



##### 1.getState()

```js
// 5.查看仓库数据 store.getState()
console.log(store.getState());
```

##### 2.dispatch(action)

```js
// 6.通过dispatch派发action ,从而触发reducer，进行修改state
store.dispatch({type:'changeDiao'})

store.dispatch({type:"changeName",name:"王昭君"})
```

##### 3.添加订阅者 subscribe()

```js
let unsub=store.subscribe(()=>{
    console.log(store.getState());
})
```

##### 4.取消订阅者

```js
// 8.取消订阅者
unsub()
```

#### React-redux 

1.安装

```
cnpm i react-redux --save
```

2.入口文件通过Provider关联store和App

```jsx
import store from "./store/index"

import {Provider} from "react-redux"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
```

3.组件改为容器型组件；

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";
class C extends Component {
  render() {
    let { name, age, changeAge, changeName } = this.props;
    return (
      <div className="box">
        <h3>this is C</h3>
        <div>name:{name}</div>
        <div>age:{age}</div>
        <button onClick={() => changeName("小鲁班")}>小鲁班</button>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  name: state.name,
  age: state.age,
  sex: state.sex,
});

let mapDispatchToProps = (dispatch) => ({
  changeName: (name) => dispatch({ type: "changeName", name: name }),
  changeAge: (age) => dispatch({ type: "changeAge", age: age }),
});
//容器型组件：该组件从状态中取数据，他一般都是路由组件，也是类定义组件
//展示型组件：该组件数据从父组件来，一般是木偶组件，也是函数定义组件
export default connect(mapStateToProps, mapDispatchToProps)(C);

```

4.reducer修改state应该返回一个新的state

```js
function reducer(state=initState,action){
    switch(action.type){
        case "changeName":
            
            return {
                ...state,
                name:action.name
            };
        case "changeAge":
            return {
                ...state,
                age:action.age
            };
        case "changeDiao":
            return {
                ...state,
                name:"貂蝉"
            };
        case "changeSex":
            return {
                ...state,
                sex:"男"
            };
            
        default:
            return state;

    }  
}
```

