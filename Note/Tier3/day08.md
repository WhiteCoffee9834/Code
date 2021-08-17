## 五、中间件

### **概念**

中间件（Middleware ），指业务流程的中间处理环节。也是特殊的路由，通常指在处理请求过程中，需要对响应数据进行多次加工处理时，采用中间件加工模式。

![图12](E:\授课内容\中公\node课程\标准化笔记\2021南昌昌北学习中心13班\img\图12.png)

### **好处**

更有效的实现业务逻辑，提升开发效率，生成高品质的响应资源。

### 中间件执行流程：

当一个请求到达 Express 的服务器后，可以通过连续调用多个中间件，对这次请求进行预处理。但是必须要有一个最终的匹配路由进行响应给客户端结果。

![图13](E:\授课内容\中公\node课程\标准化笔记\2021南昌昌北学习中心13班\img\图13.png)

### 中间件的使用

#### 语法

```
app.use( [前缀,]中间件函数)
//中间函数
([arg,]req,res,next)=>{
          //next，移交响应控制权。当中间件处理完毕以后要进行下一个处理环节，但作为特殊的路由的时候next可以省略。
}
```

#### 案例

##### 三个参数的中间件

```
app.use((req,res,next)=>{
    delete req.query.pwd;//删除对象中的属性
    console.log("我是三个参数的中间件");
    //next("我是next的参数");
    next();
});
```

##### 四个参数的中间件

```
app.use((arg,req,res,next)=>{
    console.log(arg);
    next();
});
```

##### 路由的特例

```
app.use((req,res)=>{
    console.log("我是不带参数的路由");
    res.send("我是不带参数的路由");
});
```

### 中间件的前缀

在某些情况下有些请求是不需要经过中间件处理的，因此可以给中间件加上特定路由前缀，达到按规则过滤响应。

```
app.use("/aa",(req,res)=>{
    console.log("我是中间件");
    res.send("我是中间件的响应");
});
```

### 使用中间件注意事项： 

(1)必须在路由之前注册中间件，错误中间件除外
(2)对于客户端的请求，可以连续使用多个中间件进行处理
(3)中间件的业务执行完之后， next() 函数一定要执行
(4)连续使用多个中间件时，多个中间件之间，共享 req 和 res 对象

### 中间件分类

#### 应用级别中间件：

绑定在主路由的中间件，叫做应用级中间件。

#### 路由级中间件

路由级中间件和应用级中间件类似，只不过是它绑定对象为express.Router()。

#### 错误中间件：

错误级别中间件是用来捕获整个项目中发生的异常/错误，从而防止项目异常崩溃的问题，主要有404错误和逻辑错误。错误级别中间件的处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 err, req, res, next。

**案例：处理404错误**

```
const express = require('express');
const path = require('path');
const app = express();
app.get('/login',(req,res)=>{
    res.send('登录表单');
})
app.get('/register',(req,res)=>{
    res.send('注册表单');
})
app.use( (req,res)=>{
    res.status(404);
    res.sendFile(path.join( __dirname,'views/404.html' ));
} )
app.listen(3000);
```

**案例：处理逻辑错误**

```
const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    // console.log(age);
    // let age=20;
    throw new Error("我是错误哈哈");//抛出错误
   res.send("我是首页路由"); 
});

//错误中间件是特殊的四个参数的中间件，一般放到所有路由的最后面，可以捕获所有路由的错误。
app.use((err,req,res,next)=>{
    if(err.message.includes("before initialization")){
        console.log("变量不能再初始化之前使用");
    }else{
        console.log(err);
    }
    res.send("服务器出现了错误！");
});
//错误中间件通常用来处理服务器运行时错误，给用户一个很好的体验。
app.listen(1234);
```

**注：**错误级别的中间件，必须在应用级中间件的最后面，防止漏掉捕获！

#### 内置中间件：

ExpressAPI自带的中间件

##### express.static：

负责在 Express 应用中提托管静态资源

###### 语法

```
app.use( express.static(静态资源路径))  
app.use( '/static',express.static(静态资源路径)//在访问静态资源时加前缀
```

**案例**

```
app.use(express.static(path.join(__dirname,"public")));
```

##### express.json：

将req请求对象有效内容解析为json格式数据

###### 语法

```
app.use( express.json() )
```

##### expess.urlencoded

将req请求对象传入的post请求方式的urlencoded格式数据解析。

```
app.use( express.urlencoded( {extended:false} ) )
```

**案例：**

```
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.post("/b",(req,res)=>{
   res.send(JSON.stringify(req.body)); 
});
```

#### 自定义中间件（第三方中间件）：

非 Express 框架内置的，而是由第三方开发出来的中间件，叫做第三方中间件。
本质上第3方中间件是npm上开源的模块包。所以可以通过npm下载工具获取第3方中间件。

##### 案例：小图标中间件

生成小图标网站：https://tool.lu/favicon/ 

**安装**

```
npm i serve-favicon
```

**代码**

```
const express=require("express");
const favicon=require("serve-favicon");
const path=require("path");
const app=express();
app.use(favicon(path.join(__dirname,"img/1.jpg")));
app.get("/",(req,res)=>{
    res.send("我是小图标案例");
});
app.listen(1111);
```

##### 案例：校验码中间件

**安装**

```
npm i svg-captcha
```

**代码**

```
const express=require("express");
const svg=require("svg-captcha");
const path=require("path");
const app=express();
app.use(express.static(path.join(__dirname,"public")));
app.get("/code",(req,res)=>{
    //create(),创建校验码对象
    //对象中text是校验码的文本
    //对象中data是校验码的二进制流数据
 
    //生成字符校验码
    // let captcha=svg.create({
    //     noise:10,//设置干扰线，默认值是1
    //     size:4,//设置字符的个数，默认是4
    //     color:false,//设置字符和干扰线的颜色，只能是布尔类型。
    //     background:"pink",//设置背景颜色，默认会开启color,支持颜色RGB和英文
    //     width:200,//设置校验码的宽度，单位是像素
    //     height:300,//设置校验码的高度，单位是像素
    //     ignoreChars:"23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",//设置校验码排除字符
    // });
    
    let captcha=svg.createMathExpr({
        noise:1,//设置干扰线，默认值是1
        color:true,//设置字符和干扰线的颜色，只能是布尔类型。
        background:"pink",//设置背景颜色，默认会开启color,支持颜色RGB和英文
         width:60,//设置校验码的宽度，单位是像素
        // height:300,//设置校验码的高度，单位是像素
        mathMax:-20,//设置计算的最大值，默认值9,支持负数
        mathMin:-10,//设置计算的最小值，默认值0,支持负数
        mathOperator:"/"//设置运算法则，指支持+/-,但可以给其他字符随机运算。
    }); 
    console.log(captcha.text);
    res.type("svg");//设置当前资源的类型。
   res.send(captcha.data); 
});
app.listen(1234);
```

## 