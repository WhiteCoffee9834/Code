<template>
    <article id="login">
        <div class="imgBox">
            <img src="../image/orange.png" alt="" />
        </div>
        <div class="loginBox">
            <input type="text" v-model="username" placeholder="请输入用户名" />
            <input
                type="password"
                v-model="password"
                placeholder="请输入密码"
            />
            <button @click="login">登录</button>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login() {
            sessionStorage.setItem("user", this.username);
            this.$router.push(this.$route.query.path);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>