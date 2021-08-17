2.x

## 一、课程介绍

1.html+css 画静态页面

2.js jq ajax交互[ 与用户交互  与后端的交互 ]

3.node[服务端语言  ：后端]

用户<—js事件——>html+css    < —ajax—>     node(java)     <—>    mysql(数据库)

4.vue :JS框架  目的：简单    简化js 效率   

react 




## 二、Vue

### 1.vue初探

##### 官网：https://cn.vuejs.org/

##### 介绍：

vue是渐进式 JavaScript 框架

渐进式 ：主张最少。  核心很小，需要什么，安装什么

五大块:  指令  组件 路由  状态管理  ui库和第三方插件

##### 优点：   

```
1.轻量级的数据框架
2.双向数据绑定
3.提供了指令
4.组件化开发
5.客户端路由
6.状态管理
```

##### 缺点：

```
1.Vue 底层基于 Object.defineProperty 实现响应式，而这个 api 本身不支持 IE8 及以下浏 览器，所以Vue不支持IE8及其以下浏览器；
2.Vue 打造的是SPA，所以不利于搜索引擎优化(SEO)；
3.由于 CSR的先天不足，导致首屏加载时间长，有可能会出现闪屏。
```

##### 核心：

```
数据驱动 组件系统   jquery  事件驱动
```

##### MVVM：

```js
M-model模型
V-view视图
VM-viewModel 视图模型
模型（model）通过了视图模型  决定了视图(view)
视图(view)  通过视图模型 修改模型 (model) 
视图模型是模型和视图之间的桥梁。
```



##### SPA：

single page application  单页面应用

```
优点：加载快，用户体验好

缺点：不利于SEO,首屏加载时间长

a页面—>index.html/#/a

b页面—>index.html/#/b
```

##### MPA:

多页面应用

```
优点：有利于SEO

缺点：会有白屏，用户体验不好

a页面—>a.html

b页面—>b.html
```



##### 安装：

```vue
1.cdn [不推荐]
 <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

2.下载vue.js [不推荐]

3.npm  [推荐]
	npm init
	npm i vue 

4.脚手架[做项目]
```

##### 引用：

```vue
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="./vue.js"></script>
<script src="./node_modules/vue/dist/vue.js"></script>
```

### 2.vue实例

#### 1.如何用？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 1.引入 -->
    <script src="./vue.js"></script>
</head>
<body>
    <!-- 2.作用范围 -->
    <div id="app">
        <div>{{1+1}}</div>
        <div>{{2+2}}</div>
    </div> 

    <script>
        // 3.实例化vue
        new Vue({
            el:"#app"
        })
    </script>
</body>
</html>
```

#### 2.el

```js
new Vue({
            //挂载点  mount-挂载
            //1.一个vue对象只能作用在1个节点上，如果el有多个节点满足条件，也只作用在满足条件的第一个节点上。
            //2.Do not mount Vue to <html> or <body> - mount to normal elements instead.
                // 不要把vue挂到html|body上
            // 3.由于一个vue只能作用在一个节点上，所以一般使用id
            el:"#app"
        })
```

#### 3.data methods

```js
new Vue({
  //挂载点  mount-挂载
  el:"#app",
  //属性
  data:{
    a:1,
    b:false,
    c:"嘻嘻嘻",
    tel:"15727273030"
  },
  //方法
  methods:{
    fn1(){},
    fn2(){},
    fn3(){}
  }
})  
```

#### 4.{{}}  模板语法   差值表达式  mustache 

模板   template 

```html
<!-- {{}} 模板语法 ，{{}}外面html解析，{{}}里面 js解析 -->
<!-- {{}}只能写1句话 -->
<!-- {{}}非表单元素 eg:div、p、h1-h6 、ul li  ...  -->
<!-- 变量  -->
<div>{{c}}</div>
<!-- 方法 -->
<div>电话号是：{{tel.slice(0,3)}}****{{tel.slice(7)}}</div>
<!-- 表达式 -->
<div>{{b?'水杯':"电脑"}}</div>
```

### 3.指令

##### 非表单元素绑定数据

```
{{}}   优点：简单方便  缺点：会出现首屏闪屏问题
v-text 优点：可以解决首屏闪屏问题
v-html 优点：可以解析标签
```

##### 表单元素绑定数据

```vue
<input type="text" v-model="name">
```

##### 属性绑定-媒体元素

```vue
 <div id="app">
        <!-- v-bind: 属性绑定 简写 :  -->
        <!-- v-bind 不仅可以绑定已知属性，也可以绑定自定义属性 -->
        <img v-bind:src="img" alt="">
        <a v-bind:href="website.url">
            <img v-bind:src="website.logo" alt="">
        </a>

        <a :href="website.url">
            <img :src="website.logo" alt="">
        </a>
        <div a="1" b="2" :c="name">哈哈哈</div>
    </div>
    <script>
       
        
        new Vue({
            el: "#app", //挂载点  mount
            data: { //属性-数据
                name:"妲己",
                img:"https://img0.baidu.com/it/u=3026939796,485761977&fm=26&fmt=auto&gp=0.jpg",
                website:{
                    name:"淘宝",
                    url:"http://taobao.com",
                    logo:"http://gw.alicdn.com/tfs/TB176rg4VP7gK0jSZFjXXc5aXXa-286-118.png"
                }
            },
            methods: {}
        })
    </script>
```

##### 动态类名

```vue
<!-- 1. :class="[三元]" -->
<div class="movie">
  <!-- 0-blue 1-lime 2-blue 3-lime 4-blue 5-lime -->
  <div class="movie-item" v-for="(item,index) in movie"
       :class="[index%2==0?'blue':'lime']"
       >
    <img :src="item.img" alt="">
    <div>{{item.name}}</div>
    <div>评分：{{item.rate}}</div>
  </div>
</div>
<hr>

<!-- 2.:class="{类名1:true,类名2:false,... }" true就会有该类名，false就会没有 -->
<div class="movie">
  <!-- 0-blue 1-lime 2-orange 3-blue 4-lime 5-orange
blue:index%3==0
lime:index%3==1
orange:index%3==2
-->
  <div class="movie-item" v-for="(item,index) in movie"
       :class="{blue:index%3==0,lime:index%3==1,orange:index%3==2}"
       >
    <img :src="item.img" alt="">
    <div>{{item.name}}</div>
    <div>评分：{{item.rate}}</div>
  </div>
</div>
```



##### 一次性绑定

v-once

```vue
<!-- 一次性数据绑定 -->
<div v-once>{{name}}</div>
```

##### 事件绑定

```vue
<div id="app">
  <div>{{name}}</div>
  <!-- 事件绑定 v-on:事件名称="方法" -->
  <button v-on:click="changeWang()">王昭君</button>
  <button v-on:click="changeName('貂蝉')">貂蝉</button>
  <button v-on:click="changeName('宫本')">宫本</button>
  <button v-on:click="changeName('鲁班')">鲁班</button>
</div>
<script>
  new Vue({
    el: "#app",
    data: {
      name: "妲己"
    },
    methods: {
      changeWang() {
        this.name = "王昭君";
      },
      changeName(name) {
        this.name = name;
      }
    }
  })
</script>
```



##### 条件渲染

```
v-if VS v-show
相同点：true 就出现，false就消失。
不同点：v-if false采用的是惰性加载；v-show false采用的是display:none;
使用场景：频繁切换，建议使用v-show;如果不频繁切换，建议使用v-if.
```

v-else

```vue
<!-- v-else 需要和v-if紧挨着 -->
<div v-if="comments.length>0">评论是：{{comments}}</div>
<div v-else>暂无评论</div>
```



## 三、面试题

1.对于Vue是一套渐进式框架的理解。

2.请列出至少4个vue基本指令，并简要说明其作用。

3.v-show与v-if 有什么区别?

4.说说你对SPA的理解，它的优缺点分别是什么？

```
SPA：单页面应用。
优点:
	用户体验好、快，内容的改变不需要重新加载整个 页面，避免了不必要的跳转和重复渲染;
	基于上面一点， SPA 相对对服务器压力小;前后端职责分离，架构清晰， 前端进行交互逻辑，后端负责数据处理;
缺点:
	初次加载耗时多:为实现单页 Web 应用功能及显 示效果，需要在加载页面的时候将 JavaScript、CSS 统一 加载，	部分页面按需加载;
	前进后退路由管理:由于单页 应用在一个页面中显示所有的内容，所以不能使用浏览器 的前进后退功能，所有的页面切换需要自己建立堆栈管理;
	SEO 难度较大:由于所有的内容都在一个页面中动态 替换显示，所以在 SEO 上其有着天然的弱势。
```

5.单页面（SPA）和多页面（MPA）的区别？—不用背

|                   | 单页面（SPA）                                                | 多页面（MPA）                                |
| ----------------- | ------------------------------------------------------------ | -------------------------------------------- |
| 刷新方式          | 页面局部刷新或更改                                           | 整页刷新                                     |
| url 模式          | a.com/#/pageone a.com/#/pagetwo                              | a.com/pageone.html a.com/pagetwo.html        |
| 用户体验          | 页面片段间的切换快，用户体验良好                             | 页面切换加载缓慢，流畅度不够，用户体验比较差 |
| 转场动画          | 容易实现                                                     | 无法实现                                     |
| 数据传递          | 容易                                                         | 依赖 url传参、或者cookie 、localStorage等    |
| 搜索引擎优化(SEO) | 需要单独方案、实现较为困难、不利于SEO检索 ，可利用服务器端渲染(SSR)优化 | 实现方法简易                                 |
| 适用范围          | 高要求的体验度、追求界面流畅的应用                           | 适用于追求高度支持搜索引擎的应用             |
| 开发成本          | 较高，常需借助专业的框架                                     | 较低 ，但页面重复代码多                      |
| 维护成本          | 相对容易                                                     | 相对复杂                                     |

6.什么是MVVM模式？

```
M-model模型
V-view视图
VM-viewModel 视图模型
模型（model）通过了视图模型  决定了视图(view)
视图(view)  通过视图模型 修改模型 (model) 
视图模型是模型和视图之间的桥梁。
```

7.vue中 key 值的作用?

```
当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认 用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移 动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个 元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。
```

## 四、作业

1.练习 2遍；

2.作业文件夹中的2个作业实现；

3.查询下方知识

```
1.slice substring sustr的区别
2.arr.splice()
```

4.每日检测填写[第2天上课前填写]