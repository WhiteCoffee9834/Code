## 函数高级

### 回调函数

​	函数类型的实参，这个函数就是回调函数

- 回调函数的应用场景：当某个函数中需要实现一些具体的功能，并且这个功能是可选的（想实现就实现，不想实现就不实现），这个时候就可以使用回调函数

```js
function a(fn){
    // var fn = "b"//真值,fn()会报错
    //如果传了回调函数，就调用，如果没传，就不调用
    //短路与：如果第一项为真，则执行第二项；如果第一项为假，则后面就不看
    fn&&fn();
}

function b(){
    console.log("我是回调函数");
}

// a();//不调用，不影响
// a(b);//调用  b是一个函数类型的实参，是回调函数
a("b");//报错
```

```js
function a(fn){
    //判断，如果传入的是一个函数类型的实参，则调用
    if(typeof fn == "function"){
        fn();
    }  
}

function b(){
    console.log("我是回调函数");
}

// a();//不调用，不影响
// a(b);//调用
a("b");//不报错，不影响
```

#### 完整的运动框架

```js
oDiv[0].onmouseenter = function () {
    //使用回调函数
    bufferMove(oDiv[0], { "width": 500, "height": 200,"opacity":0.5 },function(){ bufferMove(oDiv[0], { "width": 100, "height": 100,"opacity":1 })});
}

function bufferMove(el, props,fn) {
    clearInterval(el.timer);
    el.timer = setInterval(function () {
        //声明变量假设已经达到目标值
        var tag = true;
        //遍历对象
        for (var attr in props) {
            if (attr == "opacity") {
                //扩大目标值
                props[attr] = props[attr] <= 1 ? props[attr] * 100 : props[attr];
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
        if(tag == true){
            clearInterval(el.timer);
            if(typeof fn == "function"){
                fn();
            }
        }
    }, 30)
}
```

### 同步异步问题

​	js是单线程的：在同一时间段内，js只能一条一条地执行任务，不能多个任务同时执行，为了解决这种问题，把一些任务分成了两大类：同步、异步

- 同步：同步的任务执行的时间短，速度快，除了异步，都是同步

- 异步：异步的任务执行的时间长，速度慢，比如事件、定时器、ajax、promise

### 匿名函数

​	之前我们学过一些没有名字的函数：btn.onclick = function(){}，setInterval(function(){},1000)

这都是匿名函数；

- 声明：(function(){})
- 调用：();

通常放在一起(function(){})();

**注意：匿名函数没有名字，所以调用和声明都需要放在一起，如果是多个匿名函数，需要使用;隔开**

- 匿名函数可以传参，和正常函数一样就好

- 匿名函数有返回值

- 匿名函数的优点：可以最大限度地节省内存空间

  ​            1、普通函数在声明的时候，就已经把整个函数存在内存中了，并且会一直存在于内存中，不会被销毁

  ​            2、匿名函数，声明出来不会直接存储到内存中，只有在调用的时候才会存到内存中，调用结束之后，就会被销毁

```js
//声明、调用
(function(){
    console.log("我是匿名函数")
})();
```

```js
//传参
(function(a,b){
    console.log(a+b);//30
})(10,20);
```

```js
//接收返回值
var r = (function(){
        	return "我是匿名函数的返回值"
    	})();
console.log(r);
```

### 闭包

​	函数内部和外界沟通的桥梁，是一个外部函数包裹内部函数，内部函数使用外部函数变量的结构（函数套函数）

- 闭包的特点：外部函数声明的变量，类似于全局变量，永久存在内存中 ，无法释放，容易造成内存泄漏；

```js
function outer() {
    var i = 10;//外部函数声明的变量，类似于全局变量，永久存在内存中
    function inner() {
        console.log(i++);
    }
    return inner;
}
var v = outer();
v();//10
v();//11
v();//12
v();//13
```

#### 闭包的应用场景

```html
<ul>
    <li>西施</li>
    <li>王昭君</li>
    <li>貂蝉</li>
    <li>杨玉环</li>
</ul>

<script>
    var oLi = document.getElementsByTagName("li");

    for (var i = 0; i < oLi.length; i++) {
        //外层匿名函数
        (function (a) {
            // var a;
            //内层事件驱动函数
            oLi[a].onclick = function () {
                console.log(oLi[a].innerText);
            }
        })(i);

    }

    /* 
        i = 0  a = 0  oLi[0].onclick a = 0;
        i = 1  a = 1  oLi[1].onclick a = 1;
        i = 2  a = 2  oLi[2].onclick a = 2;
        i = 3  a = 3  oLi[3].onclick a = 3;
    */
</script>
```

```js
var arr = [];//[fn,fn,fn,fn,fn,fn,fn]
for (var i = 0; i < 10; i++) {
    (function (a) {
        var a ;
        arr.push(
            function () {
                console.log(a);
            }
        )
    })(i);

}
arr[6]();//10 调用的时候，for循环已经执行完毕，所以拿到的i是最后的结果

arr[3]();//3
arr[4]();//4

/* 
    i = 0  a = 0  [fn  a = 0]
    i = 1  a = 1  [fn  a = 1]
*/
```

#### 闭包模拟私有属性

​	一些其他语言是分私有属性和公有属性的，公有属性可以随便被访问和修改，私有属性必须使用特定的方法才能进行访问和修改，甚至在修改的时候会更严谨的去进行判断只能改成哪种类型的值。js中没有公有属性和私有属性，所有写在对象中的属性都是公有属性，可以被任意访问和修改的，比如obj = {name:"张三"},name就是obj对象的一个公有属性。js如果要模拟私有属性，可以使用闭包来实现；

```js
function createObj(){
    var obj = {
        name : "张三" //公有属性
    }
    //设置对象的私有属性
    var value = 10;

    //获取私有属性的方法
    obj.getValue = function(){
        return value;
    }

    //设置私有属性的方法
    obj.setValue = function(n){
        //必须是数值型，才能设置
        if(typeof n == "number"){
            value = n;
        }

    }
    //把处理好的obj返回到外界
    return obj;
}

var obj1 = createObj();//obj = {name:"张三",getValue,setValue}
console.log(obj1);
//获取私有属性
console.log(obj1.getValue());
//设置私有属性
obj1.setValue("200");
console.log(obj1.getValue());
```

#### 闭包练习题

```js
function fun(n, o) {
    console.log(o);
    return {
        "fun": function (m) {
            return fun(m, n)
        }
    }
}
var a = fun(0);//undefined,第一次并没有给o传实参
a.fun(1); //0
a.fun(2); //0
a.fun(3); //0 

解析：

var a = fun(0);//a相当于接收了外层函数的返回值，也就是return后面的对象
/* 
    a = {
        "fun": function (m) {
            return fun(m, n);//返回的这个fun是外层的fun，因为当前作用域没有fun，会向上一层找，上一层也没有，再向上找到全局，全局会发现有一个叫做fun的全局函数，也就是外层函数；
        }
    }
*/
a.fun(1); //0
a.fun(2); //0
a.fun(3); //0  所有通过a.函数名调用的函数，其实都是在调用a这个对象里的fun方法，也就是内层函数
//由于是闭包结构，所以外层函数的形参n，一开始赋值为0，那么这个值，只要不重新赋值，就永远以n = 0这个值存储在内存中，内层函数返回的时候，返回的分别是fun(1,0);fun(2,0);fun(3,0),外层函数通过fun(n,o)进行接收，由于我们打印的是o,所以永远打印0；
```

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i, new Date());//5 Sat May 08 2021 14:11:31 GMT+0800 (中国标准时间) *5
    }, 1000);
}
console.log(i, new Date());//5 Sat May 08 2021 14:11:32 GMT+0800 (中国标准时间)

解析：
//这不涉及到闭包的问题，可以考虑同步异步代码的问题，定时器异步执行，for循环同步执行，当for循环执行完成之后，定时器才执行，所以for循环内部的定时器会等for循环执行完成之后，延时1s执行。生成的5个定时器同在一个任务队列中，虽然有执行的先后顺序，但是执行速度很快，我们不会看出时间差，并且同一个任务队列中的延时定时器的延时作用不会对队友生效；
```

### 递归

​	函数自己调用自己，递归一定要有边界条件，否则会陷入死递归

#### 典型递归

##### 	计算阶乘

```js
//计算6的阶乘 6*5*4*3*2*1
//计算n的阶乘 n*(n-1)*(n-2)*(n-3) …… 1

function jc(n){
    //判断条件
    if(n <= 1){
        return 1;
    }
    return n * jc(n-1);
    // 6 * 5 * 4 * 3 * 2 * jc(1)
}
console.log(jc(5))
```

##### 	斐波那契数列

```js
/* 
    1 1 2 3 5 8 13 21 34 55 89

    n = (n-1)+(n-2)

    F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N*）
*/

function fibo(n){
    if(n <= 2){
        return 1;
    }
    return fibo(n-1)+fibo(n-2);
}
console.log(fibo(6));

/* 
    fibo(6) = fibo(5) + fibo(4)
    fibo(6) = fibo(4) + fibo(3) + fibo(3) + fibo(2)
    fibo(6) = fibo(3) + fibo(2) + fibo(2) + fibo(1) + fibo(2) + fibo(1) + 1
    fibo(6) = fibo(2) + fibo(1) + fibo(2) + fibo(2) + fibo(1) + fibo(2) + fibo(1) + 1
    fibo(6) = 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
    fibo(6) = 8
*/
```

#### 快速排序

​	二分法找到数组中中间位置的数，以它为分割点，把比它大的数放进左边数组里，把比它小的数放进右边数组里；继续分别把左右数组再次进行二分法拆分排序

​	**思路：**

​	  1、找到数组中中间位置的数（取出来）

​      2、声明左右两个数组，左边数组存放比中间数小的，右边数组存放比中间数大的

​      3、再次讲两边数组取中间数，重复以上步骤

​      4、将左、中、右连接成一个数组，返回

```js
var arr = [23, 54, 2, 10, 65, 9, 4];

function quickSort(arr){
    //判断，如果数组中没有值或者只有一个值再停止
    if(arr.length <= 1){
        return arr;
    }
    //左右空数组
    var lArr = [],rArr = [];
    //找到中间位置的下标
    var midIndex = parseInt(arr.length/2);
    //提取出中间位置的数
    //splice(start,delCount,items)
    var midValue = arr.splice(midIndex,1)[0];
    // console.log(arr,midValue);//[23, 54, 2, 65, 9, 4] [10]

    //遍历原数组，和中间数进行比较
    for(var i = 0;i < arr.length;i++){
        //如果原数组中的数小于中间项，放进左边数组
        if(arr[i] < midValue){
            lArr.push(arr[i]);
        }else{
            //如果原数组中的数大于中间项，放进右边数组
            rArr.push(arr[i]);
        }

    }
    return quickSort(lArr).concat(midValue,quickSort(rArr));
}
console.log(quickSort(arr))
```

### 防抖节流

#### 防抖

​	当某些可以频繁触发的事件存在时（onmousemove、onresize、onscroll），我们需要让浏览器触发该事件时，等待某段时间之后再执行，如果等待期间，用户还执意进行操作的时候，那么就重新计时

​	由于要执行的操作不确定,触发频率不确定（时间），我们可以封装成函数

```js
//防抖函数
function debounce(fn,time){
    var timer = null;
    function a(){
        //如果等待期间，用户还执意进行操作的时候，那么就重新计时
        clearTimeout(timer);
        timer = setTimeout(function(){
            //需要执行的操作
            if(typeof fn == "function"){
                fn();
            }
        })
    }
    return a;
}

document.onmousemove = debounce(function(){oDiv.innerHTML = Number(oDiv.innerHTML) + 1;},1000);
```

#### 节流

​	当有频发触发的事件发生时，需要让程序按照一定频率来执行，这个频率由我们自己来定；

​	由于要执行的操作不确定,触发频率不确定（时间），我们可以封装成函数

```js
//节流函数
function throttling(fn,time) {
    //声明变量判断事件是否应该被触发
    var tag = true;//假设可以被触发
    function a() {
        //如果可以被触发
        if (tag == true) {
            tag = false;//当前事件触发的时候，下一次不能触发
            //执行程序
            setTimeout(function () {
                //需要执行的操作
                if(typeof fn == "function"){
                    fn();
                }
                //这一次执行完之后，把tag变成true，证明下一次可以执行
                tag = true;
            }, time)
        } else {
            //如果不可以被触发，终止执行
            return false;
        }
    }
    return a;
}

document.onmousemove = throttling(function(){console.log(1111)},800)
```

