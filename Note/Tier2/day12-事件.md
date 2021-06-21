## 事件

​	浏览器和用户交互的一种方式；

### 事件对象

​	当事件触发的时候，浏览器会将一些事件的相关信息保存到一个内置的全局对象中，可以直接使用window.event查看

```js
document.onclick = function(ev){
    /* 
        event谷歌和IE都兼容，但是火狐低版本不兼容
        火狐通过事件驱动函数传入的第一个参数来获取事件信息
    */
    var event = window.event || ev;
    console.log(event);
}
```

#### event.type

​	查看事件类型

```js
document.onclick = function(ev){
    var event = window.event || ev;
    console.log(event.type);
}
```

#### event.altKey

​	触发事件的时候，是否按住了alt键；按住了就是true，否则就是false；

```js
document.onclick = function(ev){
    var event = window.event || ev;
    console.log(event.altKey);
}
```

#### event.shiftKey

​	触发事件的时候，是否按住了shift键；按住了就是true，否则就是false；

```js
document.onclick = function(ev){
    var event = window.event || ev;
    console.log(event.shiftKey);
}
```

#### event.ctrlKey

​	触发事件的时候，是否按住了ctrl键；按住了就是true，否则就是false；

```js
document.onclick = function(ev){
    var event = window.event || ev;
    console.log(event.ctrlKey);
}
```

#### event.clientX/clientY

​	获取鼠标位置，相对于窗口的位置

```js
document.onclick = function(ev){
    var event = window.event || ev;
    console.log(event.clientX);
    console.log(event.clientY);
}
```

#### event.pageX/pageY

​	获取鼠标位置，相对于页面（document、body）的位置

```js
document.onclick = function(ev){
    var event = window.event || ev;
    console.log(event.pageX);
    console.log(event.pageY);
}
```

#### target（标准浏览器）/srcElement（IE8-）

​	触发事件的对象 

```js
document.onclick = function(ev){
    var event = window.event || ev;
    // console.log(event.target);
    // console.log(event.srcElement);
    //兼容
    console.log(event.target || event.srcElement);
}
```

### 事件对象的绑定

#### 标准浏览器

​	元素.addEventListener(事件类型[不加on],事件处理函数,是否捕获[默认false])

```js
function fn1(){
    alert(this);
}
function fn2(){
    alert(2);
}
btn.addEventListener("click",fn1);
btn.addEventListener("click",fn2);
```

#### IE8-

​	元素.attachEvent(事件类型[加on],事件处理函数);    IE没有捕获

```js
function fn1(){
    alert(this);
}
function fn2(){
    alert(2);
}
btn.attachEvent("onclick",fn1);
btn.attachEvent("onclick",fn2);
```

​	1、标准浏览器的事件类型不需要加on，IE8-需要加on；

​	2、标准浏览器有捕获，IE没有；

​	3、绑定多个事件时，标准浏览器是正序显示，IE是倒序；

​	4、标准浏览器的this指向的是触发事件的元素，IE里指向的是window；

#### 兼容处理

```js
//事件绑定 兼容处理
if(btn.addEventListener){
    btn.addEventListener("click",fn1);
}else{
    btn.attachEvent("onclick",fn1);
}

//1、找可变的量，拿出来
//2、把可变的量替换成形参
//3、调用函数并传参测试
function bind(el,event,fn){
    if(el.addEventListener){
        el.addEventListener(event,fn)
    }else{
        el.attachEvent("on"+event,fn)
    }
}
bind(oDiv,"click",fn2);
```

### 事件对象的取消

#### 标准浏览器

​	元素.removeEventListener(事件类型[不加on],事件处理函数)；

```js
function fn1(){
    alert(this);
}
oDiv.removeEventListener("click", fn1);
```

#### IE8-

​	元素.detachEvent(事件类型[加on],事件处理函数); 

```js
function fn1(){
    alert(this);
}
oDiv.detachEvent("onclick", fn1);
```

#### 兼容处理

```js
function cancel(el,event,fn){
    if(el.removeEventListener){
        el.removeEventListener(event, fn);
    }else{
        el.detachEvent("on"+event, fn);
    }
}
```

###### 		案例：简单的拖拽

```html
<div></div>

<script>
    var oDiv = document.getElementsByTagName("div")[0];

    //鼠标按下
    oDiv.onmousedown = function(){
        //鼠标移动（document）
        document.onmousemove = function(ev){
            var event = window.event || ev;
            // console.log(event.clientX,event.clientY);
            oDiv.style.left = event.clientX + "px";
            oDiv.style.top = event.clientY + "px";
        }
        //当鼠标抬起，不让盒子跟着鼠标移动（清除鼠标移动事件）
        document.onmouseup = function(){
            document.onmousemove = null;
        }
    }
```

### 事件流

​	当事件发生时，会在元素与根节点之间产生一个顺序的传递，路径所经过的所有节点都会接收该事件，这就是事件流；

​	三个阶段：

- 事件捕获阶段：当事件发生时，从window开始一层一层向目标节点进行查找，一般不会在这个阶段处理事件；
- 找到目标节点：确认触发当前事件的元素；
- 事件冒泡阶段：从目标节点一层一层向父元素传递事件，一般在这个阶段处理事件；

​	如果一个事件中既有捕获又有冒泡，那么先进行捕获，再进行冒泡；

​	事件绑定：

```js
//第三个参数为false，则代表冒泡
oDiv[0].addEventListener("click",fn,false);
oDiv[1].addEventListener("click",fn,false);
oDiv[2].addEventListener("click",fn,true);

function fn(){
    alert(this.id);
}
```

​	元素.事件 = function(){}：

```html
<div style="padding: 30px;background-color: red;" id="box0">
    <div style="padding: 30px;background-color: pink;" id="box1">
        <div style="padding: 30px;background-color: greenyellow;" id="box2"></div>
    </div>
</div>
<script>
    var oDiv = document.getElementsByTagName("div");

    //元素.事件  默认都会有事件冒泡
    oDiv[0].onclick = function(){
        alert(this.id);
    }
    oDiv[1].onclick = function(){
        alert(this.id);
    }
    oDiv[2].onclick = function(){
        alert(this.id);
    }
</script>
```

### 阻止冒泡事件

#### 	标准浏览器

​	ev.stopPropagation();

#### 	IE

​	ev.cancelBubble = true;

```js
function fn(ev){
    var ev = event || ev;
    //标准浏览器阻止冒泡：ev.stopPropagation()
    ev.stopPropagation();//阻止冒泡

    //IE8-阻止冒泡：ev.cancelBubble = true;
    ev.cancelBubble = true;

    //兼容
    ev.stopPropagation?ev.stopPropagation():ev.cancelBubble = true;
    alert(this.id);

}
```

###### 		案例：div显示隐藏

```html
<button>显示</button>
<div></div>

<script>
    var btn = document.getElementsByTagName("button")[0];
    var oDiv = document.getElementsByTagName("div")[0];

    //btn点击
    btn.onclick = function(ev){
        var event = window.event || ev;
        oDiv.style.display = "block";
        //阻止冒泡
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    }

    //点击空白区域
    document.onclick = function(){
        oDiv.style.display = "none";
    }
</script>
```

### 阻止事件默认行为

#### 标准浏览器

​	ev.preventDefault()

```html
<a href="https://www.baidu.com">跳转</a>

<script>
    var oA = document.querySelector("a");

    oA.onclick = function(ev){
        var event = window.event || ev;
        event.preventDefault();//标准浏览器
        console.log("跳转到百度");
    }
</script>
```

#### IE8- 

​	ev.returnValue = false;

```html
<a href="https://www.baidu.com">跳转</a>

<script>
    var oA = document.querySelector("a");

    oA.onclick = function(ev){
        var event = window.event || ev;
        event.returnValue = false;//IE
        console.log("跳转到百度");
    }
</script>
```

##### 兼容

```js
if(event.preventDefault){
    event.preventDefault();
}else{
    event.returnValue = false;
}
```

#### 事件驱动

​	return false;

```html
<a href="https://www.baidu.com">跳转</a>

<script>
    var oA = document.querySelector("a");

    oA.onclick = function(ev){
        var event = window.event || ev;
        console.log("跳转到百度");
        return false;
    }
</script>
```

###### 	案例：右击生成菜单

```html
<ul>
    <li>返回</li>
    <li>前进</li>
    <li>重新加载</li>
    <li>另存为</li>
    <li>查看网页源代码</li>
</ul>

<script>
    var oUl = document.querySelector("ul");
    //鼠标右击
    document.oncontextmenu = function(ev){
        //获取鼠标点击位置
        var event = window.event || ev;
        //阻止默认事件
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var x = event.clientX;
        var y = event.clientY;
        //设置ul的定位
        oUl.style.left = x + "px";
        oUl.style.top = y + "px";
    }
</script>
```

### 事件委托（事件代理）

​	将事件添加到父元素上，当事件发生时，父元素会找到对应的子元素进行处理

​	原理：利用事件冒泡，从最深的根节点开始，逐步向上传播事件；

​	优点：可以给未来的元素添加事件

```js
oUl.onclick = function(ev){
    var event = window.event || ev;
    ev.target.style.background = "red";
}

var newLi = document.createElement("li");
oUl.appendChild(newLi);
```

### 键盘事件

#### 元素.onkeydown

​	键盘按下(通常用这个)

```js
document.onkeydown = function(ev){
    var event = window.event || ev;
    console.log(event.shiftKey);
    console.log(event.ctrlKey);
    console.log(event.altKey);

    //标准浏览器：查看具体按了哪一个键（IE8-没有这个功能）
    console.log(event.key);
    //查看按键的ASCII码值，字母都按大写的ASCII码值显示
    console.log(event.keyCode);//0-48 a-65 a-65
}
```

#### 元素.onkeyup

​	键盘抬起

```js
document.onkeyup = function(ev){
    var event = window.event || ev;
    console.log(event.shiftKey);
    console.log(event.ctrlKey);
    console.log(event.altKey);

    //标准浏览器：查看具体按了哪一个键（IE8-没有这个功能）
    console.log(event.key);
    //查看按键的ASCII码值，字母都按大写的ASCII码值显示
    console.log(event.keyCode);//0-48 a-65 a-65
}
```

#### 元素.onkeypress

​	键盘按下（用的不多）

```js
document.onkeypress = function(ev){
    var event = window.event || ev;
    //标准浏览器：查看具体按了哪一个键（IE8-没有这个功能）
    console.log(event.key);
    //查看按键的ASCII码值，字母都按大写的ASCII码值显示
    console.log(event.keyCode);//0-48 a-65 a-65
}
```

##### 	元素.onkeypress和元素.onkeydown的区别？

​	onkeypress可以区分大小写，组合按键，可以识别后面按的按键；

​	onkeydown不区分大小写，所有的字母都按大写打印，组合按键，会识别所有的按键；

###### 	案例：按住Ctrl+c 打印“复制”

```js
document.onkeydown = function(ev){
    var event = window.event || ev;
    if(event.ctrlKey == true && event.keyCode == 67){
        console.log("复制")
    }
}
```

###### 	案例：发送留言

```html
<input type="text">
<ul></ul>

<script>
    var oInp = document.getElementsByTagName("input")[0];
    var oUl = document.getElementsByTagName("ul")[0];

    oInp.onkeydown = function(ev){
        var event = window.event || ev;
        //判断按住的是enter
        if(event.keyCode == 13){
            var oLi = document.createElement("li");
            oLi.innerHTML = oInp.value;
            oUl.appendChild(oLi);

            oInp.value = "";
        }
    }
</script>
```

###### 	案例：键盘控制div移动

```html
<div></div>

<script>
    var oDiv = document.getElementsByTagName("div")[0];

    document.onkeydown = function(ev){
        var event = window.event || ev;
        //左37 上38 右39 下40
        switch(event.keyCode){
            case 37 : oDiv.style.left = oDiv.offsetLeft - 10 + "px";break;
            case 38 : oDiv.style.top = oDiv.offsetTop - 10 + "px";break;
            case 39 : oDiv.style.left = oDiv.offsetLeft + 10 + "px";break;
            case 40 : oDiv.style.top = oDiv.offsetTop + 10 + "px";break;
        }
    }
</script>
```

### 鼠标滚轮事件

#### 事件

##### 	标准浏览器/IE

​	元素.onmousewheel

##### 	火狐

​	必须使用事件绑定的方式添加滚轮事件

​	元素.addEventListener("DOMMouseScroll",函数)

```js
function scroll(ev){
    console.log("滚动了");
}

document.onmousewheel = scroll;

//兼容IE和火狐
if(document.addEventListener){
  document.addEventListener("DOMMouseScroll",scroll);
}
```

#### 滚动方向

##### 	标准浏览器/IE

​		ev.wheelDelta; 向下：-120 向上：120

##### 	火狐浏览器

​		ev.detail; 向下：3 向上-3

```js
function scroll(ev){
    var event = window.event || ev;
    console.log(event.wheelDelta);
    console.log(ev.detail);
}

document.onmousewheel = scroll;

if(document.addEventListener){   document.addEventListener("DOMMouseScroll",scroll);
}
```

#### 最终模板

​	已经处理好的，以后可以直接拿来用；

```js
function scroll(ev){
    var event = window.event || ev;
    //兼容滚轮方向
    var tag;//如果tag为true，就是向上滚动，如果为false，就是向下滚动
    if(event.wheelDelta){
        tag = event.wheelDelta > 0 ? true : false;
    }else{
        tag = ev.detail < 0 ? true : false;
    }

    if(tag == true){
        //滚轮向上滚动执行的代码
    }else{
        //滚轮向下滚动执行的代码
    }
}

document.onmousewheel = scroll;

if(document.addEventListener){   document.addEventListener("DOMMouseScroll",scroll);
}
```

