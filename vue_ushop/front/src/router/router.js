import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../components/homepage.vue'
import category from '../components/category.vue'
import itemList from '../components/itemList.vue'
import person from '../components/person.vue'
import shopCart from '../components/shopCart.vue'
import login from "../components/login.vue"
import reg from "../components/reg.vue"
Vue.use(VueRouter)

const routes = [{
        // TAG 主页跳转
        path: '/',
        redirect: "homepage"
    },
    // TAG 首页路由
    {
        path: "/homepage",
        name: "homepage",
        component: homepage,
        meta: {
            title: "商城首页"
        }
    },
    // TAG 分类路由
    {
        path: "/category",
        name: "category",
        redirect: "/category/msgj",
        component: category,
        // TAG 分类子路由
        children: [{
            path: ":name",
            component: () => import("../views/child.vue"),
            meta: {
                title: "分类页"
            }
        }],
    },
    // TAG 畅销商品路由
    {
        path: "/itemList",
        name: "itemList",
        component: itemList,
        meta: {
            title: "畅销商品列表"
        }
    },
    // TAG 商品详情路由
    {
        path: "/detail/:id",
        name: "detail",
        component: () => import("../views/detail.vue"),
        meta: {
            navHidden: true,
            title: "商品详情"
        }
    },
    // TAG 个人中心路由
    {
        path: "/person",
        name: "person",
        component: person,
        meta: {
            title: "个人中心",
        }
    },
    // TAG 购物车路由
    {
        path: "/shopCart",
        name: "shopCart",
        component: shopCart,
        meta: {
            title: "购物车",
            needLogin: true
        }
    },
    // TAG 用户登录路由
    {
        path: "/login",
        name: "login",
        component: login,
        meta: {
            title: "用户登录"
        }
    },
    // TAG 用户注册路由
    {
        path:"/reg",
        name:"reg",
        component:reg,
        meta:{
            title:"用户注册"
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(item => item.meta.needLogin)) {
        if (sessionStorage.getItem("user")) {
            next()
        } else {
            alert("你还没有登录,请先登录")
            router.push("/login?path=" + (to.fullPath).slice(1))
        }
    } else {
        next()
    }
})
// 全局后置守卫,用于显示网页标题
router.afterEach(to => {
    document.title = to.meta.title
})
export default router