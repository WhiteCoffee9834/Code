<template>
<article>
    <!-- 每次关闭表单的时候重置表单内容 -->
    <el-dialog title="添加菜单" :visible.sync="show.visible" @close="reset">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="菜单名称" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单" prop="pid">
                <el-select v-model="form.pid" placeholder="请选择上级菜单">
                    <el-option label="顶级菜单" value="0"></el-option>
                    <el-option :label="item.title" :value="item.id" v-for="item in menuData" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单类型">
                <el-radio-group v-model="form.type">
                    <el-radio v-model="radio" label="1">图标</el-radio>
                    <el-radio v-model="radio" label="2">地址</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="菜单地址" v-if="form.type == 2">
                <el-input type="textarea" v-model="form.url" placeholder="输入菜单地址"></el-input>
            </el-form-item>
            <el-form-item label="图标地址" v-else>
                <el-input type="textarea" v-model="form.icon" placeholder="输入图标名称"></el-input>
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
    // 接收父组件传过来的值
    props: ["show", "menuData"],
    data() {
        return {
            form: {
                pid: "", // 上级分类编号,pid字段必须添加,0表示顶级
                title: "", // 菜单名称
                icon: "", // 图标
                type: "2", // 类型 1为目录,2为菜单
                url: "", // 菜单地址
                status: 1, // 状态 1为正常,2为禁用
            },
            radio: "1",
            rules: {
                // 需要与上面的form内容中的名字一致.这里验证菜单名称,所以名字使用title
                title: [{
                        // 必要项
                        required: true,
                        message: '请输入菜单名称',
                        trigger: 'blur'
                    },
                    {
                        // 最大最短长度约束
                        min: 3,
                        max: 15,
                        message: '长度在 3 到 15 个字符',
                        trigger: 'blur'
                    }
                ],
                pid: [{
                    required: true,
                    message: "请选择上级菜单",
                    trigger: "blur"
                }]
            }
        }
    },
    methods: {
        // 点击保存修改,已合并
        /* change() {
            // this.form是一个对象,因此可以直接在这里当作参数传递
            this.$axios.post("/api/menuedit", this.form).then(res => {
                this.$emit("init6")
            }).finally(() => {
                this.reset()
                this.show.visible = false
            })
        }, */
        // 这个方法被父组件调用,用于编辑时能够再表单项中显示默认值而不是空值
        getInfo(id) {
            this.$axios.get("/api/menuinfo", {
                params: {
                    id
                }
            }).then(res => {
                if (res.data.code == 200) {
                    this.form = res.data.list
                    this.form.id = id
                }
            })
        },
        // 进行表单验证
        // 增加与修改合并为一个方法
        valideForm(formname) {
            // 这里可以直接this.$refs.form.validate,不需要传参,因为只有一个表单
            this.$refs[formname].validate((result) => {
                if (result) {
                    alert("Success!")
                    console.log(this.form)
                    let url = "/api/menuadd"
                    if(this.form.id){ // 如果已经存在form.id,那么则是修改功能,否则是增加
                        url = "/api/menuedit"
                    }
                    // 发送请求,根据url的不同,后端路由判断是添加或修改
                    this.$axios.post(url, this.form).then(res => {
                        console.log(res.data)
                        if (res.data.code == 200) {
                            // 向父组件发送一个请求,动态更新视图
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
        // 重置表单内容
        reset() {
            this.form = {
                pid: "",
                title: "",
                icon: "",
                type: "2",
                url: "",
                status: 1,
            }
        }
    }
}
</script>

<style>

</style>
