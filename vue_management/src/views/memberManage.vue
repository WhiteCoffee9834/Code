<template>
<div class="memberList">
    <el-breadcrumb separator="/" style="margin-bottom:100px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table border style="width: 100%" :data="memberlist">
        <el-table-column prop="uid" label="用户编号"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="status" label="状态">
            <template v-slot="scope">
                <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                <el-tag type="danger" v-else>禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
            <template v-slot="scope">
                <el-button @click="edit(scope.row.uid)" type="primary" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <memberForm :show="show" ref="form" @init="getDat"> </memberForm>
</div>
</template>

<script>
import memberForm from "./memberForm.vue"
export default {
    components: {
        memberForm
    },
    data() {
        return {
            show: {
                vis: false,
            },
            memberlist: []
        }
    },
    created() {
        this.getDat()
    },
    methods: {
        getDat() {
            this.$axios.get("/api/memberlist").then(res => {
                if (res.data.code === 200) {
                    this.memberlist = res.data.list;
                }
            })
        },
        edit(uid) {
            this.show.vis = true;
            this.$refs.form.getInfo(uid)
        }
    }
}
</script>

<style>

</style>
