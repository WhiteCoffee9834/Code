//前台不登录就可以访问的接口
var express = require('express');
const formidable = require('formidable'); //处理含有文件上传的表单
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const random = require('string-random');
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");
const { getUUID,getToken,getTree } = require("../utils");
var router = express.Router();
const tableNameCate = 'category';//商品分类
const tableNameBanner = 'banner';//轮播图
const tableNameGoods = 'goods';//商品
const tableNameGroupon = 'groupon';//万人团
const tableNameSpecs = 'specs';//规格表
const tableNameMember = 'user';//会员表
const tableNameSeck = 'seckill';//限时秒杀表
const tableNameCoupon = 'coupon';//优惠券
//获取分类信息
router.get("/getcate", async (req, res) => {
    let data = await Db.select(req, `SELECT * FROM ${tableNameCate} WHERE pid = 0 AND status = 1`);
    res.send(Success(data));
});

//新人专享
router.get("/getnew",async(req,res)=>{
	let data = await Db.select(req, `SELECT id,goodsname,price,market_price,img FROM ${tableNameGoods} WHERE status = 1 AND isnew_user = 1 LIMIT 10`);
	res.send(Success(data));
});

// 万人团
router.get("/getgroupon",async(req,res)=>{
	let data = await Db.select(req, `SELECT id,goodsname,price,market_price,img,count,buy_count,limit_count FROM ${tableNameGroupon} WHERE status = 1 LIMIT 10`);
	res.send(Success(data));
});

//获取轮播图信息
router.get("/getbanner", async (req, res) => {
    let data = await Db.select(req, `SELECT * FROM ${tableNameBanner} WHERE status = 1`);
    res.send(Success(data));
});
//倒计时
router.get("/getcountdown",async(req,res)=>{
    // 当天0点
    var start = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime(); 
    // 当天23:59
    var end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1000).getTime();
    let data = await Db.select(req,`SELECT * FROM ${tableNameSeck} WHERE begintime >= ${start} AND endtime <= ${end}`);
    res.send(Success(data));
})

//秒杀
router.get("/getseckill",async(req,res)=>{
	let data = await Db.select(req, `SELECT id,goodsname,price,market_price,img FROM ${tableNameGoods} WHERE status = 1 AND isseckill = 1 LIMIT 10`);
	res.send(Success(data));
});

//获取首页商品-热销好货、折上折区、时令水果、粮油调味
router.get("/getindexgoods",async(req,res)=>{
	let data1 = await Db.select(req, `SELECT id,goodsname,price,market_price,img,description FROM ${tableNameGoods} WHERE status = 1 AND ishot = 1 LIMIT 10`);
	let data2 = await Db.select(req, `SELECT id,goodsname,price,market_price,img,description FROM ${tableNameGoods} WHERE status = 1 AND discount = 1 LIMIT 10`);
	let data3 = await Db.select(req, `SELECT id,goodsname,price,market_price,img,description FROM ${tableNameGoods} WHERE status = 1 AND cateid=1 LIMIT 10`);
    let data4 = await Db.select(req, `SELECT id,goodsname,price,market_price,img,description FROM ${tableNameGoods} WHERE status = 1 AND cateid=5 LIMIT 10`);
	let data = [];
	data.push({content:data1});
	data.push({content:data2});
	data.push({content:data3});
	data.push({content:data4});
	res.send(Success(data));
});

// 获取优惠券
router.get("/getcoupon",async(req,res)=>{
	let data1 = await Db.select(req, `SELECT id,title,money,limit_money,begintime,endtime,description FROM ${tableNameCoupon} WHERE status = 0 LIMIT 10`);
	let data2 = await Db.select(req, `SELECT id,title,money,limit_money,begintime,endtime,description FROM ${tableNameCoupon} WHERE status = 1 LIMIT 10`);
	let data3 = await Db.select(req, `SELECT id,title,money,limit_money,begintime,endtime,description FROM ${tableNameCoupon} WHERE status = 2 LIMIT 10`);
	let data = [];
	data.push({content:data1});
	data.push({content:data2});
	data.push({content:data3});
	res.send(Success(data));
});


//获取分类信息
router.get("/getcatetree", async (req, res) => {
    let data = await Db.select(req, `SELECT * FROM ${tableNameCate}`);
    res.send(Success(getTree(data)));
});
//获取商品
router.get("/getgoods",async(req,res)=>{
    const {fid,keyword} = req['query'];
    let condition = 'status = 1'
    if(fid){
        condition += ` AND (cateid = ${fid})`;
    }
    if(keyword){
        condition += ` AND goodsname LIKE '%${keyword}%'`
    }
    let data = await Db.select(req, `SELECT id,goodsname,price,market_price,img,description,islimit FROM ${tableNameGoods} WHERE ${condition} `);
    res.send(Success(data));
});
//获取一条商品信息
router.get("/getgoodsinfo", async (req, res) => {
    const {id} = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
        return;
    }
    // const info = await Db.select(req, `SELECT a.*,b.specsname FROM ${tableNameGoods} a LEFT JOIN ${tableNameSpecs} b ON a.specsid = b.id WHERE a.id = '${id}'`);
    const info = await Db.select(req, `SELECT * FROM ${tableNameGoods} WHERE id = ${id}`);
    res.send(Success(info, '获取成功'));
});
//注册
router.post("/register", async (req, res) => {
    let { phone,nickname,password } = req['body'];
    const info = await Db.select(req, `SELECT * FROM ${tableNameMember} WHERE phone = '${phone}'`);
    if (info) {
        res.send(MError("手机号已存在，不能重复！"));
    } else {
        const randstr = random(5);
        password += randstr;
        password = crypto.createHash('md5').update(password).digest("hex");
        const result = await Db.insert(req, tableNameMember, {
            uid: getUUID(),
            phone,
            nickname,
            password,
            randstr,
            addtime:new Date().getTime(),
            status:1//新注册
        });
        if (result) {
            res.send(Success([], "注册成功"));
        } else {
            res.send(MError("注册失败"));
        }
    }
});
//登录
router.post("/login", async (req, res) => {
    let { phone,password } = req['body'];
    if(!phone || !password){
        res.send(MError("请填写手机号和密码"));
        return;
    }
    const result = await Db.select(req, `SELECT * FROM ${tableNameMember} WHERE  phone = '${phone}'`)
    if(result === null){
        res.send(MError("用户信息不存在"));
        return;
    }
    const info = result[0];
    password += info.randstr;
    password = crypto.createHash('md5').update(password).digest("hex");
    if(password !== info.password){
        res.send(MError("用户名密码错误"));
        return;
    }
    let = token = getToken(info['uid']);
    let data = {
    	token,uid:info.uid,phone:info.phone,nickname:info.nickname
    }
    res.send(Success(data, '登录成功'));
});
module.exports = router;