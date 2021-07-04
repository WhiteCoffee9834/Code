## jQuery进阶

### jQuery操作类名

#### 添加一个类名

​	$().addClass(类名)

#### 移除一个类名

​	$().removeClass(类名)

```js
$("div").click(function(){
    if(tag == true){
        $(this).addClass("active");
    }else{
        $(this).removeClass("active");
    }
    tag = !tag;
})
```

#### 类名的开关效果

​	有，就删除；没有就添加

​	$().toggleClass(类名)

```js
$("div").click(function(){
    $("div").toggleClass("active");
})
```

###### 	案例：美化表单

```html
<style>
    span{
        display: inline-block;
        width:20px;
        height:20px;
        background-image: url("img/checkbox_blur.png");
        background-size:contain;
    }
    .active{
        background-image: url("img/checkbox_focus.png");
    }
</style>

<body>
    <span></span>敲代码
    <span></span>睡觉
    <span></span>吃饭

    <script src="./js/jquery-3.6.0.js"></script>
    <script>
        $("span").click(function(){
            $(this).toggleClass("active");
        })
    </script>
</body>
```

###### 	案例：QQ列表

```html
<style>
    #list ul {
        display: none;
    }
    #list .active{
        display: block;
    }
</style>

<body>
    <ul id="list">
        <li>
            <h4><img src="./img/ico1.gif" alt=""> 亲人</h4>
            <ul>
                <li>爸爸</li>
                <li>妈妈</li>
                <li>姐姐</li>
                <li>弟弟</li>
            </ul>
        </li>
        <li>
            <h4><img src="./img/ico1.gif" alt="">朋友</h4>
            <ul>
                <li>马化腾</li>
                <li>马云</li>
                <li>王思聪</li>
                <li>王健林</li>
                <li>刘强东</li>
            </ul>
        </li>
        <li>
            <h4><img src="./img/ico1.gif" alt="">同学</h4>
            <ul>
                <li>乔碧萝</li>
                <li>吴亦凡</li>
                <li>徐勇</li>
            </ul>
        </li>
    </ul>

    <script src="./js/jquery-3.6.0.js"></script>
    <script>

        $("img").attr("tag",true);
        $("h4").click(function(){
            $(this).next().toggleClass("active");
            //改变图片路径
            if($("img").eq($(this).index()).attr("tag") == "true"){
                $(this).children("img").attr("src","./img/ico2.gif");
                $("img").eq($(this).index()).attr("tag",false);
            }else{
                $(this).children("img").attr("src","./img/ico1.gif");
                $("img").eq($(this).index()).attr("tag",true);
            }
            console.log($("img").eq($(this).index()).attr("tag"))
        })
    </script>
</body>
```

### jQuery操作样式

#### 获取

- $().css()
- $().css(["属性1","属性2"])

```js
//单个获取
var w = $("div").css("width");//'100px'
console.log(w);
var b = $('div').css("background");//'rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'
console.log(b);

//批量获取
var sarr = $("div").css(["width","height","margin"]);
console.log(sarr);//{width: "300px", height: "100px", margin: "100px"}
console.log(sarr.height);
```

#### 设置

- $().css(属性名,属性值).css(属性名,属性值)

- $().css( {

  ​            "属性名":"属性值",

  ​             属性名:"属性值",

  ​			"属性名":属性值(数值型),

  ​          } )

```js
//链式设置
$("div").css("width","300px").css("background","orange");

//批量设置
$("div").css({
    "margin":100,
    "padding-top":"200px",
    backgroundColor:"green"
})
```

###### 	案例：改变div样式

```html
<style>
    .active{
        display: block;
    }
</style>

<body>
    <div class="wrap">
        <div class="lBox"></div>
        <button id="rBtn">点击显示div样式</button>
        <div class="gray"></div>
        <div class="edit">
            <h2>大小</h2>
            <p>
                <a href="#" id="size1">300*300</a>
                <a href="#" id="size2">200*300</a>
                <a href="#" id="size3">300*200</a>
                <a href="#" id="size4">100*300</a>
            </p>
            <h2>颜色</h2>
            <p>
                <a href="#" id="color1">#ff0000</a>
                <a href="#" id="color2">#0000ff</a>
                <a href="#" id="color3">#00ff00</a>
                <a href="#" id="color4">#00ffff</a>
            </p>
            <button id="save">确定</button>
            <button id="cancel">取消</button>
        </div>
    </div>

    <script src="./js/jquery-3.6.0.js"></script>

    <script>
        $("#rBtn").click(function(){
            $(".gray").addClass("active");
            $(".edit").addClass("active");
        })

        $("a").mouseenter(function(){
            console.log($(this).text().split("*"));
            var sArr = $(this).text().split("*");
            $(".lBox").css({
                width:sArr[0],
                height:sArr[1],
                backgroundColor:$(this).text()
            })
        })

        //点击确定
        $("#save").click(function(){
            $(".gray").removeClass("active");
            $(".edit").removeClass("active");
        })
        //点击取消
        $("#cancel").click(function(){
            $(".gray").removeClass("active");
            $(".edit").removeClass("active");
            $(".lBox").css({
                width:300,
                height:100,
                backgroundColor:"#fff"
            })
        })
    </script>
</body>
```

### jQuery操作BOM

#### 获取元素宽高

##### 	获取元素的内容宽

​	$().width()		content

```js
console.log($("div").width());//200
```

##### 	获取元素的可视宽

​	$().innerWidth()		content+padding

```js
console.log($("div").innerWidth());//300
```

##### 	获取元素的占位宽

​	$().outerWidth(布尔值)		content+padding+border+(margin)

```js
console.log($("div").outerWidth());//330  括号里不加布尔值，默认false，不包括margin
```

##### 	屏幕可视宽

​	$(window).width()

```js
console.log($(window).width());//1349
```

#### 获取元素位置

##### 	获取元素到body的距离

​	$().offset()

```js
console.log($("p").offset());//{top: 150, left: 230}
console.log($("p").offset().top);//150
```

##### 	获取元素到父元素的定位距离

​	$().position()

```js
console.log($("p").position());//{top: 50, left: 80}
console.log($("p").position().left);//80
```

##### 	获取窗口的滚动距离

​	$(window).scrollTop()

```js
$(window).scroll(function(){
    console.log($(window).scrollTop());
})
```

###### 	案例：滚动监听

```js
$(window).scroll(function(){
	$("div").each(function(index,elem){
        // console.log($(elem));
    if($(window).scrollTop() >= $(elem).offset().top){
            				  $("li").eq(index).addClass("active").siblings().removeClass("active");
        }
    })
})
```

### jQuery操作DOM

#### 创建

​	$("标签")  标签可以替换成变量

```js
console.log($("<li>喝水</li>"));

console.log($("<p>"));

var oLi = "<li>喝水</li>";
$("ul").append(oLi);

```

#### 添加

##### 	在末尾添加

- 父元素.append(要添加的子元素)
- $(要添加的子元素).appendTo(父元素)

```js
var oLi = "<li>喝水</li>";
$("ul").append(oLi);

$("<li>女孩子</li>").appendTo($("ul"));
```

##### 	在开头添加

- 父元素.prepend(要添加的子元素)
- (要添加的子元素).prependTo(父元素)

```js
$("ul").prepend("<li>打高尔夫</li>");
$("<li>女同学</li>").prependTo($("ul"));
```

##### 	在某一项前面添加

- 目标节点.before(要添加的元素)
- $(要添加的元素).insertBefore(目标节点)

```js
$("li:eq(5)").before($("<li>JavaScript高级程序设计</li>"));
$("<li>C语言</li>").insertBefore($("li:eq(5)"));
```

##### 	在某一项后面添加

- 目标节点.after(要添加的元素)
- (要添加的元素).insertAfter(目标节点)

```js
$("li:eq(1)").after($("<li>打排球</li>"));
$("<li>打台球</li>").insertAfter($("li:eq(2)"));
```

#### 删除

##### 	删除元素本身

- remove():删除元素本身，会返回被删除的元素，方便下次调用，返回的值不保留原来的事件
- detach():删除元素本身，会返回被删除的元素，方便下次调用，返回的值保留原来的事件

```js
$("li").click(function(){
    console.log("随便了啊")
})

$(".remove").click(function(){
    var rVal = $("li").remove();

    setTimeout(function(){
        $("ul").append(rVal);
    },2000)
})

$(".detach").click(function(){
    var rVal = $("li").detach();

    setTimeout(function(){
        $("ul").append(rVal);
    },2000)
})

```

##### 	清空父元素里面的内容

​	empty():清空父元素里面的内容

```js
$(".empty").click(function(){
    $("ul").empty();
})
```

###### 	案例：表格添加删除

```js
$(".add").click(function(){
    $("tbody").append('<tr><td><input type="checkbox"></td><td>'+$(".name").val()+'</td><td>'+$(":radio:checked").val()+'</td><td>'+$(".age").val()+'</td></tr>');
})

//删除 删除所选项
$(".del").click(function(){
    $("tbody :checkbox:checked").parents("tr").remove();
})
```

#### 复制

​	$(参考节点).clone(布尔值) 布尔值：是否复制元素的事件 默认false

```js
$("div").click(function(){
    alert("111");
})
$("body").append($("div").clone());
```

#### 替换

- 被替换的元素.replaceWith(替换的元素);
- 替换的元素.replaceAll(被替换的元素);

```js
$("div").replaceWith("<h1>随便</h1>");

$("<h1>随便</h1>").replaceAll($("div"));
```

###### 	案例：按下复制拖拽

```js
//在div上按下
$("div").mousedown(function (ev) {
    //当鼠标按下的时候，计算div回退的距离
    var x = ev.clientX - $("div").offset().left;
    var y = ev.clientY - $("div").offset().top;

    var oDiv = $("div").clone();
    $("body").append(oDiv);
    //设置div初始位置
    oDiv.css({
        position: "absolute",
        left: 0,
        top: 0
    })

    //鼠标在窗口移动
    $(window).mousemove(function (ev) {
        oDiv.css({
            left: ev.clientX - x,
            top: ev.clientY - y
        })
    })

    //鼠标抬起，删除div
    $(window).mouseup(function(){
        oDiv.remove();
    })
})
```

### 事件

#### 事件对象

​	jQuery中的事件，通过事件处理函数中的第一个参数传入（不需要做兼容）

- ev.originalEvent：原生事件信息
- ev.clientX/clientY：鼠标相对于屏幕的位置
- ev.which：想当于keyCode，也可以记录鼠标的键值
- ev.shiftKey：当事件发生时，是否按下了Shift键，按下为true，没按下为false
- ev.ctrlKey：当事件发生时，是否按下了Ctrl键，按下为true，没按下为false
- ev.altKey：当事件发生时，是否按下了Alt键，按下为true，没按下为false
- ev.keyCode：查看键盘按键编码

```js
$("button").click(function(ev){
    console.log(ev);//jQuery.Event
    console.log(ev.originalEvent);//MouseEvent {}  原生事件信息
})
$(window).click(function(ev){
    console.log(ev.clientX+"---------"+ev.clientY);//鼠标相对于窗口的位置
    console.log(ev.which);//左中右 1 2 3
    console.log(ev.shiftKey);
    console.log(ev.ctrlKey);
    console.log(ev.altKey);
})
$(window).contextmenu(function(ev){
    console.log(ev.which);//左中右 1 2 3
})

$(window).keydown(function(ev){
    console.log(ev.keyCode)
})
```

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

