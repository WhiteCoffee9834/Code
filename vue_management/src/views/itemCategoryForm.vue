<template>
<article>
    <!-- 每次关闭表单的时候重置表单内容 -->
    <el-dialog title="添加分类" :visible.sync="show.visible" @close="reset">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :rules="rules">
            <el-form-item label="上级分类" prop="pid">
                <el-select v-model="form.pid">
                    <el-option label="顶级分类" value="0"></el-option>
                    <el-option
                        v-for="item in cateData"
                        :key="item.id"
                        :value="item.id"
                        :label="item.catename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="catename">
                <el-input v-model="form.catename"></el-input>
            </el-form-item>

            <el-form-item label="图片" v-if="form.pid != 0">
                <!-- INFO :file-list="fileStorage" 使得编辑时能够看到缩略图 -->
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
                            <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <i class="el-icon-download"></i>
                            </span> -->
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
    props: ["show", "cateData"],
    data() {
        return {
            form: {
                pid: "",
                catename: "",
                img: "",
                status: 1
            },
            rules: {
                catename: [{
                    required: true,
                    message: "请选择分类名称",
                    trigger: "blur"
                }],
                pid: [{
                    required: true,
                    message: "请选择上级分类",
                    trigger: "blur"
                }]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileStorage: [] // 本数组用于存储上传的图片
        }
    },
    methods: {
        // 重置表单
        reset() {
            this.form = {
                pid: "",
                catename: "",
                img: "",
                status: 1
            },
            this.fileStorage = []
        },
        // 表单验证并发送请求
        valideForm(formname) {
            this.$refs[formname].validate(result => {
                if (result) {
                    alert("Success!")
                    let url = "/api/cateadd"
                    if (this.form.id) {
                        url = "/api/cateedit"
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
        // 获取编辑时表单中的默认值
        getInfo(id) {
            this.$axios.get("/api/cateinfo?id=" + id).then(res => {
                if (res.data.code == 200) {
                    this.form = res.data.list
                    this.form.id = id
                    this.fileStorage.push({
                        url: this.form.img
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
            let index = this.fileStorage.findIndex(()=>{
                return this.fileStorage[0] == file
            })
            this.fileStorage.splice(index,1)
            this.form.img = ""
        }
    },
}
</script>

<style>

</style>
