## RegExp正则对象和DOM操作

### 正则表达式

​	正则表达式是对字符串进行操作的一种逻辑公式，可以根据事先规定好的一种“规则字符串”表示对字符串的一种过滤逻辑，其实就是规定文本检索的内容，通常用于字符串的检索和替换；

### 创建正则表达式

#### 实例化创建

​	var reg = new RegExp("检索字符","修饰符");

```js
var reg = new RegExp("hello");
console.log(reg);// /hello/

var s = "hello";
var reg = new RegExp(s);//可以存放变量
console.log(reg);// /hello/
```

#### 字面量创建

​	var reg = /检索字符/修饰符

```js
var reg = /hello/;
console.log(reg);// /hello/

var s = "hello";
var reg = /s/;//不可以放变量
console.log(reg);// /s/
```

### 修饰符

​	修饰符是对表达式的一些附加条件，可以一起使用，常用的修饰符有g和i；

- g：global，全局匹配，正则表达式默认匹配到一个满足条件的值，就停止匹配，加上g之后，可以匹配到全局所有满足条件的值；

```js
var reg = /hello/;
var str = "hello，玛卡巴卡；hello，唔西迪西；hello，汤姆布利布。";
console.log(str.replace(reg,"晚安"));//晚安，玛卡巴卡；hello，唔西迪西；hello，汤姆布利布。
var reg = /hello/g;
console.log(str.replace(reg,"晚安"));//晚安，玛卡巴卡；晚安，唔西迪西；晚安，汤姆布利布。
```

- i：ignore case，不区分大小写；

```js
var str = "Is this HIS history book?"
var reg = /is/g;
console.log(str.replace(reg,666));//Is th666 HIS h666tory book?
var reg = /is/gi;
console.log(str.replace(reg,666));//666 th666 H666 h666tory book?
```

### 正则的检索

#### 字符串方法

​	正则可以使用字符串的部分方法

##### 	replace()

​	替换

```js
var str = "今天学习明天学习后天学习";
var reg1 = /学习/g;
console.log(str.replace(reg1,"放假")); //今天放假明天放假后天放假
```

##### 	split()

​	按条件分割成数组

```js
var str = "fer&ges&sriu& sur&r";
var reg = "&";
console.log(str.split(reg));//["fer", "ges", "sriu", " sur", "r"]
```

##### 	search()

​	查找到就返回第一次出现的下标，没有查找到就返回-1;

```js
var str = "Is this His history book?"
var reg = /is/
console.log(str.search(reg));//5
```

##### 	match(条件)

​	挑选满足条件的字符串，组成一个数组返回；

```js
var str = "fer&ges&sriu&sur&r";
var reg = /&/g;
console.log(str.match(reg));//["&", "&", "&", "&"]
```

#### 正则对象验证方法

##### 	test(字符串)

​	检测字符串中是否有符合正则表达式这一项，有就返回true，没有就返回false；

```js
var str = "Is this His history book?";
var reg = /is/
console.log(reg.test(str));//true
var reg = /are/
console.log(reg.test(str));//false
```

##### 	exec(字符串)

​	检测字符串中是否含有符合正则表达式这一项，有就返回一个包含具体信息的数组，没有就返回null；如果不是全局模式，每次检测都只返回第一次符合要求的下标；如果是全局模式，则下一次检测会从上一次之后的位置继续检测；

```js
var str = "Is this His history book?";
var reg = /is/;
console.log(reg.exec(str));//["is", index: 5, input: "Is this His history book?", groups: undefined]

var reg = /is/g
console.log(reg.exec(str));//["is", index: 5, input: "Is this His history book?", groups: undefined]
console.log(reg.exec(str));//["is", index: 9, input: "Is this His history book?", groups: undefined]
```

### 正则的元字符

#### 	. 非换行符中的任意一位字符

```js
var str = "web1021";
var reg = /./; // 从左到右一个一个去匹配
console.log(reg.exec(str));//w
var reg = /web..../;
console.log(reg.exec(str));//web1021

var str = "\nweb1021";
var reg = /./;
console.log(reg.exec(str));//w
```

#### 	[] 匹配该字符集中的任意一位字符[0-9a-zA-Z]

```js
var str = "#^&$*@";
var reg = /[&]/g;
console.log(reg.exec(str));//&
var str = "%#%$jaif2734jsf34";
var reg = /[0-9]/g;
console.log(reg.exec(str));//2
```

#### 	[^] 匹配除了该字符集中字符的任意一位字符

```js
var str = '889shfi';
var reg = /[^0-9]/;
console.log(reg.exec(str));//s
```

#### 	\d 匹配数字 \D 匹配非数字

```js
var str = "fhu3h45uf89fj349htf";
var reg = /\d/g;
console.log(str.replace(reg, "*"));//fhu*h**uf**fj***htf
var reg = /\D/g;
console.log(str.replace(reg, "*"));//***3*45**89**349***
```

#### 	\w 匹配数字、字母、下划线 \W 匹配非数字字母下划线

```js
var str = "h45ui%#$s__4u*^&^39_fjio%$es";
var reg = /\w/g;
console.log(str.replace(reg,"*"));//*****%#$******^&^*******%$**

var reg = /\W/g;
console.log(str.replace(reg,"*"));//h45ui***s__4u****39_fjio**es
```

#### 	\s 匹配空格 \S匹配非空格

```js
var str = "hello hello";
var reg = /\s/;
console.log(str.replace(reg,""));//hellohello

var reg = /\S/g;
console.log(str.replace(reg,"*"));//***** *****
```

#### 	\b 匹配字符边界 \B 非字符边界

```js
var str = "good good study,fdjday day up";
var reg = /\bday/g;
console.log(str.replace(reg,"GOOD"));//good good study,fdjday GOOD up

var reg = /\Bday/g;
console.log(str.replace(reg,"GOOD"));//good good study,fdjGOOD day up
```

#### 	^ 以某个字符开头

​	比如： ^a 以a开头

```js
var str = "vat834";
var reg = /^a[a-z].../;
console.log(reg.exec(str));//null
```

#### 	$ 以某个字符结尾 

​	比如：a$ 以a结尾

```js
		var str = "@1335436";
        var reg = /\d\d\d\d\d\d$/;
        console.log(reg.exec(str));
```

#### 	? 匹配某个字符0次或1次

​	比如：a? 匹配a0次或1次

```js
/* ? 匹配0次或1次   a?  匹配a 0次或1次 */
var str = "aaa37aaf3";
var reg = /a?/g;
console.log(reg.exec(str));//exec如果匹配通过，返回匹配到的字符信息的数组，如果没有匹配到，返回null；
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
```

#### 	*匹配某个字符0次或多次 

​	比如：a* 匹配a0次或多次

```js
var str = "web";
var reg = /a*/;
console.log(reg.exec(str));//""
var str = "aaaaweba";
var reg = /a*/g;
console.log(reg.exec(str));//"aaaa"
```

#### 	\+ 尽可能多的匹配某个字符 

​	比如：a+ 尽可能多的匹配a  匹配某个字符1次或多次 

```js
var str = "web";
var reg = /a+/;
console.log(reg.exec(str));//null
var str = "aaaaweba";
var reg = /a+/g;
console.log(reg.exec(str));//"aaaa"
```

###### 				案例：匹配网址

```js
//https://www.baidu.com
var str = "https://www*163*com";  //   \转义
var reg = /^https:\/\/www\.[0-9a-zA-Z]+\.com$/;
console.log(reg.exec(str));
```

#### 	{m,n}至少匹配m次，最多匹配n次 

​	{m,}至少匹配m次 {m}必须匹配m次

```js
var str = "12345678";
var reg = /^\d{3,5}$/g;//{m,n}至少匹配m次 最多匹配n次
console.log(reg.exec(str));
var reg = /^\d{5,}$/g;//{m,}至少匹配m次
console.log(reg.exec(str));
var reg = /^\d{7}$/g;
console.log(reg.exec(str));
```

#### 	() 分组

```js
var str = "hello world";
var reg = /(.*)\s(.*)/;
console.log(str.replace(reg,"$2"));//world
```

#### 	| 或

```js
var str = "python1218";
var reg = /(web|ui|java)1218/;
console.log(reg.exec(str));
```

###### 				案例：敏感词过滤

```html
<input type="text">
<script>
    var inp = document.getElementsByTagName("input")[0];
    inp.onblur = function(){
        var v = inp.value;
        var reg = /妈|杀|狗|草|小学生|大学生|女权/g;
        inp.value = v.replace(reg,"*");
    }
</script>
```

###### 				案例：验证网址

```js
/* 验证网址  http https  :// www.baidu 163 qq .com .cn .edu .org */
var reg = /^(http|https):\/\/www\.[0-9a-zA-Z]{2,}\.(com|cn|edu|org)$/;
var str = "http://www.qq.com";
var str = "http://www.163.com";
var str = "http://www.aa.cn";
console.log(reg.exec(str));
```

###### 				案例：验证手机号

```js
/* 验证手机号  +86 17462480937 */
var str = "+86 17462480937";
var reg = /^\+86\s1(3|5|7|8|9)[0-9]{9}$/;
console.log(reg.exec(str));
```

###### 			案例：验证邮箱

```js
/* 邮箱  74385294@qq.com    QQ号至少5位最多11位 */
var str = "74385294@qq.com";
var reg = /^[0-9]{5,11}@qq\.com$/;
console.log(reg.exec(str));
```

###### 				案例：去除字符串首尾空格

```js
/* 去除字符串首尾空格 */
var str = "           helloWord             ";
console.log(str);
console.log(str.trim());//字符串方法
var reg = /^\s+|\s+$/;  //空格不止一个
console.log(str.replace(reg, ""));
```

### ?:  不获取匹配字符

```js
var str = "win10";
var reg = /win(10|7)/;
console.log(reg.exec(str));//"win10", "10"

var reg = /win(?:10|7)/;
console.log(reg.exec(str));//"win10"
```

### 正则的前瞻后顾

#### 	?=  正向肯定预查

```js
var str = "web1010 web0322";
var reg = /web(?=0322)/;//后面必须跟什么
console.log(reg.exec(str));//8
```

#### 	?!	正向否定预查

```js
var str = "web1010 web0322 web0321";
var reg = /web(?!1010)/g;//后面不能跟什么
console.log(reg.exec(str));//8
console.log(reg.exec(str));//16
```

#### 	?<=	反向肯定预查

```js
var str = "web1010 web0322 web0321";
var reg = /web(?!1010)/g;//后面不能跟什么
console.log(reg.exec(str));//8
console.log(reg.exec(str));//16
```

#### 	?<!	反向否定预查

```js
var str = "webujiuye  uiujiuye";
var reg = /(?<!ui)ujiuye/;//前面不能有什么
console.log(reg.exec(str));//3
```

###### 			案例：改写字符串

```js
/* a=1,b=2,c=3,d=4 */
var str = "a,1,b,2,c,3,d,4";
var reg = /(?<=[a-z]),/g;//找字母后面的逗号
var reg = /,(?=[0-9])/g //找数字前面的逗号
console.log(str.replace(reg,"="));//a=1,b=2,c=3,d=4
```

### DOM操作

​	浏览器在解析界面的时候会将HTML结构解析成DOM树

#### 获取DOM元素

##### 	querySelector()

​	可以通过Id、类名、标签名获取，获取的都是单个元素；

```js
var oUl = document.querySelector("ul");//通过标签名获取 获取单个元素
var oUl = document.querySelector("#list");//通过id获取
var oUl = document.querySelector(".box");//通过类名获取
```

##### 	querySelectorAll()

​	可以通过Id、类名、标签名获取，获取的都是节点列表 可以使用数组方法

```js
var list = document.querySelectorAll("ul");
var list = document.querySelectorAll("#list");
var list = document.querySelectorAll(".box");
```

#### 获取子节点

##### 	父节点.children

​	非标准的 通常使用这种方式获取子节点

```js
var oLi = oUl.children;//HTMLCollection(5) [li, li, li, li, li]
```

##### 	父节点.childNodes

​	标准的 会把空格、回车等解析成文本节点，并且获取到

```js
var oLi = oUl.childNodes;//NodeList(11) [text, li, text, li, text, li, text, li, text, li, text]
```

#### 节点属性

##### 	nodeType

​	节点类型

```js
console.log(oLi[0].nodeType);//文本节点——3
console.log(oLi[1].nodeType);//注释节点——8
console.log(oLi[3].nodeType);//标签节点——1
```

##### 	nodeName

​	节点名称

```js
console.log(oLi[0].nodeName);//#text
console.log(oLi[1].nodeName);//#comment
console.log(oLi[3].nodeName);//LI
```

##### 	nodeValue

​	节点内容

```js
//可以设置节点内容
 oLi[0].nodeValue = "红烧肉";
```

### 表单事件

​	实时获取表单输入内容：oninput

```html
<input type="text">
<script>
var inp = document.querySelector("input");
inp.oninput = function(){
    console.log(inp.value)
}
</script>
```

