## jQuery插件与Zepto

### jQuery的遍历

#### $().each(function(index,value){})

```js
$(arr).each(function(index,value){
    console.log(value + "123");
})
```

#### $().map(function(index,value){})

```js
var r = $(arr).map(function(index,value){
    return value+"web";
})
console.log(r);
```

#### $.map($(),function(value,index))

```js
var r1 = $.map($("li"),function(elem,index){
    return $(elem).html();
})
console.log(r1);
```

#### $.each($(),function(index,value))

```js
$.each($("li"),function(index,value){
    console.log(index)
})
```

### jQuery的拷贝

#### $.extend(deep,目标对象,obj1,obj2,……)

- deep:是否深拷贝，true——深拷贝，false——浅拷贝
- 目标对象：要扩展的对象。它将接收新的属性
- obj1,obj2,……：要合并的其他属性的对象。

```js
var obj = {//目标对象
    name:"class"
}

var obj1 = {
    name:"UI",
    age:3,
    obj2:{
        name:"web",
    },
    arr:[1,2,3]
}

var newObj = $.extend(false,obj,obj1);//浅拷贝：拷贝地址，一改全改
obj1.name = "class";//基本数据类型，不存在深浅拷贝
obj1.arr[0] = "a";//引用数据类型（复杂数据类型），存在深浅拷贝
console.log(newObj)

var newObj = $.extend(true,obj,obj1);//深拷贝：拷贝值，互不影响
obj1.arr[0] = "a";//引用数据类型（复杂数据类型），存在深浅拷贝
console.log(newObj)
console.log(obj1);
```

### 深浅拷贝问题

​	基本数据类型不存在深浅拷贝的问题，只有引用类型存在（数组、对象）

#### 浅拷贝

​	拷贝地址，一改全改

```js
//浅拷贝：拷贝地址，一改全改
var arr1 = arr;
arr1[3] = "name";
console.log(arr,arr1);
```

#### 深拷贝

​	拷贝值，互不影响

```js
var obj = {
    name:"web",
    age:3,
    sex:"狗"
}
var obj1 = {};

for(var key in obj){
    obj1[key] = obj[key];
}
obj1.name = "大黄";
console.log(obj1,obj);
```

### jQuery插件

​	在jQuery方法不够用的时候，在jQuery的基础上，扩展出来的方法；

#### 使用第三方插件

- 明确需求：3d、轮播图、面向对象等……
- 找：jq22.com 或 GitHub等
- 使用：
  - 简单的可以直接使用
  - 复杂的可以打开js文件，看上面是否有官网或博客地址，一些好的插件，上面会有使用说明
  - 没有使用方法的话，可以百度插件名称，会有别人使用过觉得好用，给出的使用说明

#### 自定义插件

##### 	类级别的插件

​	工具方法：$.each()	$.map()	$.ajax()	$.trim()

​	使用$.extend()封装

```js
(function($){
    $.extend({
        "startTrim":function(str){
            return str.replace(/^\s+/,"");
        },
        "endTrim":function(str){
            return str.replace(/\s+$/,"");
        },
        //将字符串去重，并且按照数字在前字母在后的顺序排列
        "noRepeat":function(str){
            var sstr = "";//字母：97-122
            var nstr = ""//数字：48-57
            for(var i = 0;i < str.length;i++){
                //如果sstr里没有这一项，并且这一项是字母，就添加
                if(str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122 && sstr.indexOf(str.charAt(i)) == -1){
                    sstr += str.charAt(i);
                }
                //如果nstr里没有这一项，并且这一项是数字，就添加
                if(str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57 && nstr.indexOf(str.charAt(i)) == -1){
                    nstr += str.charAt(i);
                }
            }
            return nstr + sstr;
        }
    })
})(jQuery);

var str = "           hello             ";
//去除字符串首空格
console.log($.startTrim(str));
console.log($.endTrim(str));

var str = "f738ee4y7f72832ed7ww83wrryfvh8ws3y";
console.log($.noRepeat(str));
```

##### 	对象级别的插件：

​	jQuery对象的方法：$(selector).find()	$(selector).click()

​	使用$.fn.extend()封装

```js
$.fn.extend({
    "tab":function(btn,con){
        $(btn).click(function(){
            $(con).eq($(this).index()).addClass("active").siblings().removeClass("active");
            $(this).addClass("on").siblings().removeClass("on");
        })
    }
})

$("#wrap").tab("#wrap button","#wrap p");
$("#wrap1").tab("#wrap1 span","#wrap1 p");
```

### Zepto

​	Zepto 是一个轻量级的、针对现代高级浏览器的 JavaScript 工具库，它兼容 jQuery 的 API 。 如果你会用 jQuery，那么你就已经会用 Zepto 了。

#### 官网

​	官网：https://zeptojs.com

​	中文网址：https://zeptojs.bootcss.com/

- jQuery：
  - 所有的方法都能直接使用
  - 可以获取隐藏元素的宽高
  - 可以使用width()/innerWidth()/outerWidth()
  - 使用offset()获取到的：{top: 38, left: 50}
- Zepto：
  - 拥有部分可以直接使用的模块，剩下的按需加载
  - 不可以获取隐藏元素的宽高 0
  - width() 使用width()获取宽高，可能包含padding 没有innerWidth()/outerWidth()
  - 使用offset()获取到的： {left: 50, top: 38, width: 240, height: 240}

```js
console.log($("div"));
$("div").click(function(){
    console.log("zepto");
})
console.log($("div").width());
console.log($("div").position());
```

#### Zepto的移动端事件

​	需要下载touch模块并引入

```js
//tap 手指点击

$("div").on("tap",function(){
    console.log("tap");
})

$("div").on("singleTap",function(){
    console.log("singleTap");
})

$("div").on("doubleTap",function(){
    console.log("doubleTap");
})

$("div").on("longTap",function(){
    console.log("longTap");
})

//'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown' 手指滑动
$("div").on("swipe",function(){
    console.log("swipe");
})

$("div").on("swipeLeft",function(){
    console.log("swipeLeft");
})

$("div").on("swipeRight",function(){
    console.log("swipeRight");
})

$("div").on("swipeUp",function(){
    console.log("swipeUp");
})

$("div").on("swipeDown",function(){
    console.log("swipeDown");
})
```

