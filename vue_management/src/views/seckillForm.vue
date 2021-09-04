<template>
<article>
    <el-dialog title="添加商品" :visible.sync="show.visible" @close="reset()">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :rules="rules">
            <el-form-item label="活动名称" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="活动期限">
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="开始日期"
                        v-model="form.begintime"
                        style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker
                        placeholder="结束日期"
                        v-model="form.endtime"
                        style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="一级分类">
                <el-select v-model="form.first_cateid" @change="getTier2()">
                    <el-option
                        v-for="item in Tier1"
                        :key="item.id"
                        :value="item.id"
                        :label="item.catename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="form.second_cateid" @change="getGoods()">
                    <el-option
                        v-for="item in Tier2"
                        :key="item.id"
                        :value="item.id"
                        :label="item.catename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品">
                <el-select v-model="form.goodsid">
                    <el-option
                        v-for="item in goodsData"
                        :key="item.id"
                        :value="item.id"
                        :label="item.goodsname"></el-option>
                </el-select>
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
    props:["show","Tier1"],
    data() {
        return {
            form:{
                title:"",
                begintime:"",
                endtime:"",
                first_cateid : "",
                second_cateid : "",
                goodsid:"",
                status:1
            },
            rules:{
                title:[{
                    required: true,
                    message: "必填字段",
                    trigger: "blur"
                }]
            },
            Tier2:[], // 存储二级分类
            goodsData:[]
        }
    },
    methods:{
        reset(){
            this.form = {
                title:"",
                begintime:"",
                endtime:"",
                first_cateid : "",
                second_cateid : "",
                goodsid:"",
                status:1
            },
            this.Tier2 = []
            this.goodsData = []
        },
        getTier2(){
            let pid = this.form.first_cateid
            this.$axios.get("/api/catelist?pid="+pid).then(res=>{
                this.Tier2 = res.data.list
            })
        },
        getGoods(){
            this.$axios.get("/api/goodslist").then(res => {
                if (res.data.code == 200) {
                    this.goodsData = res.data.list
                }
            })
        },
        valideForm(formname){
            this.$refs[formname].validate(result=>{
                if (result) {
                    alert("Success!")
                    let url = "/api/seckadd"
                    if (this.form.id) {
                        url = "/api/seckedit"
                    }
                    // 时间格式转换为时间戳才能存储
                    this.form.begintime = this.form.begintime.getTime()
                    this.form.endtime = this.form.endtime.getTime()

                    
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
        getInfo(id){
            this.$axios.get("/api/seckinfo?id="+id).then(res=>{
                if(res.data.code == 200){
                    this.form = res.data.list
                    this.form.id = id
                    // 时间戳转换为时间格式
                    this.form.begintime = new Date(this.form.begintime * 1)
                    this.form.endtime = new Date(this.form.endtime * 1)
                }
            })
        },
    }
}
</script>

<style>

</style>
