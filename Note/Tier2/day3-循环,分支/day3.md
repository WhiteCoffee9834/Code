## 流程控制语句

​	流程控制就是“程序怎么执行”或是“程序执行的顺序”；

​	流程控制语句分类：

1. 顺序结构（代码自上而下执行）；
2. 选择结构（if，if-else，if-else嵌套，switch）；
3. 循环结构（for循环，while，do-while，for-in）；

### 条件选择结构——分支语句

​	通过判断条件，有选择性地执行某段代码；

#### 单分支

##### 	if

​	语法：if(判断条件){条件成立时执行的代码}；

```js
/* 
    如果有100块，就花两块钱买彩票，然后中500万，再买500万的泡面
*/
var money = 200;
if(money >= 100){
   console.log("花两块钱买彩票，中500万");
   console.log("买500万的泡面");
}
```

​	**注意：1、if语法中的{}可以省略，如果省略了，就只执行紧跟着if判断的一条语句；**

​				**2、if中可以是条件判断以外的其他内容，但是最终都会隐式转换成布尔值true或false进行判断；**

```js
//if语法中的{}可以省略，如果省略了，就只执行紧跟着if判断的一条语句；**
var money = 99;
if(money >= 100)
   console.log("花两块钱买彩票，中500万");
   console.log("买500万的泡面");//这一条当做顺序结构中的代码正常输出；


//if中可以是条件判断以外的其他内容，但是最终都会隐式转换成布尔值true或false进行判断；**
if(true){
    console.log("条件正确");
}
if(1){
    console.log("条件再次正确");
}
```

#### 双分支

##### 	if-else

​	if-else是在if的基础上增加了条件不成立时要做的操作；

​	语法：if(判断条件){条件成立时执行的操作}else{条件不成立时执行的操作}；

```js
//如果成绩大于等于60，就是及格，否则就是不及格
var n = 23;
if(n >= 60){
    alert("成绩合格");
}else{
    alert("成绩不合格");
}
```

###### 	案例：判断是否为闰年

```js
/* 
    闰年：1、能被4整除，并且不能被100整除
         2、能被400整除
*/
var y = prompt("请输入一个年份");
if(y % 4 == 0 && y % 100 != 0 || y % 400 == 0){
   alert("是闰年");
}else{
   alert("不是闰年！！！");
}
```

###### 	案例：文字放大缩小

```html
<div class="wrap">
<div class="btn_wrap">
    <button>+</button>
    <button>-</button>
</div>
<p>尊敬的各位客户、网友和媒体朋友们：我们就未能及时解决车主的问题深表歉意。</p>
</div>

<script>
    
/* 需求：每次点击+按钮，文字大小都会增加2px，每次点击-按钮，文字都会减小2px，但是最大不超过36px，最小不超过12px */

var btn = document.getElementsByTagName("button");
var content = document.getElementsByTagName("p")[0];
var fontSize = 16;

btn[0].onclick = function(){
    fontSize += 2;
    if(fontSize >= 36){
        fontSize = 36;
    }
    content.style.fontSize = fontSize + "px";
}
btn[1].onclick = function(){
    fontSize -= 2;
    if(fontSize <= 12){
        fontSize = 12;
    }
    content.style.fontSize = fontSize + "px";
}
</script>
```

#### 多分支

​	if-else只能用于判断一个条件的成立与不成立，如果存在多个条件判断，那么使用if-else就不能满足要求，这时候需要使用多分支；多分支包括if else-if和switch；

##### 	if else-if

​	语法：if(条件1){条件1成立时执行的代码}else if(条件2){条件2成立时执行的代码}else if(条件3){条件3成立时执行的代码}else{以上条件都不成立时执行的代码}；

```js
/* 
    如果成绩在90以上：非常棒    80以上：优秀    70以上：中等     60：及格     60以下：再来一次
*/
var n = 89;
if(n >= 90){
    alert("非常棒");
}else if(n >= 80){
    alert("优秀");
}else if(n >= 70){
    alert("中等");
}else if(n >= 60){
    alert("及格");
}else{
    alert("再来一次");
}
```

##### 	switch

​	语法：switch(变量){

​					case  常量1 : 匹配到常量1时执行的语句;break;

​					case  常量2 : 匹配到常量2时执行的语句;break;

​					case  常量3 : 匹配到常量3时执行的语句;break;

​					default : 以上都不匹配时执行的语句；

​				}

​	**注意：break的作用是防止穿透，如果不加break的话，匹配到对应常量时，后面的代码不会进行判断，会直接执行；**

```js
/* 去贩卖机买水：262 农夫山泉；263 尖叫；264 红牛；265 雷碧 */
var s = 262;
switch(s){
    case 262 : alert("农夫山泉");break;
    case 263 : alert("尖叫");break;
    case 264 : alert("红牛");break;
    case 265 : alert("雷碧");break;
    default : alert("退币");
}

/* 计算器 */
var s = "*";
switch(s){
    case "+" : console.log(100+10); break;
    case "-" : console.log(100-10);break;
    case "*" : console.log(100*10);break;
    case "/" : console.log(100/10);break;
    default:console.log("我太难了，要不然你换个符号");
}
```

###### 	案例：简易计算器

```html
<body>
    <input type="text">
    <select name="" id="symbol">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
    </select>
    <input type="text">
    <button id="btn">=</button>
    <span id="result"></span>
    <script>
        //获取元素
        var inp = document.getElementsByTagName("input");
        var symbol = document.getElementById("symbol");
        var btn = document.getElementById("btn");
        var result = document.getElementById("result");
        //给按钮添加点击事件
        btn.onclick = function(){
            //分别获取两个输入框的值
            var n1 = inp[0].value;//字符串
            var n2 = inp[1].value;
            var sy = symbol.value;
            //判断用了什么符号
            switch(sy){
                case "+" : result.innerText = parseFloat(n1) + parseFloat(n2);break;
                case "-" : result.innerText = parseFloat(n1) - parseFloat(n2);break;
                case "*" : result.innerText = parseFloat(n1) * parseFloat(n2);break;
                case "/" : result.innerText = parseFloat(n1) / parseFloat(n2);break;
                default : alert("这种符号无法计算");
            }
        }
    </script>
</body>
```

##### switch-case和if else-if的区别？

​	switch-case通常用于处理case值比较确定的情况，用变量去跟常量一一匹配；if else-if语句会更加灵活，通常用于范围判断；

#### 分支嵌套

​	分支套分支，外层分支过滤掉某些不满足的条件；

```js
var s = 79;
if (s <= 100 && s >= 0) {
    if (s >= 90) {
        console.log("非常棒");
    } else if (s >= 80) {
        console.log("优秀");
    } else if (s >= 70) {
        console.log("中等");
    } else if (s >= 60) {
        console.log("及格");
    } else {
        console.log("再来一次");
    }
}
```

### 循环结构

​	为了解决多次重复的问题：1、重复相同的内容	2、有规律地重复内容

```js
//1.道歉  多次重复
console.log("对不起,我错了！");
console.log("对不起,我错了！");
console.log("对不起,我错了！");
console.log("对不起,我错了！");
console.log("对不起,我错了！");

//2.多次有规律重复 ,内容不变，数值在变
console.log(1);
console.log(2);
console.log(3);
```

#### for循环

​	语法：for(表达式1;表达式2;表达式3){循环体}；

​	具体语法：for(声明循环变量;判断循环条件;更新循环变量){循环体}；

​	步骤分解：

1. 声明循环变量  i = 0;
2. 判断循环条件 ——> 条件成立：执行3.  ；条件不成立：跳出循环；
3. 执行循环体
4. 更新循环变量  i++
5. 回到2.

**注意：for循环必须要有终止条件，否则会陷入死循环；**

```js
for(var i = 0;i<5;i++){
    console.log(i);//0 1 2 3 4
}
```

###### 案例：计算0~100的和

```js
var sum = 0;
for(var i = 1;i <= 100;i++){
    sum += i;
}
console.log(sum); //5050
```

###### 案例：一个人能活到100岁，记录他每年的年龄以及他出生死亡的时间

```js
for(var i = 1;i <= 100;i++){
    if(i == 1){
        console.log("他出生了");
    }
    if(i == 100){
        console.log("他挂了……");
    }
    console.log("他今年" + i + "岁了");
}
```

###### 案例：计算10年后工资

```js
//入职薪水10k，每年涨幅8 %，10年后工资多少？
var money = 10000;
for(var i = 0;i < 10;i++){
    money += money * 0.08;
}
console.log(money);
```

##### for循环操作标签

​	1. 给元素添加点击事件

```js
for(var i = 0;i<oBtn.length;i++){ //使用.length,比较灵活，元素个数发生变化的时候，不会影响
    oBtn[i].onclick = function(){
        console.log("点击呀！");
    }
}
```

2. 循环生成标签

```js
/* 动态生成标签 */
var list = document.getElementById("list");

var arr = ["首页","关于我们","团队"];//数组

//for循环来遍历数组
for(var i = 0;i < arr.length;i++){
    console.log(arr[i]);
    //每循环一次，都向ul中动态添加li标签
    list.innerHTML += "<li>"+arr[i]+"</li>";
}
```

###### 案例：循环生成标签

```js
//循环添加标签
var arr = ["2月5号放假，2月28开学", "行李都要拿回家", "需要退宿舍", "电脑不能带走", "明天下雪"];

//1.获取标签
var oBtn = document.getElementsByTagName("button")[0];
var oUl = document.getElementsByTagName("ul")[0];

//2.点击生成标签
oBtn.onclick = function () {
    for (var i = 0; i < arr.length; i++) {
        oUl.innerHTML += "<li>" + arr[i] + "</li>";
    }
}
```

#### while

​	语法：while(判断条件){循环体；更新循环变量}

```js
var n = 10;
while(n < 10){
    console.log(n);
    n++;
}
```

#### do-while

​	语法：do{循环体;更新循环变量}while(判断条件)

```js
var n = 10;
do{
    console.log(n);
    n++;
}while(n < 10)
```

#### while和do-while的区别？

​	while是先判断后执行，do-while是先执行后判断，do-while不管满不满足条件，都会至少执行一次；

###### 	案例：计算100元多少天能用完

```js
/* 100元，每天用一半，多少天能用完 */
var day = 0;
var money = 100;
while(money >= 1){
    day++;
    money *= 0.5;
    console.log("第" + day + "天，还剩" + money);
}
```

###### 	案例：割绳子

```js
/* 有一段1000米的绳子 截掉 2/3 之后, 看剩下的部分, 如果大于50 就继续截, 问要截多少次? */
var rope = 1000;
var time = 0;
while(rope >= 50){
    rope *= 1/3;
    time++;
    console.log("截了" + time + "次，还剩" + rope + "米");
}
```

#### break和continue

​	无论是while循环还是for循环，都可以使用两个语句——break和continue，这两个语句可以中断循环。

1. break：当满足条件的时候，跳出循环；
2. continue：当满足条件的时候，跳出本次循环，执行下一次循环；

```js
/* 要吃100个汤圆，吃到第5个的时候，发现碗里有只蟑螂，剩下的，不吃了 */
for(var i = 1;i <= 100;i++){
    if(i == 5){
        console.log("这汤圆有蟑螂……");
        break;
    }
    console.log("我吃到第" + i + "个汤圆了");
}

/* 要吃100个汤圆，吃到第5个的时候，掉到地上了，不要这个了，剩下的接着吃 */
for(var i = 1;i <= 100;i++){
    if(i == 5){
        console.log("这个掉了，不吃了……");
        continue;
    }
    console.log("我吃到第" + i + "个汤圆了");
}
```

#### 双重for循环（循环嵌套）

​	在一个循环语句中再定义一个循环语句的结构；

​	语法：for(外循环初始;外循环条件;外循环表达式){

​					for(内循环初始;内循环条件;内循环表达式){

​						需要执行的代码

​					}

​				}

​	**注意：内层循环也遵循for循环的执行顺序，外层循环一次，内层循环一圈；**

```js
/* 打印5行5列的星星 */
for(var i = 0;i < 5;i++){
    for(var j = 0;j < 5;j++){
        document.write("☆");
    }
    document.write("<br>");
}
```

###### 	案例：电影渲染

```html
<h3>热门电影</h3>
<ul></ul>
<h3>热门动漫</h3>
<ul></ul>
<h3>热门动画片</h3>
<ul></ul>

<script>
var arr = [
    ["我和我的家乡", "八佰"],
    ["一人之下", "大鱼海棠", "秦时明月", "柯南"],
    ["喜羊羊", "熊出没", "猪猪侠", "巴拉拉小魔仙", "海绵宝宝"]
]

var oUl = document.getElementsByTagName("ul");

for(var i = 0;i < oUl.length;i++){
    var array = arr[i];
    for(var j = 0;j < array.length;j++){
        oUl[i].innerHTML += "<li>"+array[j]+"</li>";
    }
}
</script>
```

