## Math、时间对象及字符串对象

### 对象简介

- 本地对象：js的内部对象，包括Number、String、Boolean、Function、Object、Array、RegExp、Error、Date、Global、Math对象，其中Global和Math又叫js的”内置对象“，在js脚本程序初始化时创建，不需要实例化就可以使用；

- 宿主对象：执行js脚本程序的环境提供的对象，就是浏览器提供的对象，例如document、window；

- 自定义对象：自己创建的对象；

  每个对象都提供了很多可供操作的API（Application Programming Interface）,应用程序接口，其实就是函数，但是这些函数是封装好的，具有固定功能的，可以直接调用实现功能；

#### 伪对象

​	在js中，可以通过new关键字创建一个对象，也可以直接通过字面量的方式创建变量；所有变量都有对象的形式，通过字面量创建的变量在使用对象的属性和方法时，会被暂时包装成一个对象；

```js
var str = "今朝有酒今朝醉";
console.log(str.length);//7 可以使用对象的属性
console.log(str.charAt(3));//"酒" 可以使用对象的方法
console.log(typeof str);//"string"

var str = new String("明日愁来明日愁");
console.log(typeof str);//"object"
```

### Math对象

​	Math对象是js内置的原生对象，提供各种数学方法，Math对象不能实例化，所有的方法都需要在Math上直接调用；

- 向下取整：Math.floor();
- 向上取整：Math.ceil();
- 四舍五入：Math.round();
- π：Math.PI;
- 取绝对值：Math.abs();
- 计算次方：Math.pow(底数,幂数);
- 开方：Math.sqrt();
- 随机数：Math.random();

```js
/* 掌握 */

//向下取整
console.log(Math.floor(3.14));//3
//向上取整
console.log(Math.ceil(3.14));//4
//四舍五入
console.log(Math.round(3.14));//3
console.log(Math.round(3.54));//4

/* 了解 */

//π
console.log(Math.PI);
//取绝对值
console.log(Math.abs(-10));//10
//计算次方
console.log(Math.pow(2,10));//1024
//开方
console.log(Math.sqrt(81));//9

/* 掌握 */

//随机数
console.log(Math.random());//0-1之间随机取值，包括0但不包括1 [0,1);
//0-x之间的随机数 公式：Math.rangom()*x
console.log(Math.random()*10);//0-10之间的随机数
//x-y之间的随机数 公式：Math.random()*(y-x+1)+x;
console.log(Math.random()*21+80);//80-100之间的随机数
```

###### 	案例：计算p(10,20)和q(100,100)之间的距离

```js
var x1 = 10,x2 = 100,y1 = 20,y2 = 100;
console.log(Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2)));
```

###### 	案例：随机抽奖

```js
var arr = ["王一博","易烊千玺","美羊羊","奥特曼之父","桥本环奈"];
alert(arr[Math.floor(Math.random()*arr.length)]);
```

#### 封装获取随机数的函数

```js
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
console.log(getRandom(20,40));
```

###### 	案例：给同桌找对象

```js
oSpan.onclick = function(){
    clearInterval(timer);
    timer = setInterval(function(){
        for(var i = 0;i < oImgs.length;i++){
            oImgs[i].style.display = "none";
        }
        oImgs[Math.floor(Math.random()*oImgs.length)].style.display = "block";
    },30)

    setTimeout(function(){
        clearInterval(timer);
    },3000)
}
```

### 时间对象

#### 创建时间对象

- 创建当前日期对象：

  var date = new Date();//实例化时间日期对象（获取到当前这一秒的时间）;

- 创建指定日期对象：

  var date = new Date(year,month,day,hours,minutes,seconds);//实例化时间日期对象（获取指定日期的时间）；

  ​		括号里的值可以是数值型也可以是字符串，只要符合时间格式就可以；如果是数值型，则默认月份是从0月开始的，按中国的标准来看，获取到的月份需要减1；可以获取到具体的时分秒，也可以不写，不写的话默认是00:00:00；

```js
var date = new Date(2021,5,1,10,10,10);//Tue Jun 01 2021 10:10:10 GMT+0800 (中国标准时间)
var date = new Date("2021/5/1 10:10:10");//Sat May 01 2021 10:10:10 GMT+0800 (中国标准时间)
var date = new Date("2021-5-1 10:10:10");//Sat May 01 2021 10:10:10 GMT+0800 (中国标准时间)
console.log(date);
```

#### 时间对象的方法

##### 	获取固定格式的时间

- date.toDateString();
- date.toLocaleDateString();
- date.toTimeString();
- date.toLocaleTimeString();

```js
console.log(oDate.toDateString()); //Tue Dec 22 2020
console.log(oDate.toLocaleDateString()); //2020/12/22

console.log(oDate.toTimeString()); //13:42:33 GMT+0800 (中国标准时间)
console.log(oDate.toLocaleTimeString()); //下午1:42:33
```

##### 	获取单个时间

- 获取年

  date.getFullYear();

```js
var year = oDate.getFullYear();
console.log(year); //2021
```

- 获取月

  date.getMonth();  获取到的月份需要+1；

```js
var month = oDate.getMonth()+1; //月份从0开始，月份+1
console.log(month); 
```

- 获取日

  date.getDate();

```js
var date = oDate.getDate();
console.log(date); //22

```

- 获取星期

  date.getDay();

```js
var w = oDate.getDay();
console.log(w);//2    星期二

//通常这样获取中国的星期
var week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
console.log(week[w]);
```

- 获取小时

  date.getHours();

```js
var h = oDate.getHours();
console.log(h);
```

- 获取分钟

  date.getMinutes();

```js
var m = oDate.getMinutes();
console.log(m);
```

- 获取秒

  date.getSeconds();

```js
var s = oDate.getSeconds();
console.log(s);
```

- 获取时间戳

  date.getTime();  获取到的是从1970年1月1日 00:00:00到目前的时间

```js
console.log(oDate.getTime());
```

###### 	案例：模拟时钟（正计时）

```js
auto(); //在定时器等待的时候，先调用函数一次
setInterval(auto, 1000);
function auto() {
    //1.创建时间对象 ,,获取的是这一秒的时间，get都是从这个时间的基础上获取的
    var oDate = new Date();
    var y = oDate.getFullYear();
    var m = oDate.getMonth() + 1;
    var d = oDate.getDate();
    var w = oDate.getDay();
    var h = oDate.getHours();
    var mi = oDate.getMinutes();
    var s = oDate.getSeconds();
    var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //2020年12月22日 星期二 13:42:33
    var str = y + "年" + fullZero(m) + "月" + fullZero(d) + "日 " + week[w] + fullZero(h) + ":" + fullZero(mi) + ":" + fullZero(s);
    document.body.innerText = str;
}

function fullZero(num){
    return num >= 10 ? num : "0"+num;
}
```

##### 	moment.js

​	官网：http://momentjs.cn/

​	可以格式化日期时间；

```js
console.log(moment().format("YYYY")); //YY:年份
console.log(moment().format("MM")); //MM：月份  会自动补0  
console.log(moment().format("DD")); //DD：日期  会自动补0  
console.log(moment().format("HH")); //HH：小时  会自动补0  
console.log(moment().format("mm")); //mm：分钟  会自动补0  
console.log(moment().format("ss")); //ss：秒  会自动补0  

setInterval(function(){
    document.body.innerHTML = moment().format("YYYY年MM月DD日 HH:mm:ss");
},1000);
```

###### 	案例：倒计时

```js
//倒计时 时间差 = 目标(未来)时间-当前时间   

auto();
setInterval(auto, 1000)
function auto() {
    //1.获取当前时间
    var currentDate = new Date();

    //2.创建未来时间
    var futureDate = new Date("2021,1,1,00:00:00");

    //3.时间差 = 目标(未来)时间-当前时间     时间戳  某个时间到某个时间之间毫秒数
    var time = parseInt((futureDate - currentDate) / 1000);
    console.log(time);

    //4.计算
    var t = parseInt(time / 86400);
    console.log(t);

    var h = parseInt(time % 86400 / 3600);  //(time%86400:计算天数，剩余再算小时)
    console.log(h);

    var m = parseInt(time % 3600 / 60);
    console.log(m);

    var s = time % 60;
    console.log(s);

    document.body.innerText = "现在距离元旦放假还剩：" + fullZero(t) + "天" + fullZero(h) + ":" + fullZero(m) + ":" + fullZero(s);
}


function fullZero(num){
   return num<10 ? "0"+num : num;
}
```

### 字符串对象	

​	string是一个包装类对象，字面量创建的字符串不能说是一个真正的对象，只有在使用字符串的方法或属性的时候才会暂时被包装成一个对象；

#### 创建方式

##### 	字面量创建

```js
var str = "人生得意须尽欢";
```

##### 	实例化创建

​	使用关键字new来创建

```js
var str = new String("莫使金樽空对月");
```

#### 属性

​	获取字符串长度：字符串.length；

```js
console.log(str.length);
```

#### 方法

##### 	str.charAt(pos)

​	获取对应下标的字符，默认从0开始；pos：下标；

```js
var str = "javawebujiuyeui";
console.log(str.charAt(3));//"a"
```

##### 	str.charCodeAt(pos)

​	获取对应下标字符的ASCII码值；下标默认从0开始；pos：下标

​	ASCII码值：0——48；A——65；a——97；

```js
var str = "java0webujiuyeui";
console.log(str.charCodeAt(4));//48
console.log(str.charCodeAt(1));//97
```

##### 	str.indexOf(searchValue,start)

​	searchValue：查找的字符串；

​	start：起始下标（可选）；

​	获取字符串A在字符串B中出现的位置，如果字符串B中有字符串A，则返回字符串A第一次出现的下标，如果没有，则返回-1；（判断一个字符串中是否含有另一个字符串）;

```js
var str = "jfoijafpo";
console.log(str.indexOf("a"));//5
console.log(str.indexOf("a",6));//-1
console.log(str.indexOf("w"));//-1
```

##### 	str.lastIndexOf(searchValue,start)

​	searchValue：查找的字符串；

​	start：起始下标（可选）；

​	获取字符串A在字符串B中最后一次出现的位置，如果字符串B中有字符串A，则返回字符串A最后一次出现的下标，如果没有，则返回-1；（判断一个字符串中是否含有另一个字符串）;

```js
var str = "moirtiew";
console.log(str.lastIndexOf("i"));//5
console.log(str.lastIndexOf("i",3));//2
console.log(str.lastIndexOf("a"));//-1
```

###### 	案例：获取某个字符串出现的次数

```js
function getCount(str, s) {
    var index = 0;//查找的起始下标
    var n = 0;//用于计数

    while (str.indexOf(s,index) != -1){
        index = str.indexOf(s,index) + 1;
        n++;
    }
    return n;
}
console.log(getCount("jfijgiweaimeaf", "i"));
```

##### 	substring(start,end)

​	start：起始下标（可选，默认从0开始）；

​	end：结束下标，（可选，默认为字符串length位置）；

​	提取介于两个指定下标之间的字符，包括开始，不包括结束；

```js
var str = "431102199910101212";
console.log(str.substring(6)); //从下标为6开始截取到最后 199910101212
console.log(str.substring(6, 10)); //包括开始，不包括结束
```

##### 	slice(start,end)

​	start：起始下标（可选，默认从0开始）；

​	end：结束下标，（可选，默认为字符串length位置）；

​	提取介于两个指定下标之间的字符，包括开始，不包括结束；

```js
var str = "431102199910101212";
console.log(str.slice(6, 10));
```

- substring和slice的区别

```js
//区别
var str = "abcdefg";
console.log(str.substring(2, 0)); //自动调整位置0 - 2
console.log(str.slice(2, 0)); //不自动调整位置 ""

console.log(str.substring(2, -1)); //ab 负数默认为0
console.log(str.slice(2, -1)); //cdef  负数默认为倒数第几个
```

##### 	substr(start,length)

​	start：起始下标（可选，默认是0）；

​	length：截取长度（可选，默认到结尾）；

```js
var str = "431102199910101212";
console.log(str.substr(6, 4));
```

##### 	str.replace(将要被替换掉的内容,替换的内容)

​	字符串的方法不会影响到原来的字符串，返回一个操作好的新的字符串；

```js
var str = "moirtiew";
console.log(str.replace("moir","web"));//"webtiew"
console.log(str);//"moirtiew"
```

##### 	str.toUpperCase()

​	转成大写；

```js
var s1 = "aArT5";
console.log(s1.toUpperCase()); //AART5
```

##### 	str.toLowerCase();

​	转成小写；

```js
var s1 = "aArT5";
console.log(s1.toLowerCase());//aart5
```

​	**注意：由于字符串之间的比较比较的是ASCII码值，所以 我们可以通过转换大小写来进行验证码的验证；**

```js
console.log(s1.toLowerCase()==s2.toLowerCase());//true
```

##### 	split(splitter,length)

​	splitter：分割的标准，一般都是字符串；

​	length：返回的数组长度；

​	将字符串按条件分割成数组；

```js
var str = "gsdf&gjosdg&asjfi&j0";
console.log(str.split("&"));//["gsdf", "gjosdg", "asjfi", "j0"]
console.log(str.split("&",2));//["gsdf", "gjosdg"]
```

##### 	str.trim()

​	去除字符串首位空格；

```js
var str = "     hello     ";
console.log(str);//"     hello     "
console.log("|" + str.trim() + "|");//"|hello|"
console.log("|" + str.trimLeft() + "|");//"|hello     |"
console.log("|" + str.trimRight() + "|");//"|     hello|"
```

###### 	案例：字符串转json

```js
/* 有这样一个 url：http://item.taobo.com/item.html?a=1&b=2&c=&d=xxx&e, 请写
一段 js 程序提取 url 中各个 get 参数 ( 参数名和参数个数不确定 )，将其 key-value
形式返回到一个 json 结构中，如 {a:“1”,b:“2”，c:“”，d：“xxx”，e:undefined} */

var str = "http://item.taobo.com/item.html?a=1&b=2&c=&d=xxx&e";
//使用?为条件分割
var newStr = str.split("?")[1];//a=1&b=2&c=&d=xxx&e
var arr = newStr.split("&");//["a=1", "b=2", "c=", "d=xxx", "e"]
//需要一个对象
var json = {};
/* json["a"] = "123"
console.log(json) */
//遍历数组
for(var i = 0;i < arr.length;i++){
    var arr1 = arr[i].split("=");
    console.log(arr1);
    //使用 对象名[键名] = 键值
    json[arr1[0]] = arr1[1];
}
console.log(json);
```

