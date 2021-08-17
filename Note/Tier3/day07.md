## Node创建服务器

使用Node原生创建服务器，必须使用HTTP模块

### 创建服务器

```
//1、引入模块
const http=require("http");
//2、创建服务器端实例
//req,表示请求对象(request)的实例
//res,表示响应对象(response)的实例
let server=http.createServer((req,res)=>{
    //处理响应的代码。
    //text/html,资源类型为html,text/css，资源类型时css
    //writeHead()设置响应头部，参数一是状态码，参数二是状态消息，参数三，是响应头部的对象，可以设置编码格式和响应资源类型。
    res.writeHead(200,"this is hahahaha",{"Content-Type":"text/html;charset=utf8;"});
    //3、结束响应
    res.end("<h1>你好，Node!</h1>")//结束响应
});
//4、设置端口号
//通过服务器端实例来设置端口号
//参数一：端口号（0~65535）
//参数二：设置服务器的本地IP地址，设置IP地址以后必须用IP访问，但支持局域网，此参数通常可以省略。
//参数三：回调函数（为了启动服务器端服务后的提示信息或，需要运行的代码）
server.listen(521,()=>{
    console.log("服务器已启动，端口号521");
});
```

### 设置响应头

```
res.writeHead( 200,{ 'Content-type':'text/html;charset=utf-8' } )
```

### 获取请求的方法和请求的路由及参数

```
req.method//获取请求的方法
req.url//获取请求的路由及参数。
```

### 原生路由的的响应

根据不同的路由跳转到不同的页面

```
const http=require("http");
const fs=require("fs");
const path=require("path");
http.createServer((req,res)=>{
    //req.url获取当前URL地址中的路由和参数字符串，
    //req.method,获取当前请求的请求方式。
    let [pathURL,params]=req.url.split("?");
    // if(pathURL==="/"){
    //     res.writeHead(200,"ok",{"Content-type":"text/html;charset=utf8;"});
    //     let htmlText=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
    //     res.end(htmlText);//此方法只能向浏览器端发送字符串。
    // }else if(pathURL==="/a"){
    //     res.writeHead(200,"ok",{"Content-type":"video/mp4;"});
    //     let rs=fs.createReadStream(path.join(__dirname,"img/光辉岁月.mp4"));
    //     rs.pipe(res);
    // }

    // res.end(req.method);
}).listen(1112,()=>{
    console.log("服务器已启动,端口号是1112");
});
```

### 端口号说明

常用端口号范围在1~65535

# 第7-9讲 Express基础

## 一、简介

Express 是一个简洁、灵活的 node.js Web应用框架。

Express，提供一系列强大特性API，可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。

官网：

英语官网：http://expressjs.com/       （4.17.1）
中文官网： https://expressjs.com/zh-cn/ （4.17.1）

## 二、Express基本使用

### **Express创建web服务器**

**步骤**

(1)创建package.json配置文件

```
npm init [-y]
```

(2)下载

```
npm i express
```

(3)引入express模块

(3)创建web服务器应用

(4)使用listen方法开启一个3000端口

```
const express=require(“express”);
const app = express();
app.get("/",(req,res)=>{
	res.end("This is express program"); 
});
app.lilsten(3000,()=>{})
```

### app对象的方法

#### app.get()：

响应浏览器的GET请求。

##### 语法：

```
app.get(‘路由', (req,res)=>{ 处理函数 })
```

##### 参数：

参数1：客户端请求的URL地址（必须以/开头）
参数2：请求对应的处理函数

​	req：请求对象（包含了请求相关的属性与方法）
​	res：响应对象（包含了与响应相关的属性与方法）

#### app.post()：

响应浏览器的POST请求方式

##### 语法：

```
app.post(‘路由', (req,res)=>{ 处理函数 })
```

##### 参数：

参数1：客户端请求的URL地址（必须以/开头）
参数2：请求对应的处理函数

​	req：请求对象（包含了请求相关的属性与方法）
​	res：响应对象（包含了与响应相关的属性与方法）

#### 案例：

##### 服务器端代码

```
const express = require('express');
const app = express();
app.post('/login',(req,res)=>{
    res.send('你好登录')
});
app.listen(3000,()=>{
    
});
```

##### 浏览器端代码

```
<form action="http://localhost:3000/login" method="post">  
	<input placeholder="用户名" name="username"><br><br>
    <input type="submit" value="登录">
</form>
```

### 响应对象(response)方法

服务器端响应浏览器请求的对象。

浏览器相关信息参数:https://tool.oschina.net/commons

#### res.send()：

响应方法，将响应内容发送给浏览器。

##### 语法：

```
res.send( 字符串/json格式对象 )
```

#### res.sendFile()：

将文件类型的资源返回给浏览器。

##### 语法：

```
res.sendFile( 文件绝对路径 )
```

#### 案例：

```
const express=require("express");
const path=require("path");
const app=express();
//常见的请求方式有哪些？
//get post put delete 
//1、响应get请求方式，使用app.get(路由名字,回调函数)方法，当路由的名字和请求方式完全对应后，执行回调函数中的内容。
//回调函数中的参数req(request对象的实例),res(response对象的实例)
//路由的名字一定是"/开始"
app.get("/",(req,res)=>{
    //在Express中，通常使用send方法向浏览器发送响应内容，send(JSON格式数据/字符串)，send,具备结束响应的功能。自动识别编码格式。
    res.send("我是get方法的响应！");
});
app.get("/a",(req,res)=>{
   res.status(500);//设置状态码的方法。
   console.log("ssssss");//在服务器端的打印，永远是在控制台。
   res.send("我是a路由"); 
});
//响应post请求，使用app.post(路由名字,回调函数)方法
app.post("/bb",(req,res)=>{
    res.send("我是post请求的路由");
});
app.put("/cc",(req,res)=>{
    res.send("我是响应put")
});
app.delete("/dd",(req,res)=>{
    res.send("我是delete");
});
app.get("/index.html",(req,res)=>{
    //sendFile()，向浏览器端发送文件。
    res.sendFile(path.join(__dirname,"index.html"));
});
app.listen(1111);
```

### 请求对象(request)方法

服务器端获取浏览器端的参数对象。

#### req.query

获取浏览器端GET请求方式，发送的参数。

**案例**

```
const express=require("express");
const app=express();
app.get("/login",(req,res)=>{
    //console.log(um.login(req.query));
    // console.log(req.query.username);
    // res.send(req.query);
    res.send(um.login(req.query));
});
app.listen(3000);
```

#### req.params

动态路由(冒号传参)，以动态路由的形式传递参数。

**案例：**

```
//冒号参数的格式 在地址格式  /路由/参数的值，例 /a/cc
//服务器端，获取的时候，匹配路由的格式 /路由/:冒号参数变量
//服务器端，获取冒号参数采用 req.params属性
app.get("/a/:username",(req,res)=>{
   res.send(req.params); 
});
```

## 三、项目工具

### nodemon

在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的重新启动项目,nodemon工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

**安装命令**

```
npm i nodemon -g
```

### Rest Client

接口调试工具，基于VScode的接口测试的工具。

**使用步骤**

(1)安装REST Client插件

![image-20210601022017804](E:\授课内容\中公\node课程\标准化笔记\2021南昌昌北学习中心13班\img\图片9.png)

(2)创建后缀名为 .http 文件，书写REST接口调试语法 

![image-20210601022103886](E:\授课内容\中公\node课程\标准化笔记\2021南昌昌北学习中心13班\img\图片10.png)

**案例：**文件语法

```
###测试get参数
GET  http://localhost:3000/a/ssss

###测试post参数
POST http://localhost:3000/aaa
content-type: application/json

{
    "username": "admin",
    "pwd": "123456"
}
```

## 四、Express路由

广义上来讲，路由就是映射关系。不同的访问地址对应不同的路由，每一次互联网请求都对应一个请求处理的函数。

### 组成

Express 的路由分 3 部分组成，分别是请求类型、请求路由名字、处理函数

### 语法：

```
app.METHOD( PATH,HANDLER )
```

### 参数

(1)METHOD：请求方式，如，get，post等 
(2)PATH：请求路由的名字 
(3)HANDLER：回调函数，用于响应该请求内容。

### 路由匹配流程

(1)当一个请求发送到服务器端后，首先进行路由匹配，当路由匹配成功，则会通过响应的回调函数，响应浏览器所需内容。
(2)路由匹配的顺序是从上到下一次匹配，匹配第一个满足条件的路由。

![image-20210601022637884](E:\授课内容\中公\node课程\标准化笔记\2021南昌昌北学习中心13班\img\图片11.png)

### 子路由

项目的开发过程中，为了方便路由层的管理，可以将路由以功能需求进行模块化分类管理，这个过程称为路由的模块化（子路由）。

#### 语法：

```
let router=express.Router(); 
```

子路由的创建步骤

(1)创建子路由模块文件
(2)使用express.Router() 方法创建子路由实例对象
(3)给子路由挂载对应的响应方法
(4)使用 module.exports将子路由实例对象抛出
(5)使用 app.use() 方法注册子路由模块

**注：**使用app.use 注册路由时，可以添加统一前缀。

#### 案例：

##### 子路由文件

```
//子路由文件
//创建子路由的步骤
//1、引入插件
//2、创建子路由的实例
//3、抛出子路由
const express=require("express");
const router=express.Router();//创建子路由实例
router.get("/a",(req,res)=>{
   res.send("我是子路由的a路由！"); 
});
module.exports=router;
```

##### 主路由文件

```
const express=require("express");
const app=express();
//将子路由绑定给主路由，采用app.use(参数一，参数二);
//参数一是子路由的父级路由，可以自定义，默认"/";
//参数二是子路由引入路径。
app.use("/",require("./router/testRoter"));
app.use("/c",require("./router/testRoter"));
app.listen(1123);
```

## 