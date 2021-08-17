# 第2-3讲 ECMAScript

## ES6概念

ECMAScript 6.0，是 JavaScript 语言的下一代标准，在 2015 年 6 月正式发布。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## 变量与常量

### let

声明变量的关键字。

**语法：**

```
let username = '哈哈'
```

**特点：**

(1) 块级作用域

```
       {
           let b=30;
       }
       console.log(b);//b is not defined
```

(2) 不存在变量提升：暂时性死区(Temporal Dead Zone，TDZ)：本质，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

```
       {
           console.log("-- 代码开始---");
           console.log(b);//Cannot access 'b' before initialization
           console.log("b声明前");
           let b=30;
       }
```

(3) 同一作用域，不能重复声明同一变量

```
    {
        let b=20;
        let b=30;
        console.log(b);//Identifier 'b' has already been declared
    }
```

### const

声明常量，ES6中默认公约使用大写形式定义常量名。

**语法：**

```
const PI = 3.1415926
```

特点：

在let特点的基础上，还拥有

(1)声明变量的同时需要立即初始化。

```
    const b;
    console.log(b);//Missing initializer in const declaration
```

(2) 当数据类型为数值、字符串、布尔值、类型时，其值是不可改变的，但是为对象或数组的时候，其值是可以改变，因为声明的变量相当于指向的那个内存地址。

```
    const a=20;
    a=30;
    console.log(a);//Assignment to constant variable
    const arr=[1,3,5,6,8,9,0];
    arr[3]="dddd";
    console.log(arr);
```

### 案例

在循环中的使用

```
    for(var i=0;i<5;i++){}    
    console.log(i);//5
    for(let j=0;j<5;j++){}
    console.log(j);//j is not defined
```

结合事件的使用

```
        let btns=$("button");
        for(let i=0;i<btns.length;i++){
            btns.eq(i).on("click",function(){
                console.log(i);
            });
        }
```

## 字符串扩展

### 模板字符串

**语法：**

```
`字符内容${输出内容}字符内容`
```

**输出的内容包括：**

1.变量

2.JavaScript表达式（三目运算符）
3.获取对象的属性
4.调用函数

**案例**

```
 let user={"username":"rypy"};
        let str1=`
                <span style="color:red;">
                    我是${age}岁的憨憨,
                    我的姓名：${user.username}
                    我是一个${age<200?"年轻人":"老年人"}
                    我是${f(300)}
                </span>`;
                function f(age){
                    if(age===200){
                        return "你老了";
                    }
                }
        console.log(str1);      
```

### 新增方法

startsWith：参数字符串是否在原字符串的头部

**语法：**

```
let str="我是web校憨憨！";
console.log(str.startsWith("我是"));
```

endsWith：参数字符串是否在原字符串的尾部

**语法：**

```
console.log(str.endsWith("!"));
```

repeat：返回一个新字符串，表示将原字符串重复n次

**语法：**

```
console.log(str.repeat(2));
```

padStart：字符串头部补全

**语法：**

```
console.log(str.padStart(14,"abc"));
```

padEnd：字符串尾部补全

**语法：**

```
console.log(str.padEnd(14,"abc"));
```

replaceAll：查找替换全部

**语法：**

```
console.log(str.replaceAll("憨","傻"));
```

## Symbol数据类型

**JavaScript基本数据类型：**

undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）。

### **概念：** 

Symbol是第六种基本数据类型，使用Symbol函数来生成一个symbol数据，每一个Symbol是都是独一无二的。

### **语法：**

```
        let c=Symbol();
        let d=Symbol();
        console.log(c==d);//false
        
        let e=Symbol("我是参数");
        let f=Symbol("我是参数");
        console.log(e===f);//false
```

### **应用场景**

**属性名被覆盖**

```
 		let g=Symbol.for("我是参数");
        let h=Symbol.for("我是参数");
        console.log(g===h);//true
```

**私有属性和方法**

```
	function P(){
            this.name="haha";
            let age=Symbol();
            let b=Symbol();
            let c="getName";
            this[age]=30;
            this.getAge=function(){
                return this[age];
            }
            this[b]=function(){
                return "我是b函数，你能访问吗？"
            }
            this[c]=function(){
                return "我是c函数，你能访问吗？"
            }
	}
        let p=new P();
        console.log(p.age);
        console.log(p.getAge());
        console.log(p.getName());
```

## 数组的扩展

**新增方法**

of：创建一个数组，解决 new Array的缺陷，即将类似的数组序列转化为真正的数组

**语法：**

```
        let arr=Array.of(1,2,3,5,6,8,"ssss",function(){});
        console.log(arr);
```

from：把类数组转换成数组。

**语法：**

```
        let btns=$("button");
        console.log(btns);
        let arrBtn=Array.from(btns);
        console.log(arrBtn);
```

filter：遍历过滤，并生成一个新的数组，回调函数体内必须返回Boolean类型

**语法：**

```
        let newArr=arr.filter(function(item){
            return typeof item==="number";
        });
```

引用.includes(),查找原数组中是否含有参数元素的值，返回值是布尔类型

**语法：**

```
        console.log(arr.includes(5));//true
```

引用.flat(Infinity),将多维数组降维，返回值是一个一维数组。

**语法：**

```
        let arr1=[1,2,4,5,[2,3,5,[67,8]]];
        console.log(arr1.flat(Infinity));
```

## 对象的扩展

对象（object）是 JavaScript 最重要的数据类型。ES6 对其进行了重大升级，包括（数据类型本身的升级和Object对象的方法）。

### 类型本身特性

**属性简写：**当变量名和对象中的属性名相同时，属性值可以省略。

**语法：**

```
        let username="rypy";
        let age=30;
        let user={username,age};//{username:username,age:age}
        console.log(user);
```

**对象中函数简写：**一定程度降低了代码量，简写形式的函数中的this和function声明函数的this指向是相同的。

**语法：**

```
        let obj2={//对象中方法的简写
            fn(){
                console.log("新写法");
            }
        }
        obj2.fn();
```

**属性名表达式：**表达式可以使对象的属性/方法，更加灵活的运算，即中括号的用法(中括号中写表达式)。

**语法：**

```
        let name="hello";
        let obj={
            [name]:"aaa",//"hello":"aaa"
            [name+"aaa"](){
                console.log("我是方法");
            }
        }
```

**调用：**

```
        console.log(obj.hello);
        console.log(obj[name]);
        obj.helloaaa();
```

### 新增方法

Object.assign：对象的合并( 拷贝 )，将源对象（source），复制到目标对象 ( target )。

**语法：**

```
        let obj={username:"rypy"};
        let obj1={age:30,username:"admin"};
        let newObj=Object.assign(obj,obj1);//newObj=obj;
        console.log(obj);
        obj.username="admin1";
        obj1.age=50;
        console.log(obj1);
        console.log(newObj);
        console.log(obj);
```

Object.keys：获取参数对象引用的键名，返回值是数组类型

**语法：**

```
console.log(Object.keys(obj));
```

Object.values：获取参数对象引用的值，返回值是数组类型

**语法：**

```
console.log(Object.values(obj));
```

JSON.parse：把json字符串转换成json对象

**语法：**

```
console.log(typeof JSON.parse(str));
```

JSON.stringify：把js对象转换成json字符串

**语法：**

```
console.log(typeof JSON.stringify(user));
```

Object.entries：获取参数对象引用的键值对数组，返回值是二维数组

**语法：**

```
console.log(Object.entries(obj));
```

## 数据结构

### set数据结构

类数组，自带去重功能。

**语法：**

```
let s=new Set([1,2,32,3,2,4,5,7,8,9,0,3,4,5,8,9]);//创建了一个set数据结构
let s=new Set();
```

**常用方法**

add：set数据结构中添加元素数据，返回set数据结构本身

**语法：**

```
		s.add("sssaa");
        s.add("sssaa");
        s.add(function(){});
```

delete：删除set数据结构中的某个元素数据，返回布尔类型，表示删除是否成功。

**语法：**

```
        s.delete(function(){});
        s.delete("sssaa");
```

has：判断某个元素数据是否存在于set数据结构中，返回布尔类型，表示数据结构中是否含有该元素。

**语法：**

```
console.log(s.has("sssaaa"));
```

clear：清空set数据结构中的数据，无返回值。

**语法：**

```
s.clear();
```

**常用属性**

size:获取set数据结构的长度

**语法：**

```
console.log(s.size);
```

### Map数据结构

类对象，键名可以是任意类型，且键名不重复的键值对集合体。

**语法：**

```
let m=new Map([["username","rypy"],["age",30]]);
let m=new Map();
```

**常用方法**

set：向map数据结构中添加键值对数据

**语法：**

```
		m.set(function(){},"sssssss");
        m.set(true,"aaaaa");
        m.set(undefined,123123);
        m.set(null,function(){console.log("我是map中的函数");});
```

get：获取map数据结构中参数键名的数据

**语法：**

```
        console.log(m.get(undefined));
        m.get(null)();
```

delete：删除map数据结构中的参数键名的数据

**语法：**

```
m.delete(null);
```

has：判断参数键名是否存在于map数据结构中,返回布尔类型。

**语法：**

```
console.log(m.has(null));
```

clear：清空map数据结构中的数据

**语法：**

```
m.clear();
```

**常用属性**

size:获取Map数据结构的长度

**语法：**

```
console.log(m.size);
```

## ...运算符

...运算符，分为两类，rest 剩余参数运算符、spread 扩展运算符。

### rest剩余参数运算符

用于获取函数的多余或所有参数,将以“，”隔开的参数转换为数组。通常使用在形参中。

**语法：**

```
        function f(b,c,d,...aa){
            console.log(d);
            console.log(aa);
        }
        f(1,2,3,54,6,7,8,9,22);
```

注：必须出现在形参的最后 

### spread扩展运算符：

用于打散数据，将一个数组/对象，转为用“，”的参数序列，可以理解为rest 参数运算符逆运算，通常使用在实参的传递中。

**语法：**

```
        function f(a,b,c,d){
            console.log(c);
        }
        let arr=[1,2,4,5,3];
        f(...arr);//f(1,2,4,5,3)
```

#### 作用：

1、展开数组/对象,复制数组/对象。

```
        let obj={username:"rypy",age:30};
        let newObj={...obj};
        console.log(obj);
        obj.username="admin";
        console.log(obj);
        console.log(newObj); 
```

2、合并数组/对象

```
        let arr=[1,2,4,5,6];
        let arr2=[3,2,4,5,7];
        let newArr=[...arr,...arr2];
        console.log(newArr);  
```

3、伪数组转换数组

```
        <button></button>
        <button></button>
        <button></button>
        let btns=$("button");
        console.log([...btns]);
```

4、将数组转化为规律对象

```
        let arr=[3,4,5,6,7];
        console.log({...arr});
        let obj={...arr};
        console.log(obj[0]);
```

注：扩展运算符对数组和对象操作时，对数值是深拷贝，如果里面有嵌套对象和数组，其存储的为地址，会改变原内容。

## 解构赋值

### 概念

ES6 允许按照一定模式（即规则），从数组和对象中提取值，对变量进行赋值，这被称为解构赋值（Destructuring）。解构赋值是对赋值运算符的扩展。

### 数组的解构

**语法：**

```

```

#### 解构的形式

**1）完全解构**

```

```

**2）不完全解构（值比变量多）** 

```

```

**3）解构失败（变量比值多）**

```

```

**4）缺省方式**

```

```

**5）嵌套解构**

```

```

#### 默认值

**1、默认值**

```

```

**2、默认值+解构**

```

```

**3、默认值+解构中的undefined**

```

```

**4、默认值+解构中的null**

```

```

#### 应用场景

数组值的交换

```

```

### 对象的解构

**语法：**

```

```

#### 解构形式

**1）完全解构**

```

```

**2）不完全解构（值比变量多）**

```

```

**3）解构失败（变量比值多）**

```

```

#### 默认值

**1、默认值**

```

```

**2、默认值+解构**

```

```

**3、默认值+解构中的undefined**

```

```

**4、默认值+解构中的null**

```

```

#### 应用场景

1、JSON格式数据的解构

```

```

2、对象的解构赋值，使用在形参的默认值

```

```

3、对象的解构赋值，使用在函数返回值的解构

```

```

## 