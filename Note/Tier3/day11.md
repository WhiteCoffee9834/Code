## 三、数据库可视化工具

##### mysql常用的约束：

auto_increment——自动增加，不能定义表级约束
not null——非空，不能定义表级约束
default——默认值，不能定义表级约束，注：在Mysql8.0.13之后的版本默认值，可以是文字、常量或表达式。
unique——唯一。
check——限制列的取值范围，使用方式CHECK(条件)
primary key——主键，即非空唯一。
CURRENT_TIMESTAMP ——自动获取当前数据库的默认时间，注区分东八区。
foreign key——外键,使用方式，[FOREIGN KEY] [(列名)] REFERENCES 外表名 (外表列名) [删除修改是否联动]
UUID() ——自动生成十六进制的ID，此ＩＤ不会重复。

##### 备份与还原

###### 备份

数据库备份是指将数据库进行备份以防丢失。

###### 还原

把备份好的数据库信息通过软件恢复到备份的状态

## 四、SQL结构化语言

SQL（英文全称：Structured Query Language）是结构化查询语言，专门操作数据库和处理数据的编程语言。

### SQL语句特点：

(1)SQL 是一门数据库编程语言
(2)SQL 语言在MySQL、Oracle、SQL Server等关系型数据库中是通用的。
(3)SQL语言不区分大小写，官方建议关键字使用大写，自己定义的变量用小写

### 作用：

(1)可以对数据库进行增删改查操作
(2)可以对数据库中的表进行增删改查操作
(3)可以对数据库中的数据进行增删改查操作

### SQL的关键词：

(1)主句select、insert 、update 、delete  
(2)子句where、and 和 or 、order by 、group by 、limit、join...on

### DML数据库操作语法



#### 添加数据语法

INSERT INTO 语句用于向数据表中插入新的数据。列和值要一一对应，多个列和多个值之间，使用英文的逗号进行分隔。

```
INSERT [INTO] table_name VALUES/value ( 值1,值2,... )
INSERT [INTO] table_name ( 列1,列2,... ) VALUES ( 值1,值2,... )
insert [into] table_name ( 列1,列2,... ) VALUES ( 值1,值2,... ), ( 值1,值2,... )
```

#### 删除数据语法

从指定的表中，根据WHERE条件，删除对应的数据，删除是不可逆的。

```
DELETE FROM 表名 [WHERE 列名=值]
```

#### 更新数据语法

用UPDATE指定要更新的表，用SET指定字段对应的新值，用WHERE指定更新的条件

```
UPDATE 表名 SET 列名=新值 [WHERE 列名=值]
```

#### 查询数据语法

查询所需数据，其返回结果被称为结果集。

```
SELECT * FROM 表名
SELECT 列名1[,列名2...] FROM 表名
```

语法1，从FROM指定的表中，查询所有的数据，*代表所有列。
语法2，从FROM指定的表中，查询指定列（字段）的数据。

#### 去重查询语法

```
select distinct 列名 from 表名;
```

#### 子语句操作语法

##### where语句

WHERE 子句用于限定查询数据结果。常用在 SELECT、UPDATE、DELETE 语句中。where子语句中可以使用运算符。

###### 语法：

```
主语句  where  子语句
```

###### 常用操作符：

| **操作符**       | **说明**                 |
| ---------------- | ------------------------ |
| =                | 等于                     |
| <>，!=           | 不等于                   |
| >                | 大小于登录于             |
| <                | 小于                     |
| >=               | 大于等于                 |
| <=               | 小于等于                 |
| between…and      | 特定范围之间             |
| like  / like ‘%’ | 搜索特定模式             |
| or               | 只要满足任意一个条件即可 |
| and              | 同时满足多个条件         |
| in               | 多条件判断               |

##### ORDER BY：

用于按照某个字段进行排序，如果某列的值相同，还可以按照多列进行排序，默认为升序（ASC），降序使用（DESC）。

**语法**

```
主语句  ORDER BY 字段名1 [ASC | DESC], [ 字段名2 ASC | DESC ]
```

##### GROUP BY：

用于分组查询，经常和一些函数结合使用 , HAVING 关键字条件过滤，表示对分类后的结果再进行条件的过滤。

###### **语法**

```
主语句 GROUP  BY   分组字段 [having where_condition];    
```

###### 常用函数：

(1)count 函数用于返回查询结果的总数据条数

```
SELECT COUNT(*) AS '人数' FROM users GROUP BY c_time;
```

(2)avg 求平均数

```
SELECT avg(age) FROM users;
```

(3)sum求和

```
SELECT SUM(age) AS '年龄总和' FROM users GROUP BY c_time;
```

(4)max最大值

```
SELECT max(age) FROM users;
```

(5)min 最小值

```
SELECT min(age) FROM users;
```

(6)concat 合并列

```
SELECT CONCAT(username,pwd) FROM users;
```

注：使用函数查结果，通常字段名是函数本身，可以使用As关键词设置别名，As也可设置表的别名。

#### limit语法

LIMIT语法，实现按序查找数据和分页功能，start 代表从第几行开始，默认从0行，size代表取几条

**语法：**

```
主语句  LIMIT [start,size]/[size]
```

#### 分页原理

```
SELECT * from users LIMIT 2,3;
```

注：LIMIT通常和ORDER BY一起配合使用来进行记录的分页显示，且limit属于MySQL扩展SQL92后的语法，其他数据库不通用。

#### 表的连接查询

每一个数据库表中，都是存放同一类型的数据，如学生表中只存储学生，教师表中只存储教师。

表连接分为内连接和外连接。区别在于，内连接仅选出两张表中互相匹配的记录，而外连接会选出其他不匹配的记录。通常用的是内连接。
外连接又分为左连接和右连接。
左连接：包含所有的左边表中的记录甚至是右边表中没有和它匹配的记录
右连接：包含所有的右边表中的记录甚至是左边表中没有和它匹配的记录

**语法：**

```
SELECT * FROM 表1 JOIN 表2 ON 条件
- JOIN ON
- LEFT JOIN 
- RIGHT JOIN
```

#### select完整语法

```
SELECT 
    字段名[ 表名.字段名 | 表别名.字段名 | 字段名 AS 字段别名 ] [...]
FROM table_name[as table_alias]
    [JOIN table_name2 ON 条件]-- 联合查询
    [WHERE....]-- 指定结果须满足的条件
    [GROUP BY....]-- 指定结果按照那几个字段来分组
    [ORDER BY....]-- 指定查询一个记录按一个或者多个排序
    [LIMIT 0,3]-- 指定查询记录‘0’为起始位置，‘3’为末尾位置
```

## 五、Promise与异步

### 同步与异步

#### 同步

主任务在执行多任务队列时，由上到下，由左到右依次执行。且下一个任务需要等待上一个任务执行结束后得到执行结果，再继续执行，即阻塞模式。

**同步案例**

index.html

```
console.log(1)
console.log(2)
alert(3)
console.log(4)
function sum(){
    return 1+1
}
let result = sum()
console.log( result );
```

#### 异步

主任务在执行多任务队列时，不需要等待上一个任务的执行结果，就可以执行下一个任务，当上一个任务执行完成后，会以状态、通知和回调来通知调用者。即非阻塞模式。

**异步案例**

定时器

```
function fn(){
   console.log( 44 );
   setTimeout( function(){
        let sum = 2+4
        console.log( sum,'2秒钟以后' );
   },2000 )
   console.log(33);
}
let s = fn(  )
console.log( s,'我是undefined' );
```

### 回调函数

在使用JavaScript时，为了实现某些逻辑经常会写出层层嵌套的回调函数，如果嵌套过多，会极大影响代码可读性和逻辑，这种情况被称为回调地狱（或回调）。

**目的**:异步代码同步化操作。

### promise

Promise对象，异步编程的一种解决方案。也称之为一个容器，里面保存着某个未来才会结束的事件（异步操作）的结果。在语法上，其从它可以获取异步操作的消息。

#### 语法

```
new Promise( (resolve,reject)=>{
        resolve()/reject();
} );
```

**案例**

```
new Promise((resolve,reject)=>{
    /**
     * 异步操作的代码
    */
});
```

#### 状态

pending（进行中）、fulfilled（已成功）和 rejected（已失败）

#### 特点

1）对象的状态不受外界影响。
2）一旦状态改变，就不会再变。
3）Promise的状态不可逆。

#### 常用方法

##### 对象.then()

then方法接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个回调函数可以省略。

###### 语法

```
promise对象.then( (结果)=>{
   //代码块
}， [(失败)=>{
   //代码块
}]);
```

###### 案例

```
let p=new Promise((resolve,reject)=>{
//    reject("我是失败的值"); //
    // console.log(age);
    // let age=20;
   resolve("我是成功的值");
});
p.then((data)=>{
    console.log(data);   
},(err)=>{
    console.log(err.message);
}).finally(()=>{
    console.log("woshi");
})
```

##### 对象.catch()

用于捕获异常或发生错误时的回调函数。

###### 语法

```
promise对象.catch( (异常)=>{
   //代码块
});
```

###### 案例

```
p.then((data)=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
});
p.catch(err=>{
    console.log(err);
});

```

##### 对象.all()

同时执行多个 Promise 实例，并生成一个新的 Promise 实例。

###### 语法

```
Promise.all( [ pro1,pro2,... ] );
```

**注**
1）参数实例中必须全部都是fulfilled时，Promise.all()的状态才是fulfilled，否则状态就是rejected；
2）参数实例中如果使用catch捕获的错误或者异常，则不会触发Promise.all()的catch方法。

###### 案例

```
let p1=Promise.resolve("我是成功装填1");
let p2=Promise.resolve("我是成功状态2");
// let p3=Promise.reject("我是失败状态");
let p4=new Promise((resolve,reject)=>{
    setTimeout(reject,1000,"我是失败4");
});
let p5=new Promise((resolve,reject)=>{
    setTimeout(reject,5000,"我是失败5");
});
Promise.all([p1,p2,p4,p5]).then(data=>{
    console.log(data);
}).catch(err=>{
   console.log(err); 
});
```

#### 链式操作

then的回调函数中还可以有返回值，可以是promise对象（也可以是其它数据），都可以使用链式操作再进行调用下一个then函数进行接收结果。

##### 案例

```
new Promise(resolve=>{
    resolve("我是成功的值");
}).then(data=>{
   console.log(data); 
   return data+"路过第12行";
}).then(data=>{
    console.log("ddddd");
    console.log(data);
});
```

**注：**jQuery对象就是一个典型的链式操作对象。

## 六、async函数

ES2017 标准将原有的async 函数，进行了升级，它是一个关键字，被async修饰的函数称为async函数。
async修饰的函数，默认会将返回值封装为一个Promise对象。

### 语法

```
async function name( ){
	let res1 = await 异步1
	let res2 = await 异步2
}
```

**注:**async函数只能获取成功状态的值。async可以单独出现，但await必须要在async函数中使用否则报错。

### 案例

```
async function f() {
    let p1=await Promise.resolve("我是成功状态！");
    console.log(p1);
    let p2=await Promise.reject("我是失败状态的值").catch(err=>err);
    console.log(p2);
}
// console.log(f());
f()
```

## 七、Node操作Mysql

当数据库创建完成以后，需要服务器端开发者将数据库和服务器端应用进行关联，才能对数据进行操作。

### 登录注册过程分析： 

#### 登录

请求将登录表单中的数据传递到服务器（Express），然后Express通过条件判断，匹配数据库中是否存在该数据，完全匹配采用查询语句（SELECT）。

#### 注册

请求将注册表单中的数据传递到服务器（Express），然后Express根据程序的规则约束判定用户名的存在性，符合条件会把数据添加到数据库中，采用添加语句（INSERT [INTO]）。

### Node中操作数据库流程:

![4-12node操作mysql](img/图25.png)

### Node中操作数据库步骤

#### (1)下载所需第三方插件mysql模块

```
npm i mysql
```

#### (2)书写连接数据库代码

##### 1、引入插件

```
const mysql=require(mysql);
```

##### 2、配置数据库连接信息，并建立连接

###### 对象的形式配置

```
let db=mysql.createConnection({
				host:'主机名',
				user:'用户名',
				password:'密码'
				port:'端口号',
				database:'要操作哪个数据库'
})
```

###### 字符串的形式配置

```
let db=mysql.createConnection({
	mysql:"user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700"
});
//mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700
//数据库驱动的名字://用户名:密码!@数据库地址:数据库端口号/数据库的名字?是否支持debug打印&编码格式&连接失败抛错时间
```

##### 3、连接数据库，此步骤可以省略，若省略了，则数据库连接不上不会报错。

```
db.connect(err=>if(err)console.log("数据库连接错误！"));
```

#### (3)执行SQL语句操作数据库

```
db.query(sqlstr,(err,results)=>{});
```

### Query语句执行增删改查

#### 执行增加语句

```

```

#### 执行修改语句

```

```

#### 执行删除语句

```

```

#### 执行查询语句

```

```

## 