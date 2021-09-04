<template>
<el-container>
    <el-header>
        <h2>XXX大型后台管理系统</h2>
        <div v-if="$store.state.user" class="userBox">
            <span>欢迎 {{$store.state.user.username}}</span>
            <el-button @click="logout">注销</el-button>
        </div>
    </el-header>
    <el-container>
        <el-aside style="width:200px">
            <el-menu router active-text-color="#ffd700">
                <el-menu-item index="/">
                    <i class="el-icon-lollipop"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu :index="index.toString()" v-for="(item,index) in menus" :key="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{item.title}}</span>
                    </template>
                    <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.url">{{subItem.title}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    name: "Home",
    components: {

    },
    computed:{
        // 根据用户的权限的不同显示不同的菜单
        ...mapGetters(["menus"])
    },
    data() {
        return {
            // menus: []
        }
    },
    // created() {
    //     this.$axios.get("/api/menulist?istree=1").then(res => {
    //         if (res.data.code == 200) {
    //             this.menus = res.data.list
    //         }
    //     })
    // },
    methods: {
        logout(){
            sessionStorage.removeItem("user")
            this.$router.replace("/login")
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/Home.scss"
</style>
