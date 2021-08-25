// TAG 配置后端服务器地址
export let serverHttp = "http://192.168.4.165:1000";
// export let serverHttp = "http://localhost:1000";

// TAG checkData检验数据有效性
export function checkData(param) {
    return param == "undefined" || param == "null" || param == "" || param == undefined || param == null ? true : false
}