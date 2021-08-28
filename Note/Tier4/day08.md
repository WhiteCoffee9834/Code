## 一、课程内容-axios

### 1.介绍

官网:http://www.axios-js.com/zh-cn/docs/ 

axios 是一个基于 Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生 XHR 的封装，只不过它是 Promise 的实现版本，符合最新的 ES 规范，它本身具有以下特征: 

从浏览器中创建 XMLHttpRequest
 ⚫ 支持 Promise API
 ⚫ 客户端支持防止CSRF
 ⚫ 提供了一些并发请求的接口(重要，方便了很多的操作) 

⚫ 从node.js创建http请求 

⚫ 拦截请求和响应
 ⚫ 转换请求和响应数据 

⚫ 取消请求
 ⚫ 自动转换JSON数据 

### 2.配置代理

在你的项目目录下创建一个文件，叫 vue.config.js:

```js
module.exports = {
  // 部署应用时的基本 URL
  publicPath:"",
  // build 时构建文件的目录
  outputDir: 'dist',
  // build 时放置生成的静态资源 (js、css、img、fonts) 的目录 assetsDir: 'static',
  // 指定生成的 index.html
  indexPath: 'index.html',
  // 设置代理请求
  devServer: {
    proxy: {
      "/api":{
        	target:"url",
        	ws:true,
        	changeOrigin:true
      }
    } 
  }
}
```

**注意**：前端项目重启

### 3. 安装 引入

```
npm i axios --save
```

```js
import axios from "axios"
```



### 4. 2种请求

##### post

```js
axios({
	url:"url",
	method:"post",
	data:{
		//参数
	}
}).then(res=>{
  console.log(res)
})


//axios.post(url,参数,config).then(res=>{})
axios.post("/login",{
  phone:"",
  password:""
},{
  headers:{}
}).then(res=>{})
```

##### get

```js
axios({
	url:"url",
	method:"get", //method如果省略，默认是get
	params:{
		//参数
	}
}).then(res=>{
  console.log(res)
})


//axios.get(url,config).then(res=>{})
axios.get("/login",{
  params:{phone:"",password:""},
  headers:{}
}).then(res=>{})
```



### 5.post请求传参问题

```js
axios({
        //url 路径 method请求方式 data参数
        url: "/api/register",
        method: "POST",
        data: user
    })
```

#### 有文件，FormData()

```js
//user={name:"",pass:"",ava:File}
    let data=new FormData()
    // data.append("name","1")
    // data.append("pass",1),
    // data.append("ava",file)
    for(let i in data){
        data.append(i,user[i])
    }
    return axios({
        //url 路径 method请求方式 data参数
        url: "/api/register",
        method: "POST",
        data: data
    })
```



### 6.拦截器

#### 请求拦截

```js
//请求拦截:每一次发请求给后端，需要统一加的参数在请求拦截中做，比如加token
//请求拦截return的内容就是后端收到的真正的请求信息
axios.interceptors.request.use(config=>{
    localStorage.getItem("userInfo")&&( config.headers.authorization=JSON.parse(localStorage.getItem("userInfo")).token)
    return config
})
```



#### 响应拦截

```js
//响应拦截:每一次，后端返回的数据，统一操作在响应拦截中处理
//响应拦截return的内容就是组件收到的数据
axios.interceptors.response.use(res=>{
    //统一处理失败
    if(res.data.code!==200){
        alert(res.data.msg)
    }

    //掉线处理
    if(res.data.msg=="登录已过期或访问权限受限"){
        //跳转login
        router.push("/login")
    }

    console.log("本次请求路径是："+res.config.url)
    console.log(res)
    return res;
})
```



### 7.封装



### 8.import 

```js
//一个文件只能有1个export default
// import a from "./a"
export default 10;


//可以有很多个export
// import {login,register} from "./a"
export let login = 20;
export let register = 30;
export let index = 40;
```



### 9.环境：

```js
//开发环境 8080
if (process.env.NODE_ENV==="development") {
    Vue.prototype.$pre = "http://localhost:3000"
}

//生产环境：打包后的代码 3000
if (process.env.NODE_ENV==="production") {
    Vue.prototype.$pre = ""
}
```



## 二、面试题

## 三、作业