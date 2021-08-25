import "/data/jquery.min.js";
import { httpAjax } from "/data/http.js"


// TAG 动态获取同步课程表
export async function getSyncCourseList(obj) {
    let data = await httpAjax("post", "/courses", obj);
    if (data.status === 200) {
        return data.datalist;
    } else {
        return [];
    }
}

// TAG 获取省份
export async function getProvincesList() {
    let data = await httpAjax("post", "/provinces");
    if (data.status === 200) {
        return data.result;
    } else {
        return [];
    }
}

// TAG 根据省份获取城市列表
export async function getCitysList({ province_name }) {
    let data = await httpAjax("post", "/citys", { province_name });
    if (data.status === 200) {
        return data.result;
    } else {
        return [];
    }
}

// TAG 根据城市获取省份
export async function getProvinceBycity({ city_name }) {
    let data = await httpAjax("post", "/pro", { city_name });
    if (data.status === 200) {
        return data.result;
    } else {
        return [];
    }
}

// // TAG 获取页码数
export async function getPageCourselist(obj) {
    let data = await httpAjax("post", "/courses", obj);
    if (data.status === 200) {
        return data.result;
    } else {
        return [];
    }
}