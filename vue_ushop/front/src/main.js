import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import axios from "axios"
// 把axios绑定到原型上,这样不用每一个页面都进行引入操作
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')