## this与自定义属性

### 函数封装

​	函数的封装是把一个或多个功能通过函数封装起来，对外只提供一个简单的接口；

#### 获取非行间样式

- 标准浏览器：getComputedStyle(元素).属性名；

- IE8-：元素.currentStyle.属性名；

  ```js
  console.log(getComputedStyle(box).width);//标准浏览器可以正常使用
  //IE8-报错属性“getComputedStyle”的值为 null、未定义或不是 Function 对象
  
  
  console.log(box.currentStyle.width);//IE8-可以正常使用
  //标准浏览器报错Cannot read property 'width' of undefined
  ```

​	处理兼容：如果遇到两个方法的兼容问题，则以其中一个方法为依据进行判断，如果当前浏览器存在这个方法，则使用该方法，如果不存在，则使用另一个方法；

```js
if(box.currentStyle){//如果存在IE8-的方法
    console.log(box.currentStyle.width);//则使用该方法
}else{//否则
    console.log(getComputedStyle(box).width);//则使用标准浏览器的方法
}
```

#### 封装获取非行间样式的函数

​	我们以后操作元素的非行间样式时，不可能只操作box这一个元素，也不可能只获取width这一个属性，这些都是可变的量，但是如果每次获取其他元素的其他属性时，都需要处理一次兼容，就会造成代码冗余，因此我们需要把兼容的功能封装成一个函数，用到的时候再调用执行就好了；

- 封装步骤：
  - 先把主要代码实现
  - 声明一个函数，把主要代码放入函数中
  - 找可变的量作为参数
  - 调用，调试

```js
function getStyle(el,attr){
    if(el.currentStyle){
        return el.currentStyle[attr];
    }else{
        return getComputedStyle(el)[attr];
    }
}
console.log(getStyle(div,"width"));
console.log(getStyle(box,"background"));


//三目运算
function getStyle(el,attr){
    return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el)[attr]
}
```

##### 获取非行间样式函数的应用

```html
<style>
#wrap{
    width:200px;
    height:100px;
    background:red;
    transition: all 0.5s;
}
</style>
</head>
<body>
<button>长长长</button>
<div id="wrap"></div>

<script>
var button = document.getElementsByTagName("button")[0];
var oDiv = document.getElementById("wrap");

button.onclick = function(){
    var w = parseInt(getStyle(oDiv,"width")) + 50;
    oDiv.style.width = w + "px";
}

function getStyle(el,attr){
    if(el.currentStyle){
        return el.currentStyle[attr];
    }else{
        return getComputedStyle(el)[attr];
    }
}
</script>
```



### this

​	this是一个特殊的对象，没有固定含义，取决于当前调用函数时的环境，this最终指向调用函数的对象；

- 普通命名函数中，this指向window；
- 对象中的函数（方法），this指向当前调用它的对象；
- 事件驱动函数中，this指向当前触发事件的对象；

```js
//1、普通命名函数
function fn(){
    function fn1(){
        console.log(this);//window
    }
    fn1();
}
fn();

//对象中的函数（1）
var obj = {
    study:function(){
        console.log(this);//obj
    }
}
obj.study();
//对象中的函数（2）
var obj1 = {
    name:"obj1",
    obj2:{
        name:"obj2",
        fn:function(){
            console.log(this);//obj2
        }
    }
}
obj1.obj2.fn();//就近原则

//事件驱动函数
btn.onclick = function(){
    console.log(this);//btn
}
```

#### this的应用

```html
<ul>
    <li>teal</li>
    <li>tomato</li>
    <li>orange</li>
    <li>skyblue</li>
</ul>

<script>
    /* 点击li添加对应的颜色 */
    var oLi = document.getElementsByTagName("li");
    for(var i = 0;i < oLi.length;i++){
        oLi[i].onclick = function(){
            this.style.background = this.innerHTML;
        }
    }
</script>
```

###### 案例：开关灯

```html
<style>
    img{
        width:300px;
    }
</style>
</head>
<body>
<img src="./images/dark.jpg" alt="">

<script>
    var light = document.getElementsByTagName("img")[0];
    var tag = false;

    light.onclick = function(){
        if(tag == false){
            this.src = "./images/bright.jpg";
        }else{
            this.src = "./images/dark.jpg";
        }
        tag = !tag;
    }
</script>
```

### 自定义属性

​	如果要实现多组开关灯效果，就不能让这些oImg共用一个tag属性；需要让每个oImg有一个自己的tag属性；但是img标签本身没有这种属性，所以我们需要自己添加，这叫做自定义属性；

#### 添加自定义属性的方法

- 直接在开始标签中写 tag = "true"；

  可以在标签中查看；

```html
<div tag="true"></div>
<script>
    var oDiv = document.getElementsByTagName("div")[0];
    console.log(oDiv.tag);//undefined
</script>
```

​	**注意：在标签中自定义的属性无法通过js获取**

- 在js中直接设置  标签.自定义属性名 = "值"；

  不可以在标签中查看，但是可以获取到；

```js
oDiv.t = true;
console.log(oDiv.t);
```

###### 案例：喜欢我的请亮灯

```js
var oImg = document.getElementsByTagName("img");

for(var i = 0;i < oImg.length;i++){
    oImg[i].tag = true;
    oImg[i].onmouseover = function(){
        if(this.tag == true){
            this.src = "./images/bright.jpg";
        }else{
            this.src = "./images/dark.jpg";
        }
        this.tag = !this.tag;
    }
}
```

### 自定义索引

​	其实就是自定义属性中的一种，只不过存储的是索引（下标）；

```html
<button index=0>天空蓝</button>
<button index=1>基佬紫</button>
<button index=2>死亡芭比粉</button>
<button index=3>青青草原</button>
<script>

    /* 
        自定义索引：就是自定义属性中的一种，
    */
    var arr = ["skyblue","purple","hotpink","green"];

    var btn = document.getElementsByTagName("button");

    for(var i = 0;i < btn.length;i++){
        //i每循环一次就会在对应btn中添加一个index属性，属性值为i当前的值
        // i = 0,btn[0].index = 0
        // i = 1,btn[1].index = 1
        // i = 2,btn[2].index = 2
        // i = 3,btn[3].index = 3
        btn[i].index = i;
        btn[i].onclick = function(){
            //让body切换到对应的颜色
            document.body.style.background = arr[this.index];
        }
    }
</script>
```

###### 案例：抽奖

```html
<button index=1>点击抽奖</button>
<button>点击抽奖</button>
<button>点击抽奖</button>
<button>点击抽奖</button>
<button>点击抽奖</button>
<button>点击抽奖</button>

<script>
    var arr = ["100元","兰博基尼10元优惠券","车模一个","腾讯会员","自行车模","奥特曼"];

    var btn = document.getElementsByTagName("button");

    for(var i = 0;i < btn.length;i++){
        //自定义索引
        //i = 0  btn[0].index = 0
        //i = 1  btn[1].index = 1
        btn[i].index = i;
        btn[i].onclick = function(){
            alert(arr[this.index]);
        }
    }
</script>
```

#### 选项卡

```html
<div class="wrap">
    <div id="btn_wrap">
        <span class="on">百草味和三只松鼠</span>
        <span>吼叫</span>
        <span>淘气包马大姐</span>
    </div>
    <div id="con_wrap">
        <p class="active">百草味和三只松鼠是鲁树人先生……</p>
        <p>吼叫鲁树人先生……</p>
        <p>淘气包马大姐是非常受欢迎的动画片……</p>
    </div>
</div>

<script>
    //获取需要点击的按钮
    var btn = document.getElementsByTagName("span");
    //获取需要切换的内容区域
    var con = document.getElementsByTagName("p");

    //1、遍历所有btn
    for(var i = 0;i < btn.length;i++){
        //3、给每一个btn自定义一个索引
        btn[i].index = i;
        //2、给btn添加点击事件
        btn[i].onclick = function(){
            //5、for循环遍历所有p标签，在点击事件触发的时候，先让所有的p标签隐藏掉，再让当前对应的p标签显示出来
            for(var j = 0;j < con.length;j++){
                //j = 0 1 2
                //6、先让所有的p标签隐藏掉
                con[j].className = "";
                //8、让所有按钮的样式清空
                btn[j].className = "";
            }
            //4、让对应的内容显示出来，操作p标签的类名，控制显示隐藏
            con[this.index].className = "active";//需要让其他内容区域隐藏掉
            //7、点谁就给谁变颜色
            this.className = "on";
        }
    }
</script>
```

###### 案例：九宫格找对象

```html
<ul>
    <li>马保国</li>
    <li>鞠婧祎</li>
    <li>乔碧萝</li>
    <li>王一博</li>
    <li>胡歌</li>
    <li>杨超越</li>
    <li>药水哥</li>
    <li>景甜</li>
    <li>吴亦凡</li>
</ul>

<script>
    var oLi = document.getElementsByTagName('li');
    for(var i = 0;i < oLi.length;i++){
        oLi[i].onclick = function(){
            for(var j = 0;j < oLi.length;j++){
                oLi[j].style.color = "#fff";
            }
            this.style.color = "#333"; 
        }
    }
</script>
```

### 