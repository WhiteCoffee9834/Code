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
            this.$axios.post("/api/login",{phone:this.username,password:this.password}).then(res=>{
                if(res.data.code == 200){
                    sessionStorage.setItem("user", res.data.list.nickname);
                    alert("登录成功")
                    this.$router.push(this.$route.query.path);
                }else{
                    alert(res.data.msg)
                    this.username=""
                    this.password=""
                }
            })
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>