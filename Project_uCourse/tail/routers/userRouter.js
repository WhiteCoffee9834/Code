// XXX 用户路由
const express = require("express")
const router = express.Router()
const {getUserInfo,updateUserInfo} = require("../model/userModel")
// TAG 获取用户信息路由
router.get("/user/:id",async(req,res)=>{
    // req.query 是一个键名为 mid 的对象,所以传值后的实参需要进行解构
    res.send(await getUserInfo(req.query))
})
// TAG 更新用户信息路由
router.put("/user/:id",async(req,res)=>{
    // NOTE 要在请求体中删除掉token这一项,避免在sql语句中出现
    delete req.body.token
    res.send(await updateUserInfo(req.body))
})
// TAG 更新用户密码
router.put("/password",async(req,res)=>{
    delete req.body.token
    res.send(await updateUserInfo(req.body))
})

module.exports = router