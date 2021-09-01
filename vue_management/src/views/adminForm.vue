<template>
<article>
    <!-- 每次关闭表单的时候重置表单内容 -->
    <el-dialog title="添加管理员" :visible.sync="show.visible" @close="reset">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :rules="rules">
            <el-form-item label="所属角色" prop="roleid">
                <el-select v-model="form.roleid">
                    <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :value="item.id"
                        :label="item.rolename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名称" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>

            <el-form-item label="状态">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="show.visible = false">取 消</el-button>
            <el-button type="primary" @click="valideForm('form')" v-if="show.isAdd == true">确 定</el-button>
            <el-button type="primary" @click="valideForm('form')" v-else>修 改</el-button>
        </div>
    </el-dialog>
</article>
</template>

<script>
export default {
    props: ["show"],
    data() {
        return {
            form: {
                roleid: "",
                username: "",
                password: "",
                status: 1
            },
            rules: {
                roleid: [{
                    required: true,
                    message: "请选择角色名称",
                    trigger: "blur"
                }],
                username: [{
                    required: true,
                    message: "请输入用户名称",
                    trigger: "blur"
                }, {
                    min: 3,
                    max: 15,
                    message: "长度在 3 到 15 个字符",
                    trigger: "blur"
                }]
            },
            roleList: [], // 获取角色列表
        }
    },
    methods: {
        // 重置表单
        reset() {
            this.roleList = []
            this.form = {
                roleid: "",
                username: "",
                password: "",
                status: 1
            }
        },
        // 表单验证并发送请求
        valideForm(formname) {
            this.$refs[formname].validate(result => {
                if (result) {
                    alert("Success!")
                    let url = "/api/useradd"
                    if (this.form.uid) {
                        url = "/api/useredit"
                    }
                    this.$axios.post(url, this.form).then(res => {
                        if (res.data.code == 200) {
                            this.$emit("init6")
                        }
                    }).finally(() => {
                        this.reset()
                        this.show.visible = false
                    })
                } else {
                    alert("格式错误")
                }
            })
        },
        // 获取编辑时表单中的默认值
        getInfo(uid) {
            this.$axios.get("/api/userinfo?uid=" + uid).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.form = res.data.list
                    this.form.password = "" // 密码不应该显示在页面上
                }
            })
        },
        // 获取角色列表
        getRoleList() {
            this.$axios.get("/api/rolelist").then(res => {
                if (res.data.code == 200) this.roleList = res.data.list
            })
        }
    },
}
</script>