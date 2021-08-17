## 六、常用第三方中间件

### 1、文件上传

文件上传，就是把用户本地的文件上传到服务器。

#### 安装

```
npm  i formidable
```

#### 使用步骤

(1)客户端创建form表单
(2)表单的提交方式必须为POST
(3)设置数据传输格式 enctype="multipart/form-data“
(4)服务器端借助formidable模块接收文件
(5)服务器再对接收过来的文件进行处理
(6)服务器处理完毕以后响应客户端结果

#### 具体实现

##### 浏览器端代码

```
    <form action="/uploadfile" method="post" enctype="multipart/form-data">
        用户名<input type="text"name="username" id="username"><br>
        <input type="password" name="pwd" id="pwd"><br>
        <input type="checkbox" name="sex" id="sex">大人
        <input type="checkbox" name="sex" id="sex">儿童<br>
        <input type="radio" name="in" id="in">读书
        <input type="radio" name="in" id="in">游戏<br>
        <input type="file" name="file1" id="file1">
        <!-- <input type="file" name="file2" id="file2"> -->
        <input type="submit" value="提交">
    </form>
```

##### 服务器端代码

```
const express=require("express");
const path=require("path");
const forms=require("formidable");
const fs=require("fs");
const app=express();
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//注：如果使用formidable的时候，必须再form标签中使用enctype
//formidable插件默认支持200MB以内的文件。
app.post("/uploadfile",(req,res)=>{
    let ff=forms({
        maxFileSize:1024*1024*1024*1024*1024
    });
    //ff.parse(req,回调函数(err,fields,files)),是将form表单元素转换为对象
    //fields,获取除文件对象以外所有的表单元素，并自动转换为对象
    //files,获取文件对象。
    ff.parse(req,(err,fields,files)=>{
        if(err){
            res.send("文件上传出错！");
        }else{
            let keys=Object.keys(files);
            for(let item of keys){
                let rs=fs.createReadStream(files[item].path);
                let ws=fs.createWriteStream(path.join(__dirname,"public/uploadfile",files[item].name));
                rs.pipe(ws);
                //console.log(files[item].path);
            }
            if(files[keys[0]].type==="video/mp4"||files[keys[0]].type==="video/mp3"){
                res.send(`
                    <video controls>
                        <source src="/uploadfile/${files[keys[0]].name}"></source>
                    </video>
                `)
            }else{
               res.send("文件上传成功！但该文件不支持播放！"); 
            }
        }
         //console.log(files);
    });
    // console.log(ff);
});
app.listen(1234);
```

### 2、cookie

cookie是服务器向客户端发送的一小份数据，并将数据存放在客户端。用户记录客户与服务器交互的一些信息。为下一次访问提供良好的服务。cookie的产生是为了解决http访问无状态的问题。

#### 特点

(1)不设置有效时间，浏览器关闭即销毁。
(2)大小限制（4KB）
(3)存储在客户端
(4)单个域名下数量最多不能超过50个cookie
(5)cookie是键值对的形式，值只能是字符串
(6)一般情况下不同浏览器和不同项目之间cookie不共享，但同一项目cookie共享。

#### 实现原理

![3-8Cookie实现流程](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图14.png)

(1)客户端发送一个请求到服务器
(2)服务器发送一个响应到客户端，其中包含Set-Cookie的头部，cookie就是通过该字段传递给客户端，并自动保存。

![image-20210515114624411](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图15.png)

![image-20210515114851841](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图16.png)

（3）当本地存储了cookie以后，下次访问相同服务器地址，cookie内容会自动携带。

![image-20210515115051378](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图17.png)

#### cookie的使用

##### 安装

```
npm i cookie-parser
```

##### 插件的绑定

```
const cookieParser = require("cookie-parser");
app.use(cookieParser([密匙]));//以中间件的形式绑定插件
```

##### cookie的设置语法

```
res.cookie(key,value[,option])
```

**参数：**

option:

​	expires：过期时间（秒）,设置失效的时间点

​	maxAge：最大失效时间（毫秒)，设置多少毫秒后失效

​	signed： 表示是否签名（加密）,设为 true 会对当前cookie 签名加密，需要用res.signedCookies 获取,且需要在绑定中间件的时候设置密匙。未签名加密则用res.cookies获取。

##### 获取cookie

```
res.cookies//未签名cookie获取
res.signedCookies//获取签名cookie
```

##### 服务器端代码案例

```
const express=require("express");
const cookieParse=require("cookie-parser");
const app=express();
//绑定cookie-parser插件
app.use(cookieParse());
//存cookie的路由
//注：如果不设置cookie的有效期，谷歌浏览器默认有效期是会话结束，
app.get("/savecookie",(req,res)=>{
    //向客户端存cookie采用cookie(cookie的键名，cookie的键值，相关参数（有效期）)
    res.cookie("username1231234","admin123123",{
        // expires:new Date(new Date().getTime()+1000*60*60*24*30*12*10000)
        maxAge:1000*60*5
    });
    //获取cookie使用req.cookies属性，当前请求存的cookie只能再下次请求中获取。
    res.send(req.cookies);
});
app.listen(1234);
```

### 3、Session

session是另一种记录用户信息的机制，不同于cookie的是，session保存在客户端浏览器中，当浏览器打开创建当前session，浏览器关闭自动销毁。

![3-12session的现实场景](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图18.png)

#### 特点

(1)session临时存储在浏览器运行时
(2)依赖cookie，存放SessionID
(3)可以存储任意类型
(4)通过客户端的sessionid标识符区分session
(5)session没有大小限

#### 应用场景：

cookie能做的sessioin都能做，且可以实现访问次数。 

#### 实现原理

(1)客户端发送一个请求到服务器
(2)服务器发送一个响应到客户端，其中包含Set-Cookie的头部(同时包含sessionID标识信息，服务器也会开启此用户的session数据区)
(3)客户端保存sessionID标识的cookie，之后向服务器发送请求时，http请求中会包含一个Cookie的头部 
(4)服务器根据客户端传过来的sessionID标识进行处理，然后返回响应数据。

![session](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图19.png)

![3-14Session实现流程](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图20.png)

#### session的使用

##### 安装

```
npm i cookie-session
```

##### 插件的绑定

```
const session=require("cookie-session");
app.use(session({
    secret:"testSession123",//必选项，设置cookie中的sessionID
    expires:new Date(new Date().getTime()+1000*60*60*24*30*12*10000)
}));
```

**参数：**

name：设置的Cookie的名称，默认为express:sess。
keys：是个数组，用于签名和验证Cookie值的键列表。设置Cookie时始终使用签名keys[0]，验证时使用其它密钥。
secret：通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改，如果没有设置keys，将使用secret作为单一密钥。
maxAge：设置有效时间，为毫秒数
expires：设置cookie的过期日期，是一个Date对象，默认在会话结束时过期。 

##### 存储session的语法

```
req.session.变量名=值
```

##### 获取session

```
req.session.变量名
```

##### 服务器端代码案例

```
const express=require("express");
const session=require("cookie-session");
const app=express();
//当给sessionID设置了有效期后，期效果可以跟cookie类似，但不能跨浏览器。
app.use(session({
    secret:"testSession123",//必选项，设置cookie中的sessionID
    expires:new Date(new Date().getTime()+1000*60*60*24*30*12*10000)
}));
app.get("/setsession",(req,res)=>{
    //req.session.键名=值，存session
    req.session.age=20;
    res.send("设置session");
});
app.get("/getsession",(req,res)=>{
    //req.session.键名，取session
    res.send(req.session);
});
app.listen(1234);
```

## 七、Express脚手架

express-generator（又称为脚手架工具） 可以快速创建一个应用的骨架。

### 1、使用步骤

#### 1.1 安装express-generator工具

```sh
 npm i express-generator -g
```

#### 1.2 使用脚手架初始化项目

```sh
express --view=ejs 项目名
```

	--view=ejs : 你的项目使用ejs模板引擎

#### 1.3 进入目录, 安装所有需要的模块

```
cd 项目包名 
npm i
```

#### 1.4 启动项目

```
npm  start   
完整的命令叫 ： npm run start
注意：start是一个特殊的名字。所以只这个start可以省略run。
```

注：上面的命令是在package.json文件内配置的script属性。

#### 1.5 浏览器访问

### 2、目录和文件介绍

app.js : 入口文件

views: 模板文件夹

routes:子路由存放文件夹

public:静态资源存放文件夹

bin: www：启动的文件

package.json：项目的配置文件