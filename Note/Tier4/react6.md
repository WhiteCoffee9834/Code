## 1.Hooks

#### 1.什么是hooks？

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他 的 React 特性。

#### 2主要解决的问题 

1.用于在函数组件中引入状态管理和生命周期方法; 

2.取代高阶组件和render props来实现抽象和可重用性; 

3.完全脱离"类",便可写出一个全功能的组件。

#### 3.常用的钩子:

```
 useState():为函数组件引入状态 
 useContext():共享状态钩子 
 useReducer():action钩子 
 useEffect():副作用钩子
```

#### 4. useState():为函数组件引入状态 

```js
import React, { useState } from "react";
```

```js
 const [name, setName] = useState("妲己");
```

```jsx
<div>
  <div>name:{name}</div>

  <button onClick={() => setName("王昭君")}>王昭君</button>
</div>
```

#### 5.useEffect():副作用钩子

##### 1.componentDidMount componentDidUpdate

```js
import React, {useEffect} from "react";
 useEffect(()=>{
    document.title=`点了${count}次`
  })
```

##### 2.componentDidMount,count或者age变了，也会触发

```js
 useEffect(()=>{
    document.title=`点了${count}次--${name}`
  },[count,age])
```

##### 3.componentDidMount

```js
useEffect(()=>{
    document.title=`点了${count}次--${name}`
  },[])
```

##### 4.componentDidMount +componentWillUnmount

```js
 useEffect(()=>{
      let time=setInterval(()=>{
          setDate(new Date())
      },1000)
      //return 的函数就是componentWillUnmount
      return ()=>{
        clearInterval(time)
      }
  },[])
```



#### 6. useReducer():action钩子 

##### 1.语法

```js
import React, { useReducer } from "react";

const [state, dispatch] = useReducer(reducer, initState);
```

##### 2.案例

状态层：

```jsx
//初始值
export const initState={
    name:"妲己",
    age:20,
    sex:"女"
}

//修改的reducer
export const reducer=(state,action)=>{
    switch(action.type){
        case "changeName":
            return {
                ...state,
                name:action.name
            }
        case "changeAge":
            return {
                ...state,
                age:action.age
            }
        default:
            return state;
    }
}
//actions
export const actions={
    changeName:(name)=>({type:"changeName",name}),
    changeAge:age=>({type:"changeAge",age})
}

```

组件使用：

```jsx
import React, { useReducer } from "react";
import { reducer, initState, actions, getName } from "./reducer";

export default function Reducer() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div>
      <h3>useReducer</h3>
      <div>name:{state.name}</div>
      <div>name:{getName(state)}</div>
      <div>age:{state.age}</div>
      <button onClick={() => dispatch({ type: "changeName", name: "鲁班" })}>
        鲁班
      </button>
      <button onClick={() => dispatch(actions.changeName("杨玉环"))}>
        杨玉环
      </button>
     
    </div>
  );
}

```



#### 7.useContext():共享状态钩子 

父组件有数据，子组件不用，子组件的子组件要用

##### parent.jsx

```jsx
export let myContext = React.createContext();
```

```jsx
<myContext.Provider value={state}>
  <Child></Child>
</myContext.Provider>
```

子组件什么都没有做

##### 子组件的子组件

```js
import {myContext} from "./Reducer.jsx"
import React,{useContext} from 'react'
```

```jsx
export default function ChildChild() {
    let state=useContext(myContext)
    
    return (
        <div className="box">
            <h3>child child</h3>
            <div>name:{state.name}</div>
        </div>
    )
}

```

