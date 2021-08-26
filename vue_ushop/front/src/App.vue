<template>
    <div id="app">
        <footer v-show="visable">
            <router-link to="/homepage" tag="div" class="menu">商城</router-link>
            <router-link to="/category" tag="div" class="menu">分类</router-link>
            <router-link to="/shopCart" tag="div" class="menu">购物车</router-link>
            <router-link to="/person" tag="div" class="menu">我</router-link>
        </footer>
        <router-view />
    </div>
</template>
<script>
export default {
    data(){
        return{
            visable:true
        }
    },
    watch:{
        $route:{
            // 监视底部导航栏消失
            handler(n){
                this.visable = !n.meta.navHidden
            }
        }
    }
}
</script>
<style lang="scss">
@import "./assets/scss/base.scss";
</style>
