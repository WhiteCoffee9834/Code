## 1.react介绍

### 1.1简介

```
React 是Facebook内部的一个JavaScript类库。
React 可用于创建Web用户交互界面。
React不是一个完整的MVC框架,最多可以认为是MVC中的V（View）,甚至React并不非常认可MVC开发模式。
React 的设计思想极其独特,属于革命性创新,性能出众,代码逻辑却非常简单。
React 引入了虚拟DOM（Virtual DOM）的机制。
React 引入了组件化的思想。
React 使用Facebook专门为其开发的一套语法糖--JSX。
```

### 1.2优缺点

#### 优点：

```
● React速度很快
react并不直接对DOM进行操作，引入了一个叫做虚拟DOM的概念，安插在javascript逻辑和实际的DOM之间，性能好。
● 跨浏览器兼容
虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。
● 一切皆是组件
代码更加模块化，重用代码更容易，可维护性高。
● 单向数据流
Flux是一个用于在JavaScript应用中创建单向数据层的架构，它随着React视图库的开发而被Facebook概念化。
● 同构、纯粹的javascript
因为搜索引擎的爬虫程序依赖的是服务端响应而不是JavaScript的执行，预渲染你的应用有助于搜索引擎优化。
● 兼容性好
比如使用RequireJS来加载和打包，而Browserify和Webpack适用于构建大型应用。它们使得那些艰难的任务不再让人望而生畏。
```

#### 缺点：

```
React不适合做一个完成的框架。
React本身只是一个V而已，并不是一个完整的框架，所以如果是大型项目想要一套完整的框架的话，基本都需要加上ReactRouter和redux(mobx)才能写大型应用。
```

### 1.3 react 解决了什么问题？

```js
1.在组件化方面，react天生组件化，这是React的核心，除了能够在团队内部积累业务组件以外，也能找到众多开源组件的实现。
2.在模块化方便，基于webpack可以使用ES6或者CommonJs的写法实现模块化代码；
3.在开发效率方面，react的代码基本就是组件的组合，分而治之的方式让代码的可读性很高，容易理解。
而且相比于MVC几乎是祛除了Controller的角色，只用关心render函数，不用关心视图局部的修改；
4.在运行效率方面，React实现了Virtual DOM,相比较MVVM框架具有更优的效率；
5.在可维护性方面，React基于flux或者redux的架构设计，确定性的store很容易定位问题，无论是新增业务代码还是查找业务代码都不再是难题；
6.在用户体验方面，基于React很容易实现SPA，提高用户体验。
```

## 2.脚手架

```js
npm i create-react-app -g //安装脚手架
create-react-app demo // 创建项目
cd demo //进入项目
npm start //启动项目
```

目录介绍：

```js
my-app
    - node_modules    		--npm包
    - public            		--服务器目录
        - favicon.ico       		--页面图标
        - index.html        		--页面主入口
        - manifest.json    			--页面配置文件
    - src                  	--项目源码
        - App.css              	--根组件样式
        - App.js                	--根组件模板
        - App.test.js              	--根组件测试
        - index.css               	--全局css样式
        - index.js                	--脚本主入口
        - logo.svg      			--图片文件
        - serviceWorker.js 			--离线访问服务
    - .gitignore             	--git忽略文件配置
    - package.json          	--npm配置
    - package-lock.json      	--锁定安装时的包的版本号
    - README.md           	--项目说明文档
    - yarn.lock              	--yarn配置
```

src/index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

src/App.js

```jsx
function App() {
  return (
    <div className="App">
      123
    </div>
  );
}

export default App;
```



## 3.JSX语法

#### 1.数据绑定

```js
var name = "妲己";
var name2 = "王昭君";
let price = 20;
```

```jsx
{/* 1.{}可以绑定变量 */}
 <div>name:{name}</div>
{/* 2.{} 可以绑定表达式 */}
<div>{status === 1 ? name : name2}</div>
{/* 3.{} 绑定方法    */}
<div>price:{price.toFixed(2)}</div>
```

#### 2.属性绑定

```js
let imgUrl =
  "https://img2.baidu.com/it/u=1376319214,2872501189&fm=26&fmt=auto&gp=0.jpg";
```

```jsx
{/* 4。属性绑定 {变量} */}
<img src={imgUrl} alt="" />
<div aa={name}>哈哈哈</div>
```

#### 3.条件渲染

```jsx
{/* 5.条件渲染  {三元表达式} ，如果什么都不出，写null */}
{status === 1 ? <button>是</button> : <button>否</button>}

{isshow ? <div>弹框</div> : null}
```

#### 4.列表渲染

```jsx
let arr = [
  { id: 1, title: "哈哈", con: "习近平和越南总统对话", color: "red" },
  {
    id: 2,
    title: "嘿嘿",
    con: "银行卡被盗刷，银行应该负责赔偿",
    color: "blue",
  },
  { id: 3, title: "哈哈", con: "习近平和越南总统对话", color: "pink" },
  {
    id: 4,
    title: "嘿嘿",
    con: "银行卡被盗刷，银行应该负责赔偿",
    color: "orange",
  },
  { id: 5, title: "哈哈", con: "习近平和越南总统对话", color: "lime" },
  {
    id: 6,
    title: "嘿嘿",
    con: "银行卡被盗刷，银行应该负责赔偿",
    color: "green",
  },
];
/*
let elArr=[
    <li>哈哈</li>,
    <li>嘿嘿</li>
]*/

let elArr = arr.map((item) => {
  return (
    <li key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.con}</p>
    </li>
  );
});
```

```jsx
{/* 6.列表渲染 map */}
<ul>{elArr}</ul>
{/* 推荐在页面map  */}
<ol>
  {arr.map((item) => {
    return (
      <li key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.con}</p>
      </li>
    );
  })}
</ol>
```

#### 5.注释的写法

```jsx
 {/* 7.注释 */}
```

#### 6.类名的写法

```jsx
{/* 9. 类名使用className，而不是class */}
<div className="red">测试样式</div>
```

#### 7.动态类名

```jsx
{/* 10.动态类名 className={三元} */}
<ol>
  {arr.map((item, index) => {
    return (
      <li className={index % 2 === 0 ? "red" : "blue"} key={item.id}>
        {item.title}
      </li>
    );
  })}
</ol>
```

#### 8.动态行间样式

```jsx
{/* 11动态行间样式 style={json} */}
<ol>
  {arr.map((item, index) => {
    return (
      <li style={{ color: item.color }} key={item.id}>
        {item.title}
      </li>
    );
  })}
</ol>
<div style={{ background: "red" }}>真好</div>
```

#### 9.注意：

```js
1.如果标签比较多，就用()包一下
2.jsx中遇到了< 由html解析，遇到{ 由js解析
```



## 4.组件

### 4.1组价注册

##### 函数定义：

```jsx
import React from "react"


function FunctionCreate(props){
    console.log(props);
    return (
        <div className="box">
            <h3>函数创建</h3>
            <div>msg:{props.msg}</div>
        </div>
        
    )
}

export default FunctionCreate;
```

##### 类定义：

```jsx
import React, { Component } from "react";

class ClassCreate extends Component {
  // 构造函数:要么不写，写了就得加super()
  constructor() {
    super();
    this.name = "妲己";
    this.state={
        num:1
    }
  }
 
  //渲染的函数
  render() {
    console.log(this);
    return (
      <div className="box">
        <h3>类定义</h3>
        
        <div>msg:{this.props.msg}</div>
      </div>
    );
  }
}
export default ClassCreate;

```



### 4.2对比两种注册方式

```js
1.类定义组件有state,函数定义没有；
2.类定义组件有生命周期函数，函数定义没有；
3.对于父组件传递的数据，类定义通过this.props接收，函数定义通过props接收；
4.类定义组件每一次调用都会创建一个实例对象，函数只是纯计算，返回html,效率角度考虑，函数更好一些。
```

### 4.3组件注册注意点：

```js
// 1.组件名称首字母要大写
// 2.可以使用存在的标签的大写命名
// 3.中间有大写，不需要使用烤串写法
// 4.模板只能有1个根节点
```

## 5.事件处理

#### 1.如何绑定事件

```jsx
{/* 1.如何绑定事件 */}
<div className="box">
  <h4>1.如何绑定事件</h4>
  {/* 箭头函数绑定不需要this */}
  {/* bind 绑定第一个参数是调用该函数的对象，一般使用this */}
  <button onClick={(e)=> this.fn()}>箭头函数：点击执行fn</button>
  <button onClick={this.fn.bind(this)}>bind:点击执行fn</button>
</div>
```

#### 2.事件如何传参

```jsx
{/* 2.事件如何传参？ */}
<div className="box">
  <h4>2.事件如何传参？</h4>
  {/* 箭头函数正常传 */}
  {/* bind 的第2个实参传递给函数的第1个形参*/}
  <button onClick={()=>this.add(10,20)}>箭头函数：10+20</button>
  <button onClick={this.add.bind(this,3,10)}>bind:3+10</button>
</div>
```

#### 3.event对象如何获取？

```jsx
{/* 3.event对象如何获取？ */}
<div className="box">
  <h4> 3.event对象如何获取？</h4>
  {/* 箭头函数显示传参，箭头函数形参就是event */}
  {/* bind 隐式传参：最后一位参数就是even,但是不写*/}
  <button onClick={(e)=>this.getEvent(e)}>箭头函数：获取event</button>
  <button onClick={this.getEvent.bind(this)}>bind:获取event</button>

  <button onClick={(e)=>this.getEvent2(10,e)}>箭头函数：获取event</button>
  <button onClick={this.getEvent2.bind(this,10)}>bind:获取event</button>
</div>

```

#### 4.阻止默认

```jsx
{/* 4.阻止默认  e.preventDefault() 注意：return false不行*/}
<div className="redBox" onContextMenu={(e)=>this.yj(e)}></div>
```

```js
yj(e){
  e.preventDefault()
  console.log("右键了");

}
```

#### 5.阻止传播

```jsx
{/* 5.阻止传播 e.stopPropagation() */}
<div className="outer" onClick={()=>this.outerClick()}>
  <div className="inner" onClick={(e)=>this.innerClick(e)}>阻止传播</div>
</div>
```

```js
outerClick(){
  console.log("outer click");
}
innerClick(e){
  e.stopPropagation()
  console.log("inner click");
}
```

#### 6.捕获

```jsx
{/* 6.捕获 */}
<div className="outer" onClickCapture={()=>this.outerClick()}>
  <div className="inner" onClickCapture={(e)=>this.innerClick(e)}>捕获</div>
</div>
```



## 6.state 

```js
// 0.state是最小的UI状态集合
// 1.初始化state 在constructor中
// 2.取值  let { name, age, sex } = this.state;
// 3.如果state全部要传递给子组件，可以使用{...this.state}  {...props}
/* 4.修改state：setState({新值})
    4.1 直接修改state,数据会变，页面不会渲染
    4.2 修改state应该使用setState(),setState()的调用会引起render的重新执行
    4.3 render中千万不要调用setState(),否则陷入死循环
    4.4 修改数组： 1取 2做 3放
    4.5 修改json (1) 取 做 放 (2)...
    4.6 this.setState()是异步的,如果想要使用setState()之后的新值，需要在回调函数中处理
  */
//   5.json和数组不能直接通过{}展示在页面，需要先JSON.stringify()
```



#### 调用 setState 之后发生了什么？

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。



## 7.面试题

1.react的优缺点

2.react中组件如何创建？

3.函数定义组件和类定义组件的区别？

4.setState()中第二为什么是个回调函数？

5.setState()调用后发生了什么？

## 8.作业：

练习：3遍

 