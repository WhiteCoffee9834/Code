import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from "../views/login.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:"roleManage",
        component:()=> import ("../views/roleManage.vue")
      },
      {
        path:"menuManage",
        component:()=> import ("../views/menuManage.vue")
      },
      {
        path:"adminManage",
        component:()=> import ("../views/adminManage.vue")
      }
    ]
  },
  {
    path:"/login",
    name:"login",
    component:login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(sessionStorage.getItem("user")){
    next()
  }else if (to.fullPath == "/login"){
    next()
  }else{
    next("/login") // 强制跳转到登录
  }
})
export default router
