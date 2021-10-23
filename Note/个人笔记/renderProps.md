## 如何向组件内部动态传入带内容的结构(标签)
```
Vue
    使用插槽技术,也就是通过组件标签体传入结构
        <A>
            <B/>
        <A/>
React
    使用children props:通过组件标签体传入结构
    使用render props:通过组件标签属性传入结构,一般用render函数属性
```

## children props

```
<A>
    <B></B>
<A/>
在A组件中使用this.props.children可以显示B组件
但如果B组件需要使用到A组件的数据,则做不到
```

## render props

```
<A render={(data)=><C data={data} />} />
A组件:this.props.render(需要传的数据)
C组件:读取A组件传入的数据 this.props.data
```