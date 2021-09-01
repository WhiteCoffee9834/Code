<template>
<article id="roleManage">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
        <el-button type="primary" @click="add">添加</el-button>
    </el-row>
    <el-table :data="menuData" row-key="id" border style="width: 100%">
        <el-table-column fixed prop="id" label="菜单编号">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称"> </el-table-column>
        <el-table-column fixed prop="pid" label="上级菜单">
        </el-table-column>
        <el-table-column fixed label="菜单图标">
            <template slot-scope="scope">
                <i :class="scope.row.icon"></i>
            </template>
        </el-table-column>
        <el-table-column fixed prop="url" label="菜单地址">
        </el-table-column>
        <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
                <!-- <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'"></el-tag> -->
                <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
                <el-tag type="danger" v-if="scope.row.status == 2">已禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
                <el-button @click="remove(scope.row.id)" type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 在这里使用父组件向子组件传值 -->
    <form1 :show="show" @init6="renew" ref="form" :menuData="menuData"></form1>
</article>
</template>

<script>
import form1 from "./menuForm.vue"
export default {
    components: {
        form1
    },
    methods: {
        // 显示添加模态框
        add() {
            this.show.visible = true;
            this.show.isAdd = true
        },
        // 显示修改模态框
        edit(id) {
            this.show.visible = true
            this.show.isAdd = false
            // 直接再主组件中调用子组件的方法,只需要把id传递过去即可
            this.$refs.form.getInfo(id)
        },
        // 删除项
        remove(id) {
            let result = confirm("真的要删除吗?此操作不可逆!")
            if (result) {
                this.$axios.post("api/menudelete", {
                    id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.menuData = res.data.list
                        alert("成功删除")
                    } else {
                        this.menuData = []
                    }
                })
            }
        },
        // 视图更新
        renew() {
            // 树状菜单,可以让表单起到折叠效果
            this.$axios.get("/api/menulist?istree=1").then(res => {
                if (res.data.code == 200) this.menuData = res.data.list
                console.log(this.menuData)
            })
        }
    },
    data() {
        return {
            menuData: [],
            // 用于传到另一个表单页
            show: {
                isAdd: true, // 决定是添加功能或是修改功能
                visible: false // 决定是否显示
            }
        };
    },
    created() {
        this.renew()
        // 如果不使用树状菜单,那么就全部获取了,不能起到折叠效果
        // this.$axios.get("/api/menulist").then(res=>{
        //     console.log(res.data)
        // })
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/manageBase.scss";
</style>
