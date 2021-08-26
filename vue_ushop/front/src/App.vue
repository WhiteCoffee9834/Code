<template>
    <div id="app">
        <footer>
            <router-link to="/homepage" tag="div" class="menu">商城</router-link>
            <router-link to="/category" tag="div" class="menu">分类</router-link>
            <router-link to="/itemList" tag="div" class="menu">购物车</router-link>
            <router-link to="/person" tag="div" class="menu">我</router-link>
        </footer>
        <router-view />
    </div>
</template>

<style lang="scss">
html {
    font-size: 26.667vw;
}
body {
    font: 12px/1.5 "Segoe UI";
    a {
        text-decoration: none;
    }
    ul {
        list-style-type: none;
    }
}

footer {
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 0.83rem;
    box-shadow: 0 -5px 10px 0 rgba(0, 0, 0, 0.3);
    z-index: 10;

    .menu {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        font-size: 0.16rem;
        cursor: pointer;
    }
    .router-link-active{
        background-color: pink;
    }
}
</style>
