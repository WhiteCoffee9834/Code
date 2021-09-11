# vue

## 一、介绍



> Vue是一套用于构建用户界面的渐进式框架

### 1.渐进式的理解

Vue 的核心库只关注视图层

便于与第三方库或既有项目整合

与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用,也可为应用提供驱动	

### 2.环境安装

<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

vue-cli方式（新手不推荐)

### 3.数据驱动

vue用的是数据驱动的思路 数据改变了，视图会“自动"改变

### 4.虚拟dom和diff算法使数据改变时视图变化的dom操作效率很高

​	 虚拟dom(js对象,对象里存储的是模板的内容调用render函数返回的对象)

​         数据改变了，比对数据变化前后的对象的差异(diff算法）, 找出变化的部分，对变化的部分做真实的dom操作, 提高dom操作的效率

###5、MVVM

      M  model 模型    存储数据    data
      V  view  视图    模板（template) 
      VM viewModel 视图模型    vm
### 6、检查的数据的变化的原理  Object.defineProperty 

  数组用下标改变，或者对象增加属性，这样的改变数据
  是不能触发视图更新的，要用 Vue.set(对象,属性，值) 或this.$set(对象,属性，值)

### 7、学习的五大部分  ( 指令 组件  路由 vuex  第三方的插件)

## 二、helloworld程序

###	1、一个基本的程序结构

	new Vue（｛
			  el：“挂载的元素” 挂载的元素不能是body或html
			  data:{ key:value...}  存储数据的地方
			  template："<div>模板的内容" ，渲染数据的是模板  ,如果没有指定template,默认的模板就是el挂载的元素，如果el和template同时存在，
			  	渲染的是template模板的内容
	         ｝）
### 2、插值表达式  {{插值表达式}}  Mustache

​        不能为 if for 这样的语句。可以调用函数，可以写表达式

### 3、模板 template 

       1) template和el同时存在 渲染的是template的内容
       2) 模板的内容不能只是文本
       3)根元素只能有一个
### 4、computed

~~~js
computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
~~~

~~~js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
~~~

### 5、watch

~~~js
watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true
    },
~~~



+ 模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护,所以，对于任何复杂逻辑，你都应当使用**计算属性**

  ​

  ​

## 三、指令

### 1、v-bind

- 把变量的值绑定到标签的属性上  可以简写为“:"
- v-bind:style="{key:value....}"   对象的形式
- v-bind:class="{'类名':布尔值的表达式}"  常用
- v-bind:class="[类名1，类名2...]"

### 2、v-on

+ 事件监听的指令  v-on:事件="事件处理函数"
+ 事件处理函数是放在methods里面
+ $event 事件对象 （事件处理函数调用时不传参数 默认 传递的参数是$event)
+ 阻止冒泡 v-on:事件.stop，阻止默认的行为 v-on:事件.prevent （.stop .prevent 指令的修饰符)
+ 简写为 @
+ 监听键盘事件  v-on:keyup.enter 回车  v-on:keyup.esc      esc键

### 3、v-if

~~~html
 例如:
        <p v-if="a>0">1</p>
        <p v-else-if="a===0">0</p>
        <p v-else>-1</p>
~~~

是惰性的 条件不满足，不渲染 有更高的切换开销

### 4、v-show

+ 满足条件显示，不满足条件的就隐藏。

  不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换

+  有更高的初始渲染开销

### 5、v-for

+ 遍历数组  (item,index) in array     要指定key值  表示列表中的每一项的标识
+ 遍历对象 (value,key,index) in obj
+ 遍历 数字 从1开始
+ 遍历字符串
+ 不要把v-for 和v-if用在用一个元素上，因为v-for优先级比v-if高

### 6、v-once

​	只渲染元素和组件**一次**。 例如   <span v-once>{{n}}</span>

### 7、v-model

>实现表单输入和应用状态之间的双向绑定

**修饰符**：

- [`.lazy`](https://cn.vuejs.org/v2/guide/forms.html#lazy) - 取代 `input` 监听 `change` 事件
- [`.number`](https://cn.vuejs.org/v2/guide/forms.html#number) - 输入字符串转为有效的数字
- [`.trim`](https://cn.vuejs.org/v2/guide/forms.html#trim) - 输入首尾空格过滤

### 8、v-html  

  更新元素的 `innerHTML`。**注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译**

### 9、v-text

更新元素的 `textContent`。如果要更新部分的 `textContent`，需要使用 `{{ Mustache }}` 插值。

<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>

### 10、v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译

### 11、v-cloak

   这个指令保持在元素上直到关联实例结束编译

## 二、组件

> 页面中的一部分，可以复用, 本质上是一个拥有预定义选项的一个 Vue 实例

### 1.组件的定义和使用

- 全局组件的定义  

  ~~~js
  Vue.component("组件的名字",{
  	               template:"<div>组件模版的内容</div>"   template 必须有
  	           })组件的使用
  ~~~

-  局部注册组件的定义 (常用)

  ~~~js
  var 组件的名字 = {
  					template:"<div>组件的内容</div>"
                  }
  ~~~

- 局部组件的注册

  new Vue({

                  	.....
      					components:{   ／／局部注册
      						key:组件的名字
      					}
                  	.....
                  	})


- 组件的使用  <组件的名字></组件的名字>

- 注意事项

  -  使用时成对标记
  -  名字时驼峰命名的，改为“－”的形式
  -  不能和现有标签重名

  ​

### 2.组件的data选项

   ~~~js
data(){  //为了保证每个组件的实例数据是独立的
				return {
					key:value
				}
			}
   ~~~



### 3.组件的事件监听修饰符.native

### 4.组件的传值

+ 父组件给子组件传值

  + <组件  属性="传改子组件的值"></组件>（v-bind:属性="识别数据类型和变量"  不用v-bind 传递的都是字符串）

  + 子组件通过props选项接收值

    + props:["属性"]

    + ~~~js
      props:{
             	  属性：类型
             }

      props:{验证
             	 属性：{
             	 	type:类型，
             	 	required：true  必须传递这个属性
             	 	default:值  设置默认值
             	 	validator(值){
             	 		return 布尔表达式
             	 	}
             	 }

             }
      ~~~

    + 父组件传给子组件的值不能更改，单向数据流（可以把这个值赋值给子组件data里的变量，可以更改子组件里data里的那个变量）

+ 子组件向父组件传值

  + 父组件先监听自定义事件 v-on：自定义事件
  + 子组件发送数据 this.$emit("事件的名字"，“数据“)
  + 父组件通过执行事件处理函数，通过事件对象拿到子组件传过来的值

+ 兄弟组件的传值  

  + 通过公共的父组件进行传值

  + 通过vuebus传值

    + Vue的实例上有连个方法 $on $emit 

          1） vuebus = new Vue()   也可以用公共的父组件 this.$parent    this.$root

          2) 发送  vuebus.$emit("事件","数据")

          3) created  vuebus.$on("事件",(data)=>{ }) data 就是拿到的数据

### 5.生命周期钩子函数

组件整个生命周期能被自动调用的函数，就是生命周期的钩子函数

- beforeCreate

        在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
        访问不到数据

- created   在实例创建完成后被立即调用 可以获取数据

- beforeMount

  ~~~
  在挂载开始之前被调用

  可以访问数据  编译模板结束，虚拟dom已经存在
  ~~~

- mounted

      可以拿到节点和数据  常用
      实例被挂载后调用
      ref表示节点
      this.$refs.ref的标识 就可以拿到节点了

- beforeUpdate

  ~~~
  数据更新时调用，发生在虚拟 DOM 打补丁之前
  ~~~


- updated  

~~~
   常用的  监控数据的变化
   由于数据更改导致的虚拟 DOM 重新渲染和打补丁
   watch 是监控特定数据的变化，updated是监控组件里所有数据的变化
~~~

- beforeDestroy实例销毁之前调用  清理资源，防止内存的泄露
- destroyed 实例销毁后调用。该钩子被调用后

### 6、动态组件

  <component :is="存储组件的名字的变量"></component>

       keep-alive
      activated 被 keep-alive 缓存的组件激活时调用。
      deactivated 被 keep-alive 缓存的组件停用时调用。
### 7.插槽(slot)  

     		<slot></slot>匿名插槽  
    		<slot name="插槽名"><slot> 具名插槽
             <组件> <tag slot="插槽的名字"></tag></组件>(old)
              <template v-slot:插槽的名字="子组件通过插槽传过来的数据">....</template> 
              v-slot: 可以简写为#  #插槽的名字="子组件通过插槽传过来的数据"  
              <slot :属性="变量"></slot>  数据插槽

## 三、脚手架（vue-cli）

### 1.安装和使用

          npm i @vue/cli -g  
          vue -V 能看到版本号就按照成功了。
          vue create 项目的名字
          cd 项目的名字
          yarn serve  (npm run serve)
          在浏览器 http://localhost:8080
          
          default  babel   es6-->es5
                   eslint  语法格式检查工具
### 2.脚手架基本的目录结构

**1.node_moules文件**
node_moules：存放的是npm加载的项目依赖模块 ，以后要添加依赖也是放在这个里面

**2.src文件**

~~~
src：放置组件和入口文件。
assets：主要存放一些静态图片资源的目录。(css 等也可放在这里)
views :放置的为公共组件(主要还是各个主要页面)
components：(自定义功能组件)这里存放的是开发需要的的各种组件，各个组件联系在一起组成一个完整的项目。
router：存放了项目路由文件。
App.vue：是项目主(/根)组件，也是项目所有组件和路由的出口，之后它会被渲染到项目根目录的 index.html 中显示出来，我们可以在这里写一些适合全局的css样式。
main.js：入口文件，引入了vue模块和app.vue组件以及路由router，我们需要在全局使用的一些东西也可以定义在这里面。
store.js: 为vuex的文件
~~~

**3.其他文件**

~~~
.babelrc：ES6语法编译配置。
.editorconfig：代码编写规格。
.eslintignore：项目的根目录中创建文件来告诉ESLint忽略特定的文件和目录，该文件是纯文本文件。
.eslintrc.js：eslint的配置文件，eslint是用来管理和检测js代码风格的工具，可以和编辑器搭配使用，如vscode的eslint插件，当有不符合配置文件内容的代码出现就会报错或者警告。
.gitignore：忽略的文件。
.postcssrc.js：兼容选项（如果已经安装postcss，需要一大堆loader配置，这时项目根目录会生成“.postcssrc.js”文件）。
package.json：项目及工具的依赖配置文件。只是粗略的版本,具体依赖于
paxkage-lock.json(这个文件十分重要不可丢失)
README.md：项目说明。
~~~




### 3.单文件组件(.vue) 

 (vue-loader  把单文件组件解析为标准的vue组件)

    	<template></template>
    	<script></script>
    	<style></style>
### 4.es6 模块化

		导入  import 变量 from '组件的路径'
		导出  export   引入的时候，变量名 {导出时的变量名}  默认导出 export default   导入时变量名是任意的
		export const a=5;
		import {a} from '...'
		
		export default a    默认导出只能有一个
		import c from '...'

### 5.脚手架有一个“热更新"能力 

 (webpack-dev-server 默认端口 8080)

### 6.style scoped 属性

加上后，样式只对当前组件生效

### 7.vetur 插件	 

vue 回车  产生vue单文件组件的模板

### 8.项目的配置文件 vue.config.js

**修改后重启生效**

    module.exports = {
      devServer: {
          overlay: { //让我们的浏览器关闭掉遮盖层的错误代码提示
              warnings: false,
              errors: false
          }
      },
      lintOnSave: false //直接关闭eslint检查
    }
    局部组件的组件的声明
          var Demo ={
      			template:"<div>demo</div>"
    		}
    	会报这个警告
    	   You are using the runtime-only build of Vue where the template compiler is not available.
    	 解决方案
    	 module.exports = {
        configureWebpack: {
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.esm.js'
                }
            }
        }
    }
### 9.@ 代表"src"  alias 别名

### 10.单页应用（SPA)

## 四、axios 

### 1.安装 

npm i axios --save

### 2.使用

~~~
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
 axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(function(res) {
    console.log(res)
    });
~~~

### 3.获取数据后异步传值 

​    v-if 可以保证数据返回后再渲染组件

### 4.axios的重复引用问题

可以再入口文件  main.js
import axios from 'axios';

Vue.prototype.$axios=axios

**把请求的所有方法，都封装起来，需要请求时调用**

### 5.请求中的跨域问题

~~~
 1)后端   cors 
    res.setHeader("Access-Control-Allow-Origin","*");
 2) 前端 正向代理
    vue.config.js
    module.exports ={
   devServer:{  //开发服务器设置
       proxy:{   //代理
         "/hd":{
             "target":"http://localhost:3000",
             "changeOrigin":true,
             "pathRewrite":{
                 "^/hd":""
             }
         }
       }
   }
   }
~~~

~~~
$nextTick
this.$nextTick(callback)
nextTick 延迟执行回调函数，直到dom就绪
~~~

## 五、路由

>   前端路由:根据不同的url切换组件
>
>   后端路由:根据不同的请求返还不同的内容

### 1.安装

​	npm i vue-router —save   

​       (router-view   router-link)

### 2.使用路由的步骤

~~~
1) 引入vuerouter  
			import VueRouter from 'vue-router'
2) Vue.use(VueRouter)  使用VueRouter 
3) 实例化
        var router = new VueRouter({   // this.$router.push  replace go back forward
        	   routes:[
        	   		{              //路由对象  params  query path   this.$route
        	   			path:'xxx',
        	   			component:Com
        	   		}....
        	   ]
        	})
4) new Vue({
		   ....
		      router
		   ...
		})
        
5) App.vue   <router-view />
        <router-link to="/one">xxx</router-link>
~~~

### 3.路由的两种模式

​      history 模式      hash 模式

~~~
异步组件
component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
配置sass
   npm i node-sass sass-loader --save-dev
   <style lang="scss">   嵌套 混合 继承     
~~~

### 4.路由的重定向 redirect

### 5.命名路由  name 

### 6.别名: alias 

### 7.命名视图   

~~~
<router-view name="xxx" />
  {

  	path:xxx,

  	components:{

  		default:组件，  

  		router-view的名字:渲染组件;

  	}
  }
~~~

### 8.当前路由样式

router-link-exact-active 

router-link-active  (子路由有样式，父路由也有)

### 9.404页面

~~~
{
   path:"**",
   component:NotFound,
}
~~~

### 10.路由的元数据(meta)

### 11.路由传参

#### 1)传递少量参数	

~~~
{
  path:'/xxx/:p',
  component:Xxx
}
this.$route.paramms.p(参数变量)
~~~

####   2)监控参数变化

~~~
 watch:{
     $route:{
         handler(n){  n 相当于this.$route
                n.meta.flag 可以拿到路由的元数据
         },
     	immediate:true
   }
}
~~~

####    3)编程式导航

​    适合传多个参数

~~~
 this.$router.push({name:'xxx',params:{key:value....},query:{key:vaule...}})
 跳转到名字叫 xxx路由对象,带过去params对象里的参数，并且把query里的健值对放到？后面
 
 拿到query 传的值  this.$route.query.变量
~~~

### 12.路由过渡效果

   v-enter
   v-enter-active 
   v-enter-to
   v-leave
   v-leave-active
   v-leave-to

   <transtion mode="out-in"> out-in 是表示先退场再进场
   		<router-view />
   </transtion>

使用animate.css

~~~
public/index.html
     <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/3.7.2/animate.css" rel="stylesheet">
    <transition mode="out-in" enter-active-class="animated slideInLeft" 
    leave-active-class="animated slideOutLeft">
    https://daneden.github.io/animate.css/ (animate.css网站)
~~~

### 13.导航守卫



       全局守卫
          beforeEach(to,from,next)  to 就是切换到路由的对象  from 当前路由的对象  next跳转
          afterEach(to,from)
      路由独享的守卫
           beforeEnter
      组件内的守卫
            路由进入之前
           beforeRouteEnter( 比beforeCreate要早)
           next((vm)=>{
             	vm.组件里的数据
           })
           //路由更新之前  
           beforeRouteUpdate
           //路由离开之前
           beforeRouteLeave

## 六、vuex				

>vuex 是一个状态管理工具 (store是唯一的  存数据   取数据 改数据)

### 1.使用步骤

- npm i vuex --save

- import Vuex from 'vuex'

- Vue.use(Vuex)

- 实例化

  ~~~
  var store = new Vuex.Store({
       state:{
  		n:666
      }，
      mutations:{
  		XXX(state,payload){
  			state.n+=payload
  	   }
      }
    })
  ~~~

- 在实例中注册

  ~~~
  new Vue({
  	...
  	 store,
  	...
  })
  ~~~

### 2.mutations

​    同步改变数据

~~~
mutaions:{
		XXX(state,payload){
			state.n+=payload
	   }
    }
~~~

​    this.$store.commit("mutations里的方法名",参数)

### 3.getters

​    仓库里的计算属性

    getters:{  
        属性(state){
            return 计算属性的值
         }
     }
### 4.actions  

​     异步方法

   ~~~
  异步方法(context,payload){
       异步成功的回调里   context.commit("mutaions里的同步方法",传参)
    }
   ~~~

 this.$store.dispatch("actions里的异步方法","参数");

### 5.modules

- 分模块

~~~js
var 模块={
   state:{},mutations:{},actions:{}
}

new Vuex.Store({
   modules:{
    模块的名字:引入的模块，....
   }
})

 state 有区别   this.$store.state.模块名.变量
 其他的mutations actions,getters里的方法调用和之前一样
~~~

+ 分模块后的重名问题

  如果getters 重名会报错
  mutaions方法重名,各个模块的里的这个方法都会调用
  actions方法重名,各个模块里的方法都会调用

   namespaced: true, 命名空间

   启用命名空间后，mutations或actions 方法名  变为  模块名/方法名

### 6.四个辅助函数               

~~~
  ...mapState("模块名","变量")    {{模块名.变量}}

  ...mapGetters({
	  变量: 模块名/变量
	})
  ...mapMutations({
      方法名: 模块名/mutaions里的方法名
  })
  ...mapActions({
     方法名:模块名/actions里的方法名
  })
~~~



​       



​    