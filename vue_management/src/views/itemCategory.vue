<template>
<article id="itemCategory">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
        <el-button type="primary" @click="add">添加</el-button>
    </el-row>
    <el-table :data="cateData" border style="width: 100%" row-key="id">
        <el-table-column fixed prop="id" label="分类编号">
        </el-table-column>
        <el-table-column prop="catename" label="分类名称">
        </el-table-column>
        <el-table-column label="图片">
            <template slot-scope="scope">
                <img :src="scope.row.img" class="imgBox" v-if="scope.row.img"/>
            </template>
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
    <itemCategoryForm :show="show" ref="form" @init6="renew()" :cateData="cateData"></itemCategoryForm>
</article>
</template>

<script>
import ItemCategoryForm from './itemCategoryForm.vue'
export default {
    components: {
        ItemCategoryForm
    },
    data() {
        return {
            cateData: [],
            show: {
                visible: false,
                isAdd: true
            },
        };
    },
    created() {
        // 获取用户信息以及分页情况
        this.renew()
    },
    methods: {
        // 显示添加模态框
        add() {
            this.show.visible = true
            this.show.isAdd = true
        },
        // 显示修改模态框
        edit(id) {
            this.show.visible = true
            this.show.isAdd = false
            this.$refs.form.getInfo(id) // 使其获取到默认值
        },
        remove(id) {
            let result = confirm("真的要删除吗?此操作不可逆!")
            if (result) {
                this.$axios.post("api/catedelete", {
                    id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.cateData = res.data.list
                        alert("成功删除")
                        this.renew()
                    } else {
                        alert(res.data.msg)
                        this.cateData = []
                    }
                })
            }
        },
        // 视图更新,使用这个来取代每次页面加载时发送请求,好处是每次更改时都可以调用这个方法来起到视图更新的作用
        renew() {
            this.$axios.get("/api/catelist?istree=1").then(res => {
                if (res.data.code == 200) {
                    this.cateData = res.data.list
                    console.log(this.cateData)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/manageBase.scss";
</style>