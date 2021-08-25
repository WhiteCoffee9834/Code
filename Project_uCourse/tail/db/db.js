// INFO 数据库配置信息
let databaseInfo = {
    host:"192.168.4.165",
    port:3306,
    user:"ren",
    password:"000000",
    database:"ucourse"
}
// INFO 服务器地址配置
const mysql = require("mysql")
/**
 * 参数说明 
 * sql为sql语句
 * data是给sql语句传递的参数
 * */
async function getDataByDataBase(sql,data) {
    let connect = mysql.createConnection(databaseInfo)
    connect.connect(err=>{
        if(err){
            console.log("连接数据库出错",err.message)
        }
    })
    let dataResult = await new Promise(resolve=>{
        connect.query(sql,data,(err,result)=>{
           resolve([err,result])
        })
    })
    connect.end(err=>{
        if(err){
            console.log("关闭数据库出错",err.message)
        }
    })
    return dataResult
}
module.exports = {
    databaseInfo,
    getDataByDataBase
}