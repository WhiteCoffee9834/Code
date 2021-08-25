import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../components/homepage.vue'
import category from '../components/category.vue'
import itemList from '../components/itemList.vue'
import person from '../components/person.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect:"homepage"
    },
    {
        path:"/homepage",
        name:"homepage",
        component:homepage
    },
    {
        path: "/category",
        name: "category",
        component: category,
        children:[
            {
                path:"mz",
                component:()=> import("../views/mz.vue")
            },
        ]
    },
    {
        path:"/itemList",
        name:"itemList",
        component:itemList
    },
    {
        path:"/person",
        name:"person",
        component:person
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