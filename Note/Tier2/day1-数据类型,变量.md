## JavaScript初识

### JavaScript的概念

​	JavaScript是一种具有面向对象能力的、解释型的程序设计语言，更具体一点，它是基于对象和事件驱动的，相对安全的客户端脚本语言。

- 面向对象：万物皆对象；
- 解释型和编译型
  - 解释型：源码在执行时，遇到可执行的浏览器，就会逐行编译执行，优点：不需要跨平台，缺点：慢；代表性语言：JavaScript
  - 编译型：源码在执行时，在相应的环境下，需要先编译，之后再执行，优点：快，缺点：需要跨平台；代表性语言：C语言，C++；

- 基于对象：js中内置了很多对象（工具），我们可以通过这些对象的一些方法或者属性，进行操作；
- 事件驱动：用户对浏览器进行的一些操作，浏览器会对这些操作做出反应，执行响应的效果； 

### JavaScript的历史

​	开发目的：为了解决表单提交的问题

​	开发时间：1995年

​	开发公司：Netscape（网景）

​	开发人物：布兰登艾奇

​	初始名称：liveScript

​	后来名称：JavaScript

​	标准化时间：1997年

##### ECMAScript和JavaScript的关系？

​	前者是后者的规格，后者是前者的实现。

### JavaScript的组成

​	1、ECMAScript（语法、语句……）；

​	2、DOM（document object model）——文档对象模型；

​	3、BOM（browser object model）——浏览器对象模型；

### js的引入

#### 行内引入

​	直接在开始标签内部写js代码

​	onclick:点击事件

​    alert():弹窗

​    缺点：不能复用

```js
<button onclick="alert('中午12点干饭!')">点击一下</button>
```

#### 内部引入

​	在head或者body的任何位置写script标签，建议写在body末尾

​	缺点：只限于当前的页面里，不能复用

```js
<script>
    alert("hello，world");
</script>
```

#### 外部引入

​	使用script的src属性来引入外部js文件，作为外部引入的script标签，内部不可以写js代码，写了也不会生效

```js
<script src="./outer.js">
    alert("我会不会生效？");//不要这样写
</script>
<script>
    alert("我是内部2号")
</script>
```

### js的注释方法

#### 单行注释

​	Ctrl+/		//  不能换行

```js
// alert("JavaScript是世界上最美的语言")
```



#### 多行注释

​	Ctrl+shift+/		/**/ 可以换行

```js
/* alert("JavaScript是世界上最美的语言")
alert("JavaScript是世界上最美的语言")
alert("JavaScript是世界上最美的语言") */
```

### 调试工具

#### 输出调试

##### 	alert()

​	弹窗，括号里面除了数字和变量，剩下的都要使用引号包裹，可以是单引号，可以是双引号；

​      特点：具有阻塞的作用，会阻碍下一行代码的执行；

```js
alert(123);//阻塞了下一行弹窗的执行
alert("今天星期一");
```

##### 	prompt()

​	带有输入框的弹窗

​    有返回值：如果点击确定，返回的值是输入框中的内容，如果点击取消，返回null;

```js
prompt("请输入要修改的内容");
alert(prompt("请输入年龄"));
```

##### 	document.write()

​	直接显示在屏幕上，括号里面除了数字和变量，剩下的都要使用引号包裹，可以识别标签，如果页面加载完成之后再写，会覆盖原有内容；

```js
document.write("<h1>爸爸的爸爸是爷爷</h1>");
window.onload = function(){
    document.write("<h1>爸爸的妈妈是奶奶</h1>");
}
```

##### 	console.log()

​	控制台打印输出，括号里面除了数字和变量，剩下的都要使用引号包裹

​    调出控制台：打开页面-》审查元素-》找到console这一项，看打印内容

```js
console.log(123);
console.log("一句话");
```



#### 断点调试

​	1、打开页面

​	2、检查

​	3、找到source

​	4、在行号前面点击

​	5、刷新

​	6、点击箭头，逐行打断点；点击第一项，直接跳到下一个断点的位置；

### 变量

#### 变量的命名规则

​	1、变量名由数字、字母、_、$组成，不能以数字开头;

​	2、不能使用关键字和保留字；

​	3、见名知意，使用驼峰命名法；

​	4、变量名不能重复；

```js
var a = 10;//=是赋值符号
alert(a);
//1、变量由数字、字母、_、$组成，不能以数字开头
var 1a = 100;//错
var $ = 100;
//2、不能使用关键字和保留字
var var = 100;//关键字
var class = 100;//保留字
//4、变量名不能重名
var b = 10;
var b = 20;
alert(b);//20
```

#### 声明变量的几种情况

##### 	1、先声明，再赋值

```js
var a;//声明
a = 10;//赋值
```

##### 	2、声明变量同时赋值

```js
var a = 10;
```

##### 	3、声明多个变量

```js
var a = 10,b = 20,c = 30;
```

##### 	4、声明多个变量并赋相同的值（变量的连等）

```js
var a = b = c = 10;
```

##### 	5、声明变量但未赋值

```js
var a;
console.log(a);//undefined
```

##### 	6、未声明变量

```js
console.log(a);//报错 a is not defined;
```

##### 	7、直接给变脸赋值

​	不建议大家使用，不便于区分全局变量和局部变量

```js
a = 10;
console.log(a);
```

### js的数据类型

#### 数据类型分类

##### 为什么要有数据类型的分类？

​      1、不同的数据类型占用的内存空间不同，优化内存空间

​      2、不同数据类型所对应的业务不同，比如：数值型用来计算，布尔值用来判断

#####  js中的数据类型有哪些？

​      1、基本数据类型

​        数值型number、字符串string、布尔值boolean、空对象null、声明变量未赋值undefined

​      2、复杂数据类型

​        对象object、数组array、函数function

#####  检测数据类型：

​      typeof(检索值)/typeof 检索值

```js
var a = 10,b = 20;
console.log(typeof(a));//number
console.log(typeof b);//number

var t = true;
console.log(typeof t);//boolean
```

#### 数值型——number

​	包括整数、负数、0、小数、进制数（不能识别二进制）

```js
//不能识别二进制数
var c = 01;
var d = 0110;
//可以识别八进制数，以0开头，第二个数字不超过7，就是八进制
var e = 070;
console.log(e,typeof e);//56 "number"
//可以识别十六进制数，以0x开头，从0-9，从a-f
var f = 0x10;
console.log(f,typeof f);//16 "number"

console.log(a,typeof a);
console.log(b,typeof b);
console.log(c,typeof c);
console.log(d,typeof d);
```

​	三种特殊情况：

1. 运算值为NaN——not a number，所有运算出来的NaN都不相等

   ```js
   console.log("我"-20);//NaN
   console.log(NaN == NaN);//false
   ```

   

2. 运算结果为无限大

   ```js
   console.log(1/0);//Infinity
   ```

   

3. 对部分小数的运算(对部分小数取近似值的计算)，不能以小数作为判断条件

   ```js
   console.log(0.1 + 0.2);//0.30000000000000004
   console.log(0.2 + 0.2);
   ```

#### 字符串——string

​	用引号包裹的都是字符串，可以是双引号，可以是单引号，在js中建议使用''

```js
var str = "java";
var str1 = 'javaScript';
console.log(typeof str,typeof str1);//string string
```

##### 	获取字符串的长度

​	字符串.length;

```js
console.log(str.length);
```

##### 	获取指定位置的字符串

​	下标都是从0开始数的；

1. 字符串.charAt(下标)
2. 字符串[下标]

```js
//字符串.charAt(下标);
console.log(str.charAt(2));
//字符串[下标]
console.log(str[2]);
```

##### 	字符串的拼接

​	使用 + 对字符串进行连接

```js
console.log("鹅，鹅，鹅，"+"曲项向天歌");//+遇到字符串，起到连接的作用
var user = "";
var age = 18;
console.log("我叫"+user + ",我今年" + age + "岁了");
```

#### 布尔——Boolean

​	有true和false两个值，通常用作判断

```js
var t = true,f = false;
console.log(typeof t,typeof f);//boolean boolean

console.log(10>20);//false
console.log(1200>1000);//true
```

#### null

​	空对象，访问的是空对象返回的值

```js
var n = null;
console.log(typeof n);//object
```

#### undefined

​	未初始化，访问的是未赋值的变量

```js
var a;
console.log(a,typeof a);//undefined "undefined"
```

### 类型转换

1. 强制转换：通过一些转换方法来进行转换
2. 隐式转换：在运行过程中，自动进行数据类型之间的转换

#### 强制类型转换

##### 	转成数值型

1. Number(数据)，返回转成数值型后的值，不会更改原来的值

   Number的转换规则：空字符串、null、false转成0，true转成1，纯数字字符串转成相对应的数值，其他都转为NaN；

   ```js
   var s = "100";
   var s1 = Number(s);
   console.log(s, s1);//"100",100
   console.log(Number("100px"));//NaN
   console.log(Number(""));//0
   console.log(Number(true));//1
   console.log(Number(false));//0
   console.log(Number(null));//0
   console.log(Number(undefined));//NaN
   ```

2. parseInt(数据)，parseInt()，可以尽可能多的去识别数值，取整

   ```js
   console.log(parseInt("16px"));//16
   console.log(parseInt("1a6px"));//1
   console.log(parseInt("3.14px"));//3
   ```

   parseInt()的第二个参数：parseInt(数据，radix)，radix为进制数

   ```js
   var n = "070";
   console.log(parseInt(n));//标准浏览器：70 IE8-：56
   console.log(parseInt(n,10));//70
   ```

   

3. parseFloat()，转成浮点型，会保留小数

   ```js
   console.log(parseFloat("1a6px"));//1
   console.log(parseFloat("3.14px"));//3.14
   ```

   ###### 案例：计算器（简易版）

   ```js
   //计算两个整数的和
   var p1 = prompt("请输入第一个数字");//字符串
   var p2 = prompt("请输入第二个数字");//字符串
   //所有通过键盘输入的字符，都是字符串
   var c = Number(p1) + Number(p2);
   
   alert("结果为：" + c);
   ```

   ##### 转成字符串

   1. String(数据)；
   2. 数据.toString(radix)；radix是进制数，可选；

   ```js
   var n = 456;
   var t = true;
   var f = false;
   var nu = null;
   var u = undefined;
   
   /* String(数据)，任何数据类型都可以通过String转成字符串 */
   console.log(String(n),typeof String(n));
   console.log(String(t));
   console.log(String(f));
   console.log(String(nu));
   console.log(String(u));
   
   /* 数据.toString()，基本上跟String一样，但是，不能转null和undefined */
   console.log(n.toString());
   console.log(t.toString());
   console.log(f.toString());
   console.log(nu.toString());//Cannot read property 'toString' of null
   console.log(u.toString());//Cannot read property 'toString' of undefined
   
   //toString(radix),转成响应进制的字符串
   var num = 70;
   console.log(num.toString(2));//1000110
   ```

   ##### 转成布尔值

   Boolean(数据)；

   布尔值的转换规则：数值型中，除了0转成false，剩下的都是true，字符串中，除了空字符串转成false，其余的都是true，null和undefined都转成false；

   ```js
   //数值型中，除了0转成false，剩下的都是true
   console.log(Boolean(0));
   console.log(Boolean(1));
   console.log(Boolean(345));
   //字符串中，除了空字符串转成false，其余的都是true
   console.log(Boolean("点东西"));//true
   console.log(Boolean(""));//false 空字符串
   console.log(Boolean(" "));//true
   //null和undefined都转成false
   console.log(Boolean(null));
   console.log(Boolean(undefined));
   ```



#### 隐式类型转换

##### 	isNaN()

​	语法：isNaN(数据)；

​	确定不是一个数字，是数字——返回false，不是数字——返回true；

​	isNaN本身不做判断，会请来一个帮手Number()做判断（隐式转换），凡是Number能转的，就先转成数值型，再返回false，凡是Number不能转的，isNaN都给返回true;

```js
var str1 = "";
var str2 = "123";
var str3 = "16px";
var t = true;
var f = false;
var nu = null;
var un = undefined;
console.log(isNaN(str1));//"" -> 0 false
console.log(isNaN(str2));//"123" -> 123 false
console.log(isNaN(str3));//"16px" -> NaN true
console.log(isNaN(t));//false
console.log(isNaN(f));//false
console.log(isNaN(nu));//false
console.log(isNaN(un));//true
```

##### 	toFixed()

​	语法：数据.toFixed(保留位数)；

​	起到四舍五入的作用，来确定保留几位小数，返回一个字符串；

```js
var n = 3.14159265;
var n1 = 3.6545435;
console.log(n.toFixed(2));
console.log(n1.toFixed(1));//3.7
```
