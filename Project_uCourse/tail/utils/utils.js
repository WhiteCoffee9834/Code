// XXX 工具文件
// TAG 检验数据有效性
function checkData(param) {
    return param == "undefined" || param == "null" || param == "" || param == undefined || param == null ? true : false
}
// TAG 生成Token
const token = require("jsonwebtoken")
let key = "fj kd 3213ls4213214 43aj5 fkl32d421   2131sajflkjfsjfkljfskjfdksljfsklfseiruiwoeruroiwqeurwienavnalkjfdjakhgoijqwnfg"
function getToken(data) {
    return token.sign(data, key, { expiresIn: "5d" })
}
// TAG 解密Token
function decryptToken(data) {
    return token.verify(data, key)
}
function decryptMidToken({midToken}){
    return token.verify(midToken,key)
}
// TAG 将对象转换为字符串模式
const MD5 = require("md5")
function objToStr(obj) {
    let sql = ""
    for (let [key, value] of Object.entries(obj))
        if (!checkData(value)) {
            if (key == "pwd") {
                value = MD5(value)
            }
            if (typeof value == "string") {
                sql += `${key}="${value}",`
            } else {
                sql += `${key}=${value},`
            }
        }
    return sql.substring(0, sql.length - 1)
}
module.exports = {
    checkData,
    getToken,
    decryptToken,
    decryptMidToken,
    objToStr,
}