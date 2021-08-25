
import "/data/jquery.min.js";
import { httpAjax } from "/data/http.js"

// TAG 轮播图图片获取
export async function getBannerDate() {
    let data = await httpAjax("get", "/banners");
    if (data.status === 200) {
        return data.result;
    } else {
        return [];
    }
}

// TAG 动态获取首页课程表
export async function getCourseList({ type }) {
    let data = await httpAjax("post", "/courseinfo", { type });
    if (data.status === 200) {
        return data.result;
    } else {
        return [];
    }
}



