.vuex 基础知识***

### 1.官网：

https://vuex.vuejs.org/zh/

### 2.什么是vuex?

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension (opens new window)](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### 3.安装

##### npm

```
npm i vuex --save
```

##### yarn

```
npm i yarn -g
yarn add vuex
```

### 4.创建仓库

src/store/index.js

```js
import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)

//仓库里面的状态
let state = {
    name: "妲己",
    age: 20,
}

//只有mutations中的函数才可以修改state中的数据
let mutations = {
    changeWang(state) {
        state.name = "王昭君"
    },
    changeAge(state) {
        state = 100;
    }
}

export default new Vuex.Store({
    //仓库的状态（数据）
    state,
    //修改state
    mutations,
})
```

main.js引入

```js
import store from "./store"

new Vue({
  router,
  render: h => h(App),
  //仓库对象
  store
}).$mount('#app')
```

组件取数据、调方法

```vue
<div>name:{{$store.state.name}}</div>
<button @click="$store.commit('changeWang')">王昭君</button>
```


#### 3.actions

可以做异步操作|逻辑操作,一般情况下主要做ajax

```js
//可以做异步操作|逻辑操作,一般情况下主要做ajax
  actions: {
    // context是仓库本身
    asyncChangeName(context,name){
      setTimeout(()=>{
        context.commit('changeName',name)
      },1000)
    },
  
    reqArr(context){
      /*
      axios().then(res=>{
        context.commit("changeArr",res.data.list)
      })*/
    }
  },
```

触发actions中的方法:

```js
$store.dispatch('asyncChangeName','王昭君')
```

#### 4.getters

```js
//类似计算属性 computed,导出数据给组件的
  getters:{
    name(state){
      return state.name;
    },
    age(state){
      return state.age
    },
    arr(state){
      return state.arr;
    },
    info(state){
      return `我叫${state.name},年龄${state.age}`
    }
  },
```

```js
this.$store.getters.name
```

#### 5.小结

vuex是单向数据流,表单是双向数据绑定，所以有表单的地方就不要使用vuex。

state—（getters）—>组件展示的数据——(actions)——>mutations—(修改)—>state---(getters)—>组件展示—>…..

![vuex](/Users/haoliuting/Desktop/1228/day10/笔记/vuex.png)

#### 6.辅助函数

可以通过mapGetters将getters上的数据导入给组件的computed

可以通过mapActions将actions上的方法导入给组件的methods

```vue
<template>
  <div class="box">
      <h3>this is D</h3>
      <div> getters name:{{name}}</div>
      <div> getters info:{{info}}</div>
      <button @click="changeName('鲁班')">鲁班</button>
      <button @click="asyncChangeName('宫本')">宫本</button>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
  computed:{
      //...mapGetters(["name","info"]),
    	...mapGetters({
        name:"name",
        info:"info"
      }),
      a(){
          return 10;
      }
  },
  methods:{
      //...mapActions(["changeName","asyncChangeName"])
    ...mapActions({
        changeName:"changeName",
        asyncChangeName:"asyncChangeName"
      }),
  }
}
</script>
```

#### 7.mutations VS actions

```
mutations 同步操作、       可以修改state   $store.commit()触发
actions   异步操作、逻辑   不可以修改state  $store.dispatch()触发
```

#### 8.Vuex VS 本地存储

```
vuex      刷新数据没有了  ，方便组件取值，数据改变可以实时渲染
本地存储  刷新数据还在  ，取值不方便，不会实时渲染
```

#### 9.vuex中数组变了，页面不渲染，怎么解决？

```js
arr.splice()
Vue.set()
```

#### 10.模块化

```js
new Vuex.Store({
	state:{},
  mutations:{},
  actions:{},
  getters:{},
  modules:{
    home:{
      state:{},
      mutations:{},
      actions:{},
      getters:{},
      namespaced:true,//命名空间
    }
  }
})
```
/*  */


