<template>
<article id="roleManage">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
        <el-button type="primary" @click="add">添加</el-button>
    </el-row>
    <el-table :data="roleData" border style="width: 100%">
        <el-table-column fixed prop="id" label="角色编号">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称">
        </el-table-column>
        <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
                <el-tag type="danger" v-if="scope.row.status == 2">已禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row.id)" type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small" @click="remove(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <roleForm :show="show" ref="form" @init6="renew"></roleForm>
</article>
</template>

<script>
import roleForm from "./roleForm.vue"
export default {
    components: {
        roleForm
    },
    methods: {
        // 显示添加模态框
        add() {
            this.show.visible = true
            this.show.isAdd = true
            this.$refs.form.getRoleMenus()
        },
        // 显示修改模态框
        edit(id) {
            this.show.visible = true
            this.show.isAdd = false
            this.$refs.form.getRoleMenus()
            this.$refs.form.getInfo(id)
        },
        // 删除
        remove(id) {
            let result = confirm("真的要删除吗?此操作不可逆!")
            if (result) {
                this.$axios.post("api/roledelete", {
                    id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.roleData = res.data.list
                        alert("成功删除")
                    } else {
                        this.roleData = []
                    }
                })
            }
        },
        // 视图更新,使用这个来取代每次页面加载时发送请求,好处是每次更改时都可以调用这个方法来起到视图更新的作用
        renew() {
            this.$axios.get("/api/rolelist").then(res => {
                if (res.data.code == 200) {
                    this.roleData = res.data.list
                }
            })
        }
    },
    data() {
        return {
            roleData: [],
            show: {
                visible: false,
                isAdd: true
            }
        };
    },
    created() {
        // 页面载入时更新视图
        this.renew()
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/manageBase.scss"
</style>