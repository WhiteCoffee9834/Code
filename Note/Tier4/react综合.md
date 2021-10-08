# 一、react简介

> 用于构建用户界面的 JavaScript 库

## 1.环境搭建

~~~
npm i react --save  (umd目录下)
npm i react-dom -save (umd目录下)
npm i babelstandalone (babel.js)
ReactDOM.render(jsx表达式,挂载的节点,[callback])
~~~

## 2.脚手架环境

  ~~~
npm i create-react-app -g
(1.管理员身份打开powerShell或cmd
2.输入set-ExecutionPolicy RemoteSigned  选A)
create-react-app --version
create-react-app 项目的名字

引用图片 <img src={require("图片的路径“)} ／>

npm run eject 弹射  把配置文件放到项目的根目录中

node_modules/react-scripts/....

<React.StrictMode></React.StrictMode> 
StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI
  ~~~
## 3.jsx

- ​    javascript扩展意思  javascript+xml

- ​    两个作用  es6—>es5   解析jsx 

- ~~~
  <script type="text/babel">
  ~~~

- jsx不是必须的，原理是用React.createElement创建节点      但是用jsx可以提高开发的效率

-   {差值表达式}  对象不能直接渲染

- onXxx  事件的首个字母要大写

- style={{key:value...}}

- class —>className  

   ~~~
   ( classnames  npm i  classnames —save)
     import classNames  from 'classnames'
     classname={classNames({类名:布尔值})}
   ~~~

  styled-components 
   ~~~

  for-->htmlFor

- value-->defaultValue

- checked -->defaultChecked

- jsx中注释{/* */}

- Fragment 空标签  <> </> 也是空标签

# 二、组件

## 1.无状态组件 (vscode ES7 React/Redux/GraphQL/React-Native snippets    rfc)

- 组件的首字母要大写

- ~~~
  var 组件=(props)=>{  //无状态组件
          props就可以接受父组件传过来的值
     		return jsx表达式
  	}
   ~~~

- ~~~
  <组件 属性={值} {...对象} />
  ~~~

-    无状态组件的默认值   类名.defaultProps={key:默认值}

- 无状态的props验证     import {PropTypes} from 'prop-types'     

  类名.propTypes ={ //类型检查

     key :PropTypes.number.isRequired

  }

- Hook 不编写 class 的情况下使用 state 以及其他的 React 特性。

   let    [状态变量，修改状态变量的函数]＝useState(默认值) 

  useEffect（）  componentDidMount componentDidUpdate 

## 2.类组件(rcc)

~~~js
定义一个类组件
class 组件的名字 extends React.Component {
      render(){  //必须有
         return 组件的内容   //return 必须有
       }
 }
~~~

- 类组件的三个常用属性

  ​

  - state    setState({key:value})  setState((prevState,props)=>{   })

  - props   只读   this.props  children  一个元素   对象   两个或两个以上 数组

  -  refs 

  - context    createContext()    Provider 生产者   Consumer 消费者   

    <Provider value={数据}></Provider>

    render()  <Context.Consumer>{(value)=>{return value 就是传过来的值}}</Context.Consumer>

    其他的钩子函数拿到context的值

    static contextType=context;   可以用 this.context  拿到上下文对象传过来的值

    ~~~
    <Tag ref="xxx" />  this.refs.xxx就找打了这个节点
    <Tag ref={(node变量代表当前节点)=>this.txt=node} />
    this.txt 就找打了节点

    this.变量=React.createRef();
    <节点 ref={this.变量} />
    this.变量.current 就可以拿到节点了。
    ~~~

- 三个钩子函数

  - constructor
  - render
  - componentDidMount
  - componentDidUpdate(prevProps,prevState,snapshot)
  - componentWillUnmount

- 事件处理函数要绑定this 或用箭头函数

- 类组件props的默认值   static  defaultProps={ key:value}

- 类组件做props验证  prop-types

  ~~~
  staic propTypes ={ //类型检查

     key :PropTypes.number.isRequired

  }
  ~~~

  ​

## 3.组件的传值

1.  父组件将向子组件传值  属性传递  props接收   props是只读的，不能更改

2. 子组件向父组件传值  子组件调用父组件方法，通过参数进行传值的。

   ~~~
   state来自于父组件的props  derivedState  派生状态
   ~~~


 3.兄弟组件传值  

pubsub-js

PubSub.publish("事件名","数据")                    ($emit)   触发事件

PubSub.subscribe("事件名",(msg,data)=>{  })   ($on)  监听事件

观察者模式

## 4.受控组件

受控组件   受到状态控制的组件，叫受控组件

~~~
  <select value={this.state.变量} onChange={this.change}>
  	   <option>xxx</option>
  	   <option>yyy</option>
  </select>

  单选钮
   <input type="radio" id="sel" name="sel" value="是" 
   checked={this.state.sel==="是"?true:false} onChange={this.change} />是
  复选框
   <input id="vip" type="checkbox" checked={this.state.vip} onChange={this.change} />
~~~

## 5.生命周期的钩子函数

1.挂载阶段

     constructor(props,context)
      static getDerivedStateFromProps(props,state)
     render()
     componentDidMount

2.更新阶段
    getDerivedStateFromProps(props,context)

    shouldComponentUpdate(nextProps,nextState) 返回布尔值，true render  false 不渲染
     (PureComponent 纯组件  浅比对 可以优化渲染的次数)
     无状态组件是用 React.memo(无状态组件)
    render()
    
    getSnapshotBeforeUpdate(prevProps,prevState)  
    返回 Snapshot 数据更新前的dom状态  必须和 componentDidUpdate 一起使用
    
    componentDidUpdate(prevProps,prevState,snapShot)
    监控组件里的数据变化
3.卸载
   componentWillUnmount 

4.context传值(高级)

​    createContext()   Provider  提供数据    Consumer 消费数组 

5.children  <组件> 中间的内容</组件>   组件里 用{this.props.children}拿到中间的内容

6.高阶组件(Hoc)  本质是高阶函数   参数是组件，返回值也是组件这个样的组件叫高阶组件

  属性代理

 反向继承

# 三.第三方工具

## 1.axios

~~~
1.axios proxy
node_modules/react-scripts/config/webpackDevServer.config.js
通过正向代理去获取数据，解决跨域问题
proxy:{
      "/lg":{
        "target":"https://m.lagou.com",
        "changeOrigin":true,
        "pathRewrite":{
          "^/lg":"/"
        }
      }
},

react-app-rewired 可以不用弹射命令，调整webpack配置
1.yarn add react-app-rewired
2.改package.json
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
3.项目根目录下建立  config-overrides.js
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    return config;
  }

4.src/setupProxy.js    npm i http-proxy-middleware --save 插件
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use('/lg', 
    createProxyMiddleware({ 
          target: 'https://m.lagou.com',
         changeOrigin: true,
        "pathRewrite":{
            "^/lg":"/"
        } 
    }));
   
};
~~~



## 2.json-server

~~~\
npm i json-server -g
json-server --version
    get 查找
   post 添加
   delete 删除
   修改 patch 修改
json-server xxxx.json --port 端口号
~~~

# 四.路由

> 官网 https://reacttraining.com/react-router/

## 1.安装

 yarn add  react-router-dom   

## 2.路由两种模式
    BrowserRouter 历史记录模式
    HashRouter hash模式

## 3.Route组件

~~~
<Route path="/xxx" component={组件} />
<Route path="/xxx" render={(props)=>{
	return <组件 {...props} />   根据条件渲染不同的组件，可以做权限路由的效果
}}  方便路由渲染组件的时候进行传值
~~~

## 4.Link和NavLink组件

Link 没有选中后的样式  NavLink 有样式

~~~
<Link to="path">xxx</Link>
<Link to={{pathname:path,search:xxx,state:{key:value...}}}>xxx</Link>
~~~

## 5.Switch 

path匹配多个组件时只渲染第一个

## 6.Redirect 重定向

~~~
<Redirect from="/" to="/home" exact />
~~~

## 7.404页面

~~~
<Route component={404组件} />
~~~

## 8.路由切换的组件的三个属性

~~~
  location  pathname  search state(默认值是undefined)  
  match     this.props.match.params.变量  （取路由参数）  params 默认值是一个空对象
  history   push  go replace 编程式导航
~~~

## 9.withRouter组件

可以让不是路由切换的组件也拥有路由的三个属性
是一个高阶组件 

## 10.监控路由的变化 

~~~
this.props.history.listen ((location)=>{ 监听location.pathname}) 
~~~

## 11.向路由切换的组件传多个值

~~~
 <link to={{pathname:'路径',state:{key:value.....}}} />
 this.props.location.state  state默认是undefined 
 编程式导航传递多个值
 this.props.history.push(path,state);
~~~

## 12.子路由

# 五.redux

## 1.状态管理工具

flux redux mobx 

## 2.官网 http://cn.redux.js.org/

## 3.三大原则

~~~
1.单一数据源(store是唯一的)
2.state是只读的(一旦修改就会产生新的状态)
3.使用纯函数来执行修改
纯函数 只要是同样的输入，必定得到同样的输出
~~~

## 4.安装

yarn add redux

## 5.使用

~~~
存数据
initState={key:value}   reducer(state=initState,action) createStore(reducer)
取数据  store.getState()  获取仓库的最新的状态
改数据
~~~

## 6.store 的三个方法

~~~
getState 获取状态  
dispatch(action)  action是一个含有type属性的对象
抛发动作给reducer ，type 对数据做的操作， payload 参数
修改数据
     作副本
     修改数据
     返回新状态
subscribe 监控仓库里的数据变化
store.subscribe(()=>{  仓库里的数据变化了，回调函数会执行
})
~~~

## 7.redux单向数据流

## 8.拆分为容器组件和ui组件

ui组件 专门渲染数据
容器组件  和store进行交互

## 9.分模块

~~~\
 把reducer 合并在一起形成一个reducer 
  combineReducers({
  模块名:引入的reducer....
}) 
不同模块的type的值千万不能重复

store.getState().模块名.变量
~~~

