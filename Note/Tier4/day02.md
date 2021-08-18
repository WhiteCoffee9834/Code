## 一、课堂内容

### 1.指令综合案例-信息表

##### bootstrap

```
官网：http://bootcss.com
下载：
	npm i bootstrap
```



### 2.动态样式

动态类名

```html
 <!--1. :class="变量" -->
<div :class="classn">建设社会</div>

<div :class="[三元]">
  
</div>

<div :class="{类名1:true|false,类名2：true|false}">
  
</div>


```

动态行间样式

```vue
 <div id="app">
        <!-- 行间样式 特殊情况使用 -->
        <div style="color:red;">外防输入，内防反弹</div>
        <!-- :style="json" -->
        <div :style="{'color':'red',background:'yellow'}">唧唧复唧唧</div>

        <ul>
            <li v-for="item in d" :key="item.id" :style="{background:item.color}">
                <h3>{{item.title}}</h3>
                <div>{{item.con}}</div>
            </li>
        </ul>
    </div>
```



### 3.表单数据绑定

#### 数据绑定

1.做表单数据交互的时候，前端最好定一个json，json的key和后端要求的字段保持一致，这样，后期传参的时候会更方便

2.输入框

```vue
<div>姓名：<input type="text" v-model="user.name"></div>
<div>年龄：<input type="number" v-model="user.age"> </div>
```

3.单选框

```vue
<!-- 对于单选框需要给input设置value，value是选中的值 -->
<div>性别：
  <input type="radio" name="sex" value="0" v-model="user.sex">男
  <input type="radio" name="sex" value="1" v-model="user.sex">女
</div>
```

4.下拉菜单

```vue
<!-- 对于下拉菜单单选，option中间的是给用户看的，option的value是选中的值 -->
<!-- <div>职业：
  <select v-model="user.job">
  <option value="">--请选择--</option>
  <option value="1">php工程师</option>
  <option value="2">web工程师</option>
</select>
</div> -->
<div>职业：
  <select v-model="user.job">
    <option value="" disabled>--请选择--</option>
    <option  v-for="item in jobs" :value="item.id" :key="item.id">{{item.name}}</option>
  </select>
</div>
<!-- 对于下拉菜单多选的时候，初始值需要是数组。 -->
<div>零食：
  <select v-model="user.lingshi" multiple>
    <option value="">--请选择--</option>
    <option v-for="item in lingshis" :key="item.id" :value="item.id">{{item.name}}</option>
  </select>
</div>
```

5.多选框

```vue
<!-- 对于多选框来说，如果初始值是[],那么最后的结果就是[];如果初始值不是数组，那结果就是boolean -->
<div>
  <!-- value对应的值如果想要的是number,需要加上v-bind  -->
  爱好：
  <input type="checkbox" :value="1" v-model="user.hobby">看电视
  <input type="checkbox" :value="2" v-model="user.hobby">打游戏
  <input type="checkbox" value="3" v-model="user.hobby">写代码
  <input type="checkbox" value="4" v-model="user.hobby">唱歌
</div>
<div>
  <!-- 对于多选框来说，默认，勾上就是true，不勾就是false -->
  <input type="checkbox" v-model="user.isAgree">同意协议{{user.isAgree}}
</div>
```

#### 表单修饰符

```vue
<div id="app">
  <!-- 指令.修饰符 -->
  <!-- .lazy 输入框失去光标，才修改模型数据 -->
  <input type="text" v-model.lazy="name">
  <div>{{name}}</div>

  <!-- type="number" 最后得到的数据还是string -->
  <!-- .number 将得到的数据转为number类型 -->
  <input type="number" v-model.number="age">
  <button v-on:click="submitAge()">提交年龄</button>

  <!-- .trim 去除空格 -->
  <input type="text" v-model.trim="name">
</div>
```

#### 表单事件

单选框、多选框、下拉菜单如果要绑定事件，都是change,不要使用click.

### 4.事件处理

##### 1.如何绑定事件？

```vue
<div id="app">
  <!-- 1.通过v-on:事件名="方法" -->
  <button v-on:click="fn()">点击弹个1</button>

  <!-- 2.v-on 可以简写为@ -->
  <button @click="fn()">点击弹个1</button>

  <!-- 3.如果没有参数，() 可以省略 -->
  <button @click="fn">弹个1</button>

  <!-- 4.如果逻辑只有1句话，可以直接在html中书写 -->
  <h3>{{name}}</h3>
  <button @click="name='王昭君'">王昭君</button>

  <h3>{{arr}}</h3>
  <button @click="arr=[]">全部删除</button>
</div>
```

##### 2.如何传参？

##### 3.事件对象 event 

```vue
<div id="app">
        <!-- 如果参数除了event还有其他参数，只能才有显示传参；如果参数只有event，都行 -->

        <!-- 显示传参：$event 获取event对象 -->
        <button @click="getEvent($event)">点击获取event-1</button>

        <!-- 隐式传参，注意：不写() -->
        <button @click="getEvent">点击获取event-2</button>

        <button @click="getEvent($event,3)">e,3</button>
        
    </div>
    <script>
        new Vue({
            el:"#app",
            data:{},
            methods:{
                getEvent(e){
                    console.log(e);
                },
                getEvent2(e,n){
                    console.log(e,n);
                }
            }
        })
      
    </script>
```

##### 4.阻止默认事件 阻止事件传播

```js
// 阻止默认
e.preventDefault() 

// 阻止传播
e.stopPropagation()
```

##### 5.事件修饰符

```
-prevent 阻止默认事件
.stop 阻止事件传播
.self 触发的目标元素是自己才执行
.once 一次性事件绑定
.capture 实现事件捕获
.left 左键
.right 右键
.up 上键
.down 下键
.enter 回车
.13 键码
```



### 5.$set

#### json

如果定义data的数据时没有某个字段，后面添加的字段，改变，页面不会渲染。

```js
// 1.this.$set(json,key,value)
 this.$set(this.json,"sex","男")

// 2.Vue.set(json,key,value)
Vue.set(this.json,"sex","男")
```

#### 数组

后端返回了数据，但是前端自己添加了某个字段，该字段改变，页面不会渲染。

```js
// 1.取出要修改的数据
let obj=this.arr[index];
// 2.做修改
obj.sex="男"
// 3.放回去
// this.$set(this.arr,index,obj)
// Vue.set(this.arr,index,obj)
this.arr.splice(index,1,obj)
```

调用下面方法，视图都会更新：

```js
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

//练习，增 删

## 二、面试题

1.vue中检测不到数组或者对象发生改变，如何解决?

2.vue更新数组时触发视图更新的方法

3.Class 与 Style 如何动态绑定?

4.Vue中常用的修饰符有哪些?并简要说明它们的作用。

## 三、作业

1.练习 2遍；

2.作业

```
1.图书管理作业 要做
2.表单 要做
3.发布和评论 [可做可不做]
```

3.复习

```
1.Date() 获取年 月 日 时分秒 时间戳
2.原生阻止默认 阻止传播兼容写法。
3.如何让一个元素在页面上下左右居中 (3种)
```







