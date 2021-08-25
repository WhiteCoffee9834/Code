// XXX 课程路由
const express = require("express");
const { getProvincesList, getCitysList, getPageCourselist, getSubjectlist, getCategorylist, getCourseByID, getProvinceBycity, getGradelist } = require("../model/courseModel")
const router = express.Router();

// TAG 省份接口
router.post("/provinces", async(req, res) => {
    res.send(await getProvincesList());
})

// TAG 城市接口(通过省份获取城市)
router.post("/citys", async(req, res) => {
    res.send(await getCitysList(req.body));
})

// TAG 根据城市获取省份
router.post("/pro", async(req, res) => {
    res.send(await getProvinceBycity(req.body));
})

//TAG 学科接口
router.post("/subjects", async(req, res) => {
    res.send(await getSubjectlist());
});
//TAG 考试接口
router.post("/cates", async(req, res) => {
    res.send(await getCategorylist());
});
//TAG 课程详情接口
router.post("/course", async(req, res) => {
    res.send(await getCourseByID(req.body));
});
// TAG 按照条件以分页的形式返回(课程列表)
router.post("/courses", async(req, res) => {
    res.send(await getPageCourselist(req.body))
});
// TAG 年级分类
router.get("/grades", async(req, res) => {
    res.send(await getGradelist());
});

module.exports = router