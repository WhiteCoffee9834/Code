// XXX 公共业务层
const {getDataByDataBase} = require("../db/db")
const {serverUrl} = require("../utils/config")

// TAG 获取广告轮播图业务
async function getBanners(){
    let sql=`select concat("${serverUrl}",image_src) as image_src,title FROM banners WHERE isshow=1`;
    let [err,result]= await getDataByDataBase(sql);
    if(err){
        return {status:201,msg:"查询轮播图失败，请稍后重试！"}
    }else{
        if(result.length>0){
            return {status:200,msg:"广告轮播图",result};
        }else{
            return {status:201,msg:"暂无轮播图信息！"}
        }
    }
}

module.exports={
    getBanners
}