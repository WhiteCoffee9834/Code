```js
/*
*@ 初识小程序、目录结构、项目配置、场景值、逻辑层、基础语法
*@ 朱银娟
*@ time  2021/09/22
**/
```

# 一、阶段概述

## 1.课程安排

```
总课时:15课时
微信小程序:5课时
uni-app:5课时
数据可视化:4课时
阶段答辩:1课时
```

## 2.项目展示

```
小u商城项目
数据可视化项目
```

## 3.阶段目标

```js
1、培养学员能力独立完成小程序原生开发
2、培养学员能够独立完成使用uni-app多端框架进行宽平台开发，同时掌握与服务端配合工作的能力
3、培养学员能力独立查看手册，完成自我提升的能力
4、学员能够掌握数据可视化的原理，能够独立完成数据可视化图表的开发
```

## 4.学习方法

```
1.多练习，每天按时完成作业及课堂代码练习
2.保存好课堂笔记，多背诵
3.多参考官方手册
4.多横向对比，对比vue语法，对比react语法，记忆力更深刻，理解起来更容易
```

# 二、微信开发简介

## 1.微信开发概述

**概述**

（1）微信开发即微信公众平台开发，将企业信息、服务、活动等内容通过微信网页的方式进行表现，用户通过简单的设置，就能生成微信网站。
（2）通俗的说，就是微信对外提供了例如聊天、支付、分享、收藏等功能，同时还提供了丰富的封装好的接口，开发者利用这些接口和功能，写入程序中，进行的开发。

**目的**

（1）企业开发的需要,使自己更加符合企业发展的需求
（2）个人的发展以及技能的提升
（3）发展前景大、生态系统丰富

**平台**

（1）微信开放平台
（2）微信公众平台

## 2.微信开放平台

**概述**

微信开放平台是微信对外提供微信开发接口的一个平台，这些开发出来的微信接口，供第三方的网站或App使用,使用户可将第三方程序的内容发布给好友或分享至朋友圈，第三方内容借助微信平台获得更广泛的传播。

平台地址：https://open.weixin.qq.com/

**微信开放平台提供的能力**

微信分享、 微信支付、 微信登录、微信收藏、微信分享等等

**产品应用**

(1)网站应用开发
(2)移动应用开发
(3)第三方平台开发
(4)公众帐号开发

**只有通过 开发者资质认证后，才能使用开发平台提供的能力**

## 3.微信公众平台

### 3.1微信公众平台概述

官网网址:https://mp.weixin.qq.com/

```
微信公众平台简称公众号  是开发者通过公众号向用户提供咨询和服务的平台
```

### 3.2账号分类

```
订阅号
服务号
小程序(小游戏)
企业微信
```

## 4.开放平台和公众平台的区别

```
1.开放平台
	(1)微信对外开放接口的平台
	(2) 开放的接口,供其他网站及App使用
	(3)后端程序员是开放平台开发的主力军
2.公众平台
	(1) 基于微信公众号，为微信用户提供服务的平台
	(2) 所用公众号，都属于微信内开发
	(3)前端程序员是公众平台开发的主力军
```

# 三、认识小程序

## 1.小程序概述

```
小程序是一种新的开放能力，开发者可以快速地开发一个小程序。小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。
微信小程序，小程序的一种，英文名Wechat Mini Program，是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或搜一下即可打开应用。
```

## 2.应用场景

```
适合
	小型项目
不适合
	大型项目
```

## 3.亮点与不足（面试题）

```
优点
1.不需要下载即可安装使用的应用
2.开启速度还有运行速度比较快
3.入门门槛低(HTML+CSS+JS)
缺点
1.源码包不能超过2M（分包技术可以扩大到20M）
2.上线不能随时随地，需要微信团队进行审核（1-7个工作日，每年有一次加急的机会）
3.暂时不能分享朋友圈
```

# 四、注册小程序账号

## 1.小程序账号注册流程

注册流程https://developers.weixin.qq.com/miniprogram/introduction/#%E6%B3%A8%E5%86%8C%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%B8%90%E5%8F%B7

```
1.点击官网网址中的立即注册链接
2.选择账号类型---小程序
3.填写邮箱地址，密码 确认密码  验证码 点击同意协议
4.登录邮箱 激活链接
5.选择主体类型---个人
6.填写管理员信息，扫描二维码进行填写信息
```

## 2.小程序信息完善

服务类目https://developers.weixin.qq.com/miniprogram/product/material/

```
填写小程序名称  小程序简称  头像  介绍  服务类目（不能选择小游戏）
```

# 五、微信开发者工具及工程创建

首先小程序开发不同于普通的网页开发，项目不能运行在浏览器中，所以无法查看编程效果以及调试，微信开发者工具提供了代码的编程能力，调试能力以及展示运行效果能力等强大的功能

## 1.工具下载安装

```
https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html
```

## 2.工程创建

```
1.扫描登录微信开发工具
2.选择小程序
3.点击+号
4.填写项目目录  appid 选择默认模板
5.点击创建即可
```

<img src="QQ截图20210922103032-16322789743501.png" alt="QQ截图20210922103032" style="zoom:25%;" />

## 3.工具常用功能使用

```
菜单栏
工具栏
模拟器
目录树
代码区
控制台
```

# 六、工程目录

https://developers.weixin.qq.com/miniprogram/dev/framework/structure.html

## 目录结构

```js
主体文件  名字不能随便更改
app.js  入口文件 主逻辑文件  不能缺少
app.json 全局配置文件  配置页面路径 导航条 底部tab 不能缺少
app.wxss 全局样式文件 wxss = wx+css 
其他文件
project.config.json  项目对开发的个性化配置文件
sitemap.json  站点地图
pages  页面目录
	index
		index.js    压面的逻辑文件
		index.json  页面的配置文件
		index.wxss 	页面的样式文件
		index.wxml  页面结构文件
utils  工具
common
components 自定义组件
```

# 七、小程序配置

## 1.全局配置app.json

小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置。文件内容为一个 JSON 对象

小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。

## pages

用于指定小程序由哪些页面组成，每一项都对应一个页面的 路径（含文件名） 信息。文件名不需要写文件后缀，框架会自动去寻找对应位置的 `.json`, `.js`, `.wxml`, `.wxss` 四个文件进行处理。

未指定 `entryPagePath` 时，数组的第一项代表小程序的初始页面（首页）。

创建页面文件

第一种方法

```js
直接在app.json文件中的pages配置项中添加页面路径
"pages":[
    "pages/cart/cart",
    "pages/index/index",
    "pages/logs/logs"
  ],
```

第二种方法

```js
1.在pages目录中右击创建页面目录
2.在该页面目录上右击选择新建page
```

创建页面的注意事项

1. 不能以. 或者/ 开头
2. json文件不允许加注释语句
3. 每个配置项之间用逗号隔开，但是最后一项不允许加逗号

## entryPagePath

指定小程序的启动页面  如果不填，将默认为 `pages` 列表的第一项。不支持带页面路径参数。

```js
"entryPagePath": "pages/index/index",
```

## window

用于设置小程序的状态栏、导航条、标题、窗口背景色。

```json
"window": {
    "backgroundTextStyle": "dark", //下拉loading的动画样式  light/dark
    "navigationBarBackgroundColor": "#f00", //导航栏的背景颜色 只支持Hexcolor
    "navigationBarTitleText": "第一个小程序", //导航栏的标题文字 超过一定宽度会显示省略号
    "navigationBarTextStyle": "white",//导航栏的标配文字样式 只支持black/white，
    "backgroundColor": "#00f",//下拉刷新的颜色
    "enablePullDownRefresh": true, //是否开启全局的下拉刷新
    "navigationStyle": "custom"//设置导航栏的样式  default/cutsom自定义
  },
```

tabbar

如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。

```js
 "tabBar": {
    "color": "#00f", //tab上的文本颜色
    "selectedColor": "#f00", //被选中tab上的文本颜色
    "backgroundColor": "#fff", //tabbar栏的背景色
    "borderStyle": "white", //边框样式  white/black
    "position": "top",//tabbar栏的位置
    "list": [
      {
        "pagePath": "pages/index/index", //页面路径
        "text": "首页", //tab上的文字
        "iconPath": "./imgs/index.png", //图标路径
        "selectedIconPath": "./imgs/indexFull.png" //被选中的图标路径
      },
      {
        "pagePath": "pages/classify/classify",
        "text": "分类",
        "iconPath": "./imgs/star.png",
        "selectedIconPath": "./imgs/starFull.png"
      },
      {
        "pagePath": "pages/cart/cart",
        "text": "购物车",
        "iconPath": "./imgs/cart.png",
        "selectedIconPath": "./imgs/cartFull.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "./imgs/my.png",
        "selectedIconPath": "./imgs/myFull.png"
      }
    ]
  },
```

注意事项

1. list数组项至少2个  最多5个
2. pagePath页面路径也不能以 / 或者.开头
3. icon不能是网络图片
4. icon图表大小限制为40kb,建议尺寸81*81
5. 当position设置为top的时候  icon将不显示

## 2.页面配置page.json

每一个小程序页面也可以使用 `.json` 文件来对本页面的窗口表现进行配置。页面中配置项在当前页面会覆盖 `app.json` 的 `window` 中相同的配置项。文件内容为一个 JSON 对象

```
{
  "navigationBarTitleText":"购物车",
  "navigationBarBackgroundColor":"#0f0",
  "disableScroll": true
 }
```

==注意：页面配置比全局配置优先级要高==

# 八、场景值

## 1.场景值概述

```
场景值用来描述用户如何进行小程序的路径，通俗来说，就是判断用户如何进入小程序的 
	
	
```

## 2.使用场景

```
KFC
	店内就餐
		进入小程序的主页面
	扫描二维码
		进入小程序中的专题宣传活动页面
```

## 3.获取场景值

```js
// app.js
App({
  // 小程序初始化完成所触发的生命周期
  onLaunch(e){
    // 第一种方法
    console.log(e)
    if(e.scene==1011){
      console.log("专题活动页面")
      // 跳转页面
    }else if(e.scene==1001){
      console.log("主页面")
      // 跳转主页面
    }else{

    }
  },
  // 小程序第一次加载或者切换前台页面的时候
  onShow(e){
    // 第二种方式
    console.log(e)
    // 第三种方式
    let info = wx.getLaunchOptionsSync()
    console.log(info)

  }

 
})

```

# 十、小程序逻辑层

## 1.逻辑层概述 

https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/

```
小程序开发框架的逻辑层使用 JavaScript 引擎为小程序提供开发者 JavaScript 代码的运行环境以及微信小程序的特有功能。

逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈。

开发者写的所有代码最终将会打包成一份 JavaScript 文件，并在小程序启动的时候运行，直到小程序销毁。这一行为类似 ServiceWorker，所以逻辑层也称之为 App Service。

在 JavaScript 的基础上，我们增加了一些功能，以方便小程序的开发：
增加 App 和 Page 方法，进行程序注册和页面注册。
增加 getApp 和 getCurrentPages 方法，分别用来获取 App 实例和当前页面栈。
提供丰富的 API，如微信用户数据，扫一扫，支付等微信特有能力。
提供模块化能力，每个页面有独立的作用域。
```

**注意：小程序框架的逻辑层并非运行在浏览器中，因此 `JavaScript` 在 web 中一些能力都无法使用，如 `window`，`document` 等。**

## 2.小程序注册App() 

注册小程序。接受一个 `Object` 参数，其指定小程序的生命周期回调等。

**App() 必须在 `app.js` 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。**

```
App({

})
```

小程序的生命周期

```js
App({
  // 生命周期
  //小程序初始化完成时触发，全局只触发一次。
  onLaunch(){
    console.log("onLaunch")
  },
  // 小程序第一次加载或者切换前台页面的时候
  onShow(){
    console.log("onShow")
    let info = wx.getLaunchOptionsSync()
  },
  // 小程序从前台切换后台的时候触发
  onHide(){
    console.log("onHide")
  },
})
```

小程序的监听函数

```js
  // 小程序监听函数  
  // 小程序发生脚本错误或 API 调用报错时触发
  onError(error){
    console.log("错误",error)
  },
  // 当小程序页面找不到的时候触发
  onPageNotFound(){
    console.log("找不到页面")
  } 
```

any变量和函数

1.定义any变量和方法   app.js

```js
 // 普通的函数
  say(){
       return this.userInfo.name +  "正在说话"
  },
  // 定义全局变量
  userInfo:{
     name:"zs"
  }
```

2.获取变量和方法

```js
在app.js中如何获取
	通过this就可以获取到变量和方法
在其他页面如何获取
   let app = getApp()

```

## 3.页面注册Page()

```
Page({

})
```

页面的生命周期

```js
// index.js
let app = getApp()
console.log(app)
console.log(app.userInfo.name)
console.log(app.say())
Page({
  // 页面的初始化数据
  data:{
      msg:"文本内容",
      num:0
  },
  // 页面的生命周期
  // 页面初始化成功的时候触发  只触发一次
  onLoad(){
    console.log("onLoad")
    // 跳转a页面 重定向页面  卸载当前页面
    // wx.redirectTo({
    //   url: '../a/a',
    // })
    // 普通的跳转  关闭当前页面
    // wx.navigateTo({
    //   url: '../a/a',
    // })
  },
   //页面显示/切入前台时触发。
  onShow(){
    console.log("页面的onShow")
  },
  //页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
  onReady(){
    console.log("页面的onReady")
  },
  //页面隐藏/切入后台时触发。
  onHide(){
    console.log("页面的onhide")
  },
  //页面卸载时触发。如wx.redirectTo跳转
  onUnload(){
    console.log("页面的onunLoad")
  },
})
```

页面的监听函数

```js
// 页面的监听函数 
  // 下拉刷新   使用场景：重新请求数据
  onPullDownRefresh(){
    console.log("事件下拉")
    // 获取data中的值
    console.log(this.data.num)
    // 修改data中的值，不能更改视图
    this.data.num++
    console.log(this.data.num)
    // 修改data中的值  可以更改视图
    this.setData({
      num:this.data.num
    })

    // 手动关闭下拉刷新
    setTimeout(()=>{
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    },3000)
  },
  // 上拉触底   使用场景 上拉加载更多数据
  onReachBottom(){
    console.log("上拉触底")
  },
  // 分享朋友和朋友圈   了解
  onShareTimeline(){

  },
  onShareAppMessage(){

  }
```

## 4.模块化

可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。

```
let baseUrl = "https://localhost:3000"
// commonjs规范
// module.exports = {
//   baseUrl
// }
// es6的规范
export default {
  baseUrl
}
```

commonjs规范的引入

```js
let a  = require("路径")
```

es6的引入

```js
import b from "路径"
```

# 十一、基础语法

## 1.基础组件

# 基础组件

框架为开发者提供了一系列基础组件，开发者可以通过组合这些基础组件进行快速开发。详细介绍请参考[组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/)。

什么是组件：

- 组件是视图层的基本组成单元。
- 组件自带一些功能与微信风格一致的样式。
- 一个组件通常包括 `开始标签` 和 `结束标签`，`属性` 用来修饰这个组件，`内容` 在两个标签之内。

```html
<tagname property="value">
Content goes here ...
</tagname>
```

**注意：所有组件与属性都是小写，以连字符`-`连接**

==属性类型==

| 类型         | 描述           | 注解                                                         |
| :----------- | :------------- | :----------------------------------------------------------- |
| Boolean      | 布尔值         | 组件写上该属性，不管是什么值都被当作 `true`；只有组件上没有该属性时，属性值才为`false`。 如果属性值为变量，变量的值会被转换为Boolean类型 |
| Number       | 数字           | `1`, `2.5`                                                   |
| String       | 字符串         | `"string"`                                                   |
| Array        | 数组           | `[ 1, "string" ]`                                            |
| Object       | 对象           | `{ key: value }`                                             |
| EventHandler | 事件处理函数名 | `"handlerName"` 是 [Page](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html) 中定义的事件处理函数名 |
| Any          | 任意属性       |                                                              |

==公共属性==

所有组件都有以下属性：

| 属性名         | 类型         | 描述           | 注解                                                         |
| :------------- | :----------- | :------------- | :----------------------------------------------------------- |
| id             | String       | 组件的唯一标示 | 保持整个页面唯一                                             |
| class          | String       | 组件的样式类   | 在对应的 WXSS 中定义的样式类                                 |
| style          | String       | 组件的内联样式 | 可以动态设置的内联样式                                       |
| hidden         | Boolean      | 组件是否显示   | 所有组件默认显示                                             |
| data-*         | Any          | 自定义属性     | 组件上触发的事件时，会发送给事件处理函数                     |
| bind* / catch* | EventHandler | 组件的事件     | 详见[事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html) |

==特殊属性==

几乎所有组件都有各自定义的属性，可以对该组件的功能或样式进行修饰，请参考各个[组件](https://developers.weixin.qq.com/miniprogram/dev/component/)的定义。

# view  

相当于div

```html
<!-- view  视图容器
    hover-class  指定按下去的样式类
    hover-start-time 按住后多久出现点击态，单位毫秒
    hover-stay-time  手指松开后点击态保留时间
    hover-stop-propagation 指定是否阻止本节点的祖先节点出现点击态
 -->
<view class="box" hover-class="wrap" hover-start-time="1000" hover-stay-time="3000"></view>

<view class="father" hover-class="out">
    <view class="child" hover-class="inner" hover-stop-propagation="{{true}}"></view>
</view>
```

# 十二、课后作业

```
1.11.1基础作业
(1)当天课上代码至少练习1遍
(2)根据全局配置和页面配置进行页面设置，完成基础作业2动态图效果
```



