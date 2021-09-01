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
            <button @click="reg">注册</button>
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
        reg() {
            if (this.username.trim() != "" || this.password.trim() != "") {
                this.$axios
                    .post("/api/register", {
                        phone: this.username,
                        nickname: this.username,
                        password: this.password,
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            alert("注册成功,即将返回登录页");
                            this.$router.replace("/login");
                        } else {
                            alert(res.data.msg);
                            this.username = "";
                            this.password = "";
                        }
                    });
            }else{
                alert("请勿输入空值")
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>