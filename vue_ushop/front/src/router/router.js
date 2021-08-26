import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../components/homepage.vue'
import category from '../components/category.vue'
import itemList from '../components/itemList.vue'
import person from '../components/person.vue'
import shopCart from '../components/shopCart.vue'

Vue.use(VueRouter)

const routes = [{
    // TAG 主页跳转
        path: '/',
        redirect:"homepage"
    },
    // TAG 首页路由
    {
        path:"/homepage",
        name:"homepage",
        component:homepage
    },
    // TAG 分类路由
    {
        path: "/category",
        name: "category",
        redirect:"/category/jydq",
        component: category,
        // TAG 分类子路由
        children:[
            {
                path:"jydq",
                component:()=> import("../views/jydq.vue")
            },
            {
                path:"sjtx",
                component:()=> import("../views/sjtx.vue")
            },
            {
                path:"dnbg",
                component:()=> import("../views/dnbg.vue")
            },
            {
                path:"jj",
                component:()=> import("../views/jj.vue")
            },
            {
                path:"fz",
                component:()=> import("../views/fz.vue")
            },
            {
                path:"ds",
                component:()=> import("../views/ds.vue")
            },
            {
                path:"kt",
                component:()=> import("../views/kt.vue")
            },
            {
                path:"xyj",
                component:()=> import("../views/xyj.vue")
            },
            {
                path:"sj",
                component:()=> import("../views/sj.vue")
            },
            {
                path:"bjb",
                component:()=> import("../views/bjb.vue")
            },
        ]
    },
    // TAG 畅销商品路由
    {
        path:"/itemList",
        name:"itemList",
        component:itemList
    },
    // TAG 商品详情路由
    {
        path:"/detail/:id",
        name:"detail",
        component:()=> import ("../views/detail.vue"),
        meta:{
            navHidden:true
        }
    },
    // TAG 个人中心路由
    {
        path:"/person",
        name:"person",
        component:person
    },
    // TAG 购物车路由
    {
        path:"/shopCart",
        name:"shopCart",
        component:shopCart
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router