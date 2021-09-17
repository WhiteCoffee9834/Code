# React

#### 1.当你调用setState的时候，发生了什么事？

```
当调用 setState 时，React会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。这将启动一个称为和解（reconciliation）的过程。和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。 为此，React将构建一个新的 React 元素树（您可以将其视为 UI 的对象表示）。
```

#### 2.在React当中Element和Component有何区别？

```
简单地说，一个 React element 描述了你想在屏幕上看到什么。换个说法就是，一个 React element 是一些 UI 的对象表示。一个 React Component 是一个函数或一个类，它可以接受输入并返回一个 React element（通常是通过 JSX ，它被转化成一个 createElement 调用）。组件的使用被称为'创建Element'
```

![](img\Component&Element区别.png)

#### 3.在什么情况下你会优先选择使用 Class Component 而不是 Functional Component？

```
在组件需要包含内部状态或者使用到生命周期函数的时候使用 Class Component ，否则使用函数式组件。
```

#### 4.什么是React的refs，为什么他们很重要？

```
refs就像是一个逃生舱口，允许您直接访问DOM元素或组件实例。为了使用它们，您可以向组件添加一个 ref 属性，该属性的值是一个回调函数，它将接收底层的 DOM 元素或组件的已挂接实例，作为其第一个参数。
方法一：
class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
方法二：
//AutoFocusTextInput.js
import { CustomTextInput } from "./CustomTextInput"
class AutoFocusTextInput extends Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef()
    }

    componentDidMount(){
        this.textInput.current.focus();
    }

    render(){
        return(
            <CustomTextInput ref = {this.textInput}/>
        )
    }
}
export default AutoFocusTextInput;
```

#### 5.React 中的keys是什么，为什么它们很重要？

```
keys是帮助 React 跟踪哪些项目已更改、添加或从列表中删除。
每个 keys 在兄弟元素之间是独一无二的。我们已经谈过几次关于和解（reconciliation）的过程，而且这个和解过程（reconciliation）中的一部分正在执行一个新的元素树与最前一个的差异。keys 使处理列表时更加高效，因为 React 可以使用子元素上的 keys 快速知道元素是新的还是在比较树时才被移动。
```

#### 6.如果您创建了一个 React 元素，Twitter的组件定义将如何？

![](img\React组件间.png)

#### 7.受控组件( controlled component )与不受控制的组件( uncontrolled component )有什么区别？

```
受控组件是React控制的组件，也是表单数据的唯一真理来源。
username 不存在于 DOM 中，而是以我们的组件状态存在。每当我们想要更新 username 时，我们就像以前一样调用setState。
class ControlledForm extends Component {
  state = {
    username: ''
  }
  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  handleSubmit = () => {}
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.username}
          onChange={this.updateUsername} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
不受控制( uncontrolled component )的组件是您的表单数据由 DOM 处理，而不是您的 React 组件。
class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

#### 8.在哪个生命周期事件中你会发出 AJAX 请求，为什么？

```
AJAX 请求应该在 componentDidMount 生命周期中发送
原因：
React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。
如果我们将AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。
```

#### 9.shouldComponentUpdate是做什么的？

```
询问组件是否需要更新的一个钩子函数，判断数据是否需要重新渲染，返回一个布尔值。默认的返回值是true，需要重新render()。若返回值是false则不触发渲染,利用这个生命周期函数可以强制关闭不需要更新的子组件来提升渲染性能。
```

#### 10.creatElement与cloneElement的区别是什么？

```
createElement 函数是 JSX 编译之后使用的创建 React Element 的函数，而 cloneElement 则是用于复制某个元素并传入新的 Props
克隆react element， 并传递props, 和children

React.cloneElement(
  element,
  [props],
  [...children]
)
// children将替代现有的children， props将和现有的props进行浅合并
```

#### 11.可以选择性地传递给 setState 的第二个参数是什么，它的目的是什么？

```
一个回调函数，当setState结束并 re-rendered 该组件时将被调用。一些没有说出来的东西是 setState 是 异步 的，这就是为什么它需要一个第二个回调函数。通常最好使用另一个生命周期方法，而不是依赖这个回调函数，但是很高兴知道它存在。
this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState')
)
也可以传递一个函数给setState，它接收到先前的状态和道具并返回一个新的状态，正如我们在上面所做的那样。它不仅没有什么问题，而且如果您根据以前的状态（state）设置状态，推荐使用这种写法。
this.setState((prevState, props) => {
  return {
    streak: prevState.streak + props.count
  }
})
不建议传一个回调函数，因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。
```

#### 12.React生命周期

```
componentWillMount:在渲染之前执行，用于根组件中的 App 级配置。
componentDidMount：在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器。
componentWillReceiveProps：在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
shouldComponentUpdate：确定是否更新组件。默认情况下，它返回true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法。
componentWillUpdate：在shouldComponentUpdate返回 true 确定要更新组件之前执行。
componentDidUpdate：它主要用于更新DOM以响应props或state更改。
componentWillUnmount：它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。
```

#### 13.为什么虚拟dom会提高性能？(必考)

```
虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能
虚拟DOM具有批处理和高效的Diff算法,最终表现在DOM上的修改只是变更的部分，可以保证非常高效的渲染,优化性能.
```

#### 14.react.diff原理？



```
(1) 把树形结构按照层级分解，只比较同级元素。
(2) 列表结构的每个单元添加唯一的 key 属性，方便比较。
(3) React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
(4) 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
(5) 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。
```

#### 15.(组件的状态(state)和属性(props)之间有何不同)

```
State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。
Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据–回调函数也可以通过 props 传递。
```

#### 16.何为高阶组件？

```
高阶组件(HOC)是接受一个组件并返回一个新组件的函数。基本上，这是一个模式，是从 React 的组合特性中衍生出来的，称其为纯组件，因为它们可以接受任何动态提供的子组件，但不会修改或复制输入组件中的任何行为。
```

#### 17.React绑定this的三种方式？

```
1.构造函数内绑定：在构造函数中为事件回调函数绑定this: this.doAction = this.doAction.bind(this)，否则doAction中的this是undefined。手动绑定
2.bind绑定：ES5新增的函数扩展方法，bind()返回一个新的函数对象，该函数的this被绑定到thisArg上，并向事件处理器中传入参数，
3.箭头函数：doAction = (name) => {console.log(name)};
	调用：this.doAction
	传参：onClick={(e)=> this.doAction(e.item.name)}
	绑定this并传参：doAction=(val)=>{return ()=>{console.log(val)}}
	调用：this.doAction()
```

#### 18.React 中有三种构建组件的方式

```
1.无状态函数式组件:它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到state状态的操作,组件不会被实例化，整体渲染性能得到提升，不能访问this对象，不能访问生命周期的方法
2.ES5原生方式:React.createClass会自绑定函数方法，导致不必要的性能开销，增加代码过时的可能性。
3.ES6继承形式 React.Component:无状态比React.createClass和React.Component都是创建有状态的组件，这些组件是要被实例化的，并且可以访问组件的生命周期方法。
```

#### 19.React.createClass()、ES6class 和无状态函数。

```
1.var Root = React.createClass({
    render:function(){
        return (
          <div>
            <h1>迹忆博客</h1>
            <a>www.onmpw.com</a>
          </div>
        );
    },
});
ReactDOM.render(
        <Root />,
        document.getElementById('content')
);
注意点：1.Root首字母必须大写。2.在一个createClass创建的组件中只能有一个根节点。
```

#### 20.React组件的划分业务组件技术组件？

```
1.根据组件的职责通常把组件分为UI组件和容器组件。
2.UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
3.两者通过React-Redux 提供connect方法联系起来
```

#### 21.简述flux思想

```
Flux 的最大特点，就是数据的"单向流动"。
1.用户访问 View
2.View发出用户的 Action
3.Dispatcher 收到Action，要求 Store 进行相应的更新
4.Store 更新后，发出一个"change"事件
5.View 收到"change"事件后，更新页面
```

#### 22.React 项目用过什么脚手架（本题是开放性题目）

```
1.Create React App(必答):学习React或创建一个新的单页应用
2.Gatsby:构建面向内容的静态网站
3.razzle:创建没有配置的服务器呈现的通用Javascript应用程序
```

#### 23.了解Redux么？说一下redux的作用和运用流程，redux有什么缺点？

```
作用:Redux是为了解决React中组件与组件之间数据传递的问题。
运行流程:
缺点:
1.一个组件所需要的数据，必须由父组件传过来，而不能像flux中直接从store取。
2.当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新render，可能会有效率影响，或者需要写复杂的shouldComponentUpdate进行判断。
```

#### 24.什么是虚拟DOM？

```
虚拟 DOM (VDOM)是真实 DOM 在内存中的表示。UI 的表示形式保存在内存中，并与实际的 DOM 同步。这是一个发生在渲染函数被调用和元素在屏幕上显示之间的步骤，整个过程被称为调和
```

#### 25.类组件和函数组件之间的区别是啥？

```
类组件可以使用其他特性，如状态 state 和生命周期钩子。
当组件只是接收 props 渲染到页面时，就是无状态组件，就属于函数组件，也被称为哑组件或展示组件。
```

#### 26.React 中 refs 干嘛用的？

```
咱们可以在组件添加一个 ref 属性来使用，该属性的值是一个回调函数，接收作为其第一个参数的底层 DOM 元素或组件的挂载实例。
class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
函数组件ref
function CustomForm ({handleSubmit}) {
  let inputElement
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

#### 27.如何创建 refs

```
Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。
```

#### 28.在构造函数调用 `super` 并将 `props` 作为参数传入的作用是啥？

```
在调用 super() 方法之前，子类构造函数无法使用this引用，ES6 子类也是如此。将 props 参数传递给 super() 调用的主要原因是在子构造函数中能够通过this.props来获取传入的 props。
```

#### 29.讲讲什么是 JSX ？

```
当 Facebook 第一次发布 React 时，他们还引入了一种新的 JS 方言 JSX，将原始 HTML 模板嵌入到 JS 代码中。JSX 代码本身不能被浏览器读取，必须使用Babel和webpack等工具将其转换为传统的JS。很多开发人员就能无意识使用 JSX，因为它已经与 React 结合在一直了。
```

#### 30.为什么不直接更新 `state` 呢 ?

```
1.如果试图直接更新 state ，则不会重新渲染组件。
This.state.message = 'Hello world';
2.需要使用setState()方法来更新 state。它调度对组件state对象的更新。当state改变时，组件通过重新渲染来响应：
This.setState({message: ‘Hello World’});
```

#### 31.React组件生命周期有哪些不同阶段？

```
1.Initialization：在这个阶段，组件准备设置初始化状态和默认属性。
2.Mounting：react 组件已经准备好挂载到浏览器 DOM 中。这个阶段包括componentWillMount和componentDidMount生命周期方法。
3.Updating：在这个阶段，组件以两种方式更新，发送新的 props 和 state 状态。此阶段包括shouldComponentUpdate、componentWillUpdate和componentDidUpdate生命周期方法。
4.Unmounting：在这个阶段，组件已经不再被需要了，它从浏览器 DOM 中卸载下来。这个阶段包含 componentWillUnmount 生命周期方法。
```

#### 32.使用 React Hooks 好处是啥？

```
首先，Hooks 通常支持提取和重用跨多个组件通用的有状态逻辑，而无需承担高阶组件或渲染 props 的负担。Hooks 可以轻松地操作函数组件的状态，而不需要将它们转换为类组件。
Hooks 在类中不起作用，通过使用它们，咱们可以完全避免使用生命周期方法，例如 componentDidMount、componentDidUpdate、componentWillUnmount。相反，使用像useEffect这样的内置钩子。
```

#### 33.什么是 React Hooks？

```
Hooks是 React 16.8 中的新添加内容。它们允许在不编写类的情况下使用state和其他 React 特性。使用 Hooks，可以从组件中提取有状态逻辑，这样就可以独立地测试和重用它。Hooks 允许咱们在不改变组件层次结构的情况下重用有状态逻辑，这样在许多组件之间或与社区共享 Hooks 变得很容易。
```

#### 34.React 中的StrictMode(严格模式)是什么？

```
React 的StrictMode是一种辅助组件，可以帮助咱们编写更好的 react 组件，可以使用<StrictMode />包装一组组件，并且可以帮咱们以下检查：
1.验证内部组件是否遵循某些推荐做法，如果没有，会在控制台给出警告。
2.验证是否使用的已经废弃的方法，如果有，会在控制台给出警告。
3.通过识别潜在的风险预防一些副作用。
```

#### 35.为什么类方法需要绑定到类实例？

```
在 JS 中，this 值会根据当前上下文变化。在 React 类组件方法中，开发人员通常希望 this 引用组件的当前实例，因此有必要将这些方法绑定到实例。通常这是在构造函数中完成的:
```

#### 36.什么是 prop drilling，如何避免？

```
prop drilling的主要缺点是原本不需要数据的组件变得不必要地复杂，并且难以维护。
为了避免prop drilling，一种常用的方法是使用React Context(通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性)。通过定义提供数据的Provider组件，并允许嵌套的组件通过Consumer组件或useContext Hook 使用上下文数据。
```

#### 37.描述 Flux 与 MVC？

```
一个Flux应用由三大部分组成dispatcher、store和view，其中dispatcher负责分发事件；store负责保存数据，同时响应事件并更新数据；view负责订阅store中的数据，并使用这些数据渲染相应的页面。
尽管它看起来和MVC架构有些像，但其中并没有一个职责明确的controller。事实上，Flux中存在一个controller-view的角色，但它的职责是将view和store进行绑定，并没有传统MVC中controller需要承担的复杂逻辑。
```

#### 38.什么是 React Fiber?

```
1.把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。React Fiber把更新过程碎片化，维护每一个分片的数据结构，就是Fiber。
2.首先MVC分层有助于管理复杂的应用程序，可以让你不依赖逻辑的原理,专注的去设计视图，同时MVC分层简化了分组开发，可以让不同的开发成员去开发视图、控制器和模型等业务逻辑
```

#### 39.如何在 ReactJS 的 Props上应用验证？

```
当应用程序在开发模式下运行时，React 将自动检查咱们在组件上设置的所有 props，以确保它们具有正确的数据类型。对于不正确的类型，开发模式下会在控制台中生成警告消息，而在生产模式中由于性能影响而禁用它。强制的 props 用 isRequired定义的。
```

![](C:\Users\A1877\Desktop\React面试题\img\prop-types.png)

#### 40.在 React 中使用构造函数和 getInitialState 有什么区别？

```
总的来说，就是es5和es6的区别
1.如果使用extends继承方法创建一个Component组件，在里面我们可以直接指定 this.state = { }， 我们可以当前组件内任何地方使用 this.setState()来改变组件状态;
2.如果使用createClass方法创建一个Component组件，可以自动调用它的getInitialState方法来获取初始化的State对象，但是在ES6的Class中并不会如此自动调用，因此，要稍作修改。
```

#### 41.如何有条件地向 React 组件添加属性？

```

```

#### 41.如何避免组件的重新渲染？

```
React.memo():这可以防止不必要地重新渲染函数组件
PureComponent:这可以防止不必要地重新渲染类组件
```

#### 42.什么是纯函数？

```
纯函数是不依赖并且不会在其作用域之外修改变量状态的函数。本质上，纯函数始终在给定相同参数的情况下返回相同结果。
```

#### 43.当调用`setState`时，React `render` 是如何工作的？

```
虚拟 DOM 渲染:当render方法被调用时，它返回一个新的组件的虚拟 DOM 结构。当调用setState()时，render会被再次调用，因为默认情况下shouldComponentUpdate总是返回true，所以默认情况下 React 是没有优化的。
原生 DOM 渲染:React 只会在虚拟DOM中修改真实DOM节点，而且修改的次数非常少——这是很棒的React特性，它优化了真实DOM的变化，使React变得更快。
```

### Ajax请求方式

```jsx
class App extends React.Component{
    constructor(props){
        super(props);
        // 定义数据的初始状态
        this.state = {
            attr:{
                cn_name:null,
                en_name:null,
            }
        }
    }
    // 发送ajax请求
    componentDidMount(){
        let url = "http://shuyantech.com/api/cndbpedia/avpair?q=%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6";
        // axios方式
        axios.get(url)
            .then(
                (response)=>{
                    let data = response.data.ret;
                    // 更新数据状态
                    this.setState({
                        attr:{
                            cn_name:data[0][1],
                            en_name: data[1][1]
                        }
                    })
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )
        // fetch方式
        fetch(url)
            // 返回response
            .then((response)=> {return response.json()})
            // 获取数据
            .then((data)=> {
                data = data.ret;
                // 更新数据状态
                this.setState({
                    attr:{
                        cn_name:data[0][1],
                        en_name: data[1][1]
                    }
                })
            })
            // 捕获异常
            .catch((e)=> {console.log(e)})
    }
    render(){
        let {attr} = this.state;
        // 根据数据状态显示不同结果
        if(!attr){
            return <h2>正在请求CNdbpedia数据，请稍后...</h2>
        }else{
            return(
                <div>
                    <p>中文名：{attr.cn_name}</p>
                    <p>英文名：{attr.en_name}</p>
                </div>
            )
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
```