# H5简介

HTML5是HTML最新的修订版本，具有新的元素，属性和行为。
HTML5规范于2014年10月29日由万维网联盟正式宣布。
随着移动化的进程，HTML5终将成为主流。

## H5的新变化

H5文档声明与字符集的变化

- 简化了文档声明：<!doctype html>

- 简化了字符集：<meta charset="UTF-8">

- <!DOCTYPE html>

### 新特性

- 新增语义化元素
- 新增表单相关新元素、新属性
- 新增了全局属性
- 新增API应用程序接口：
-  canvas绘图
-  多媒体（视频、音频）
- 本地存储，离线存储、
- 地理信息

### 移除的元素（简略带过）

- 以下的 HTML 4.01 标签在HTML5中已经被删除：
  
  ```
  ● <acronym> 定义只取首字母缩写
  ● <applet> 规定 Java applet 的文件名
  ● <basefont> 定义文档中所有文本的默认颜色、大小和字体
  ● <big> 呈现大号字体效果
  ● <center> 标签控制文本的居中显示
  ● <dir> <dir> 标签定义目录列表
  ● <font> 标签规定文本的字体、字体尺寸、字体颜色
  ● <frame> 标签定义 frameset 中的一个特定的窗口（框架）
  ● <frameset> frameset 元素可定义一个框架集
  ● <noframes> noframes标签向浏览器显示无法处理框架的提示文本
  ● <strike> strike 标签可定义加删除线文本定义。
  ```
  
- 提示：由于H5是向前兼容的，所以在H5中使用这些标签也不会报错或出现异常，但这些元素在H5中已不被W3C标准推荐，建议尽量不要使用。

### 现状

HTML5 仍处于完善之中。然而，大部分现代浏览器已经具备了某些 HTML5 支持。

# H5新增的语义元素


HTML5新增了页眉、页脚、内容块等文档结构相关的标签，可以使文档结构更加清晰明确。

### section

- 语法：

  ```
  <section></section>
  ```

- 作用：定义文档中的节（页面中内容的区段、文章中的章节）。
    一个section元素通常由内容及标题组成

- 典型应用：
   文章中的章节、 选项卡式对话框中的各个选项卡式页面

- 注意：样式上的分区用div,结构 上的分区用section

### article

- 语法：

  ```
  <article></article>
  ```

-  作用：元素表示文档、页面、应用或网站中的独立结构，可以成为可独立分配的或可复用的结构。


- 典型应用：论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目
- 注意：
    每个article通常包括标题（h1 - h6元素）作为article元素的子元素
    当article元素嵌套使用时，则该元素代表与外层元素有关的文章。例如，代表博客评论的article元素可嵌套在代表博客文章的article元素中。
   可能包含一个或多个section            article>section

### nav

- 语法

  ```
  <nav></nav>
  ```

- 作用：定义导航链接的部分

- 典型应用：主导航、侧边栏导航、页内导航、菜单、面包屑导航、分页、目录和索引等

### aside

- 语法 

  ```
  <aside></aside>
  ```

- 语义：定义当前页面或文章的附属信息部分

- 典型应用：侧边栏、标注框、广告等

### header

- 语法 

  ```
  <header></header>
  ```

- 语义：定义整个文档或文档中一个节段的的头部（页眉）。
  作为文档的头部通常搜索表单、相关的logo、站点的名称以及水平菜单（如果有的话）等。
  作为一个节段的头部，通常包含了节段的标题和作者名字等。
- 典型应用：整个页面的头部、文章页的包含标题部分的头部

### footer

- 语法：

  ```
  <header></header>
  ```

- 作用：定义文档或节的页脚
    作为文档的页脚通常会包含版权信息和法律声明以及一些其他链接
    作为节段的页脚，可能包含了节段的发布数据、许可声明等
-  典型应用:网页中的版权信息，相关阅读链接


    <article>, <section>, <aside>, and <nav> 可以拥有它们自己的 <footer>	,<header>

### 兼容问题

问题概述：IE8浏览器中还没有添加对HTML5新标签的支持，当在页面中使用HTML5新标签时，新标签被当作错误处理（IE浏览器中演示解析结果）

### 解决方案

一、通过document.createElement（tagName）方法即可让浏览器识别新标签，
浏览器支持新标签后，还可以为新标签添加CSS样式。

```
<!--[if lt IE 9]>
  <script>
        document.createElement("header");
        document.createElement("footer");
  </script>
<![endif]-->
```

```
 由于创建出来的元素是内联元素，所以需要转换成块级，宽度和高度才能生效
 header,footer,nav,article,section,aside{
 		display: block;
 }
```

二：使用封装好的插件html5shiv.js解决

html5shiv主要解决HTML5提出的新的元素不被IE6-8识别，这些新元素不能作为父节点包裹子元素，并且不能应用CSS样式

```
 <!--[if lt IE 9]>
     <script src="html5shiv.js"></script>
<![endif]-->
```

- 说明
  - 条件注释作用是在 IE 浏览器的版本小于 IE9 时将读取 html5.js 文件，并解析它
  - 可以使用本地文件也可以使用外部资源库
    - Google 资源库：（不稳定）http://html5shiv.googlecode.com/svn/trunk/html5.js 
    - 百度静态资源库：（国内推荐使用）http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js

- 了解由来
  - https://github.com/aFarkas/html5shiv

  - https://www.paulirish.com/2011/the-history-of-the-html5-shiv/

# 新增表单元素与相关属性

## H5 新增的input类型

概述：HTML5 拥有多个新的表单输入类型。这些新特性提供了更好的输入控制和验证

### search搜索域

- 作用：搜索域，比如站点搜索或 Google 搜索

- 代码示例

  ```
  <input type="search">
  ```

### tel电话号码输入域

![](tel.png)

- 作用：输入电话号码的文本域

- 代码示例

  ```
  <input type="tel">
  ```

### url域

![](url.png)

- 作用： URL 地址的输入域；

- 说明

  - 在提交表单时，会自动验证 url 域的值
  - 移动端：通过改变触摸屏键盘来配合它（添加 .com 选项）

- 代码示例

  ```
  <input type="url">
  ```

### email域

![](email.png)

- 作用：包含 e-mail 地址的输入域

- 说明

  - 在提交表单时，会自动验证 email 域的值
    移动端：改变触摸屏键盘来配合它（添加 @ 和 .com 选项）

- 代码示例

  ```
  <input type="email">
  ```

### number数值输入域

- 作用

  - 作用：包含数值的输入域。

- 相关属性

  - 通过以下属性设定对所接受的数字的限定
  - max:定义允许的最大值   
    min:定义允许的最小值  
    step:定义合法的数字间隔
    value:定义默认值

- 代码示例

  ```
  <input type="number">
  ```

### range一定范围内的数值输入域

![](range原生.png)

- 作用

  - 用于包含一定范围内数字值的输入域，显示为滑动条。

- 相关属性

  - 通过以下属性设定对所接受的数字的限定
  - max:定义允许的最大值   
    min:定义允许的最小值  
    step:定义合法的数字间隔
    value:定义默认值

- 代码示例

  ```
  <input type="range">
  ```

### color颜色输入域

- 作用：颜色输入域，用于选取颜色

- 代码示例

  ```
  <input type="color">
  ```

### 时间日期选择器

#### date日期

- 作用：选择一个日期（年月日）

- 代码示例

  ```
  <input type="date">
  ```

#### time时间

- 作用：选择小时分钟

- 代码示例

  ```
  <input type="time">
  ```

### datetime-local本地时间

- 作用：选择一个日期和时间 (无时区)

- 代码示例

  ```
  <input type="datetime-local">
  ```

### 提示：

并不是所有的主流浏览器都支持新的input类型，
即使不被支持，仍然可以显示为常规的文本域

week  month datetime





## H5 新增表单属性

### placeholder属性

- 作用：提供一种输入提示，描述输入域所期待的值
- 代码示例

```
<input type="text" placeholder="请输入手机号码">
```

### min、max 和 step 属性

- 作用：
  max 属性规定输入域所允许的最大值。
  min 属性规定输入域所允许的最小值。
  step 属性为输入域规定合法的数字间隔
  
- 代码示例
  
  ```
  <input type="number" value="4" min="2" max="10" step="2">
  ```

- 提示

  适用于range和 number类型

### autofocus属性

- 作用：规定在页面加载完成时，自动地获得焦点

- 代码示例

  ```
  <input type="text" autofocus>
  ```

### autocomplete属性

- 作用：当用户在自动完成域中开始输入时，浏览器应该在该域中显示填写的选项，帮助用户在input类型输入框中实现自动完成内容输入。

- 取值

  - on(开启)
  - off(关闭)

- 代码示例

  ```
  <form action="">
  	<input type="text" name="username"  autocomplete="off">
  	<input type="submit" value="提交">
  </form>
  ```

- 提示：该功能与浏览器本身的设置有关，可能需要首先启用浏览器本身的自动完成功能，才能使autocomplete属性起作用。

### required 属性

- 作用：规定必须在提交之前填写输入域（不能为空）

- 代码示例

  ```
  <form action="">
  	<input type="text" name="testname2" pattern="[0-9]">
  	<input type="submit" value="提交">
  </form>
  ```

### pattern 属性

- 作用：用于验证 input 域的模式。

- 代码示例

  ```
  <form action="">
  	<input type="text" name="testname2" pattern="[0-9]">
  	<input type="submit" value="提交">
  </form>
  ```

### multiple 属性

- 作用：规定输入域中可选择多个值；
  一般用于上传域和email类型的输入域。
  
  - 用于email域
    默认email域不支持输入多个email地址，用于email之后则允许输入多个逗号隔开的email地址
  - 用于file域 
    默认file类型只支持选择单个文件来上传，
    新增的multiple属性可以使它一次性选择多个文件。
  
- 代码示例
  
  ```
  <form action="">
  	email域： <input type="email" name="testemail" multiple>
  	文件域： <input type="file" name="testfile" multiple>
  	<input type="submit" value="提交">
  </form>
  ```

### form 属性

- 作用：规定输入域所属的表单

- 语法：

  - form 属性必须引用所属表单的 id
  - 引用一个以上的表单，请使用空格分隔的列表
  
- 代码示例

  ```
  <form action="#" id="form1">
      <input type="text" name="username"/>
  </form>
  
  <input type="text" form="form1">
  ```

# 新增的多媒体元素

## 视频

### 标签

```
 <video src="video/movie.mp4">
    您的浏览器已out,不支持欣赏小音乐
</video>
```

#### 标签兼容

video元素在ie9以下不支持

  允许在开始和结束中间放置内容，用于在不支持的浏览器显示

![](video.png)

### 属性

- src="" 音频资源地址
- controls 显示播放、暂停控件
- loop 循环播放
- muted 静音
- autoplay 自动播放
- width="500"   height="1000" 宽高只指定一个，另一个按原比例等比缩放，（播放控件的大小）
- poster = " 视频封面"

- 代码示例

```
 <video src="video/movie.mp4" controls loop muted width="500" poster="video/pic.png">
    您的浏览器已out,不支持欣赏小音乐
</video>
```

### 支持的视频格式

 MP4：
         支持的浏览器: Chrome、Firefox、opera25+、Safari、IE9+
Ogg：  
         支持的浏览器：Chrome、Firefox、Opera、
 WebM：
	     支持的浏览器:Chrome、Firefox、Opera、Edge

### source标签 

```
  <video controls loop autoplay>
        <source src="audio/butterfly.ogg" type="audio/ogg">
        <source src="audio/movie.mp4" type="audio/mpeg">
        <source src="audio/PPAP.webm" type=" audio/wav">
        您的浏览器已out,不支持欣赏小音乐
  </video>
```

- 允许使用source标签 引入多个音频资源
- 浏览器会播放第一个可识别的格式

## 音频

### 标签

```
 <audio src="audio/hanmai.mp3"></audio>
```

#### 兼容

audio元素在ie9以下不支持

  允许在开始和结束中间放置内容，用于在不支持的浏览器显示

![](audio.png)

```
<audio src="audio/hanmai.mp3" controls loop  autoplay>
    您的浏览器已out,不支持欣赏小音乐
</audio>

  <audio  controls  autoplay>
        <source src="./a.wav">
        <source src="./a.mp3">
        <source src="./a.ogg">
        您的浏览器不支持音频播放！
  </audio>
```

### 属性

- src="" 音频资源地址
- controls 显示播放、暂停控件
- loop 循环播放
- muted 静音
- autoplay 自动播放

### 支持的音频格式

MP3	    audio/mpeg	    支持的浏览器: chrome6+、 firefox3.6+  safari5+、 opera10+、IE9+
Wav	    audio/wav	       支持的浏览器: chrome6+、 firefox3.6+、  safari5+ 、opera10+
Ogg	    audio/ogg	       支持的浏览器:  chrome6+、 firefox3.6+ 、 opera10+

# css3

## 学习目标

- 能够说出CSS3有哪些新特性
- 能够利用新增的选择器解决实际布局问题
- 熟练使用CSS圆角、投影、box-sizing、background-size属性
- 掌握iconfont的原理及应用

## CSS3概述

CSS3是CSS（层叠样式表）技术的升级版本，最新的 CSS 标准。
在CSS2.1的基础上增加了很多强大的新功能，以帮助开发人员解决一些问题，例如圆角、多背景、透明度、阴影等。
CSS2.1是单一的规范，而CSS3被划分成几个模块组，每个模块组都有自己的规范。这样的好处是整个CSS3的规范发布不会因为某部分而影响其他模块的推进。

CSS3按模块化进行了全新设计，主要的 CSS3 模块：包括:选择器、框模型、背景和边框、文本效果、2D/3D 转换、动画、多列布局、用户界面

### 现状

现代浏览器已经实现了相当多的 CSS3 属性,CSS3将完全向后兼容

#### 浏览器的私有前缀

概述：CSS3的浏览器私有属性前缀是一些浏览器生产商经常使用的一种方式，用于对新属性的提前支持，暗示该CSS属性或规则尚未成为W3C标准的一部分。当一个属性成为标准，并且被Firefox、Chrome等浏览器的最新版普遍兼容的时候我们可以去掉前缀。

==私有属性为了是让当时的浏览器提前支持未被纳入标准的属性==

各个主流浏览器的私有前缀

- WebKit内核	-webkit-	   Chrome、Safari
- Gecko内核	-moz-	      火狐浏览器
- Presto内核	 -o-	           Opera(欧朋)
- Trident内核	 -ms-         	IE
- 内核		 私有前缀	          浏览器

```
自动前缀插件：autoprefixer

-webkit-box-orient:vertical;

pc端:
display:-webkit-flex;//私有属性
display:-moz-flex;//私有属性
display:-ms-flex;//私有属性
display:-o-flex;//私有属性
display:flex; //标准属性

移动端:
display:-webkit-flex;//私有属性
display:flex;//标准属性
```

## CSS3新增选择器

学习目标

- 能够说出CSS3新增了哪些选择器
- 能够使用新增的选择器解决实际布局问题

### 属性选择器

通过元素属性和属性值选择元素

#### CSS3新增的属性选择器

- [attr^=value] 选择指定属性名且属性值【以value开头】的每个元素
- [attr=value] 选择带有指定属性名且属性值【以value开头】所有元素
- [attr*=value] 选择指定属性名且属性值【包含value】的每个元素

- 典型应用场景

#### 兼容性

![image-20210414160832297](image-20210414160832297.png)

#### 常用属性选择器列表：

![image-20210414161100157](image-20210414161100157.png)



### 结构性伪类选择器

通过结构关系选择元素

#### css3 新增的结构性伪类

:last-child 选择器：匹配属于其父元素的最后一个子元素的每个元素
:nth-child( n ) 选择器：匹配属于其父元素的第 n 个子元素
:nth-last-child( n ) 选择器：匹配属于其元素的倒数第 n 个子元素的每个元素

:first-of-type(n) 选择其父元素的特定类型的首个子元素的每个元素
:last-of-type(n) 选择其父元素的特定类型的最后一个子元素的每个元素。
:nth-of-type(n)：选择器匹配属于父元素的特定类型的第n 个子元素。
:nth-last-of-type(n)：选择器匹配属于父元素的特定类型的倒数第 n 个子元素的每个元素

- 说明

  - n 可以是数字、关键词或公式
  - 关键词

    - odd(偶数，even奇数)

  - 公式

    - (an + b)，(an - b)
    - 表示周期的长度，n 是计数器（从 0 开始），b 是偏移值

#### 总结child一组与of-type一组的区别

- nth-child强调结构 关系，优先确定是否是父元素的子元素，在其中找第几个
- nth-of-type强调类型，选择父元素中指定类型中的第几个

#### 兼容性

![image-20210414161526334](image-20210414161526334.png)

#### 常用结构性伪类选择器列表

![image-20210414161757759](image-20210414161757759.png)一组的区别