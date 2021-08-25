// XXX 课程业务层
const {
    getDataByDataBase
} = require("../db/db");
const {
    serverUrl,
    pageSize
} = require("../utils/config")
const {
    checkData
} = require("../utils/utils")

// TAG 首页课程列表业务
async function getCourseList({
    type
}) {

    let sql = `SELECT c.cid as cid ,title,COUNT(v.cid) as ks,rs,price,concat("${serverUrl}courses/",image_src) as image_src,type,area_name,subject_name,type_name FROM course c LEFT JOIN video v on c.cid=v.cid LEFT JOIN (SELECT c.cid as id,COUNT(mid) as rs FROM course c INNER JOIN orders o on c.cid=o.cid  GROUP BY c.cid) oc on oc.id=c.cid where type=${type} GROUP BY c.cid ORDER BY ks DESC,rs DESC limit ${type * 1 === 1 ? 8 : 6}`;

    let [err, result] = await getDataByDataBase(sql);
    if (err) {
        return {
            status: 201,
            msg: "查询课程列表失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            return {
                status: 200,
                msg: `${type === 1 ? "同步课程列表" : "精品课程列表"}`,
                result
            };
        } else {
            return {
                status: 201,
                msg: "暂无商品信息！"
            }
        }
    }
    // TAG 前段需要的数据形式
    // { status, msg, result: [{ cid, title, price, image_src, type, area_name, subject_name, type_name }] }
}
// TAG 获取省份业务
async function getProvincesList() {
    let sql = `select province_name from province`;
    let [err, result] = await getDataByDataBase(sql);
    if (err) {
        return {
            status: 201,
            msg: "查询省份信息失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            return {
                status: 200,
                msg: "省会信息",
                result
            };
        } else {
            return {
                status: 201,
                msg: "暂无省份信息！"
            }
        }
    }
    // { status, msg, result: [{ id, provinces_name, provinces_code }] }
}
// TAG 获取城市业务（根据省查市）
async function getCitysList({
    province_name
}) {
    let sql = `select c.id,city_name,city_code,c.province_code from city c INNER JOIN province p ON c.province_code=p.province_code WHERE p.province_name="${province_name}"`;
    let [err, result] = await getDataByDataBase(sql);
    if (err) {
        return {
            status: 201,
            msg: "查询城市信息失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            return {
                status: 200,
                msg: "城市信息",
                result
            };
        } else {
            return {
                status: 201,
                msg: "暂无城市信息！"
            }
        }
    }

    // {status,msg,result:[{id,city_name,provinces_code,city_code}]}
}
// TAG 根据市获取对应省份
async function getProvinceBycity({
    city_name
}) {
    let sql = `select province_name from province p INNER JOIN city c ON c.province_code=p.province_code WHERE c.city_name="${city_name}"`;
    let [err, result] = await getDataByDataBase(sql);
    if (err) {
        return {
            status: 201,
            msg: "查询城市信息失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            return {
                status: 200,
                msg: "城市信息",
                result
            };
        } else {
            return {
                status: 201,
                msg: "暂无城市信息！"
            }
        }
    }
}
// TAG 获取学科业务
async function getSubjectlist() {
    let sql = `select id,subject_name from subjects`;
    let [err, result] = await getDataByDataBase(sql);
    if (err) {
        return {
            status: 201,
            msg: "查询学科信息失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            return {
                status: 200,
                msg: "学科信息",
                result
            };
        } else {
            return {
                status: 201,
                msg: "暂无学科信息！"
            }
        }
    }


}
// TAG 获取考试类别
async function getCategorylist() {
    let sql = `select id,category_name from category`;
    let [err, result] = await getDataByDataBase(sql);
    if (err) {
        return {
            status: 201,
            msg: "查询考试信息失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            return {
                status: 200,
                msg: "考试信息",
                result
            };
        } else {
            return {
                status: 201,
                msg: "暂无考试信息！"
            }
        }
    }
}
//课程详情
async function getCourseByID({
    cid
}) {
    let sql1 = `select cid,title,concat("${serverUrl}"),detail_imgs,grade_name,subject_name,area_name,intro,price,tid from course where cid=?`;
    let [err, resultCourse] = await getDataByDataBase(sql1, [cid]);
    if (err) {
        return {
            status: 201,
            msg: "查询课程详情失败，请稍后重试！"
        }
    } else {
        if (resultCourse.length > 0) {
            let sql2 = `select realname,intro,concat("${serverUrl}",head_photo_url) as head_photo_url from teachers where tid=?`;
            let [err2, resultTeacher] = await getDataByDataBase(sql2, resultCourse[0].tid);
            if (err2) {
                console.log(err2)
                return {
                    status: 201,
                    msg: "查询讲师信息失败，请稍后重试！"
                }
            } else {
                let sql3 = `select vid,video_title from video where cid=?`;
                let [err3, resultVideo] = await getDataByDataBase(sql3, resultCourse[0].cid);
                if (err3) {
                    return {
                        status: 201,
                        msg: "查询视频信息失败，请稍后重试！"
                    }
                } else {
                    return {
                        status: 200,
                        msg: "课程信息",
                        result: {
                            course: resultCourse[0],
                            teacher: resultTeacher[0],
                            videos: resultVideo
                        }
                    }
                }
            }
        } else {
            return {
                status: 201,
                msg: "暂无该课程信息！"
            }
        }
    }
}
// TAG 根据所选分类以分页的形式返回课程列表数据(同步课程页)
// TODO pageSize:每页显示条数,page：页码,area_name：省份（河北）,grade_name：年级（高一）,subject_name：学科（英语）,type（同步还是精品）
async function getPageCourselist(obj) {
    let sqlStr = '';
    let page = checkData(obj.page) ? 1 : obj.page;
    let type = checkData(obj.type) ? 1 : obj.type;
    delete obj.page;
    delete obj.type;
    for (let [key, value] of Object.entries(obj)) {
        sqlStr += ` and ${key}="${value}"`
    }
    for (let key in obj) {
        if (obj[key] == "") {
            delete obj[key]
        }
    }
    // TODO obj是属性集合对象
    let sql = `SELECT c.cid as cid ,title,COUNT(v.cid) as ks,rs,price,concat("${serverUrl}courses/",image_src) as image_src,type,area_name,subject_name,type_name,category_name,grade_name,tid,status FROM course c LEFT JOIN video v on c.cid=v.cid LEFT JOIN (SELECT c.cid as id,COUNT(mid) as rs FROM course c INNER JOIN orders o on c.cid=o.cid  GROUP BY c.cid) oc on oc.id=c.cid where type=${type} ${sqlStr}  GROUP BY c.cid ORDER BY ks DESC,rs DESC limit ${(page - 1) * pageSize},${pageSize}`;

    let [err, result] = await getDataByDataBase(sql);

    if (err) {
        return {
            status: 201,
            msg: "查询课程信息失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            let sql1 = `select count(*) as countSum from course where type=${type} ${sqlStr}`;
            let [err1, [{
                countSum
            }]] = await getDataByDataBase(sql1);
            if (err1) {
                return {
                    status: 201,
                    msg: "查询列表失败，请稍后重试！"
                }
            } else {
                let totalPage = Math.ceil(countSum / pageSize);
                return {
                    status: 200,
                    msg: "课程列表",
                    result: {
                        page,
                        totalPage,
                        countSum,
                        pageSize
                    },
                    datalist: result
                };
            }

        } else {
            return {
                status: 201,
                msg: "暂无课程信息！"
            }
        }
    }
    // TODO 返回值
    //{status,msg,result:{page，totalPage，rows，"datalist":[{cid,title,price,image_src,type,type_name,area_name,grade_name,subject_name,category_name,tid,status}]
    // }}
}

// TAG 按年级分类
async function getGradelist() {
    let sql = `select id,grade_name from grade`;
    let [err, result] = await getDataByDataBase(sql);
    if (err) {
        return {
            status: 201,
            msg: "查询按年级分类信息失败，请稍后重试！"
        }
    } else {
        if (result.length > 0) {
            return {
                status: 200,
                msg: "按年级分类信息",
                result
            };
        } else {
            return {
                status: 201,
                msg: "暂无按年级分类信息！"
            }
        }
    }
}

module.exports = {
    getCourseList,
    getProvincesList,
    getCitysList,
    getPageCourselist,
    getSubjectlist,
    getCategorylist,
    getCourseByID,
    getProvinceBycity,
    getGradelist
}