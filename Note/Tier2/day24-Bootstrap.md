## Bootstrap

​	简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。

### 宗旨

​	有选择地复制粘贴，可以直接使用基本模板查看效果。

### 官网

​	https://www.bootcss.com/

### 下载地址

​	https://v3.bootcss.com/

### 包含内容

- 基本页面结构
- CSS样式
- 组件
- js开发插件

### 入门

​	进入官网，点击入门可以看到bootstrap的使用方法

#### 引入

​	Bootstrap 插件全部依赖 jQuery，因此 jQuery 必须在 Bootstrap 之前引入。

##### 	CDN引入

​	官网给提供了bootstrap的CDN，直接赋值就好

```html
<!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- 请注意，Bootstrap 的所有 JavaScript 插件都依赖 jQuery，因此 jQuery 必须在 Bootstrap 之前引入 -->
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
```

##### 	本地引入

​	官网下载bootstrap文件包，打开目录结构可以看见有这些文件：

```js
bootstrap/
├── css/	//需要引入bootstrap.css或者bootstrap.min.css
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   └── bootstrap-theme.min.css.map
├── js/		//需要引入bootstrap.js或者bootstrap.min.js
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/		//不需要引入
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2
```

```html
<link rel="stylesheet" href="./bootstrap-3.4.1-dist/css/bootstrap.css">
<!-- 在引入js文件之前引jQuery -->
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
<script src="./bootstrap-3.4.1-dist/js/bootstrap.js"></script>
```

#### 使用

​	Bootstrap 需要为页面内容和栅格系统包裹一个 `.container` 容器。我们提供了两个作此用处的类。注意，由于 padding 等属性的原因，这两种 容器类不能互相嵌套。

##### 	流式布局

​	类用于 100% 宽度，占据全部视口（viewport）的容器。

```html
<div class="container-fluid">
    这是一个流式布局
</div>
```

##### 	固定布局

​	类用于固定宽度并支持响应式布局的容器。

```html
<div class="container">
    这是一个固定布局
</div>
```

### 移动设备优先

​	在 Bootstrap 2 中，我们对框架中的某些关键部分增加了对移动设备友好的样式。而在 Bootstrap 3 中，我们重写了整个框架，使其一开始就是对移动设备友好的。这次不是简单的增加一些可选的针对移动设备的样式，而是直接融合进了框架的内核中。也就是说，**Bootstrap 是移动设备优先的**。针对移动设备的样式融合进了框架的每个角落，而不是增加一个额外的文件。

​	在移动设备浏览器上，通过为视口（viewport）设置 meta 属性为 `user-scalable=no` 可以禁用其缩放（zooming）功能。这样禁用缩放功能后，用户只能滚动屏幕，就能让你的网站看上去更像原生应用的感觉。注意，这种方式我们并不推荐所有网站使用，还是要看你自己的情况而定！

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

### 全局CSS样式

#### 栅格布局

​	每行进行了12等份，可以更改col-md-1这种类名，来确定当前这个块需要占几份；我们可以使用-xs-超小屏幕 -sm-小屏幕 -md- 中等屏幕 -lg-大屏幕 这种类名来写屏幕尺寸变化时的样式布局；

```html
<div class="row">
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
</div>
<div class="row">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```

#### 表单

- 可以根据布局要求，手动设置表单宽度
- 一定要使用label标签

```html
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
```

#### 图片形状

​	可以通过更改类名，更改图片的样式

```js
<img src="./img/1.jpg" alt="..." class="img-rounded">
<img src="./img/1.jpg" alt="..." class="img-circle">
<img src="./img/1.jpg" alt="..." class="img-thumbnail">
```

### 组件

#### 字体图标

​	在组件中，包括 250 多个来自 Glyphicon Halflings 的字体图标，如果需要使用字体图标，直接复制类名使用即可；

```html
<div class="container">
    <div class="glyphicon glyphicon-heart" style="color: hotpink;"></div>
    <span class="glyphicon glyphicon-thumbs-up"></span>
</div>
```

#### 导航条

```html
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">首页</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                        aria-haspopup="true" aria-expanded="false">课程分类<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Java</a></li>
                        <li><a href="#">JavaScript</a></li>
                        <li><a href="#">C语言</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">数据结构</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">大数据</a></li>
                    </ul>
                </li>
            </ul>
            <form class="navbar-form navbar-left">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <span class="glyphicon glyphicon-heart"></span>
                <button type="submit" class="btn btn-default">搜索</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                        aria-haspopup="true" aria-expanded="false">课程分类 <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Java</a></li>
                        <li><a href="#">JavaScript</a></li>
                        <li><a href="#">C语言</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">数据结构</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
```

#### 反色导航条

​	通过添加 `.navbar-inverse` 类可以改变导航条的外观。

```html
<nav class="navbar navbar-inverse">
  ...
</nav>
```

### JavaScript插件

#### 模态框

```html
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div class="modal-body">
                <input type="text" value="你好，世界" style="border:none;outline:none">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
```

​	模态框的事件：

```js
$('#myModal').modal({
    "show":true,
    "keyboard":false
})

// 让模态框显示
$('#show').click(function(){
    $('#myModal').modal('show');
});
// 模态框显示后执行的操作
$('#myModal').on('show.bs.modal', function(){
    console.log('模态框已经显示');
});

// 模态框显示以后触发事件
$('#myModal').on('shown.bs.modal', function(){
    console.log('模态框动画显示完成');
});

// 模态框隐藏触发事件
$('#myModal').on('hide.bs.modal', function(){
    console.log('模态框隐藏');
});

// 模态框隐藏完成后触发事件
$('#myModal').on('hidden.bs.modal', function(){
    console.log('模态框动画隐藏完成');
});

// 模态框请求完成数据后触发事件
$('#myModal').on('loaded.bs.modal', function(){
    console.log('数据请求完成');
});
```

#### 下拉菜单

```js
<div class="container">
<div class="dropdown">
    <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown trigger
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dLabel">
        <li>北京</li>
        <li>上海</li>
    </ul>
</div>
</div>
```

​	下拉菜单事件：

```js
$('.dropdown').on('show.bs.dropdown', function () {
    console.log("1111")
})

$('.dropdown').on('hide.bs.dropdown', function () {
    console.log("我自闭了")
})
```

#### 标签页

```html
<div>

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab"
                data-toggle="tab">首页</a></li>
        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">课程详情</a>
        </li>
        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab"
                data-toggle="tab">Messages</a></li>
        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab"
                data-toggle="tab">Settings</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane fade in" id="home">JavaScript是解释型、面向对象的、基于事件驱动的、相对安全的客户端脚本语言</div>
        <div role="tabpanel" class="tab-pane fade" id="profile">我们提供了多门计算机课程</div>
        <div role="tabpanel" class="tab-pane fade" id="messages">...</div>
        <div role="tabpanel" class="tab-pane fade" id="settings">...</div>
    </div>

</div>
```

​	标签页事件：

```js
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    console.log(e.target);
})
$('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
    console.log("上一个选项卡已经隐藏");
})
```

#### 轮播图

```html
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <img src="./img/imgs/t1.png" alt="...">
            <div class="carousel-caption">
                第1张
            </div>
        </div>
        <div class="item">
            <img src="./img/imgs/t2.png" alt="...">
            <div class="carousel-caption">
                第2张
            </div>
        </div>
        <div class="item">
            <img src="./img/imgs/t3.png" alt="...">
            <div class="carousel-caption">
                第3张
            </div>
        </div>
        <div class="item">
            <img src="./img/imgs/t4.png" alt="...">
            <div class="carousel-caption">
                第4张
            </div>
        </div>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
```

​	轮播图事件和方法：

```js
$('.carousel').carousel({
    "interval": 1000,
    "pause": null,
    "wrap": false
})
$('#carousel-example-generic').on('slide.bs.carousel', function () {
    console.log("开始")//开始的时候执行
})

$('#carousel-example-generic').on('slid.bs.carousel', function () {
    console.log("结束")//每滑过一张都会触发
})
```

