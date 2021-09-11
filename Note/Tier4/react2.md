# react2

### 1.props

##### 1.props可以传递数据，子组件接收

父组件传数据

```jsx
 <Child name={name} age={age} json={json} ></Child>
```

子组件接收  

```js
let {
  name,
  age,
  json: { x },
} = this.props;
```

##### 2.取值

```js
let {
  name,
  age,
  json: { x },
  change
} = this.props;
```

##### 3.全部传递给子组件

```jsx
 <ChildChild {...this.props}></ChildChild>
```

##### 4.super(props)

```js
constructor(props) {
    // super()为了继承了，有了super(),构造函数才会有this
    // super(props) 是为了在constructor中有this.props,否则是undefined
    super(props);

    console.log(this.props);
    this.state = {
      name: this.props.name,
    };
  }
```

##### 5.组件调用嵌套的内容是this.props.children

```jsx
<Child {...this.state}  change={(name)=>this.changeName(name)}>
  <div>天道酬勤</div>
</Child>
```

Child.jsx

```jsx
{this.props.children}
```



##### 6.传递方法

父组件

```jsx
 <Child name={name} age={age} json={json} change={(e)=>this.changeName(e)}></Child>
```

子组件

```jsx
 <button onClick={()=>this.props.change('貂蝉')}>貂蝉</button>
```

##### 7.state和props的区别：

```js
state:组件自己的状态；可以直接修改，但是需要通过setState()进行修改
props:父组件传递过来的数据；props是只读的，不能修改，如果要修改，需要子传父。
```



### 2.组件通信

##### 父传子：父组件通过自定义属性传值，子组件通过props接收

父组件：

```jsx
 <Goods goods={this.state.goods} ></Goods>
```

子组件：

```jsx
import React from 'react'

export default function Child(props) {
    return (
        <div>
            {
                props.goods.map(item=>{
                    return (
                        <div key={item.id}>{item.name} <button onClick={()=>props.del(item.id)}>删除</button> </div>
                    )
                })
            }
        </div>
    )
}

```

##### 子传父：父组件将方法通过属性传递，子组件通过props接收

父组件传递方法：

```jsx
<Goods  del={(id)=>this.del(id)}></Goods>
```

子组件触发：

```jsx
 <div key={item.id}>{item.name} <button onClick={()=>props.del(item.id)}>删除</button> </div>
```



### 3.生命周期

```js
/* 初始期
constructor:初始化数据
static getDerivedStateFromProps()  渲染之前二次修改state
    1.constructor中需要有state初始值；
    2.返回一个新的state
    3.如果不修改state，返回null
render() 渲染期：加载DOM节点
componentDidMount() 挂载完成：开请求、计时器、操作dom，给window和document加事件
*/

/* 更新期 ：state
static getDerivedStateFromProps()  渲染之前二次修改state
    1.constructor中需要有state初始值；
    2.返回一个新的state
    3.如果不修改state，返回null
shouldComponentUpdate 判断要不要更新
    1.如果写了，没有返回值，会报错的
    2.return true ,正常更新
    3.return falsel, 就不会触发render
render() 渲染期：进行diff算法，计算出最优的更新方案，然后局部更新
componentDidUpdate() 更新完成
*/
/*销毁期
componentWillUnmount ：销毁之前：清除计时器 清除window和document上的事件
*/
```



### 4.表单

#### 1.受控组件

##### 特点：

```
就地反馈，如：验证
禁用按钮 如：提交
执行特定的输入格式 如：身份证号、银行卡号
```

##### 取值赋值

| 特征                  | 取值                              | 赋值    |
| --------------------- | --------------------------------- | ------- |
| Input type="text"     | e.target.value                    | alue    |
| Input type="radio"    | e.target.value                    | hecked  |
| Input type="checkbox" | e.target.value \|e.target.checked | checked |
| Select                | e.target.value                    | Value   |
| Textarea              | e.target.value                    | Value   |

```js
//修改user
  changeUser(e, key) {

    let value = e.target.value;

    if(key==="tel"){
        let {tel}=this.state.user
        if(tel.length<3&&value.length===3){
            value+=" "
        }
        if(tel.length<8&& value.length===8){
            value+=" "
        }
        if(value.length>13){
            value=value.slice(0,13)
        }
    }

    if (key === "hobby") {
      //取出原来的hobby,如果这次e.target.checked是true，就将e.target.value添加到hobby数组中；
      //如果是false,将e.target.value从hobby中删除
      let { hobby } = this.state.user;
      let val=parseInt(e.target.value)
        if(e.target.checked){
            hobby.push(val)
        }else{
            hobby.splice(hobby.indexOf(val),1)
        }
        value=hobby
    }
    //如果是isAgree
    if(key==="isAgree"){
        value=e.target.checked;
    }

    this.setState({
      user: {
        ...this.state.user,
        [key]: value,
      },
    });
  }
```



#### 2.非受控组件

```js
this.name=React.createRef()
 this.pass=React.createRef()
```

```vue
<div className="box">
  <h4>login3</h4>
  <div>账号：<input type="text" ref={this.name} /></div>
  <div>密码：<input type="text" ref={this.pass}/></div>
  <button onClick={()=>this.login()}>登录</button>
</div>
```

```js
 //登录3
login(){
  console.log(this.name.current.value);
  console.log(this.pass.current.value);
}
```



#### 3.对比受控和非受控组件

| 特征                       | 受控组件 | 非受控组件 |
| -------------------------- | -------- | ---------- |
| 一次性检索（例如表单提交） | 是       | 是         |
| 及时验证                   | 是       | 否         |
| 有条件的禁用提交按钮       | 是       | 否         |
| 执行输入格式               | 是       | 否         |
| 一个数据的几个输入         | 是       | 否         |
| 动态输入                   | 是       | 否         |

### 5.ref

##### 1.获取DOM节点

```js
constructor(){
  super()

  //1.创建ref对象
  this.div=React.createRef();


}
```

```jsx
<div ref={this.div}></div>
```

```js
this.div.current.innerHTML="嘿嘿嘿";
this.div.current.style.background="pink";
```

##### 2.获取子组件的实例

```jsx
  // 2.创建ref给子组件
  this.child=React.createRef()
```

```jsx
<Child ref={this.child}></Child>
```

```js
click(){
  this.child.current.changeName("王昭君")
}
```



### 6.组件优化

##### 1.componentWillUnmount 

清除计时器

##### 2.shouldComponentUpdate

父组件状态的改变，也会默认引起子组件的重新渲染，为了减少不必要的渲染，我们可以借助shouldComponentUpdate来实现。

情景1：父组件有很多状态，子组件用了部分状态，父组件只要有任何一个数据变了，子组件默认都会更新；

我们想要子组件用到的数据变了，子组件才更。

```jsx
import React, { Component } from "react";

export default class ShouldChild extends Component {
  //判断状态是否更新
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.num === nextProps.num) {
      return false;
    }
    return true;
  }
  render() {
    console.log("child render is running  ...");
    let { num } = this.props;
    return (
      <div className="box">
        <h3>should child</h3>
        <div>num:{num}</div>
      </div>
    );
  }
}

```



##### 3.PureComponent

场景：有一个父组件，有2个状态，date和num,date状态该组件自己使用，将num传递给子组件，此时我们希望只有num改变，子组件才再次重新渲染，除了上述的shouldComponentUpdate,我们也可以使用PureComponent来实现。

Component不会对数据进行比较，`PureComponent`将对`props`和`state`进行浅比较。

```jsx
import React, { PureComponent } from 'react';


class Child2 extends PureComponent {
    render() {
        console.log("child2 render is running... ")
        return (
            <div className="box">
                <h1>child2：{this.props.num}</h1>
            </div>
        );
    }
}

export default Child2;
```

[注意]：

1.PureComponent是浅比较，如果子组件接收的是对象或者数组，需要使用拷贝才能引起子组件的渲染；

```jsx
push(){
      let { arr } = this.state;
      arr.push({
        id: new Date().getTime(),
        name: "貂蝉",
      });
      this.setState({
          arr:[...arr],//子组件接收arr，子组件会更新
        	//arr 这种方式，子组件是不会触发渲染
      })
  }
```

2.如果prop和state每次都会变，那么PureComponent的效率还不如Component，进行浅比较也是需要时间；所以PureComponent 一般用在展示型组件上。

##### 4.React.memo()

React.memo ，这个 API 可以说是对标类组件里面的 PureComponent ，这是可以减少重新 render 的次数的。

```jsx
import React from 'react'

function Fn(props) {
    console.log("Memo 执行了");
    let {num,arr}=props;

    return (
        <div className="box">
            <h3>meno</h3>
            <div>num:{num}</div>
            <div>arr:{JSON.stringify(arr)}</div>
        </div>
    )
}
export default React.memo(Fn)
```

[注意]：React.memo()也是进行浅比较，对于对象和数组，同样的父组件需要使用拷贝才能引起其重新渲染。

##### 5.Fragment

在React中，用React.Fragment组件能够在不额外创建DOM元素的情况下，让render()方法返回多个元素。你也可以使用<></>代替。

```jsx
import React, { Component, Fragment } from "react";

class Item extends Component {
  render() {
    return (
      <Fragment>
        <li>测试1</li>
        <li>测试2</li>
      </Fragment>
    );
  }
}
export default class Mine extends Component {
  render() {
    return (
      <div>
        <h1>this is Mine </h1>
        <ul>
          <Item></Item>
        </ul>
      </div>
    );
  }
}
```

##### 6.context

context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性.

context api给出三个概念：React.createContext()、Provider、Consumer.

###### 1.语法介绍

**React.createContext()**

这个方法用来创建context对象，并包含Provider、Consumer两个组件 <Provider />、<Consumer />

```js
const {Provider, Consumer} = React.createContext();
```

**Provider**

数据的生产者，通过value属性接收存储的公共状态，来传递给子组件或后代组件

```jsx
<Provider value={/* some value */}>
```

**Consumer**

数据的消费者，通过订阅Provider传入的context的值，来实时更新当前组件的状态

```jsx
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```

###### 2.举例

父组件：

```js
// 1.创建一个Provider,Consumer对象
export let {Provider,Consumer}=React.createContext()
```

```jsx
<div className="box">
  <h3>parent</h3>
  {/* 2.通过Provider提供数据，数据在value */}
  <Provider value={ {num:10,age:20} }>
    <Child></Child>
  </Provider>

</div>
```

子组件的子组件中

```js
// 3.引入Consumer 
import {Consumer} from "./Parent"
```

```jsx
<div className="box">
  <h3>child child</h3>

  {/* 4.使用数据 */}
  <Consumer>
    {
      (d)=>{
        return <div>{JSON.stringify(d)}</div>
      }
    }
  </Consumer>
</div>
```

##### 7.错误边界处理

平时，我们在程序运行中，如果一旦报错，那么所有的程序都将暂停，并且所有的组件都不会出现在页面。如果项目上线，我们希望的实际如果某一个组件出现错误，其他组件正常运行，那么此时，我们需要使用componentDidCatch来实现。

封装ErrorBoundary组件

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state={
        hasError:false,
        error:null
    }
    componentDidCatch(error){
        this.setState({
            hasError:true,
            error
        })
    }
    render() {
        const {hasError,error}=this.state;
        return (
            <>
            {
                hasError?<div>很遗憾，此处加载错误</div>:this.props.children
            }
            </>
        );
    }
}

export default ErrorBoundary;
```

使用：

```jsx
{/*错误边界处理*/}
<ErrorBoundary>
  <Error></Error>
</ErrorBoundary>
```



##### 8.HOC高阶组件

HOC(Higher-order component)是一种React 的进阶使用方法，只要还是为了便于组件的复用。强调一点，HOC本身并不是 React API, 它就是一个方法，一个接收一个组件作为参数，返回一个增强的组件的方法。

**1.语法**

```jsx
**
 * 1.高阶组件是一个函数
 * 2.参数是组件
 * 3.返回值也是组件
 */
const Fn = (C) => {
  return class extends Component {
    render() {
      return (
        <div className="box">
          <h3>此处是一个高阶组件</h3>
          <C {...this.props}></C>
        </div>
      );
    }
  };
};

//2个组件
class Com1 extends Component {
  render() {
    return <div>组件1</div>;
  }
}
class Com2 extends Component {
  render() {
    return <div>组件2</div>;
  }
}

//调用
const FnCom1 = Fn(Com1);
const FnCom2 = Fn(Com2);

```

**2.案例**

withRequest

```jsx
import React, { Component } from 'react';
import axios from 'axios';
export default url => C => {
    return class H extends Component {
        constructor() {
            super()
            this.state = {
                arr: null
            }
        }
        componentDidMount() {
            axios.get(url).then(res => {
                this.setState({
                    arr: res.data.list
                })
            })
        }
        render() {
            let { arr } = this.state;
            return (
                <div>
                    {arr ? <C arr={arr}></C> : <div>正在加载中。。。</div>}
                </div>
            );
        }
    }
}
```

