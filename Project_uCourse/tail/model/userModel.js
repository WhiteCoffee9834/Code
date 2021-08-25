// XXX 用户业务层
const MD5 = require("md5")
const {
    getDataByDataBase
} = require("../db/db")
const {
    checkData,
    getToken,
    objToStr
} = require("../utils/utils")
// TAG 注册
async function register({
    username,
    pwd,
    confirmPassword
}) {
    if (checkData(username) || checkData(pwd) || checkData(confirmPassword)) {
        return {
            status: 201,
            msg: "非法数据"
        }
    } else {
        if (pwd != confirmPassword) {
            return {
                status: 201,
                msg: "两次输入的密码不相同"
            }
        } else {
            let sql = `insert member (username,pwd) value (?,?)`
            // NOTE 对数据库操作query,必须使用数组的形式传递参数
            let [err, result] = await getDataByDataBase(sql, [username, MD5(pwd)])
            if (err) {
                if (err.message.includes("Duplicate entry")) {
                    return {
                        status: 201,
                        msg: "用户名已存在"
                    }
                } else {
                    return {
                        status: 201,
                        msg: "请求数据库出错"
                    }
                }
            } else {
                if (result.affectedRows > 0) {
                    return {
                        status: 200,
                        msg: "注册成功",
                        result
                    }
                } else {
                    return {
                        status: 201,
                        msg: "注册失败,无法向数据库内添加记录"
                    }
                }
            }
        }
    }
}
// TAG 登录
async function login({
    username,
    pwd
}) {
    if (checkData(username) || checkData(pwd)) {
        return {
            status: 201,
            msg: "非法数据"
        }
    } else {
        let sql = `select * from member where username=? and pwd=?`
        let [err, result] = await getDataByDataBase(sql, [username, MD5(pwd)])
        if (err) {
            return {
                status: 201,
                msg: "连接数据库时出错"
            }
        } else {
            if (result.length > 0) {
                // 获取该用户的mid
                let sql = `select mid from member where username = "${username}"`
                // NOTE 复合解构,不能直接视作为对象的形式.[{mid}]是数组内部套的对象,因此解构也需要仿照这种形式进行解构
                let [err, [{
                    mid
                }]] = await getDataByDataBase(sql)
                return {
                    status: 200,
                    msg: "登录成功",
                    token: getToken({
                        mid
                    })
                }
            } else {
                let sql = `select * from member where username=?`
                let [err, result] = await getDataByDataBase(sql, [username])
                if (result.length > 0) {
                    return {
                        status: 201,
                        msg: "登录失败,密码不正确"
                    }
                } else {
                    return {
                        status: 201,
                        msg: "登录失败,用户不存在"
                    }
                }
            }
        }
    }
}
// TAG 获取用户信息
// 解构 mid, 只需要键名为 mid 的值
async function getUserInfo({
    mid
}) {
    let sql = `select mid,realname,username,sex,birthdate,city,head_photo_url,createdate from member WHERE mid=?`
    let [err, result] = await getDataByDataBase(sql, [mid])
    if (err) {
        return {
            status: 201,
            msg: "请求数据库时出错"
        }
    } else {
        return {
            status: 200,
            msg: "查询成功",
            result
        }
    }
}

// TAG 更新用户信息
async function updateUserInfo(user) {
    let mid = user.mid
    delete user.mid
    let sql = `update member set ${objToStr(user)} where mid = ?`
    let [err, result] = await getDataByDataBase(sql, [mid])
    if (err) {
        return {
            status: 201,
            msg: "请求数据库时出错"
        }
    } else {
        if (result.affectedRows > 0) {
            return {
                status: 200,
                msg: `数据修改成功`,
                result
            }
        } else {
            return {
                status: 201,
                msg: "数据修改失败,不存在这个条目"
            }
        }
    }
}
module.exports = {
    register,
    login,
    getUserInfo,
    updateUserInfo
}