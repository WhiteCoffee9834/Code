import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import login from "../components/login.vue";
const roleManage = () => import("../views/roleManage.vue");
const menuManage = () => import("../views/menuManage.vue");
const adminManage = () => import("../views/adminManage.vue");
const memberManage = () => import("../views/memberManage.vue");
const itemCategory = () => import("../views/itemCategory.vue");
const itemSpecs = () => import("../views/itemSpecs.vue");
const swiperManage = () => import("../views/swiperManage.vue");
const itemManage = () => import("../views/itemManage.vue");
const seckill = () => import("../views/seckill.vue");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "roleManage",
                component: roleManage
            },
            {
                path: "menuManage",
                component: menuManage
            },
            {
                path: "adminManage",
                component: adminManage
            },
            {
                path: "memberManage",
                component: memberManage
            },
            {
                path: "itemCategory",
                component: itemCategory
            },
            {
                path: "itemSpecs",
                component: itemSpecs
            },
            {
                path: "swiperManage",
                component: swiperManage
            },
            {
                path: "itemManage",
                component: itemManage
            },
            {
                path: "seckill",
                component: seckill
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: login
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem("user")) {
        // TAG ???????????????--session????????????
        // ?????????????????????????????????????????????,??????????????????next
        try {
            let userInfo = JSON.parse(sessionStorage.getItem("user"));
            // userInfo.menus_url????????????????????????????????????????????????
            if (to.fullPath == "/") {
                next();
                // ??????????????????????????????????????????????????????
            } else if (userInfo.menus_url.indexOf(to.fullPath) != -1) {
                next();
            } else {
                alert("????????????!");
                next("/");
            }
        } catch (error) {
            alert("session????????????");
        }
    } else if (to.fullPath == "/login") {
        next();
    } else {
        next("/login"); // ?????????????????????
    }
});
export default router;
