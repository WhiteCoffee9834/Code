<template>
<article>
    <!-- 每次关闭表单的时候重置表单内容 -->
    <el-dialog title="添加角色" :visible.sync="show.visible" @close="reset">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :rules="rules">
            <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="form.rolename"></el-input>
            </el-form-item>
            <el-form-item label="角色权限">
                <!-- 当严格检查时,全选将会失效 -->
                <el-tree
                    id="tree"
                    ref="tree"
                    node-key="id"
                    :data="roleMenus"
                    :props="{label:'title'}"
                    :show-checkbox='true'
                    :check-strictly="true"
                    :default-checked-keys="nodekeys"
                    :default-expanded-keys="nodekeys"></el-tree>
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
                id: "",
                rolename: "", // 角色名称
                menus: "", // 角色权限
                status: 1 // 角色状态
            },
            rules: {
                rolename: [{
                    required: true,
                    message: "请输入角色名称",
                    trigger: "blur"
                }, {
                    min: 3,
                    max: 15,
                    message: "长度在 3 到 15 个字符",
                    trigger: "blur"
                }]
            },
            roleMenus: [], // 获取用户权限
            nodekeys: [] // 获取权限,转成数字
        }
    },
    methods: {
        // 重置表单
        reset() {
            this.form = {
                rolename: "",
                menus: "",
                status: 1
            }
            this.nodekeys = []
        },
        // 表单验证并发送请求
        valideForm(formname) {
            this.$refs[formname].validate(result => {
                if (result) {
                    alert("Success!")
                    console.log(this.form)
                    let url = "/api/roleadd"
                    if (this.form.id) {
                        url = "/api/roleedit"
                    }
                    // 把权限也传递到数据库中,使用getCheckedKeys来获取node-key中的值
                    this.form.menus = this.$refs.tree.getCheckedKeys().join(",")
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
        getInfo(id) {
            this.$axios.get("/api/roleinfo?id=" + id).then(res => {
                if (res.data.code == 200) {
                    this.form = res.data.list
                    this.form.id = id
                    console.log(this.form.menus)
                    this.nodekeys = this.form.menus.split(",")
                    console.log(this.nodekeys)
                }
            })
        },
        // 获取角色权限选择框
        getRoleMenus() {
            this.$axios.get("/api/menulist?istree=1").then(res => {
                if (res.data.code == 200) this.roleMenus = res.data.list
            })
        }
    },
}
</script>