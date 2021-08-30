import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
// 将每个axios请求都走一遍拦截器,因此这里不是直接引入axios
import axios from "@/interceptor"
import store from "@/store"
// 把axios绑定到原型上,这样不用每一个页面都进行引入操作
Vue.prototype.$axios = axios
Vue.prototype.$bus = new Vue
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')