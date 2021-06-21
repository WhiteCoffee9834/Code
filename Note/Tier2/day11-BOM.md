### 操作表单

#### 表单域事件

##### onsubmit   提交

```js
/* 
    onsubmit   提交
    return true   提交
    return false  阻止提交
*/
oForm.onsubmit = function(){
    alert("成功");
    return false;
}
```

##### onreset     重置

```js
/* 
    onreset     重置
    return true     重置
    return false    取消重置
*/
oForm.onreset = function(){
    var s = confirm("是否确认重置？");
    if(s == true){
        return true;
    }else{
        return false;
    }
}
```



#### 表单的事件

##### onfocus	获得焦点

##### onblur	失去焦点

```js
/* 
    onfocus	获得焦点
    onblur	失去焦点
*/

oForm.user.onfocus = function(){
    this.style.background = "pink";
}
oForm.user.onblur = function(){
    this.style.background = "#fff";
}
```

##### oninput	实时监听表单输入内容   （标准浏览器下）

##### onpropertychange    实时监听表单输入内容	（IE）

```js
		/* 
            oninput	实时监听表单输入内容   （标准浏览器下）
	        onpropertychange	实时监听表单输入内容	（IE）
        */
       oForm.user.oninput = function(){
           console.log(this.value);
       }
       oForm.user.onpropertychange = function(){
           console.log(this.value)
       }
```

##### onchange	失去焦点的时候监听表单输入内容（只有内容变化的时候才会触发）

```js
	/* onchange	失去焦点的时候监听表单输入内容（只有内容变化的时候才会触发） */
       oForm.pass.onchange = function(){
           console.log(this.value);
       }
```

### 表单的方法

##### focus()	自动聚焦

##### blur()	自动失去焦点

```js
/* 自动聚焦 focus() */
oForm.user.focus();
oForm.pass.focus();

/* 自动失去焦点 blur() */
oForm.pass.blur();
```

### 表单域的方法

##### submit()    自动提交

```js
/* 自动提交 submit() */
oForm.submit();
```



## BOM与事件对象

​	浏览器对象模型（Browser Object Model）；

- window——最大的浏览器对象；


- navigator——浏览器信息；


- location——定位、跳转信息；


- history——历史信息；


- screen——屏幕信息；

### window.location

```js
/*location 跳转信息 */
console.log(window.location);

/* window.location.href  跳转地址 */

document.querySelector("button").onclick = function () {
    location.href = "https://www.baidu.com";
}

/* window.location.search  搜索信息 */
console.log(window.location.search);//?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=78000241_2_hao_pg&wd=a&fenlei=256&rsv_pq=9723d7d10001d05b&rsv_t=aed3Y2YEMWkpuRLXOub2966pynhnv2ddcR3SdURx%2FWrdNy2KI6KIxEB5BzHiBoaxqd%2FX8GQXa8w&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=2&rsv_btype=i&inputT=3230&rsv_sug4=4213

/*window.location.reload();  页面重载方法 */

//页面每隔三秒重新加载一次
setInterval(function () {
    window.location.reload();
}, 1000)
```

### window.navigator

```js
/* navigator 浏览器的一些信息 */
console.log(window.navigator);

console.log(window.navigator.userAgent);//用户代理 获取当前设备的一些信息
```

### 系统对话框

#### alert()   警告框

```js
window.alert(111);
```

#### confirm()   带有取消的对话框

​	带有取消按钮的弹窗 返回值：点击确定——true 点击取消——false

```js
var c = window.confirm("是否重置？");
console.log(c);
```

#### prompt()   带有输入框的对话框

​	带有输入框的弹窗 返回值：点击确定——返回输入内容 点击取消——null

```js
var p = window.prompt("请输入修改内容");
console.log(p);
```

### open()

​	打开一个网页

​	open(url,打开方式[_self、_blank],新窗口的大小,是否覆盖当前页面在浏览器中的记录)

​	有返回值，返回的是一个新窗口；

```html
<button onclick="window.open('https:\/\/www.baidu.com')">跳转到百度</button>
<button>跳转到京东</button>
<script>
    document.querySelectorAll("button")[1].onclick = function(){
       window.open("https://www.jd.com","_self");//当前页面打开
    //    var newWin = window.open("https://www.jd.com","_blank","width=500,height=500");//新窗口打开
       //window.open()有返回值，返回的是一个新窗口
       newWin.alert("我是新窗口的新弹窗");
    }
</script> 
```

### 	close()

​	关闭当前页面

​	window.close()

```js
<button onclick="window.close()">关闭当前页面</button>
```

### window.history

​	history.forward()——根据浏览器的历史记录进行前进一个；

​	history.back()——根据浏览器的历史记录进行后退一个;

​	history.go(s数字)——根据浏览器的历史记录去指定位置；1:下一页  -1上一页  2:下两页

- 第一页：

```js
	<h1>我是第一个页面</h1>
    <a href="./04history-next1.html">跳转到第二个页面</a>
    <button onclick="history.go(2)">跳转</button>
```

- 第二页：

```js
	<h1>我是第二个页面</h1>
    <a href="./04history-next2.html">跳转到第三个页面</a>
    <button onclick="history.forward()">前进</button>
    <button onclick="history.back()">后退</button>
```

- 第三页：

```js
	<h1>我是第三个页面</h1>
    <button onclick="history.back()">后退</button>
```

### window事件

#### window.onload()

​	页面加载事件，等文档和资源都加载完成后执行

```js
window.onload = function(){
    alert(document.getElementById("box"));
}
```

#### window.onresize()

​	窗口重置大小事件

```js
window.onresize = function(){
    console.log("页面大小重置了");
}
```

#### window.onscroll()

​	窗口滚动事件

```js
window.onscroll = function(){
    console.log("窗口滚动了")
}
```

### 	BOM的三大系列

#### 	client系列

​	1、元素.clientWidth —— 获取元素的可视宽  content+padding ；

​	2、元素.clientHeight —— 获取元素的可视高  content+padding;

​	3、元素.clientTop —— 获取元素的上边框;

​	4、元素.clientLeft —— 获取元素的左边框;

```js
console.log(document.querySelector("div").scrollWidth);//500
    console.log(document.querySelector("div").scrollHeight);//557

    document.querySelector("div").onscroll = function(){
        console.log(document.querySelector("div").scrollTop);
        console.log(document.querySelector("div").scrollLeft);
    }

    //获取窗口滚上去的距离
    //document.documentElement.scrollTop || document.body.scrollTop;

    //窗口滚动事件
    window.onscroll = function(){
        console.log(document.documentElement.scrollTop || document.body.scrollTop)
    }
```

#### 	offset系列

​	1、元素.offsetWidth —— 元素的占位宽  content+padding+border；

​	2、元素.offsetHeight —— 元素的占位高  content+padding+border;

​	3、元素.offsetTop —— 元素顶部离定位父元素顶端的距离；

​	4、元素.offsetLeft —— 元素左边离定位父元素左边的距离；

```js
	<div id="box1">
        <div id="box2"></div>
    </div>
    <script>
        var box1 = document.querySelector("#box1");
        var box2 = document.querySelector("#box2");
        //获取元素的占位宽高  content+padding+border
        console.log(box1.offsetWidth);//520
        console.log(box1.offsetHeight);//470

        //获取元素定位位置
        console.log(box2.offsetTop);//30
        console.log(box2.offsetLeft);//20
    </script>
```

#### 	scroll系列

​	1、元素.scrollTop —— 滚动时，元素上边被卷走的距离;

​	2、元素.scrollLeft —— 滚动时，元素左边被卷走的距离；

​	3、元素.scrollWidth —— 元素的实际宽度；

​	4、元素.scrollHeight —— 元素的实际高度；

```js
console.log(document.querySelector("#box div").offsetWidth);//260
console.log(document.querySelector("#box div").offsetHeight);//260

console.log(document.querySelector("#box div").offsetLeft);//0
console.log(document.querySelector("#box div").offsetTop);//10
```

###### 		案例：让元素居中

```js
var oDiv = document.querySelector("div");
var w = document.documentElement.clientWidth / 2 - oDiv.offsetWidth / 2;
var h = document.documentElement.clientHeight / 2 - oDiv.offsetHeight / 2;
oDiv.style.left = w + "px";
oDiv.style.top = h + "px";

window.onresize = function () {
    var w = document.documentElement.clientWidth / 2 - oDiv.offsetWidth / 2;
    var h = document.documentElement.clientHeight / 2 - oDiv.offsetHeight / 2;
    oDiv.style.left = w + "px";
    oDiv.style.top = h + "px";
}
```

###### 	案例：回到顶部

```js
//窗口滚动
window.onscroll = function () {
    var t = document.documentElement.scrollTop;
    if (t >= box.offsetTop) {
        p.style.display = "block";
    } else {
        p.style.display = "none";
    }
}

var timer = null
//回到顶部
p.onclick = function () {
    clearInterval(timer);
    //1200-50-50……  0
    timer = setInterval(function () {
        document.documentElement.scrollTop -= 50;
        if (document.documentElement.scrollTop <= 0) {
            document.documentElement.scrollTop = 0;
            clearInterval(timer);
        }
    }, 1)

}
```

###### 	案例：懒加载

```js
var oImgs = document.getElementsByTagName("img");
/* 第一屏 只要图片的顶端距离在屏幕可视高内，就可以显示图片 */

//获取屏幕可视高
var wH = document.documentElement.clientHeight;

//每一张图片顶端都要判断
for (var i = 0; i < oImgs.length; i++) {
    if (oImgs[i].offsetTop <= wH) {
        //把自定义属性更换成真正的src
        oImgs[i].src = oImgs[i].getAttribute("_src");
    }
}

//窗口滚动
window.onscroll = function () {
    var sT = document.documentElement.scrollTop;
    //每一张图片顶端都要判断
    for (var i = 0; i < oImgs.length; i++) {
        if (oImgs[i].offsetTop <= wH + sT) {
            //把自定义属性更换成真正的src
            oImgs[i].src = oImgs[i].getAttribute("_src");
        }
    }
}
```
