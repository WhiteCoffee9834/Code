# 第十三讲 项目技术点

## ES6模块化

在es6中模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

### 步骤

(1)使用规范暴露数据 

(2)使用规范引入模块

(3)设置script标签的属性 type="module"

### 关键词

#### import

##### 语法：

```
import { 变量 } 文件
import { 变量 as  新变量名 } 文件
```

案例

```
import "/jquery.min.js";//直接引入文件
// import username from "/index1.js";//将引入的文件指定给变量,且只能赋值defalut的抛出。
import {user,f as isF,a1,user1} from "/index1.js";//可以解构除暴露外的任意变量
{
    $("#btn").on("click",()=>{
        //console.log("aaaaaaaa");
        //console.log(username);
        isF();
        a1()
        console.log(user1);
        console.log(user);
    });
}
```

#### export

##### 语法

```
export default 数据
export 定义关键词 变量名=值;
export function 方法名(){}
export {变量名,方法名}
```

##### 案例

```
// export default {
//     username:"admin"
// }
export let user={username:"admin",pwd:"123456"};

export function f() {
    console.log("我是抛出的f方法");
}
function a() {
    console.log("我是抛出的a方法");
}
let user1={username:"admin123",pwd:"123456123"};
export {
    a as a1,
    user1
}
```

### 浏览器引入

```
<script src="/index.js" type="module"></script>
```

## 加密与密码学

MD5信息摘要算法（MD5 Message-Digest Algorithm），是一种比较广泛使用的密码散列函数，可以产生
出一个128位（16字节）的散列值（Hash value），用于确保信息传输完整一致。MD5由美国密码学家罗纳
德·李维斯特（Ronald Linn Rivest）设计，于1992年公开。

#### 插件下载

```
npm i md5
```

#### 案例

```
const MD5=require("md5");
let str="123456";
console.log(MD5(str));
```

## token令牌

### 概念

token令牌，客户端与服务器端通信过程中，常用的安全策略，一般通过Body 体或者请求头Authorization,携带并由客户端传递给服务器端。

token令牌，本质就是一串字符，这串字符是按照一定的规则/加密算法，进行加密和解密，从而判断原数据的有效性，得到对应权限。加密后的这串字符我们称之为token,常用的web企业级应用token为jwt,即JSON Web Token 的简称。

### token的组成

Header（头部），一般存放当前加密的算法和字符串的作用
Payload（负载）一般存放一些校验的信息，如下：
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
Signature（签名）利用RSA 加密, 私钥必须存在服务器端, 不能暴露给客户端, 用私钥对前2 个对象加密后, 把三部分字符串拼接在一起, 返回给前端使用。

#### 案例

```
const jwt=require("jsonwebtoken");
//jwt插件加密sign(参数1，参数2，参数3)
//参数1是token需要加密的内容(对象)
//参数2是token密钥
//参数3是token的详细参数(过期时间)
let user={username:"admin",pwd:123456}
let key="jxoivjnvoaerpniuafsoncwhxnsdipj8q34ujgv98sfn98uwjemvdlzmpd3w40[90,qcao0mu#收sjujgsd0jvi9rmuvmcjm98#$imvdf098om4609@#$09mhb908-090(*U09ig9emaovim9,cemoiofjbb8uuvmcsxuxjvk0u89wsi9cu873nnvu jiduc9ueu";
let token=jwt.sign(user,key,{expiresIn:"1s"});
console.log(token);
//jwt插件解密verify(参数1，参数2，参数3)
//参数1是token
//参数2是token密钥
//参数3是token的详细参数,可省
setTimeout(()=>{
    token=jwt.sign(user,key,{expiresIn:"1s"});
},4000);
setTimeout(()=>{
    try{
        let obj=jwt.verify(token,key);
        console.log(new Date(obj.exp*1000).toLocaleTimeString());
    }catch(err){
        if(err.message.includes("jwt expired")){
            console.log("token过期,请重新登录！");
        }
    }

},4500);
```

