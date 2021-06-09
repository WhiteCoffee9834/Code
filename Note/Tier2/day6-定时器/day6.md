## 定时器与函数封装

### 定时器

- 延时定时器：等待某段时间后执行，只执行一次；通常用于广告弹窗和咨询弹窗；
- 间隔定时器：间隔某段时间执行一次，只要不清除，就会反复执行；轮播图，倒计时，抽奖；

#### 延时定时器

​	语法：setTimeout(函数,时间)；时间以ms为单位；1000ms = 1s；

```js
setTimeout(function(){
    alert("111");
},2000);

/* 显示广告 */
var advertisement = document.getElementsByTagName("img")[0];
setTimeout(function(){
    advertisement.style.display = "block";
},3000);

/* 函数可以提前定义好 */
setTimeout(show,5000);
function show(){
    advertisement.style.display = "none";
}
```



#### 间隔定时器

​	语法：setInterval(函数名,时间)；时间以ms为单位；1000ms = 1s；

```js
setInterval(function(){
    console.log("时间又过了一秒……");
},1000);

/* 每隔一秒让n自增1 */
var n = 0;
setInterval(function(){
    n++;
    console.log(n);
},1000)
```

###### 	案例：广告弹窗

```html
<div id="adver">
    <span id="close">X</span>
</div>
<script>
    var adver = document.getElementById("adver");
    var close = document.getElementById("close");

    setTimeout(function () {
        adver.style.display = "block";
    }, 3000);
    close.onclick = function () {
        adver.style.display = "none";
        setTimeout(function () {
            adver.style.display = "block";
        }, 3000);
    }
</script>
```

###### 	案例：切换图片

```html
<img src="./img/1.jpg" alt="">

<script>
    var oImg = document.getElementsByTagName("img")[0];

    n = 0;
    setInterval(function(){
        n++;
        console.log(n)
        if(n > 5){
            n = 1;
        }
        oImg.src = "./img/" + n +".jpg";
    },1000);
</script>
```

###### 	案例：模拟倒计时

```js
var n = 10;
document.body.innerHTML = n;
setInterval(function(){
    n--;
    if(n < 0){
        n = 0;
    }
    document.body.innerHTML = n;
},1000)
```

#### 清除定时器

​	语法：clearInterval(intervalId)；

```js
var timer1 = setInterval(function(){
    console.log(111);
},1000)
var timer2 = setInterval(function(){
    console.log(222);
},1000)
console.log(timer1);//1
console.log(timer2);//2
```

###### 	案例：切换图片

```js
<img src="./img/1.jpg" alt="">

<script>
    var oImg = document.getElementsByTagName("img")[0];

    var n = 0;
    function change(){
        n++;
        if(n > 5){
            n = 1;
        }
        oImg.src = "./img/" + n + ".jpg";
    }

    var timer = setInterval(change,1000);

    oImg.onmouseenter = function(){
        clearInterval(timer);
    }
    oImg.onmouseleave = function(){
        timer = setInterval(change,1000);
    }
</script>
```

### 封装运动框架

###### 	案例：飞翔的小鸟

```html
<button>向东飞</button>
<img src="./imgs/right.gif" alt="">

<script>
    //1.获取元素
    var btn = document.getElementsByTagName("button");
    var bird = document.getElementsByTagName("img")[0];
    var timer = null;

    //2.点击按钮
    btn[0].onclick = function () {
        //10.关于小鸟越点越快的问题:
        //原因：每次点击的时候，都新生成了一个定时器，造成了定时器的叠加问题
        //解决方式：点击的时候，先清除一遍定时器
        clearInterval(timer);
        console.log(timer);//undefined 变量提升（预解析）
        //3.  left:0 10 20 30
        //7.希望点击按钮，每隔一段时间，自动增加10px
        timer = setInterval(function () {
            //4.获取当前的位置  "0px"
            var cur = parseInt(getStyle(bird, "left"));//0
            console.log(cur);//0px Number/parseInt/parseFloat
            //5.每次都在自身基础上+10
            cur += 10;
            //8.判断小鸟飞的目标值
            if(cur >= 1000){
                cur = 1000;
                //9.清除定时器
                clearInterval(timer);
            } 
            //6.重新设置bird当前的位置
            bird.style.left = cur + "px";
        }, 60)



    }

    //获取非行间样式
    function getStyle(el, attr) {
        return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el)[attr];
    }
</script>
```

###### 	案例：小鸟的来回

```html
<button>向东飞</button>
<button>向西飞</button>
<img src="./imgs/right.gif" alt="">

<script>
    //1.获取元素
    var btn = document.getElementsByTagName("button");
    var bird = document.getElementsByTagName("img")[0];
    var timer = null;

    //2.点击按钮
    btn[0].onclick = function () {
        //10.关于小鸟越点越快的问题:
        //原因：每次点击的时候，都新生成了一个定时器，造成了定时器的叠加问题
        //解决方式：点击的时候，先清除一遍定时器
        clearInterval(timer);
        console.log(timer);//undefined 变量提升（预解析）
        //3.  left:0 10 20 30
        //7.希望点击按钮，每隔一段时间，自动增加10px
        timer = setInterval(function () {
            //4.获取当前的位置  "0px"
            var cur = parseInt(getStyle(bird, "left"));//0
            console.log(cur);//0px Number/parseInt/parseFloat
            //5.每次都在自身基础上+10
            cur += 10;
            //8.判断小鸟飞的目标值
            if (cur >= 1000) {
                cur = 1000;
                //9.清除定时器
                clearInterval(timer);
            }
            //6.重新设置bird当前的位置
            bird.style.left = cur + "px";
        }, 30)



    }

    //向西飞
    btn[1].onclick = function () {
        bird.src = "./imgs/left.gif";
        clearInterval(timer);
        timer = setInterval(function () {
            var cur = parseInt(getStyle(bird, "left"));
            cur -= 10;
            if(cur <= 0){
                cur = 0;
                clearInterval(timer);
            }
            bird.style.left = cur + "px";
        }, 30);
    }

    //获取非行间样式
    function getStyle(el, attr) {
        return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el)[attr];
    }
</script>
```

#### 匀速框架的封装

```js
//封装
//1、实现主要代码
//2、声明函数，把主要代码放进去
//3、找可变的量，替换成参数
//4、调用，调试

var timer = null;
function move(el,attr,step,target) {
    //判断step的正负值
    step = target > parseInt(getStyle(el, attr)) ? step : -step;
    clearInterval(timer);
    timer = setInterval(function () {
        var cur = parseInt(getStyle(el, attr));
        cur += step;
        //如果向右，当前值大于等于目标值的时候停止；如果向左，当前值小于等于目标值停止；
        if (step > 0 && cur >= target || step < 0 && cur <= target) {
            cur = target;
            clearInterval(timer);
        }
        el.style[attr] = cur + "px";
    }, 30);
}
```

### 轮播图

```html
<div id="show">
    <ul>
        <li>
            <img src="./imgs/t1.png" alt="">
        </li>
        <li>
            <img src="./imgs/t2.png" alt="">
        </li>
        <li>
            <img src="./imgs/t3.png" alt="">
        </li>
        <li>
            <img src="./imgs/t4.png" alt="">
        </li>
        <li>
            <img src="./imgs/t1.png" alt="">
        </li>
    </ul>
    <p>
        <span class="on"></span>
        <span></span>
        <span></span>
        <span></span>
    </p>
</div>

<script src="./tools.js"></script>
<script>
    var show = document.getElementById("show");
    var oUl = show.getElementsByTagName("ul")[0];
    var oSpan = show.getElementsByTagName("span");

    var n = 0;//控制图片切换

    //轮播
    setInterval(play,1000);

    function play(){
        n++;
        //判断n的范围
        if(n > oSpan.length){
            n = 1;
            oUl.style.left = 0;
        }
        //改变小圆点样式
        //清空所有小圆点
        for(var i = 0;i < oSpan.length;i++){
            oSpan[i].className = "";
        }
        //判断n是否为4，如果是第四张的话，就证明走到了假的第0张图，需要让第0个span变色，否则，n和span的下标其实都是保持一致的
        oSpan[n == 4 ? 0 : n].className = "on";
        move(oUl,"left",60,-600*n);
    }
</script>
```

