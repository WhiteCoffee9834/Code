<template>
<article>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
        <el-button type="primary" @click="add">添加</el-button>
    </el-row>
    <el-table :data="goodsData" border style="width:100%">
        <el-table-column fixed prop="id" label="商品编号"></el-table-column>
        <el-table-column fixed prop="goodsname" label="商品名称"></el-table-column>
        <el-table-column fixed prop="price" label="商品价格"></el-table-column>
        <el-table-column fixed prop="market_price" label="市场价格"></el-table-column>
        <el-table-column label="图片">
            <template slot-scope="scope">
                <img :src="scope.row.img" class="imgBox" v-if="scope.row.img" />
            </template>
        </el-table-column>
        <el-table-column prop="isnew" label="是否新品">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status == 1">是</el-tag>
                <el-tag type="danger" v-if="scope.row.status == 2">否</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="ishot" label="是否热卖">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status == 1">是</el-tag>
                <el-tag type="danger" v-if="scope.row.status == 2">否</el-tag>
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
    <itemManageForm ref="form" :show="show" @init6="renew()" :Tier1="Tier1" :specsIdList="specsId"></itemManageForm>
</article>
</template>

<script>
import itemManageForm from "./itemManageForm.vue"
export default {
    components: {
        itemManageForm
    },
    data() {
        return {
            goodsData: [],
            show: {
                visible: false,
                isAdd: true
            },
            Tier1:[],
            specsId:[]
        }
    },
    created() {
        this.renew()
    },
    methods: {
        getTier1(){
            this.$axios.get("/api/catelist?pid=0").then(res=>{
                if(res.data.code == 200){
                    this.Tier1 = res.data.list
                }
            })
        },
        getSpecsId(){
            this.$axios.get("/api/specslist").then(res => {
                if (res.data.code == 200) {
                    this.specsId = res.data.list
                }
            })
        },
        renew() {
            this.$axios.get("/api/goodslist").then(res => {
                if (res.data.code == 200) {
                    this.goodsData = res.data.list
                }
            })
        },
        add() {
            this.show.visible = true
            this.show.isAdd = true
            this.getTier1()
            this.getSpecsId()
        },
        edit(id) {
            this.show.visible = true
            this.show.isAdd = false
            this.getTier1()
            this.getSpecsId()
            this.$refs.form.getInfo(id)
        },
        remove(id) {
            let result = confirm("真的要删除吗?此操作不可逆!")
            if (result) {
                this.$axios.post("api/goodsdelete", {
                    id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.goodsData = res.data.list
                        alert("成功删除")
                        this.renew()
                    } else {
                        alert(res.data.msg)
                        this.goodsData = []
                    }
                })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/manageBase.scss";
</style>