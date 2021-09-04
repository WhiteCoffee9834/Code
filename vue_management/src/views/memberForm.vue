<template>
<div>
    <el-dialog title="提示" :visible.sync="show.vis" width="30%">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updata('form')">修改</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    props: ["show"],
    data() {
        return {
            form: {
                phone: "", //手机号
                nickname: "", //昵称
                password: "", //密码
                status: "", //状态1正常2禁用
            },
            rules: {
                phone: [{
                    required: true,
                    message: "请填写手机号",
                    trigger: "blur"
                }],
                nickname: [{
                    required: true,
                    message: "请添加用户昵称",
                    trigger: "blur"
                }]

            },
        }
    },
    methods: {
        getInfo(uid) {
            this.$axios.get("/api/memberinfo?uid=" + uid).then(res => {
                if (res.data.code === 200) {
                    this.form = res.data.list;
                    this.form.password = ""
                }
            })
        },
        cancel() {
            this.form = {
                phone: "", //手机号
                nickname: "", //昵称
                password: "", //密码
                status: "", //状态1正常2禁用
            }
            this.show.vis=false

        },
        updata() {
            this.$refs.form.validate((result) => {
                if (result) {
                    this.$axios.post("/api/memberedit", this.form).then((res) => {
                        alert(res.data.msg);
                        // 向父组件发送 调用获取list列表，实时渲染
                        this.$emit("init");
                    });
                }
            });
            this.cancel();
        }
    }
}
</script>

<style>

</style>
