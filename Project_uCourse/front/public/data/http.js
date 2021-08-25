
import "/data/jquery.min.js";
import {serverHttp} from "/data/config.js";

// TAG 封装Ajax发送请求
export async function httpAjax(method, url, data) {
    return await $.ajax({
        url:`${serverHttp}/api${url}`,
        data,
        method
    });
}
