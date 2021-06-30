## jQuery初识

### 什么是jQuery？

​	jQuery是一个快速，小型且功能丰富的JavaScript库。通过易于使用的API（可在多种浏览器中使用），使HTML文档的遍历和操作，事件处理，动画和Ajax等操作变得更加简单。结合了多功能性和可扩展性，jQuery改变了数百万人编写JavaScript的方式。

​      用最少的代码，实现最多的功能

### 官网

​	https://jquery.com/

### jQuery的引入

#### 本地引入

​	下载地址：https://jquery.com/download/

- 压缩版：比较适用于项目开发
- 未压缩版：比较适用于学习

​    最新版本：3.6.0  2.0以下版本：兼容到IE8-

```js
<script src="./js/jquery-3.6.0.js"></script>
```

#### 线上引入

​	CDN（内容分发网）

​	引入网址：https://www.bootcdn.cn/jquery/

​    直接在script的src里使用

```js
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
```

### jQuery的特点

- 强大的选择器功能，css所有选择器，它都能使用

- 功能函数化 语法单一 $(selector).action();

- 链式操作 $(selector).action().action().action()……

```html
<div></div>
<p id="con"></p>
<h1 class="oh"></h1>

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
<script>
    //1.强大的选择器功能，css所有选择器，它都能使用
    $("#con").css("background","pink");
    $(".oh").css("height","100px");

    //2.功能函数化 语法单一 $(selector).action();
    $(".oh").css("background","green").siblings().css("background","#fff");

    //3.链式操作 $(selector).action().action().action()……
        			    $('.oh').css("width","100px").css("height","100px").css("background","blue");
</script>
```

### $的作用

​	window.jQuery = window.$ = jQuery

​	$就是jQuery

​	由于变量命名是由数字、字母、下划线、$组成的，所以有时候可能会出现$冲突的问题,jQuery可以让出$的使用权给变量；

```js
//jQuery可以让出$的使用权利
$.noConflict();
```

​	如果jQuery语法执意要使用$时，可以这样：

```js
//JQuery偏要使用$
(function ($) {
    $('div').css({ "width": "100px", "height": "100px", "background": "red" });
})(jQuery);
```

### jQuery和DOM

​	jQuery和DOM可以共存，不能混用；

```js
//混用
$("div").style.width = "300px";//报错
oDiv.css("width","300px");//oDiv.css is not a function
```

​	jQuery和DOM相互转换：

- DOM转jQuery ：$(DOM元素) this、document不用加""

```js
$("div").click(function(){
    // console.log($(this));
    $(this).css("width","300px");
})
```

- jQuery转DOM ：需要在jQuery对象上加下标

```js
console.log($("div")[0]);
console.log($("div").get(0));
```

### jQuery页面加载方法

​	1、$(document).ready(function(){})

​	2、$().ready(function(){})

​	3、$(function(){})

```js
	//1.$(document).ready(function(){})
$(document).ready(function(){
    $("div").css("height","200px");
})
    //2.$().ready(function(){})
$().ready(function(){
    $("div").css("background","skyblue");
})
    //3.$(function(){})
$(function(){
    $("div").css("border","solid 1px teal");
})
```

#### $.ready和window.onload的区别?

​	1、$.ready 等文档加载完成之后执行，不会覆盖

​    2、window.onload等文档和资源都加载完成之后再执行，同一个页面只能写一个，后面的会覆盖前面的

### jQuery的选择器

#### 基本选择器

##### 	id选择器

```js
$("#oLi").css("background","skyblue");
```

##### 	类选择器

```js
$(".three").css("background","yellowgreen");
```

##### 	标签选择器

```js
$("li").css("background","pink");
```

##### 	群组选择器

​	多个选择器之间用"逗号"隔开

```js
$("p,.three").css("background","tomato");
```

###### 	案例：点击每一个li让点击的变色

```js
$("li").click(function(){
    $(this).css("background","red");
    //jQuery中可以自动给元素添加索引
    //index()是给当前元素的父元素中的子元素添加索引
    console.log($(this).index());
})
```

###### 	案例：九宫格

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
</ul>
<script src="./js/jquery-3.6.0.js"></script>
<script>
    $("li").click(function(){
        $(this).css("background","red").siblings().css("background","");
    })
</script>
```

#### 层次选择器

##### 	后代选择器

​	父元素	子元素

```js
$("ul span").css("background","orange");
```

##### 	子代选择器

​	父元素>子元素  获取到直接子元素

```js
$("ul>span").css("background","green");
```

##### 	兄弟选择器

- +连接（找到下一个兄弟）

```js
$("h1+li").css("background","pink");
```

- ~连接（找下面所有的兄弟）

```js
$("h1~li").css("background","tomato");
```

#### 基本过滤选择器

##### 	获取第一个元素

​	E:first

```js
$("li:first").css("background","orange");
```

##### 	获取最后一个元素

​	E:last

```js
$("li:last").css("background","orange");
```

##### 	获取指定元素

​	E:nth-child(第几个)

```js
$("li:nth-child(3)").css("background","tomato");
```

##### 	获取下标为偶数的元素

​	E:even

```js
$("li:even").css("background","gray");
```

##### 	获取下标为奇数的元素

​	E:odd

```js
$("li:odd").css("background","hotpink");
```

##### 	获取指定下标的元素

​	E:eq(下标)	或者	$(selector).eq(下标)

```js
$("li:eq(4)").css("background","green");
var n = 3;
$("li").eq(n).css("background","red");
```

##### 	获取除了这个元素之外的其他元素

​	E:not()

```js
$("li:not(.four)").css("background","teal");
```

##### 	获取下标小于某一值的所有元素

​	E:lt()

```js
$("li:lt(2)").css("background","#fff");
```

##### 	获取下标大于某一值的所有元素

​	E:gt()

```js
$("li:gt(2)").css("background","yellow");
```

###### 	案例：选项卡

```html
<button>菜单一</button>
<button>菜单二</button>
<button>菜单三</button>
<div style="display: block;">内容一</div>
<div>内容二</div>
<div>内容三</div>

<script src="./js/jquery-3.6.0.js"></script>
<script>
    $("button").click(function(){
        $(this).css("background","teal").siblings("button").css("background","");
        //选项卡切换
        $("div").eq($(this).index()).css("display","block").siblings("div").css("display","none");
    })
</script>
```

#### 属性过滤器

##### 	E[attr]

​	获取属性值为attr的元素

```js
$("li[class]").css("background","orange");
```

##### 	E[attr=value]

​	获取属性值为value的元素

```js
$("li[class=oLi]").css("background","teal");
```

##### 	E[attr!=value]

​	获取属性值不为value的元素

```js
$("li[class!=oLi]").css("background","pink");
```

##### 	E[attr^=value]

​	获取属性值以value开头的元素

```js
$("li[class^=o]").css("background","yellow");
```

##### 	E[attr$=value]

​	获取属性值以value结尾的元素

```js
$("li[class$=i]").css("background","blue");
```

##### 	E[attr*=value]

​	获取属性值含有value的元素

```js
$("li[class*=a]").css("background","hotpink");
```

#### 表单选择器

​	可以使用$(":input")获取到所有表单元素，可以使用$(":type类型")获取指定类型表单元素

```html
<input type="text"><br>
<input type="password"><br>
<input type="radio" checked>男
<input type="radio">女
<input type="checkbox" checked>敲代码
<input type="checkbox" checked>女孩子
<input type="checkbox">打游戏
<input type="checkbox">赚钱
<textarea name="" id="" cols="30" rows="10"></textarea>
<select name="" id=""></select>

<script src="./js/jquery-3.6.0.js"></script>
<script>
    console.log($("input"));
    console.log($(":input"));//选中所有表单，和类型无关
    console.log($(":text"));
    console.log($(":password"));
    console.log($(":radio"));
    console.log($(":checkbox"));
    console.log($("textarea"));

    //获取选中的单选框或复选框  在后面:checked
    console.log($(":radio:checked"));
    console.log($(":checkbox:checked"));
    //可以获取长度 init[]
    console.log($(":checkbox:checked").length);//2
</script>
```

###### 	案例：全选

```html
<ul>
    <li><input type="checkbox">女孩子</li>
    <li><input type="checkbox">敲代码</li>
    <li><input type="checkbox">男孩子</li>
    <li><input type="checkbox">打游戏</li>
    <li><input type="checkbox">打球</li>
</ul>

<script src="./js/jquery-3.6.0.js"></script>
<script>
    //如果所有input（li）的长度 == 我们选中的input的长度，就是全选
    $(":checkbox").click(function(){
        if($(":checkbox:checked").length == $("li").length){
            console.log("全选")
        }else{
            console.log("没有全选")
        }
    })
</script>
```

#### 节点遍历

##### 	获取子元素

​	children() 获取的是直接子元素

```js
$("div").children("span").css("background","orange");
```

##### 	获取后代元素

​	find(selector)

```js
$("div").find("span").css("background","teal");
```

##### 	获取父元素

​	parent() 获取的是直接父元素

```js
$(".fw").parent().css("background","deeppink");
```

##### 	获取父辈元素

​	parents() 获取的是所有父辈元素

```js
$(".fw").parents().css("background","pink");
```

##### 	获取上一个兄弟元素

​	prev()

```js
$(".boy").prev().css("background","purple");
```

##### 	获取上面所有兄弟元素

​	prevAll()

```js
$(".boy").prevAll().css("background","tomato");
```

##### 	获取下一个兄弟元素

​	next()

```js
$(".boy").next().css("background","purple");
```

##### 	获取下面所有兄弟元素

​	nextAll()

```js
$(".boy").nextAll().css("background","tomato");
```

##### 	获取所有兄弟节点

​	siblings(selector)

```js
$(".boy").siblings("li").css("background","green");
```

##### 	过滤

​	filter()

```js
$("li").filter(".haha").css("background","red");
```

​	排除

​	not()

```js
$("li").not(".haha").css("background","yellow");
```

### 操作元素内容

#### 闭合标签

- 获取：html()/text()
- 设置：html("内容")/text("内容")

```html
<div>国家一级保护动物</div>
<div id="fw"><b>国家一级保护废物</b></div>

<script>
    //获取闭合标签内容 html() text()
    console.log($("div").html());
    console.log($("#fw").html());
    console.log($("#fw").text());
    
    //设置闭合标签内容 html("内容")  text("内容")
    $("#fw").html("90°的水不能喝");
    //拼接内容
    $("#fw").html($("#fw").html() + "因为直角卡喉咙");
</script>
```

#### 表单元素

- 获取：val()
- 设置：val("内容")

```html
<input type="text">

<script>
    //获取表单内容  val()
    $(":input").blur(function(){
        console.log($(this).val());
    })
    //设置表单内容  val("内容")
    $("input").val("110");
</script>
```

###### 	案例：模拟对话框

```html
<div id="box">

</div>
孔子：<input type="text" id="message">
<button id="btn">send</button>

<script src="./js/jquery-3.6.0.js"></script>
<script>
    $("button").click(function(){
        $("#box").html($("#box").html()+"孔子："+$("input").val()+"<br>");
        $("input").val("");
    })
</script>
```

### 操作标签属性

​	原生获取：元素.属性名

​    DOM获取：元素.getAttribute("属性名")



​    原生设置：元素.属性名 = 属性值

​    DOM设置：元素.setAttribute("属性名","属性值")

- jQuery获取：1、$().attr("属性名")

  ​						2、$().prop("属性名")

  ```html
  <div id="box" class="div" tag=false></div>
  <input type="checkbox" checked>
  
  <script>
      console.log($("div").attr("id"));
      console.log($("div").prop("class"));
      
      console.log($("input").attr("checked"));//undefined/checked
      console.log($("input").prop("checked"));//false/true
      
      console.log($("div").attr("tag"));//false
      console.log($("div").prop("tag"));//undefined
  </script>
  ```

- jQuery设置：1、$().attr("属性名","属性值")

  ​						2、$().prop("属性名","属性值")

  批量设置：$().attr({"属性名1":"属性值1","属性名2":"属性值2"})

  ```html
  <div id="box" class="div" tag=false></div>
  <input type="checkbox" checked>
  
  <script>
      $("div").attr("id","BOX");
  	$("div").prop("class","DIV");
  
  	$("p").attr({"id":"oP","class":"属性值"})
  </script>
  ```

- 删除属性：1、removeAttr("属性名")

  ​					2、removeProp("属性名")

```html
<div id="box" class="div" tag=false></div>
<input type="checkbox" checked>

<script>
    $("div").removeAttr("id");
	$("div").removeProp("class");
</script>
```

##### 	attr和prop的区别和应用场景

​	1、attr获取的都是行间的属性，可以获取自定义属性

​	2、prop不可以获取自定义属性，获取到复选框的状态true、false

​    通常操作属性都用attr，操作复选框或单选框的时候，需要用prop