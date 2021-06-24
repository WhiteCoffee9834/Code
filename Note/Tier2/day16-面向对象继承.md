## 面向对象与less

### 面向对象的继承

#### 原型链继承

​	让子类构造函数的原型指向父类的实例对象

- 缺点：不能传参，如果子类对父类中的属性和方法进行了修改，一改全改

```js
//父类  （存放公共的属性和方法）
function Student(name,sex,id){
    this.name = name;
    this.sex = sex;
    this.id = id;
    this.arr = [1,2,3];
}
Student.prototype.study = function(){
    console.log("好好学习");
}

//子类  （存放只属于它自己的属性和方法）
function Primary(){
    this.play = function(){
        console.log("打游戏");
    }
}

//原型链继承：让子类构造函数的原型指向父类的实例对象

var s = new Student("小明","男","001");
// var s1 = new Student("小红","女","002");
Primary.prototype = new Student();

var p = new Primary();
p.arr.push(4);
console.log(p);
console.log(p.name);
p.play();
p.study();
var p1 = new Primary();
console.log(p1);

//缺点：不能传参，如果子类对父类中的属性和方法进行了修改，一改全改
```

#### 对象冒充继承

​	将父类构造函数当做普通函数调用，并修改this的指向为子类实例对象本身

- 优点：可以传参，并且只更改子类实例对象中的方法和属性，不会一改全改

- 缺点：无法继承父元素原型上的属性和方法

```js
//父类  （存放公共的属性和方法）
function Student(name, sex, id) {
    this.name = name;
    this.sex = sex;
    this.id = id;
    this.arr = [1, 2, 3];
}
Student.prototype.study = function () {
    console.log("好好学习");
}

//子类  （存放只属于它自己的属性和方法）
function Primary(name, sex, id) {
    Student.call(this,name, sex, id);
    this.play = function () {
        console.log("打游戏");
    }
}

var p = new Primary("小明","男","222");
console.log(p);
console.log(p.name);
p.arr.push(4);
var p1 = new Primary("小红","女","333");
console.log(p1);

p.play();
// p.study();

//优点：可以传参，并且只更改子类实例对象中的方法和属性，不会一改全改
//缺点：无法继承父元素原型上的属性和方法
```

#### 混合继承

​	原型链继承（继承父类原型上的方法和属性）+对象冒充继承（继承父类构造函数中的属性并且可以传参）

- 优点：基本完整，可以传参，可以继承父类原型上的属性和方法
- 缺点：会调用两次父类构造函数（一次是创建子类原型的时候，一次是在子类中调用的时候）

```js
//父类  （存放公共的属性和方法）
        function Student(name, sex, id) {
            this.name = name;
            this.sex = sex;
            this.id = id;
            this.arr = [1, 2, 3];
        }
        Student.prototype.study = function () {
            console.log("好好学习");
        }

        //子类  （存放只属于它自己的属性和方法）
        function Primary(name, sex, id) {
            Student.call(this,name,sex,id);
            this.play = function () {
                console.log("打游戏");
            }
        }

        //让子类构造函数的原型指向父类的实例对象
        var s = new Student();
        Primary.prototype = s;

        var p1 = new Primary("李华","男","443");
        console.log(p1);
        p1.study();
```

#### 寄生式组合继承

​	混合继承的进阶版，解决了调用两次父类构造函数的问题

​	在对象冒充继承的时候，正常操作就好；在进行原型链继承的时候，声明一个第三者，只继承父类原型对象上的属性和方法，让子类构造函数的原型指向第三者的实例对象，这样就不需要调用两次父类函数了

```js
//父类  （存放公共的属性和方法）
function Student(name, sex, id) {
    this.name = name;
    this.sex = sex;
    this.id = id;
    this.arr = [1, 2, 3];
}
Student.prototype.study = function () {
    console.log("好好学习");
}

//子类  （存放只属于它自己的属性和方法）
function Primary(name, sex, id) {
    Student.call(this, name, sex, id);
    this.play = function () {
        console.log("打游戏");
    }
}

//声明一个第三者构造函数
function Third(){}
Third.prototype = Student.prototype;
// Primary.prototype = Student.prototype;

//让子类构造函数的原型指向第三者的实例对象
Primary.prototype = new Third();

var p = new Primary("小明","男","888");
p.arr.push(4);
var p2 = new Primary("小红","男","888");
console.log(p.arr);
console.log(p2.arr);

Primary.prototype.eat = function(){
    console.log("吃肉肉");
}
console.log(Student.prototype);
```

## less

​	CSS 预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为 CSS 增加了一些编程的特性,

​	Less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 CSS 文件,只有在被编译后才能够被浏览器识别使用。

- 缺点： 只有在被编译成css后才能够被浏览器识别使用。


- 优点：语法简单    有一定的逻辑性   编程语言  高效    可以计算   后期维护方便，简洁高效，适应性强，代码可读性佳


### 使用

1. 软件Koala  拖拽less文件夹进去  点击要编译的文件   右键可以设置输出路径   再点编译  显示success则成功

   【输出方式】：

   normal正常　表示编译后的.css文件不进行压缩。

   compress压缩　表示编译后的css文件会进行压缩处理。

2. 还可以用vscode自带的插件 Easy Less (你需要设置编译路径 )

   ```
   "less.compile": {
          这是我的路径
       "out": "${workspaceRoot}\\day14\\asset\\css\\"
   }
   ```

   此时less文件夹内会自动生成一个同名的.css文件。

### 语法

#### 注释

​	// 注释：只在less中，不会被编译到css中

​	/* 注释*/ ：会被编译到css中



```
/* 这是注释 */
//   
```

#### 引入

​	@import空格再加路径

```
// 引入 less
@import "./public.less";
// 引入css
@import "../asset/css/public.css";
```

​	在html中引入的时候要引入的是.css文件

#### 变量

​	定义变量  @变量名称：变量值； 变量名命名的时候：小写字母 大写字母 下划线 数字  不能以数字开头

- 变量当做属性值来写的时候  直接放    变量名和变量值之间使用的是冒号   变量名和变量名之间使用的分号


```
@a:10px;
// 定义变量    @变量名称：变量值； 变量名命名的时候：小写字母  大写字母  下划线 数字   不能以数字开头
@b:100px;
.box{
    width: @a;
    height: @b;
} 
```

- 变量当做属性名使用的时候，需要      margin-@{l}:@a;  @l:left;   左外边距

```js
@l:left;
@a:10px;
.box{
    margin-@{l}:@a;
}
```

#### 多函数混合   混入

- 定义一些通用的属性集为一个class，然后在另一个class中去调用这些属性

```
// 混入1： less
@mixin:green;
.box1{
    width: 100px;
    height: 100px;
    background-color: @mixin;
}
.box2{
    .box1;
    border: 2px solid #000;
}
```

```
css中显示的：
.box1 {
  width: 100px;
  height: 100px;
  background-color: green;
}
.box2 {
  width: 100px;
  height: 100px;
  background-color: green;
  border: 2px solid #000;
}
```

- 参数的混入1   不设置默认值


```js
less:
@l:left;
.box2{
    .box1;
   border: 2px solid #000;
   .f(@l);
}
// 参数混入  不设置默认值
// 定义@r 
.f(@r){
    float:@r;
}
```

```
css:
.box2 {
  width: 100px;
  height: 100px;
  background-color: green;
  border: 2px solid #000;
  float: left;
}

```

- 参数混合2   带有默认值

```js
@mixin:green;
.box1{
    width: 100px;
    height: 100px;
    background-color: @mixin;
    .e();
}
//参数混入3  设置默认值
.e(@r:none){
    float:@r;
}
```

```js
.box1 {
  width: 100px;
  height: 100px;
  background-color: green;
  float: none;
}
```

- 参数混入3  无默认值，但是需要设置多个值


```js
@mixin:green;
.box1{
    width: 100px;
    height: 100px;
    background-color: @mixin;
    .e();
    .g(10px,solid,#000);
}
// 参数混入4  多个值  需要按照顺序写入
.g(@o,@p,@r){
    border: @o @p @r;
}
```

```
.box1 {
  width: 100px;
  height: 100px;
  background-color: green;
  float: none;
  border: 10px solid #000;
}
```

#### 嵌套

- 标签嵌套


```
// 嵌套
.box{
    width: 600px;
    height: 600px;
    // h2和p 是兄弟关系
    h2{
        height: 40px;
        background-color: red;
    }
    p{
        font-size: 100px;
        // p和span是父子关系
        span{
            background-color: yellow;
        }
    }
}
```

```
.box {
  width: 600px;
  height: 600px;
}
.box h2 {
  height: 40px;
  background-color: red;
}
.box p {
  font-size: 100px;
}
.box p span {
  background-color: yellow;
}
```

- 在嵌套的代码块内，使用&引用父元素。


```js
 a{
            color: purple;
            text-decoration: none;
            &:hover{
                background-color: pink;
            }
        }

```

```js
 a {
  color: purple;
  text-decoration: none;
}
a:hover {
  background-color: pink;
}

```

#### 继承

​	样式的继承通过extend伪类来实现。混合可以将一个定义好的class A引入到另一个class B中，从而实现class B继承class A中的所有属性

- 继承1：


```
// 继承1
.con{
    width: 300px;
    height: 300px;
    background-color: red;
}
.bot div{
    // .con最外边的大盒子  在con中  有.bot div  给所有的div 设置
    &:extend(.con);
    margin: 5px;
}
```

```
群组选择器
.con,
.bot div {
  width: 300px;
  height: 300px;
  background-color: red;
}
.bot div {
  margin: 5px;
}
```

- 继承2：


```
.con{
    width: 300px;
    height: 300px;
    background-color: red;
}
// 继承2：
.top div:extend(.con){
    list-style: none;
}
```

```
.con,
.top div {
  width: 300px;
  height: 300px;
  background-color: red;
}
.bot div {
  margin: 5px;
}
.top div {
  list-style: none;
}
```

#### 运算

​	任何数字、颜色或者变量都可以参与运算，运算应该被包裹在括号中；以（）进行优先级计算。

```
// 运算
.side{
    width: (200px-10)*4/2;
}
```

```
.side {
  width: 380px;
}
```

