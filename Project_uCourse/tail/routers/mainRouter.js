// XXX 首页路由
const express = require("express")
const {getBanners}=require("../model/settingModel");
const {register,login} = require("../model/userModel")
const {getCourseList}=require("../model/courseModel")
const {decryptMidToken} = require("../utils/utils")
const router = express.Router()

// TAG 注册路由
router.post("/register",async (req,res)=>{
    res.send(await register(req.body))
})
// TAG 轮播图接口
router.get("/banners",async(req,res)=>{
    res.send(await getBanners());
})
// TAG 登录接口
router.post("/login",async(req,res)=>{
    res.send(await login(req.body))
})

// TAG 首页课程列表接口
router.post("/courseinfo",async(req,res)=>{
    res.send(await getCourseList(req.body));
})
// TAG 解密Token接口
router.post("/token",(req,res)=>{
    res.send(decryptMidToken(req.body))
})
module.exports = router