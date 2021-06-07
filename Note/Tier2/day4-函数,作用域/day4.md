## for-in循环与函数

### for-in循环

#### 字面量对象

​	字面量对象由键值对组成，是一组没有长度、无序的数据结构；

​	表现形式：    键名:键值   或者   key:value

```js
var json = {
    name:"张三",
    age:18,
    sex:"女"
}
```

- 获取对象中的某个键值:  对象名.键名  或者  对象名["键名"]

```js
console.log(json.name);//"张三"
console.log(json.age);//18
console.log(json["sex"]);//"女"
```

- 给对象添加新的属性:  对象名.键名 = "属性值"  或者  对象名["键名"] = "属性值"

```js
json.hobby = "话剧";
json["address"] = "南京";
```

​	**注意：任何可以使用.的地方都能使用[],但是.后面不能接变量，[]里面可以放变量；**

###### 案例：生成新闻列表

```js
var arr = [
    {
        "title":"中方回应菅义伟向靖国神社供奉祭品",
        "content":"日本首相菅义伟向靖国神社供奉祭品，外交部发言人汪文斌回应：敦促日方正视并深刻反省侵略历史，同军国主义划清界限... "
    },
    {
        "title":"打了上针没下针？国家卫健委回应",
        "content":"21日，国家卫健委新闻发言人米锋针对有群众反映第二剂次预约难的情况表示，各地要做好精准调配，确保第二剂次接种在... "
    },
    {
        "title":"单亲妈妈多次家暴女儿被撤销监护权",
        "content":"12岁的女孩佳佳在父母离异后跟着妈妈李平生活。因学习未满足李平要求，佳佳经常被打得遍体鳞伤。4月20日，法院作出... "
    },
    {
        "title":"官方责令特斯拉立即提供行车数据",
        "content":"近日，特斯拉车主上海车展维权一事持续发酵。21日，郑州市郑东新区市场监督管理局回应，责成特斯拉汽车销售服务（郑..."
    }
]

for(var i = 0;i < arr.length;i++){
    document.body.innerHTML += "<h3>"+arr[i].title+"</h3><p>"+arr[i].content+"</p>";
}
```



#### 遍历对象

​	由于对象是无规则长度的，所以不能使用常规的for循环进行遍历，需要使用专门遍历对象的方法，for-in；

​	语法：for(声明变量  in  对象){}

​	注意：for-in主要用于循环对象，但是也可以用来循环数组；

```js
for(var key in json){
    console.log(json[key]);
}
```

### 函数

​	函数是由事件驱动或者当它被调用执行时可重复使用的代码块；

- 函数的作用：提高代码重用率，提升代码效率；
- 使用场景：
  1. 作为事件处理函数  btn.onclick = function(){}
  2. 作为对象的方法  var obj = {eat:function(){}}
  3. 实现代码复用（函数封装）function 函数名(){}
- 两个步骤：1.声明  2.调用

#### 函数的使用

- 普通函数：
  - 声明：function 函数名(){}
  - 调用：函数名();
- 表达式函数：
  - 声明：var 变量名 = function(){}
  - 调用：变量名();

**注意：命名不能重复（函数名与函数名、函数名与变量名），如果重复的话，后面的会覆盖前面的；**

```js
//1.普通函数声明方式
function study(){
    console.log("沉迷学习，日渐消瘦");
}

//函数没有调用不会执行
study();
study();
study(); //可重复使用代码块


//2.表达式声明
var s = function (){
    console.log("沉迷游戏，无法自拔");
}

s();
s();
```

###### 案例：声明函数计算两个数的和

```js
function sum(){
    console.log(10 + 20);
}
sum();
```

###### 案例：声明函数计算1~100的和

```js
function sum(){
    var s = 0;
    for(var i = 1;i<=100;i++){
        s += i;
    }
    console.log(s);
}

sum();
sum();
```

#### 函数的参数

​	在实现的功能一样的情况下，需要更改函数内部的部分数据，计算出不同的结果，我们可以使用函数参数来实现；

1. 形参（形式参数）：

   在声明函数时，函数中一些不确定的值，我们可以先使用变量来表示，这个变量叫做函数的形参；

   ```js
   function sum(n){
   	//n就是形参，相当于var n；
   }
   ```

2. 实参（实际参数）：

   如果函数声明时有形式参数，就可以在调用函数时传给这个形参一个具体的值，这个值叫做实参；

   ```js
   sum(10)
   ```

   ##### 单个参数

   封装计算1-n的和的函数		

```js
function sum(n){
    var sum = 0;
    for(var i = 1;i <= n;i++){
        sum += i;
    }
    console.log(sum);
}
sum(100);
sum(10000);
sum(40);
```

##### 多个参数

​	在函数中不确定的值有多个时，可以使用多个参数，多个参数之间用","隔开；

声明一个函数，计算两个数的和

```js
function add(a,b){
    console.log(a+b);
}
add(10,20);
```

##### arguments

​	实参集合，当无法确定会传入多少个实参时，我们就不需要去定义形参了，直接使用arguments即可，arguments是一个伪数组，和数组的用法类似；

```js
function sum(){
	console.log(arguments);
}
sum(10,30);
sum(1,2,3,4);
```

###### 案例：计算所有用户输入的和

```js
function result(){
    var sum = 0;
    for(var i = 0;i < arguments.length;i++){
        sum += arguments[i];
    }
    console.log(sum);
}
result(10,20,40);
result(1,2,3,4,5);
```

##### 函数参数要注意的问题

- 形参和实参个数不等的问题
  1. 函数的形参个数多于实参时，多出来的形参会赋值为undefined；
  2. 函数的实参个数多于形参时，多出来的实参不参与代码执行；
- arguments和形参的关系
  - arguments和形参是同一个东西，一改全改；

```js
function fun(a){
    arguments[0] = 100;
    console.log(a); //100

    a = 200;
    console.log(arguments[0]);
}
fun(10);
```

###### 案例：打印1~n内所有的偶数

```js
function even(n){
    for(var i = 1;i <= n;i++){
        if(i % 2 == 0){
            console.log(i);
        }
    }
}
even(100);
even(20);
```

###### 案例：计算某个数的阶乘

```js
function jc(n){
    var s = 1;
    for(i = 1;i <= n;i++){
        s *= i;
    }
    console.log(s);
}
jc(6);
jc(10);
```

##### 函数的参数类型

​		函数的参数可以是任意类型的数据，但是null和undefined通常不作为参数传递，没有意义；

```js
/* 声明一个函数，可以通过标签名获取到元素 */
function getEl(tag){
    var el = document.getElementsByTagName(tag);
    console.log(el);
}
getEl("div");//函数参数为字符串
getEl("p");
```

```js
/* 函数参数为函数 */
function sayHi(){
    console.log("Hi~ o(*￣▽￣*)ブ");
}
function getHi(f){
    f();
}
getHi(sayHi);
```

### 作用域与作用域链

#### 作用域

​	指变量或函数能够使用的有效范围，分为全局作用域和局部作用域；

##### 全局作用域

​		指直接由script标签包裹的范围；

```html
<script>
 	//此部分为全局作用域
</script>
```

##### 局部作用域

​		指函数的{}包裹的范围；

```html
<script>
    function sum(){
        //此部分为局部作用域
    }
</script>
```

#### 全局变量和局部变量

##### 全局变量（函数）

​		在全局作用域下声明的，能够在任何地方被访问和修改，会一直存在于内存中，直到页面关闭才会被销毁；

```html
<script>
    var a = 10;//a为全局变量
    function fn(){//fn为全局函数
        alert("耶耶耶");
    }
</script>
```



```html
<script>
    var a = 10;
    function fn(){
        a++;
        console.log(a);//11 全局变量可以在任何地方访问和修改
    }
    console.log(a);
</script>
```



##### 局部变量（函数）

​		在局部作用域下声明的，只能在当前作用域下被访问和修改，只要出了当前作用域就会被销毁；

```html
<script>
    function outer(){
        var a = 10;//a为局部变量；
        function inner(){//inner为局部函数；
            alert("耶耶耶");
        }
    }
</script>
```



```html
<script>
	function fn(){
        var a = 10;
        console.log(a);//10
    }
    fn();
    console.log(a);//报错 a is not defined  局部变量只能在当前作用域下访问和修改
</script>
```



```html
<script>
    function outer(){
        var a = 10;
        a++;
        console.log(a);//11
        
        function inner(){
            a = 30;
            console.log(a);//30
        }
        inner();
    }
    outer();
    console.log(a);//报错 a is not defined  局部变量只能在当前作用域下访问和修改
</script>
```

#### 作用域链

​	js中的一种查找机制，在使用到一个变量时，先从自身作用域开始查找，如果找不到，就继续向上一层作用域找，一直找到全局，如果全局也没有，就会报错 is not defined；

### 预解析（变量提升）

​	浏览器在执行代码时，不仅仅是简单的自上而下执行，它会执行两个步骤：1、预解析，2、逐行执行；

​	什么是预解析？

​		浏览器在解析代码的时候，会先找var和function两个关键字，如果找到var关键字，就先把变量存起来，存的形式为 var a，值为undefined；如果找到function关键字，则直接存function代码块；

```js
//找var 关键字
console.log(a);//undefined
var a = 10;
console.log(a);//10

//找function关键字
console.log(fn);
fn();
function fn(){
    console.log("a");
}
```

##### 普通函数与表达式函数的区别

​		普通函数进行预解析的时候，找的是function关键字，存储的是代码块；

​		表达式函数进行预解析的时候，找的是var关键字，存储的值是undefined；

```js
/* 普通函数 */
fn();//正常调用执行
function fn(){
    console.log(1111);
}

/* 表达式函数 */
fn1();//报错
console.log(fn1);//undefined
var fn1 = function(){
    console.log(111);
}
```

​	**注意：局部作用域也会进行预解析**

```js
function sum(){
    console.log(a);//undefined
    var a = 10;
}
sum();
```

###### 预解析习题

```js
var a = 10;
function fn(){
    console.log(a);//undefined
    var a = 30;
}
fn();
```

```js
function fn(a){
    console.log(a);//100
    var a = 20;
    console.log(a);//20
}
fn(100);
```

```js
console.log(a);//undefined
function fn(a){
    console.log(a);//100
    var a = 10;
    console.log(a);//10
}
var a = 100;
fn(a);
```

```js
console.log(num);//undefined
function func2() {
    console.log(num);//undefined
    var num = 456;
    console.log(num);//456
}
var num = 123;
func2(num);
```

```js
console.log(num);//undefined
function func3() {
    console.log(num);//123
    num = 456;
    console.log(num);//456
}

var num = 123;
func3(num);
console.log(num);//456
```

​	**注意：预解析阶段：函数优先级>变量优先级**

```js
var a;
function a(){};
console.log(a);//function a(){};

function a(){};
var a;
console.log(a);//function a(){}; 

var a = 1;
function a(){};
console.log(a);//1  var a = 1
```



### 函数的返回值

​	函数是一个整体，函数内部的变量（函数）外界无法使用，我们可以通过函数的返回值，将变量（函数）返回给外界使用；

​	语法：return 需要返回的内容

​	特点：1. return一次只能返回一个，写多个值只能返回最后一个；

​				2. 函数只要遇到return，就结束了，return后面的代码都不会再执行；

```js
function sum(a, b) {
    var c1 = a + b;
    return c1;
}
//函数调用表达式的结果就是函数的返回值
var s = sum(10, 20);
console.log(s);
```



​	所有的数据类型，都能作为函数的返回值；

```js
//返回值为数组和对象
function sum(a,b){
    var c = a + b;
    var d = a * b;
    // return [c,d];//返回的是一个数组
    return {"和":c,"积":d};//返回的是一个对象
}
// console.log(sum(10,20));
var s = sum(10,20);//{"和":c,"积":d}
console.log(s["和"]);
console.log(s["积"]);
```

```js
//返回值为函数
function outer(){
    //如果想在外部调用inner函数，就是需要使用outer内部的函数，那么就需要把inner作为outer的返回值，返回到外部；
    return function inner(){
        console.log("耶耶耶");
    }
}
outer()();//inner函数
```

