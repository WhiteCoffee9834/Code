import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import login from "../components/login.vue"
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: "roleManage",
        component: () => import("../views/roleManage.vue")
    }, {
        path: "menuManage",
        component: () => import("../views/menuManage.vue")
    }, {
        path: "adminManage",
        component: () => import("../views/adminManage.vue")
    }, {
        path: "memberManage",
        component: () => import("../views/memberManage.vue")
    }, {
        path: "itemCategory",
        component: () => import("../views/itemCategory.vue")
    }, {
        path: "itemSpecs",
        component: () => import("../views/itemSpecs.vue")
    }, {
        path: "swiperManage",
        component: () => import("../views/swiperManage.vue")
    }, {
        path: "itemManage",
        component: () => import("../views/itemManage.vue")
    }, {
        path: "seckill",
        component: () => import("../views/seckill.vue")
    }]
}, {
    path: "/login",
    name: "login",
    component: login
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem("user")) {
        // TAG 第一层防线--session权限验证
        // 每次访问的时候都要验证一下权限,而不是简单的next
        try {
            let userInfo = JSON.parse(sessionStorage.getItem("user"))
            // userInfo.menus_url是一个包含了可以访问的路由的数组
            if (to.fullPath == "/") {
                next()
                // 验证访问的地址是否在可允许的范围之内
            } else if (userInfo.menus_url.indexOf(to.fullPath) != -1) {
                next()
            }else{
                alert("无权访问!")
                next("/")
            }
        } catch (error) {
            alert("session数据异常")
        }
    } else if (to.fullPath == "/login") {
        next()
    } else {
        next("/login") // 强制跳转到登录
    }
})
export default router