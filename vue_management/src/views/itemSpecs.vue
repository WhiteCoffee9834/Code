<template>
<article>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品规格</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
        <el-button type="primary" @click="add">添加</el-button>
    </el-row>
    <el-table :data="specsData" border style="width:100%">
        <el-table-column fixed prop="id" label="规格编号"></el-table-column>
        <el-table-column fixed prop="specsname" label="规格名称"></el-table-column>
        <el-table-column fixed prop="attrs" label="规格属性">
            <template slot-scope="scope">
                <el-tag v-for="item in scope.row.attrs" :key="item" style="margin-right:10px">{{item}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed prop="status" label="状态">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
                <el-tag type="danger" v-if="scope.row.status == 2">已禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row.id)" type="primary" size="small">编辑</el-button>
                <el-button @click="remove(scope.row.id)" type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <itemSpecsForm ref="form" :show="show" @init6="renew()"></itemSpecsForm>
</article>
</template>

<script>
import itemSpecsForm from "./itemSpecsForm.vue"
export default {
    components: {
        itemSpecsForm
    },
    data() {
        return {
            specsData: [],
            show: {
                visible: false,
                isAdd: true
            }
        }
    },
    created() {
        this.renew()
    },
    methods: {
        renew() {
            this.$axios.get("/api/specslist").then(res => {
                if (res.data.code == 200) {
                    this.specsData = res.data.list
                    console.log(this.specsData)
                }
            })
        },
        edit(id) {
            this.show.visible = true
            this.show.isAdd = false
            this.$refs.form.getInfo(id)
        },
        add() {
            this.show.visible = true
            this.show.isAdd = true
        },
        remove(id) {
            let result = confirm("真的要删除吗?此操作不可逆!")
            if (result) {
                this.$axios.post("api/specsdelete", {
                    id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.specsData = res.data.list
                        alert("成功删除")
                        this.renew()
                    } else {
                        alert(res.data.msg)
                        this.specsData = []
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/manageBase.scss";
</style>
