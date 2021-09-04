<template>
<article>
    <el-dialog title="添加商品" :visible.sync="show.visible" @close="reset()">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :rules="rules">
            <el-form-item label="一级分类" prop="first_cateid">
                <el-select v-model="form.first_cateid" @change="getTier2()">
                    <el-option
                        v-for="item in Tier1"
                        :key="item.id"
                        :value="item.id"
                        :label="item.catename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="second_cateid">
                <el-select v-model="form.second_cateid">
                    <el-option
                        v-for="item in Tier2"
                        :key="item.id"
                        :value="item.id"
                        :label="item.catename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="form.goodsname"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>

            <el-form-item label="图片">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="upload"
                    :file-list="fileStorage">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>

            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <el-form-item label="商品规格" prop="specsid">
                <el-select v-model="form.specsid" @change="getSpecsAttr">
                    <el-option
                        v-for="item in specsIdList"
                        :key="item.id"
                        :value="item.id"
                        :label="item.specsname"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格属性" prop="specsattr">
                <el-select v-model="form.specsattr">
                    <el-option
                        v-for="(item,index) in specsAttrList"
                        :key="index"
                        :value="item"
                        :label="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否新品">
                <el-switch v-model="form.isnew" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
            <el-form-item label="是否热门">
                <el-switch v-model="form.ishot" :active-value="1" :inactive-value="2"></el-switch>
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
    props: ["show", "Tier1","specsIdList"],
    data() {
        return {
            form: {
                first_cateid : "",
                second_cateid : "",
                goodsname : "",
                price : "",
                market_price : "",
                img : "",
                specsid:"",
                specsattr:"",
                status:1,
                isnew:1,
                ishot:1
            },
            rules: {
                first_cateid: [{
                    required: true,
                    message: "必填字段",
                    trigger: "blur"
                }],
                second_cateid: [{
                    required: true,
                    message: "必填字段",
                    trigger: "blur"
                }]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileStorage: [], // 本数组用于存储上传的图片
            Tier2:[], // 存储二级分类
            specsAttrList:[] // 存储规格属性
        }
    },
    methods: {
        reset(){
            this.form={
                first_cateid : "",
                second_cateid : "",
                goodsname : "",
                price : "",
                market_price : "",
                img : "",
                specsid:"",
                specsattr:"",
                status:1,
                isnew:1,
                ishot:1
            }
            this.Tier2 = []
            this.specsAttrList = []
            this.fileStorage = []
        },
        // 获取二级分类
        getTier2(){
            let pid = this.form.first_cateid
            this.$axios.get("/api/catelist?pid="+pid).then(res=>{
                this.Tier2 = res.data.list
            })
        },
        // 获取规格属性
        getSpecsAttr(){
            let index = this.form.specsid
            this.$axios.get("/api/specslist").then(res=>{
                this.specsAttrList = res.data.list[index].attrs
            })
        },
        valideForm(formname){
            this.$refs[formname].validate(result=>{
                if (result) {
                    alert("Success!")
                    let url = "/api/goodsadd"
                    if (this.form.id) {
                        url = "/api/goodsedit"
                    }
                    // INFO 包含图片不能直接发送请求
                    let formD = new FormData()
                    // 循环遍历表单项添加到formData
                    for (let i in this.form) {
                        formD.append(i, this.form[i])
                    }

                    this.$axios.post(url, formD).then(res => {
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
            this.$axios.get("/api/goodsinfo?id="+id).then(res=>{
                if(res.data.code == 200){
                    this.form = res.data.list
                    this.form.id = id
                    this.fileStorage.push({
                        url:this.form.img
                    })
                }
            })
        },
        // 预览图片
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        upload(file, fileStorage) {
            this.form.img = file.raw
            this.fileStorage = fileStorage
        },
        // 删除上传的图片
        handleRemove(file) {
            let index = this.fileStorage.findIndex(() => {
                return this.fileStorage[0] == file
            })
            this.fileStorage.splice(index, 1)
            this.form.img = ""
        }
    },
}
</script>