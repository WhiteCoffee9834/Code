<template>
<article id="login">
    <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules">
        <el-form-item label="用户名称" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="valideForm('form')">Login</el-button>
        </el-form-item>
    </el-form>
</article>
</template>

<script>
import {mapActions} from "vuex"
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [{
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur"
                },{
                    min:3,
                    max:15,
                    trigger:blur,
                    message:"字符应为 3 到 15 位"
                }]
            }
        }
    },
    methods: {
        valideForm(form){
            this.$refs[form].validate((result)=>{
                if(result){
                    // 当登录成功后执行then中的数据
                    this.login({username:this.form.username,password:this.form.password}).then((res)=>{
                        if(res == "Success"){
                            this.$router.replace("/")
                        }else{
                            alert("登录失败")
                        }
                    })
                }
            })
        },
    ...mapActions(["login"])
    },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>