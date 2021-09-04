<template>
<article>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
        <el-button type="primary" @click="add">添加</el-button>
    </el-row>
    <el-table :data="swiperData" border style="width: 100%" row-key="id">
        <el-table-column fixed prop="id" label="编号">
        </el-table-column>
        <el-table-column prop="title" label="轮播图标题">
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
    <swiperForm ref="form" :show="show" @init6="renew()"></swiperForm>
</article>
</template>

<script>
import swiperForm from "./swiperForm.vue"
export default {
    components:{
        swiperForm
    },
    data() {
        return {
            swiperData:[],
            show:{
                visible:false,
                isAdd:true
            }
        }
    },
    created(){
        this.renew()
    },
    methods:{
        add(){
            this.show.visible = true
            this.show.isAdd = true
        },
        edit(id){
            this.show.visible = true
            this.isAdd = false
            this.$refs.form.getInfo(id)
        },
        remove(id){
            let result = confirm("真的要删除吗?此操作不可逆!")
            if (result) {
                this.$axios.post("api/bannerdelete", {
                    id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.swiperData = res.data.list
                        alert("成功删除")
                        this.renew()
                    } else {
                        alert(res.data.msg)
                        this.swiperData = []
                    }
                })
            }
        },
        renew(){
            this.$axios.get("/api/bannerlist").then(res => {
                console.log(res.data)
                if (res.data.code == 200) {
                    this.swiperData = res.data.list
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/manageBase.scss";
</style>