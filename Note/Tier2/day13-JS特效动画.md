## JavaScript特效动画

### 拖拽

#### 拖拽效果的实现

```html
<div id="box">tyrey</div>

<script>
    //获取元素
    var oBox = document.getElementById("box");

    //在oBox上鼠标按下
    oBox.onmousedown = function(ev){
        var event = window.event || ev;
        //计算元素应该回退的距离
        var l = event.clientX - oBox.offsetLeft;
        var t = event.clientY - oBox.offsetTop;
        //在document上鼠标移动
        document.onmousemove = function(ev){
            //定位值随着鼠标移动
            var event = window.event || ev;
            //获取鼠标位置
            var x = event.clientX - l;
            var y = event.clientY - t;
            //重新给元素的定位赋值
            oBox.style.left = x + "px";
            oBox.style.top = y + "px";
        }
        //鼠标抬起，清除鼠标移动事件
        document.onmouseup = function(){
            document.onmousemove = null;
        }
    }
</script>
```

#### 拖拽的问题

- 问题：如果有文字，会产生双击选中文字并拖拽的效果，如果有图片，会默认有保存的功能，无法拖拽图片

- 原因：浏览器的默认行为

- 解决方式：阻止默认行为

```html
<img src="./t1.png" alt="" id="box">
<script>
	//获取元素
    var oBox = document.getElementById("box");

    //在oBox上鼠标按下
    oBox.onmousedown = function(ev){
        var event = window.event || ev;
        //计算元素应该回退的距离
        var l = event.clientX - oBox.offsetLeft;
        var t = event.clientY - oBox.offsetTop;
        //在document上鼠标移动
        document.onmousemove = function(ev){
            //定位值随着鼠标移动
            var event = window.event || ev;
            //获取鼠标位置
            var x = event.clientX - l;
            var y = event.clientY - t;
            //重新给元素的定位赋值
            oBox.style.left = x + "px";
            oBox.style.top = y + "px";
        }
        //鼠标抬起，清除鼠标移动事件
        document.onmouseup = function(){
            document.onmousemove = null;
        }

        //阻止默认行为
        return false;//IE8-不好用
    }
</script>
```

​	使用 元素.事件的方式添加的事件，如果想阻止默认行为的话，直接使用return false的方式；但是IE8-不支持，所以我们需要使用全局捕获的方式，解决IE的默认行为问题；

#### IE的全局捕获

​	添加了全局捕获，会监听整个页面上对应事件的发生，只要发生对应事件就会截取过来，相当于CSS中的 !important ，会把添加全局捕获元素的事件优先级提升到最高；

- 设置全局捕获：元素.setCapture()
- 释放全局捕获：元素.releaseCapture()

```html
<button>按钮1</button>
<button>按钮2</button>
<script>
    var btn = document.getElementsByTagName("button");
    btn[0].onclick = function(){
        alert("btn0");
    }
    btn[1].onclick = function(){
        alert("btn1");
    }

    btn[1].setCapture();
    btn[1].releaseCapture();
</script>
```

#### 拖拽完整版

​	我们可以通过设置全局捕获的方式，把元素鼠标按下产生的一系列操作提升成最高优先级，甚至比浏览器默认行为要高，这样就可以解决IE8-中浏览器默认行为的问题；当鼠标抬起时，需要清除掉拖拽的行为，也就不再需要设置全局捕获了，这时就可以释放全局捕获；

```html
<!-- <div id="box">tyrey</div> -->
<img src="./t1.png" alt="" id="box">

<script>
    //获取元素
    var oBox = document.getElementById("box");

    //在oBox上鼠标按下
    oBox.onmousedown = function (ev) {
        var event = window.event || ev;
        //计算元素应该回退的距离
        var l = event.clientX - oBox.offsetLeft;
        var t = event.clientY - oBox.offsetTop;
        //在document上鼠标移动
        document.onmousemove = function (ev) {
            //定位值随着鼠标移动
            var event = window.event || ev;
            //获取鼠标位置
            var x = event.clientX - l;
            var y = event.clientY - t;
            //重新给元素的定位赋值
            oBox.style.left = x + "px";
            oBox.style.top = y + "px";
        }
        //鼠标抬起，清除鼠标移动事件
        document.onmouseup = function () {
            document.onmousemove = null;
            //释放全局捕获
            if(oBox.releaseCapture){
                oBox.releaseCapture();
            }
        }

        //使用全局捕获，可以把元素的拖拽行为提升到默认行为之前(标准浏览器不支持)
        if(oBox.setCapture){
            oBox.setCapture();
        }

        //阻止默认行为
        return false;//IE8-不好用
    }
</script>
```

###### 	案例：碰撞检测

​	只需要在拖拽的基础上做一个碰撞判断；

```html
<div id="box"></div>
<img src="./trump1.jpg" alt="" id="pic">

<script>
    var oBox = document.getElementById("box");
    var oPic = document.getElementById("pic");

    oBox.onmousedown = function (ev) {
        var event = window.event || ev;
        var l = event.clientX - oBox.offsetLeft;
        var t = event.clientY - oBox.offsetTop;
        document.onmousemove = function (ev) {
            var event = window.event || ev;
            var x = event.clientX - l;
            var y = event.clientY - t;
            oBox.style.left = x + "px";
            oBox.style.top = y + "px";

            //判断大图和小图的距离
            if(oBox.offsetLeft+oBox.offsetWidth>=oPic.offsetLeft
                &&oBox.offsetLeft <= oPic.offsetLeft+oPic.offsetWidth
                &&oBox.offsetTop+oBox.offsetHeight>=oPic.offsetTop
                &&oBox.offsetTop <= oPic.offsetTop+oPic.offsetHeight)
            {
                oPic.src = "./trump2.jpg";
            }else
            {
                oPic.src = "./trump1.jpg";
            }
        document.onmouseup = function () {
            document.onmousemove = null;
            if(oBox.releaseCapture){
                oBox.releaseCapture();
            }
        }
        if(oBox.setCapture){
            oBox.setCapture();
        }
        return false;
    }
</script>
```

### 缓冲运动

#### 单方向缓冲运动

​	需要在每次向上加的值（步长、速度）上进行处理；

​	公式：步长（速度）=（目标值-当前值）/缩放系数

```html
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.getElementsByTagName("div")[0];

    /* 
        缓冲运动：
        公式：速度（步长） = (目标值 - 当前位置)/缩放系数
        0 + 100 + 90 + 80 …… + 0(当前位置+0相当于停止)
    */

    oDiv.onclick = function(){
        var timer = setInterval(function(){
            //1、获取当前位置
            var cur = parseInt(getStyle(oDiv,"left"));
            //2、计算速度
            var speed = (500 - cur) / 10;
            //5、达不到目标值，有小数问题，需要取整
            speed = Math.ceil(speed);
            //3、改变当前位置
            cur += speed;
            //6、达到目标点，清除定时器
            if(cur == 500){
                clearInterval(timer);
            }
            //4、重新定位
            oDiv.style.left = cur + "px";
        },30)
    }
</script>
```

#### 双方向缓冲运动

​	由于缓冲运动的speed值是通过目标值和当前值计算出来的，会自动计算出正负，所以不需要手动去改变，双方向运动时的speed取整方式不一样，我们需要做判断；

```html
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.getElementsByTagName("div")[0];

    oDiv.onclick = function () {
        var timer = setInterval(function () {
            //1、获取当前位置
            var cur = parseInt(getStyle(oDiv, "left"));
            //2、计算速度
            var speed = (500 - cur) / 10;
            //5、达不到目标值，有小数问题，需要取整
            // speed = Math.ceil(speed);//向右走
            // speed = Math.floor(speed);//向左走
            //7、判断应该如何取整（向左走，向下取整；向右走，向上取整）
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3、改变当前位置
            cur += speed;
            //6、达到目标点，清除定时器
            if (cur == 500) {
                clearInterval(timer);
            }
            //4、重新定位
            oDiv.style.left = cur + "px";
        }, 30)
    }
</script>
```

#### 缓冲运动封装

```html
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.getElementsByTagName("div")[0];
    
    //调用、调试
    oDiv.onclick = function () {
        bufferMove(oDiv,"left",1000);
        bufferMove(oDiv,"width",500);
        bufferMove(oDiv,"height",500);
    }
    
    function bufferMove(el,attr,target) {
        var timer = setInterval(function () {
            var cur = parseInt(getStyle(el, attr));
            var speed = (target - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            cur += speed;
            if (cur == target) {
                clearInterval(timer);
            }
            el.style[attr] = cur + "px";
        }, 30)
    }
</script>
```

#### 带有透明度的缓冲运动

- 问题：刚刚封装好的缓冲运动框架，透明度不适用

- 原因：1、透明度没有"px"单位	2、透明度变化区间从0-1，特别小，不好控制
- 解决方式：1、重新给设置属性时，把单位去掉	2、透明度变化区间扩大至0-100

```html
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.getElementsByTagName("div")[0];

    oDiv.onclick = function () {
        bufferMove(oDiv,"opacity",0);
    }
    function bufferMove(el,attr,target) {
        var timer = setInterval(function () 
            //当前值扩大100倍
            var cur = parseInt(getStyle(el, attr) * 100);
            var speed = (target - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            cur += speed;
            if (cur == target) {
                clearInterval(timer);
            }
            //去掉"px"单位
            el.style[attr] = cur / 100;
        }, 30)
    }
</script>
```

#### 任意属性运动的封装

- 问题：bufferMove函数无法同时改变透明度和其他属性，不能真正实现代码复用
- 解决方式：封装

```html
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.getElementsByTagName("div")[0];

    oDiv.onclick = function () {
        bufferMove(oDiv,"left",1000);
        bufferMove(oDiv, "height", 500);
        bufferMove(oDiv, "opacity", 0);
    }
    function bufferMove(el, attr, target) {
        var timer = setInterval(function () {
            //判断属性是否为透明度
            if(attr == "opacity"){
                var cur = parseInt(getStyle(el, attr) * 100);
            }else{
                var cur = parseInt(getStyle(el, attr));
            } 
            var speed = (target - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            cur += speed;
            if (cur == target) {
                clearInterval(timer);
            }
            //判断属性是否为透明度
            if(attr == "opacity"){
                el.style[attr] = cur / 100;
            }else{
                el.style[attr] = cur + "px";
            }                               
        }, 30)
    }
</script>
```

###### 	案例：抽屉式导航

​	完成抽屉式导航时，会产生三个问题：

- 
  - 问题1：抽搐
  - 原因：没有达到目标值，不会清除上一次的定时器，会造成定时器叠加
  - 解决方式：触发事件的时候先清除上一次的定时器
- 
  - 问题2：抽搐未解决
  - 原因：清除定时器的时候发生了预解析，找不到timer
  - 解决方式：去全局声明一个空的timer
- 
  - 问题3：鼠标移出一个div的时候，会保持在原来的状态
  - 原因：两个div共用一个定时器，如果移入到其中一个，另一个定时器就被清除，所以会停留在当前状态
  - 解决方式：给每一个div都自定义一个定时器
    自定义属性：1、直接在开始标签内部添加<div tag = true>
                           2、通过js添加  元素.属性名 = 属性值

```html
<div></div>
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.querySelectorAll("div");

    oDiv[0].onmouseenter = function () {
        bufferMove(oDiv[0], "height", 500);
    }
    oDiv[0].onmouseleave = function () {
        bufferMove(oDiv[0], "height", 100);
    }
    oDiv[1].onmouseenter = function () {
        bufferMove(oDiv[1], "height", 500);
    }
    oDiv[1].onmouseleave = function () {
        bufferMove(oDiv[1], "height", 100);
    }

    // var timer;
    function bufferMove(el, attr, target) {
        clearInterval(el.timer);
        el.timer = setInterval(function () {
            if (attr == "opacity") {
                var cur = parseInt(getStyle(el, attr) * 100);
            } else {
                var cur = parseInt(getStyle(el, attr));
            }
            var speed = (target - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            cur += speed;
            if (cur == target) {
                clearInterval(el.timer);
            }
            if (attr == "opacity") {
                el.style[attr] = cur / 100;
            } else {
                el.style[attr] = cur + "px";
            }
        }, 30)
    }
</script>
```

#### 多属性运动

- 问题：无法同时让多个属性一起运动，只有最后一次调用的bufferMove函数有效果
- 原因：每次调用函数，都会清除上一次调用的定时器，所以之前调用的bufferMove函数不起作用
- 解决方式：使用一个对象，同时传入多个属性，这样就可以传入多个属性并且只需开一个定时器

```html
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.querySelectorAll("div");
    oDiv[0].onmouseenter = function () {
        bufferMove(oDiv[0], { "width": 500, "height": 200 });
    }

    function bufferMove(el, props) {
        clearInterval(el.timer);
        el.timer = setInterval(function () {
            //遍历对象
            for (var attr in props) {
                if (attr == "opacity") {
                    var cur = parseInt(getStyle(el, attr) * 100);
                } else {
                    var cur = parseInt(getStyle(el, attr));
                }
                var speed = (props[attr] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                cur += speed;
                if (cur == props[attr]) {
                    clearInterval(el.timer);
                }
                if (attr == "opacity") {
                    el.style[attr] = cur / 100;
                } else {
                    el.style[attr] = cur + "px";
                }
            }
        }, 30)
    }
</script>
```

#### 多属性运动最终版

- 
  - 问题1：透明度达不到目标值
  - 原因：opacity的目标值太小了，计算不准确
  - 解决方式：给目标值同时扩大100倍

- 
  - 问题2：只要有一个属性达到目标值，其他属性就不管了
  - 原因：只要有一个属性达到目标值，就会清除定时器，不管其他属性是否达到目标值
  - 解决方式：声明一个变量，假装全部达到目标值，如果有一个没达到，变量不成立

```html
<div></div>

<script src="./tools.js"></script>
<script>
    var oDiv = document.querySelectorAll("div");
    oDiv[0].onmouseenter = function () {
        bufferMove(oDiv[0], { "width": 500, "height": 200,"opacity":0.5 });
    }

    function bufferMove(el, props) {
        clearInterval(el.timer);
        el.timer = setInterval(function () {
            //声明变量假设已经达到目标值
            var tag = true;
            //遍历对象
            for (var attr in props) {
                if (attr == "opacity") {
                    //扩大目标值
                    props[attr] = props[attr] < 1 ? props[attr] * 100 : props[attr];
                    var cur = parseInt(getStyle(el, attr) * 100);
                } else {
                    var cur = parseInt(getStyle(el, attr));
                }
                var speed = (props[attr] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                cur += speed;
                if (cur != props[attr]) {
                    tag = false;
                }
                if (attr == "opacity") {
                    el.style[attr] = cur / 100;
                } else {
                    el.style[attr] = cur + "px";
                }
            }
            //如果tag为true，则说明全部达到目标值，清除定时器
            if(tag == true){
                clearInterval(el.timer);
            }
        }, 30)
    }
</script>
```

