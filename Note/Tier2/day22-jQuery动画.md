## jQuery动画与内置方法

#### 阻止事件冒泡

​	ev.stopPropagation() 不需要做兼容

#### 阻止默认行为

​	ev.preventDefault() 不需要做兼容

```js
$("a").click(function(ev){
    ev.preventDefault();
    console.log("11111");
})
```

#### return false

​	既阻止事件冒泡又阻止默认行为

```js
$("a").click(function(ev){
    console.log("11111");
    return false;
})
```

#### 事件绑定

​	$().on("事件类型",事件处理函数)

​	jQuery中给一个元素添加多个事件，不会覆盖，只会叠加；

```js
function fn1(){
   console.log("事件1");
}
function fn2(){
   console.log("事件2");
}


$("button").on("click",fn1);
$("button").on("click",fn2);
```

事件绑定的作用：

- 可以给同一个元素绑定多个事件，多个事件之间用空格隔开

```js
$("button").on("click mouseenter",fn1);
```

- 可以同时绑定不同的事件

```js
$("button").on({
   "click":fn1,
   "mouseenter":fn2
})
```

- 自定义事件

```js
$("button").on("haha",fn1);
setTimeout(function(){
   //触发自定义事件
   $("button").trigger("haha");
},2000)
```

- 可以给事件添加命名空间

```js
$("button").on("click.xy",fn1);
$("button").on("click.hyh",fn2);
```

#### 事件委托

​	$(父元素).on("事件类型","要触发事件的子元素",事件处理函数)

​	将事件添加到父元素上，当事件发生时，父元素会找到对应的子元素进行处理

- 实现原理：利用事件冒泡
- 优点：可以给未来的元素添加事件

```js
$("ul").on("click","li",function(){
    $(this).css("background","red");
})

//可以给未来的元素添加事件
$("ul").append("<li>09</li>");
```

###### 案例：表格全选

```html
<div>
    请输入姓名：<input type="text" class="name"> <br>
    请选择性别: <input type="radio" name="sex" checked value="男">男 <input type="radio" name="sex" value="女">女<br>
    请输入年龄：<input type="text" class="age">
    <button class="add">添加到表格</button>
</div>
<table>
    <thead>
        <tr>
            <th width="20%"><input type="checkbox" id="all">全选</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="checkbox"></td>
            <td>张三</td>
            <td>男</td>
            <td>38</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td>李思</td>
            <td>女</td>
            <td>18</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td>王武</td>
            <td>男</td>
            <td>20</td>
        </tr>
    </tbody>

</table>
<div style="border: none">
    <button class="del">删除所选行</button>
</div>

<script>
    //全选
    //$().on("事件类型","子元素",fn)
    $("tbody").on("click","input",function(){
        //判断是否已经全选
        if($("tbody :checkbox:checked").length == $("tbody :checkbox").length){
            $("#all").prop("checked",true);
        }else{
            $("#all").prop("checked",false);
        }
    })
</script>
```

#### 一次性事件

​	$().one()

​	让事件只能触发一次

```js
$("button").one("click",function(){
    alert("法拉利");
})
```

#### 取消事件绑定

​	$().off("事件",事件处理函数)

- 取消所有点击事件
- 取消指定命名空间的点击事件
- 取消指定处理函数的事件
- 取消元素的所有事件

```js
$("button").off("click");//取消所有点击事件

$("button").off("click.xy");//取消指定命名空间的点击事件

$("button").off("click",fn2);//取消指定处理函数的事件

$("button").off();//取消元素的所有事件
```

#### 组合事件

​	$().hover(鼠标移入时触发的函数,鼠标移出时触发的函数)

```js
$("div").hover(function(){
    $(this).css("background","yellow");
},function(){
    $(this).css("background","red");
})
```



### jQuery预制动画

#### 显示隐藏

- duration:动画速度（时间）

  ​        number:1000ms 100ms 以ms为单位

  ​        slow:慢（600ms）

  ​        normal:正常（400ms）

  ​        fast:快（200ms）

- easing:动画运动曲线

  ​        linear:匀速运动

  ​        swing:缓冲（中间快，开头/结尾慢）

- callback:回调函数 function(){动画完成之后要执行的代码}

##### 	show(duration,easing,callback)

```js
$("#show").click(function(){
    $("div").show("slow","linear");//显示
})
```

##### 	hide(duration,easing,callback)

```js
$("#hide").click(function(){
    $("div").hide("fast","swing",function(){alert("动画完成")});//隐藏
})
```

##### 	toggle(duration,easing,callback)

```js
$("#toggle").click(function(){
    $("div").toggle();//开关
})
```

#### 淡入淡出

- duration:动画速度（时间）

  ​        number:1000ms 100ms 以ms为单位

  ​        slow:慢（600ms）

  ​        normal:正常（400ms）

  ​        fast:快（200ms）

- opacity:要达到的透明度目标值(0~1)

- easing:动画运动曲线

  ​        linear:匀速运动

  ​        swing:缓冲（中间快，开头/结尾慢）

- callback:回调函数 function(){动画完成之后要执行的代码}

##### 	fadeIn(duration,easing,callback)

```js
$("#fadeIn").click(function(){
    $("div").fadeIn();
})
```

##### 	fadeOut(duration,easing,callback)

```js
$("#fadeOut").click(function(){
    $("div").fadeOut();
})
```

##### 	fadeToggle(duration,easing,callback)

```js
$("#fadeToggle").click(function(){
    $("div").fadeToggle();
})
```

##### 	fadeTo(duration,opacity,easing,callback)

```js
$("#fadeTo").click(function(){
    $("div").fadeTo(600,0.3,function(){alert("动画完成")});//透明度达到多少
})
```

#### 滑入滑出

​	

- duration:动画速度（时间）

  ​        number:1000ms 100ms 以ms为单位

  ​        slow:慢（600ms）

  ​        normal:正常（400ms）

  ​        fast:快（200ms）

- easing:动画运动曲线

  ​        linear:匀速运动

  ​        swing:缓冲（中间快，开头/结尾慢）

- callback:回调函数 function(){动画完成之后要执行的代码}

##### 	slideUp(duration,easing,callback)

```js
$("#slideUp").click(function(){
    $("div").slideUp();
})
```

##### 	slideDown(duration,easing,callback)

```js
$("#slideDown").click(function(){
    $("div").slideDown(function(){$("div").fadeTo(400,0.5)});
})
```

##### 	slideToggle(duration,easing,callback)

```js
$("#slideToggle").click(function(){
    $("div").slideToggle();
})
```

###### 	案例：条条

```js
$("div:eq(0)").slideDown(200, function nextDiv() {
    $(this).next().slideDown(200, nextDiv);
})
```

### 自定义动画

#### animate(properties,duration,easing,callback)

- properties:要改变目标值的属性

- duration:动画速度（时间）

  ​        number:1000ms 100ms 以ms为单位

  ​        slow:慢（600ms）

  ​        normal:正常（400ms）

  ​        fast:快（200ms）

- easing:动画运动曲线

  ​        linear:匀速运动

  ​        swing:缓冲（中间快，开头/结尾慢）

- callback:回调函数 function(){动画完成之后要执行的代码}

1. 动画效果会排队执行

```js
$("div").animate({"width":500});
$("div").animate({"height":500});
```

2. 同时运动

```js
$("div").animate({"width":100,"height":100});
```

3. show、hide、toggle可以作为属性值

```js
$("div").animate({"width":"hide"},600);
$("div").animate({"width":"show"},600);//show回来回的宽度是设置的初始宽度
```

4. 可以累加

```js
$("button").click(function(){
    $("div").animate({"left":"+=100"});
})
```

6. 链式操作

```js
$("div").animate({"left":200})
        .animate({"height":500})
        .animate({"width":500})
        //css样式不属于动画，不会动画队列
        //让css动画队列
        .queue(function(next){
            $("div").css("background","hotpink");
            //拎出队列
            // $("div").dequeue();
            next();
        })
        .animate({"opacity":0.5});
```

#### animate(properties,{option})

- properties:要改变目标值的属性

- option可能的值：

  - duration:动画速度（时间）

  ​        number:1000ms 100ms 以ms为单位

  ​        slow:慢（600ms）

  ​        normal:正常（400ms）

  ​        fast:快（200ms）

  - easing:动画运动曲线

  ​        linear:匀速运动

  ​        swing:缓冲（中间快，开头/结尾慢）

  - callback:回调函数 function(){动画完成之后要执行的代码}
  - queue：是否允许动画放入动画队列中，默认为true，如果设置成false，动画效果立即执行

```js
$("div:eq(1)").animate({"width":500},{"duration":1000,"easing":"swing","queue":false});

$("div:eq(1)").animate({"height":500},{"duration":1000,"easing":"swing"});
```

###### 	案例：手风琴效果

```js
$("dt").click(function(){
    $("dd").animate({"width":0},{"queue":false});
    $(this).next().animate({"width":295});
})
```

### 停止动画

#### $().stop(clearQueue,gotoEnd)

- clearQueue：是否清除队列中所有动画，默认是false，只停止当前动画，如果是true，就清除所有动画
- gotoEnd：当前运动的动画是否要达到目标点，默认是false，不达到目标点；

```js
$("button:eq(0)").click(function(){
    $("div").animate({"width":600},2000);
    $("div").animate({"height":600},2000);
})

$("button:eq(1)").click(function(){
    $("div").stop(false);
})
```

###### 	案例：图片悬浮

```html
<style>
    div{
        width: 200px;
        height: 100px;
        border: 1px solid #ccc;
        float: left;
        position: relative;
        overflow: hidden;
    }
    div img{
        position: absolute;
        left:0px;
    }
</style>

<body>
    <div><img src="./img/img1.png" alt=""></div>
    <div><img src="./img/img1.png" alt=""></div>
    <div><img src="./img/img1.png" alt=""></div>
    <div><img src="./img/img1.png" alt=""></div>

    <script src="./js/jquery-3.6.0.js"></script>

    <script>
        $("div").hover(function(){
            $(this).children().stop().animate({"left":-40});
        },function(){
            $(this).children().stop().animate({"left":0});
        })
    </script>
</body>
```

###### 	案例：滚动条

```js
//粉色的位置
var t = $("div:eq(2)").offset().top;
$(window).scroll(function(){
    if($(window).scrollTop() >= t){
        $("p").show();
    }else{
        $("p").hide();
    }
})

//点击回到顶部
$("p").click(function(){
    // $(window).scrollTop(0);//可以设置，但是没有动画效果
    //document.documentElement.scrollTop || document.body.scrollTop
    $("html,body").animate({"scrollTop":0});
})
```

###### 	案例：滚动监听

```js
//窗口滚动
$(window).scroll(function(){
    $("div").each(function(index,elem){
        // console.log($(elem));
        if($(window).scrollTop() >= $(elem).offset().top){
            $("li").eq(index).addClass("active").siblings().removeClass("active");
        }
    })
})

//点击标题
$("a").click(function(){
    //index添加下标是给当前元素的父元素中的子元素添加下标
    // console.log($(this).index());//0 0 0 0 
    console.log($(this).parent().index());
    $("html,body").animate({"scrollTop":$("div").eq($(this).parent().index()).offset().top})
})
```

### 动画其他方法

#### 延迟执行

​	$().delay(延迟时间)

```js
$("div:eq(1)").delay(2000).animate({"height":500});
```

#### 判断是否正在进行动画

​	$().is(":animated") 

​	看当前元素是否正在进行动画效果，如果有动画效果，返回true，如果没有，返回false

```js
$("div:eq(0)").animate({"width":500},{"duration":2000});
$("div:eq(0)").click(function(){
    console.log($(this).is(":animated"));
})
```

