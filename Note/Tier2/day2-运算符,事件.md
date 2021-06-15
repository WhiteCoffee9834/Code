## 运算符与表达式

1. 运算符：用于执行程序代码运算，会针对一个以上操作数项目来进行运算

   ​			   举例：1+2 ， + 就是运算符，1,2就是操作数；

   ​			   分类：算术运算符、赋值运算符、比较运算符、逻辑运算符、三目运算符

2. 表达式：表达式由一个或多个操作数通过运算符连接起来的式子

   ​			   举例：c = 10 + 20就是表达式；

   ​			   分类：算术表达式、赋值表达式、条件表达式、逻辑表达式、三元表达式

### 运算符

#### 算数运算符

​	进行算数运算：\+ - * / %（求模、取余）++（自增） --（自减）；

```js
console.log(1 + 2);//3
console.log(1 + "2");//12 + 会进行隐式转换，如果遇到字符串，会起到拼接的作用
console.log(2 - 1);//1
console.log(2 - "1");//1 - * / 都会进行隐式转换，会尽可能地转成数值型进行计算
console.log(2 * 1);//2
console.log(2 / 1);//2

//% 取余数
console.log(10 % 3);//1
console.log(20 % 6);//2
console.log(20 % 2 == 0);//判断取余有没有余数，如果余数为0，就是偶数
console.log(320 % 100 / 10);//取出来10位数

//++ 自身累加
//++在前，先自增，再计算
var a = 10;
console.log(++a);//11
//++在后，先计算，再自增
var b = 10;
console.log(b++);//10

//-- 自身自减
//--在前，先自减，再计算
var m = 10;
console.log(--m);//9
//--在后，先计算，再自减
var n = 10;
console.log(n--);//10
```

#### 赋值运算符 

​	=、+=、-=、*=、/=、%=

```js
var a = 10;//把a的值赋为10
a += 5;//+=是累加、追加，在当前的基础上增加
console.log(a);//15
```

#### 比较运算符

​	>、>=、<、<=、== 、!=、=== 、!==

​	比较的结果会返回一个布尔值true或false；	

​	在判断的时候都会尽量转成number型再去比较，字符串与字符串之间的比较不会进行转换，会直接从左到右比较ASCII码值；

```js
console.log(2 > "100000");//false 把"100000"转成数值型再进行比较
console.log("2" > "100000");//true 比较的是ASCII码值 50 > 49
```

​	==：只比较值，不比较数据类型，因为==比较时会发生隐式转换；

```js
console.log(10 == "10");//true
console.log(10 != "10");//false
```

​	===：既比较值，又比较数据类型；

```js
console.log(10 === "10");//false
console.log(10 !== "10");//true
```

​	null和undefined在使用==进行判断的时候，规定返回true，与其他类型作比较时不会进行隐式转换；

```js
console.log(null == undefined);//true
console.log(null == null);//true
console.log(undefined == undefined);//true
console.log(null == 0);//false
```

#### 逻辑运算符

1. 与：&&
2. 或：||
3. 非：!

在代码中，都是通过&&或||来连接两个判断条件

##### 逻辑与（&&）

​	一假为假，两真为真

```js
console.log(10 > 20 && 20 < 30);//false
console.log(10 < 20 && 20 < 30);//true
```

##### 逻辑或（||）

​	一真为真，两假为假

```js
console.log(10 > 20 || 10 < 30); //true
console.log(10 > 20 || 10 > 30); //false
```

##### 逻辑非（!）

​	取反，返回的是布尔值

```js
console.log(!10);  //false
console.log(!false); //true
```

##### 短路运算（逻辑中断）

​	当有多个表达式（值）时，如果左边的表达式（值）可以确定结果时，则不再执行右边的表达式；

1. 短路与

   如果第一个表达式为真，则执行第二个表达式，如果第一个表达式为假，则第二个表达式不会执行；

   ```js
   var a = 1,b = 1;
   
   var n = --a && --b;
   console.log(n,a,b);//0 0 1
   
   var n = ++a && ++b;
   console.log(n,a,b);//2 2 2
   ```

   

2. 短路或

   如果第一个表达式为真，则执行第一个表达式，如果第一个表达式为假，则执行第二个表达式；

   ```js
   var a = 1,b = 1;
   
   var n = --a || --b;
   console.log(n,a,b);//0 0 0
   
   var n = ++a || ++b;
   console.log(n,a,b);//2 2 1
   ```

#### 三目运算符

​	语法：判断条件?条件成立时执行的语句:条件不成立时执行的语句

```js
var s = -10;
var n;
s > 0 ? n = 100 : n = 20;
console.log(n);

var money = 100000;
money > 10000 ? alert("泡面加三个鸡蛋") : alert("继续打工");
```

###### 案例：判断输入的是整数还是小数

```js
var p = prompt("请输入一个数");
parseInt(p) == p ? alert("您输入的是一个整数") : alert("您输入的是一个小数");
```

### 运算符的优先级和结合性

​	计算机在计算表达式时执行运算的先后顺序；

​	()>算术运算符（先算乘除再算加减）>比较运算符>逻辑运算符

## JavaScript交互基础

​	用户在操作页面的时候，需要使用事件驱动，才会触发交互效果，所以页面实现交互效果的三个因素是：标签、事件和执行的程序；

### 获取DOM元素

#### 通过ID获取

​	document.getElementById("id名");

#### 通过标签名获取

​	可以批量获取标签，得到一个集合

​	可以通过下标获取具体元素：集合[下标]；

```js
console.log(oLis[0]);
```

1. 整个文档中获取：document .getElementsByTagName("标签名");

   ```js
   var ul = document.getElementsByTagName("ul");
   ```

2. 父元素中获取：父元素.getElementsByTagName("标签名");

   ```js
   var li = ul[0].getElementsByTagName("li");
   ```

​	可以通过 集合.length获取集合中元素的个数

```js
console.log(oLis.length);
```

#### 通过类名获取元素

​	IE8-不兼容；

1. 整个文档中获取：document .getElementsByClassName("类名")；

   ```js
   var cLis = document.getElementsByClassName("box");
   ```

   

2. 父元素中获取：父元素.getElementsByClassName("类名");

   ```js
   var li = cLis[0].getElementsByClassName("box1");
   ```

   

### JavaScript的事件

​	事件：指能被程序发现的行为；常见的事件有：鼠标事件、滚轮事件、键盘事件、表单事件、窗口事件等；

#### 事件添加

​	语法：元素.事件名 = function(){事件发生时执行的代码}

```js
box.onclick = function(){alert("被点击了")}
```

#### 鼠标事件

1. 点击事件

   onclick

   ```js
   box.onclick = function(){
       alert("被点击了");
   }
   ```

2. 双击事件

   ondblclick

   ```js
   box.ondblclick = function(){
       alert("被双击了");
   }
   ```

3. 右击事件

   oncontextmenu

   ```js
   box.oncontextmenu = function(){
       alert("鼠标右击");
   }
   ```

4. 鼠标移入

   onmouseover/onmouseenter

   ```js
   box.onmouseenter = function(){
       console.log("鼠标移入");
   }
   box.onmouseover = function(){
       console.log("鼠标移入");
   }
   ```

5. 鼠标移出

   onmouseout/onmouseleave

   ```js
   box.onmouseleave = function(){
       console.log("鼠标移出");
   }
   box.onmouseout = function(){
       console.log("鼠标移出");
   }
   ```

6. 鼠标按下

   onmousedown

   ```js
   box.onmousedown = function(){
       console.log("按下了");
   }
   ```

7. 鼠标抬起

   onmouseup

   ```js
   box.onmouseup = function(){
       console.log("抬起了");
   }
   ```

8. 鼠标移动

   onmousemove

   ```js
   box.onmousemove = function(){
       console.log("鼠标一直在移动");
   }
   ```

**onmouseover/onmouseout与onmouseenter/onmouseleave的区别？**

​	onmouseenter不会冒泡，onmouseover会发生冒泡

```js
<div class="bBox">
    <div class="sBox"></div>
</div>
<script>
    var bBox = document.getElementsByClassName("bBox")[0];
    var sBox = document.getElementsByClassName("sBox")[0];
    //onmouseenter 子元素不会触发父元素的事件 不会冒泡
    bBox.onmouseenter = function(){
        console.log("我是父盒子的鼠标移入事件")
    }
    //onmouseover 子元素会触发父元素的事件  会冒泡
    bBox.onmouseover = function(){
        console.log("我是父盒子的鼠标移入事件")
    }
</script>
```

### js操作标签内容

​	表单元素：input  select  textarea ……

​	闭合标签：div  span  p  h1~h6 ……

#### js操作表单元素内容

​	获取：元素.value

```js
console.log(inp.value);

//点击按钮获取输入的内容
btn.onclick = function(){
    console.log(inp.value);
}
```

​	设置：元素.value = "值";

```js
inp.value = "云想衣裳花想容";

//点击按钮设置表单内容
btn.onclick = function(){
    inp.value = "春风拂槛露华浓";
}
```

###### 案例：简易计算器

```html
<input type="text">
+
<input type="text">
=
<input type="text">
<button>运算</button>

<script>
    //获取元素
    var inp = document.getElementsByTagName("input");
    var btn = document.getElementsByTagName("button")[0];
    //给btn添加点击事件
    btn.onclick = function(){
        //获取前两个表单的值
        var v1 = inp[0].value;
        var v2 = inp[1].value;
        //两个表单的值相加
        var sum = parseFloat(v1) + parseFloat(v2);//通过键盘输入的值，都是字符串，如果直接相加，会拼接起来
        //把计算好的和赋值给第三个输入框
        inp[2].value = sum;
    }
</script>
```

#### js操作闭合标签内容

​	获取：元素.innerHTML/innerText；

```js
console.log(oDiv.innerHTML);//<p>云想衣裳花想容</p>
console.log(oDiv.innerText);//云想衣裳花想容
```

​	设置：元素.innerHTML/innerText = "值"；

```js
oDiv.innerHTML = "<p>春风拂槛露华浓</p>";
oDiv.innerText = "<p>春风拂槛露华浓</p>";
```

​	特性：设置的时候会覆盖原有内容，innerHTML能识别标签，innerText不能识别标签；

​	为了避免覆盖原有内容，使用字符串拼接的方式：

```js
//拼接
oDiv.innerHTML = oDiv.innerHTML + "，春风拂槛露华浓。"

//累加  +=
oDiv.innerHTML += "，春风拂槛露华浓。";
```



###### 案例：模拟对话框

```html
<div id="box"></div>
小芳：<input type="text" id="message">
<button id="btn">send</button>

<script>
//获取元素
var box = document.getElementById("box");
var message = document.getElementById("message");
var btn = document.getElementById("btn");

//给按钮添加点击事件
btn.onclick = function(){
    //获取表单输入的内容
    var con = message.value;
    //设置div的内容
    // box.innerHTML += "小芳：" + con + "<br>";
    box.innerHTML += "<p>小芳:" + con + "</p>";
    message.value = "";
}
</script>
```

### js操作元素属性

​	为HTML元素提供各种附加信息的就是HTML属性，通常在开始标签中以 属性名 = "属性值" 这种方式出现，比如<img>的src属性，或者标签的title、class、id属性；

#### 操作元素固有属性

​	获取：元素.属性名；

​	设置：元素.属性名 = "值"；

```html
<div class="box" id="bigBox" style="width:200px;" title="wrap"></div>

<script>
    var oDiv = document.getElementById("bigBox");
    
    //获取
    console.log(oDiv.title);//wrap
    console.log(oDiv.id);//bigBox
    console.log(oDiv.className);//class是保留字，需要使用className来获取类名

    //设置
    oDiv.className = "BBox";
</script>
```

###### 案例：翻牌子

```html
<img src="./img/default.jpg" alt="">
<script>
    //获取元素
    var pic = document.getElementsByTagName("img")[0];

    //鼠标移入图片，图片换一张
    pic.onmouseenter = function(){
        //设置图片的src属性
        pic.src = "./img/fan.jpg";
    }
    //鼠标移出，再换回来
    pic.onmouseleave = function(){
        pic.src = "./img/default.jpg";
    }
</script>
```

#### 操作元素样式属性

​	**注意：操作的都是行间样式**

​	获取：元素.style.属性名 = "属性值";（复合属性需要改写成驼峰形式）；

```js
console.log(oDiv.style.background);
console.log(oDiv.style.fontSize);//复合属性需要改写成驼峰的形式
```

​	设置：1、元素.style.属性名 = "值"；（复合属性需要改写成驼峰形式）；

​			   2、元素.style.cssText = "值"；（会覆盖原有样式，通常用作初始的时候设置样式，设置的时候跟写行间样式一样即可，复合属性不需要改写成驼峰形式）；

```js
//元素.style.属性名 = "值"；
oDiv.style.background = "teal";
oDiv.style.width = "20px";

//元素.style.cssText = "值"；
oDiv.style.cssText = "width:200px;height:200px;background:tomato;font-size: 20px;";
```

