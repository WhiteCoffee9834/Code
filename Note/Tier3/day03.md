# 第2-3讲 ECMAScript

## ES6概念

## 解构赋值

### 概念

ES6 允许按照一定模式（即规则），从数组和对象中提取值，对变量进行赋值，这被称为解构赋值（Destructuring）。解构赋值是对赋值运算符的扩展。

### 数组的解构

**语法：**

```
let [a,b,c]=[1,2,3];
```

#### 解构的形式

**1）完全解构**

```
let [a,b,c]=[1,4,5];
```

**2）不完全解构（值比变量多）** 

```
let [,a,,b,,c]=[1,4,5,7,8,90];
```

**3）解构失败（变量比值多）**

```
let [a,b,c,d]=[1,4,5];
```

**4）缺省方式**

```
let [a,b,,c,d]=[1,4,5];
let [a,b]=[,null];
```

**5）嵌套解构**

```
let [a,[b,c]]=[1,[3]];
```

#### 默认值

**1、默认值**

```
let [a,b=3,c,d]=[];
```

**2、默认值+解构**

```
let [a,b=3,c,d]=[1,,3,5,7];
```

**3、默认值+解构中的undefined**

```
let [a,b=3,c,d]=[1,undefined,3,5,7];
```

**4、默认值+解构中的null**

```
let [a,b=3,c,d]=[1,null,3,5,7];
```

#### 应用场景

数组值的交换

```
let a=1;
let b=2;
let d=3;
let f=4;
[a,b,d,f]=[f,d,a,a];
```

### 对象的解构

**语法：**

```
let {username,pwd}={username:"admin",age:30};
```

#### 解构形式

**1）完全解构**

```
let {username,pwd}={pwd:"asdf",username:"admin"};
```

**2）不完全解构（值比变量多）**

```
let {username}={username:"admin",pwd:123123};
```

**3）解构失败（变量比值多）**

```
let {username,pwd}={username:"admin"};
```

#### 默认值

**1、默认值**

```
let {username="admin"}={};
```

**2、默认值+解构**

```
let {username="aa"}={username:"admin"}
```

**3、默认值+解构中的undefined**

```
let {username="aa"}={username:undefined}
```

**4、默认值+解构中的null**

```
let {username="aa"}={username:null}
```

#### 应用场景

1、JSON格式数据的解构

```
let user={username:"admin",pwd:123456,isadmin:0};
let {username}=user;
```

2、对象的解构赋值，使用在形参的默认值

```
function f({username="admin",pwd}) {
    console.log(username,pwd);
}
f({username:"admib1"})
```

3、对象的解构赋值，使用在函数返回值的解构

```
function f() {
    return {username="admin",pwd};
}
let {username}=f();
```

## 箭头函数

#### 函数的定义：

函数就是将一段具有独立功能的代码块整合到一个整体并命名，在需要的位置调用这个名称即可完成对应的需求，从而更有效的实现代码重用。

#### 回调函数概念：

以参数的形式，将一个函数传递给另一个函数。

#### 箭头函数概念：

ES6 允许使用“箭头”（=>）定义函数。简化回调函数和普通函数的写法。箭头函数必须先执行后调。

**语法：**

```
let b=()=>{}//将匿名函数转换为箭头函数
setTimeout(()=>{},200)//将回调函数转换为箭头函数。
```

##### 箭头函数的参数：

(1)无参数

```
let a=()=>{}
```

(2)一个参数：变量名=参数=>{函数体}，即，可以将（）省略。

```
let c=m=>{console.log(m);}
```

(3)多个参数 ：变量名=(参数1，参数2)=>{函数体}

```
let d=(m,n)=>{console.log(m+n);}
```

(4)剩余参数

```
    let f=(...a)=>{console.log(a);}
    f(1,2,3,5,6,7,8,9,0);
```

##### 箭头函数的返回值：

1、完整写法的返回值形式 

```
let h=m=>{
	return ++m;
}
```

2、只有一行代码，{}可以省略

```
let g=()=>console.log("我是箭头函数");
```

3、只有一行代码的返回值， return可以省略

```
let h=m=>++m;
```

4、返回对象

```
let i=()=>({username:"admin"});
```

##### 箭头函数使用注意事项：

箭头函数不作为构造函数使用：

```
let F= (params)=> {
    this.aa=function (params) {
        console.log("我是函数aa");
    }
}
let f=new F();
f.aa();
```

##### 函数的默认值：

**语法：**

```
function f(username="admin",pwd) {
    console.log(username,pwd);
}
f("admib1")
```

注：函数默认值如果需要生效必须在调用的时候，设置实参为undefined

#### 箭头函数中的this指向：

箭头函数中，this不会指向当前环境，而是指向定义时所在的环境。

##### 特例语法：

(1)箭头函数直接调用打印this

```
        let a=()=>{
            console.log(this);//Window
        }
        a()
```

(2)绑定给事件的this

```
        document.getElementById("btn").onclick=()=>{
            console.log(this);//Window
        }
```

(3)使用call尝试改变箭头函数的this指向 

```
        let b=()=>{console.log(this);}
        b.call(document);//Window
```

(4)在构造函数中包一个箭头函数尝试打印this指向

```
        function P(){
            this.aa=()=>{
                console.log(this);
            }
        }
        let p=new P();
        p.aa();//P
```

## class类

### 面向对象概述：

面向对象是一种以对象为中心的编程思想。面向对象是相对于面向过程来讲的，面向对象把相关的数据和方法组织为一个整体来看待。

### 面向过程和面向对象：

面向过程和面向对象，都是一种编程思想。两者解决问题的思维方式不同。

#### 面向过程：

面向过程思想强调的是步骤，当碰见问题时，思考的是“我该怎么做”，分析出解决问题所需要的步骤，一步步的去实现。

#### 面向对象：

面向对象思想强调的是结果，当碰见问题，思考的是“我该让谁来做”。这个“谁”就是对象。找合适的对象做合适的事情。而对象如何去做(采用什么样的步骤)就不需关心，最终把问题解决掉即可

### 面向对象编程：

面向对象编程其本质是以，建立模型体现出来的抽象思维过程和面向对象的一些方法。模型是用来反映现实世界中事物特征。方法就是模型所需要的行为动作。
在面向对象编程中，最常见的表现就是基于类(Class)来表现的，每一个对象实例都有具体的类，即对象的类型。

**面向对象特点：**封装，继承，多态，抽象。

### 类和对象： 

在面向对象编程过程中，有两个重要组成部分：类 和 对象。
类和对象的关系：用类去创建一个对象。

#### 类的概念：

类是对一系列具有相同特征和行为的事物的统称，是一个抽象的概念，不是真实存在的事物。类是由特征和行为组成的。特征即是属性、行为即是方法。

#### 对象的概念：

对象是类创建出来的真实存在的事物。

注：开发中，先有类，再有对象。

### 创建类： 

定义类名要满足标识符命名规则，同时遵循大驼峰命名习惯。

**语法：**

```
class Fruit{}
```

**实例化：**

```
let f=new Fruit();
```

### constructor

构造函数/构造器，初始化对象。在创建一个对象时默认被调用，不需要手动调用，同时可以定义形参。

**语法：**

```
    class Fruit{
        constructor(){
            console.log("我是构造方法");
        }
    }
```

### 类的属性和方法： 

#### 实例属性和实例方法

表示当前对象的属性或方法。

**特点：**

实例属性/实例方法，通过当前的对象访问。如果是每个对象分别独立调用的, 则实例的属性和方法属于对应的对象。

**语法：**

```
class Fruit{
	a=20;
    aa(param) {
        console.log("我是成员方法");
        this.d=50;
    }
}    
```

#### 静态属性和静态方法

静态属性和方法指的是 class 本身的，即class.propName，而不是定义在实例对象（this）上的属性。

**特点：**

需要通过关键字 static 来进行修饰

**语法：**

```
class Fruit{
	static b=30;
	static bb(){
		console.log("我是静态方法");
        this.e=60;
    }
}
```

**调用语法**

```
Fruit.bb();
```

### 类的继承： 

面向对象的继承指的是多个类之间的所属关系，即子类默认继承父类所有的特性，体现了对属性和方法的复用性的提升。继承中的父类和子类：被继承的类称为父类，而继承父类的类称为子类。

#### 继承的优点：

(1)提高了代码的复用性。
(2)减少了代码量。

**语法：**

```
class Fruit{
    sf;
    static td="我很甜";
    constructor(sf){
        this.sf=sf;
    }
    getSFing(){
        return "我的水分很充足!";
    }
    static getTDing(){
        return "甜度百分百";
    }
}
//类的继承的语法    子类 extends 父类
//ES语法的继承是完全继承,但支持多态(子类中可以覆写父类的方法/属性)
//在子类的构造方法中使用super()调用父类的构造方法,注:子类可以不写构造方法,但如果子类书写了构造方法,一定要使用super()调用父类的构造方法,否则会报错.
//如果需要在子类中调用父类的同名方法,则使用关键词 super.方法名
//在子类中如果方法与方法之间互相调用使用 this.方法名
class Apple extends Fruit{
    constructor(sf){
        super(sf);
    }
    getSFing(){
        return "我是子类的水分方法"+super.getSFing();
    }
    getA(){
        return super.getSFing()+this.getSFing();
    }
}
let ap=new Apple("我是子类实例的水分");
// console.log(ap.getSFing());
// console.log(Apple.getTDing());
// console.log(ap.sf);
console.log(ap.getA());
```

注：如果子类中有constructor构造函数，那么必须在构造函数的第1行执行super()

#### super的使用

```
    getSFing(){
        return "我是子类的水分方法"+super.getSFing();
    }
```

## iterator迭代器

### ES6中的四种数据结构：

数组（Array）、对象（Object），Map、Set

### 概念

iterator是 ES6 引入的一种新的遍历机制，它提供了一个统一的接口，它的作用是使各种数据结构可被便捷的访问，它是通过Symbol.iterator 的方法来实现。

### for…of：

for...of 是 ES6 新引入的循环，用于替代 for..in 和 forEach() 

#### 支持遍历的数据类型：

(1)Array
(2)arguments 
(3)Set数据结构
(4)Map数据结构
(5)String 
(6)NodeList对象 
(7)HTMLCollection 对象
(8)TypedArray

注：for...of不能遍历对象。

```
let arr=[1,2,4,5,6,7,89,9];
for(let item of arr){
    console.log(item);
}
```

### iterator迭代过程： 

1、通过 Symbol.iterator 创建一个迭代器，指向当前数据结构的起始位置
2、通过 next 方法进行向下迭代指向下一个位置， next 方法会返回当前位置的对象，对象包含了 value 和 done 两个属性， value 是当前属性的值， done 用于判断是否遍历结束，当done的值为true时代表结束

#### 遍历过程流程图：

![图片1](E:/授课内容/中公/node课程/标准化笔记/2021南昌昌北学习中心13班/img/图片1.png)

```
let arr=[1,2,4,5,6,7,89,9];
let p=arr[Symbol.iterator]();
//console.log(p);
// p.next();
// console.log(p.next());
for(let i=0;i<4;i++){
    p.next();
}
```

## ES6的新特性（优势）

class类，module模块化，箭头函数，函数参数默认值，promise对象，模板字符串，变量的解构赋值，...运算符，对象的简写，let和const关键词