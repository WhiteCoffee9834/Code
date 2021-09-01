<template>
<article id="roleManage">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
        <el-button type="primary" @click="add">添加</el-button>
    </el-row>
    <el-table :data="userData" border style="width: 100%">
        <el-table-column fixed prop="uid" label="用户编号">
        </el-table-column>
        <el-table-column prop="username" label="用户名称">
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色">
        </el-table-column>
        <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
                <el-tag type="danger" v-if="scope.row.status == 2">已禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row.uid)" type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small" @click="remove(scope.row.uid,scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page="page"
        @current-change="changePage">
        <!-- 这里current-change不需要写实参,能自动把current-page当作参数传递到changePage方法中 -->
    </el-pagination>
    <adminForm :show="show" ref="form" @init6="renew();getCount()"></adminForm>
</article>
</template>

<script>
import adminForm from "./adminForm.vue"
export default {
    components: {
        adminForm
    },
    methods: {
        // 显示添加模态框
        add() {
            this.show.visible = true
            this.show.isAdd = true
            this.$refs.form.getRoleList()
        },
        // 显示修改模态框
        edit(uid) {
            this.show.visible = true
            this.show.isAdd = false
            this.$refs.form.getRoleList() // 使其获取到角色列表
            this.$refs.form.getInfo(uid) // 使其获取到默认值
        },
        // 删除,注意参数为uid,传递index来标识要删除的下标
        remove(uid,index) {
            let result = confirm("真的要删除吗?此操作不可逆!")
            if (result) {
                this.$axios.post("api/userdelete", {
                    uid: uid
                }).then(res => {
                    if (res.data.code == 200) {
                        // 不能使用下面这个方法,否则无法实现空页前移的效果,因为你让整个数组等于了所有的内容而不是仅当前页的内容
                        // this.userData = res.data.list
                        this.userData.splice(index,1)
                        if(this.userData.length == 0 && this.page > 0){
                            this.page --
                        }
                        alert("成功删除")
                        this.renew()
                        this.getCount()
                    } else {
                        alert(res.data.msg)
                        this.userData = []
                    }
                })
            }
        },
        // 视图更新,使用这个来取代每次页面加载时发送请求,好处是每次更改时都可以调用这个方法来起到视图更新的作用
        renew() {
            this.$axios.get("/api/userlist", {
                params: {
                    page: this.page,
                    size: this.size
                }
            }).then(res => {
                if (res.data.code == 200) {
                    this.userData = res.data.list
                }
            })
        },
        // 获取页码
        getCount() {
            this.$axios.get("/api/usercount", {
                params: {
                    page: this.page,
                    size: this.size
                }
            }).then(res => {
                if (res.data.code == 200) {
                    this.total = res.data.list[0].total
                }
            })
        },
        // 改变页码方法,形参不能省略
        changePage(page){
            this.page = page
            this.renew()
            this.getCount()
        }
    },
    data() {
        return {
            userData: [],
            show: {
                visible: false,
                isAdd: true
            },
            // 分页
            page: 1, // 当前页,默认为1
            size: 2, // 每一页的显示项目
            total: 0
        };
    },
    created() {
        // 获取用户信息以及分页情况
        this.renew()
        this.getCount()
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/manageBase.scss";
</style>
