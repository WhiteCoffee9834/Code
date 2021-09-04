<template>
<article>
    <el-dialog title="添加商品规格" :visible.sync="show.visible" @close="reset">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :rules="rules">
            <el-form-item label="规格名称" prop="specsname">
                <el-input v-model="form.specsname"></el-input>
            </el-form-item>
            <!-- 动态表单 -->
            <el-form-item label="规格属性" prop="catename">
                <el-form-item v-for="(domain, index) in domains" :label="'属性' + index" :key="domain.key">
                    <!-- 这里输入的值都将绑定到domain上而不是form中 -->
                    <el-input v-model="domain.value" style="width:80%;margin:0 20px 20px 0"></el-input>
                    <el-button @click.prevent="removeDomain(index)" v-if="index!=0">删除</el-button>
                </el-form-item>
            </el-form-item>

            <el-form-item label="状态">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="show.visible = false">取 消</el-button>
            <el-button @click="addDomain()">新增属性</el-button>
            <el-button type="primary" @click="valideForm('form')" v-if="show.isAdd == true">确 定</el-button>
            <el-button type="primary" @click="valideForm('form')" v-else>修 改</el-button>
        </div>
    </el-dialog>
</article>
</template>

<script>
export default {
    props: ["show"],
    data() {
        return {
            domains: [{
                value: ""
            }],
            form: {
                specsname: "",
                attrs: "",
                status: 1
            },
            rules: {
                specsname: [{
                    required: true,
                    message: "请输入规格名称",
                    trigger: "blur"
                }],
            }
        }
    },
    methods: {
        reset() {
            this.form = {
                    specsname: "",
                    attrs: "",
                    status: 1
                },
                this.domains = [{
                    value: ""
                }]
        },
        addDomain() {
            this.domains.push({
                value: ""
            })
        },
        removeDomain(index) {
            this.domains.splice(index, 1)
        },
        getInfo(id){
            this.$axios.get("/api/specsinfo?id="+id).then(res=>{
              if(res.data.code == 200){
                  console.log(res.data.list)
                  console.log(res.data.list[0])
                    this.form = res.data.list[0]
                    this.form.id = id
                    // 把attrs数组中的每一项都转换为value item键值对形式
                    this.domains = this.form.attrs.map(item=>({value:item}))
                    console.log(this.domains)
                }
            })
        },
        valideForm(formname){
            this.$refs[formname].validate(result=>{
                if(result){
                    let url = "/api/specsadd"
                    if(this.form.id){
                        url = "/api/specsedit"
                    }
                    // 遍历domains数组中的内容,将其转换为字符串
                    this.form.attrs = this.domains.map(item=>item.value).join(",")
                    this.$axios.post(url,this.form).then(res=>{
                        if(res.data.code == 200){
                            this.$emit("init6")
                        }
                    }).finally(()=>{
                        this.reset()
                        this.show.visible = false
                    })
                }else{
                    alert("格式错误")
                }
            })
        }
    }
}
</script>

<style>

</style>
