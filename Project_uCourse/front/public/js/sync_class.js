import "/data/jquery.min.js";
import {
    getSyncCourseList,
    getProvincesList,
    getCitysList,
    getProvinceBycity,
    getPageCourselist
} from "/data/sync_class.js";


{
    sessionStorage.clear();
    getPage({});
}

// TAG 渲染数据
async function sync_class(obj) {
    // TAG 渲染页面下面课程图片
    let syncLesson = document.getElementsByClassName("sync-main-img-wrapper")[0];
    let insertSyncLesson = await getSyncCourseList(obj);
    if (insertSyncLesson.length === 0) {
        syncLesson.innerHTML = `<div id="wuxinxi"><span>暂无课程信息！</span></div>`;
    } else {
        let inner = ""
        insertSyncLesson.forEach(function(value) {
            inner += `<div class="fl sync-img-box-relative"><img src=${value.image_src} alt=""><div class="img-mask"><span>${value.rs > 0 ? value.rs : 0}人在学习</span></div><div class="img-info"><p>${value.title}</p><p>${value.ks}课时</p></div><div class="free-to-study">${value.price > 0 ? "￥" + value.price : "免费学习"}</div></div>`
        })
        syncLesson.innerHTML = inner;
    }
};

//TAG 分页+搜索功能
async function getPage(obj) {
    for (let key in obj) {
        if (obj[key] == "") {
            delete obj[key]
        }
    }
    let pageSum = await getPageCourselist(obj);
    // TODO 存储当前筛选条件下得总页数
    sessionStorage.setItem("pageSum", pageSum.totalPage);
    sessionStorage.setItem("cur_page", pageSum.page);
    let htmlPageText = "";
    for (let i = 1; i <= pageSum.totalPage; i++) {
        htmlPageText += `<a href="#:" class="page_btn">${i}</a>`
    }
    $(".pageButton").html(`<button id="page_up">上一页</button>${htmlPageText}<button id="page_dowm">下一页</button>`);
    sync_class(obj);
}


// TAG 渲染省份下拉列表
var province = document.getElementById("province")
let province_down = await getProvincesList();
let pro_inner = "<option selected>省份</option>";
province_down.forEach(function(value) {
    pro_inner += `<option>${value.province_name}</option>`;
})
province.innerHTML = pro_inner;

// TAG 当点击省份标签后提前渲染好城市列表
let citys = document.getElementById("city");
let city_inner = `<option selected id="ct_checked">城市</option>`;
citys.innerHTML = city_inner;

$("#province").on("change", async() => {
    let province_name = ($("#province").val());
    let citys_list = await getCitysList({
        province_name
    });
    city_inner = `<option selected>城市</option>`;
    citys_list.forEach(function(value) {
        city_inner += `<option>${value.city_name}</option>`
    })
    citys.innerHTML = city_inner;
    // TODO 添加搜索条件area_name
    let area_name = province_name;
    sessionStorage.setItem("area_name", area_name);
    let page = sessionStorage.getItem("cur_page");
    let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
    let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
    let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
    await getPage({ page, area_name, subject_name, type_name, grade_name });
})

// TAG 添加热门城市搜索条件
$("#hot_city").on("click", "td", async(This) => {
    sessionStorage.setItem("cur_page", 1)
    let city_name = $(This.target).html();

    if (city_name == "上海市" || city_name == "天津市" || city_name == "北京市" || city_name == "重庆市") {
        sessionStorage.setItem("area_name", city_name);
        let page = sessionStorage.getItem("cur_page");
        let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
        let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
        let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
        await getPage({ page, area_name: city_name, subject_name, type_name, grade_name });
        // TODO 同步省份和城市下拉列表的值
        $("#province").val(city_name);
        $("#city").val("城市");
    } else {
        let [{ province_name }] = await getProvinceBycity({ city_name });
        // TODO 同步省份和城市下拉列表的值
        $("#province").val(province_name);
        // TAG 确定省份后，重新渲染出城市列表
        let city_inner = '';
        let city = document.getElementById("city");
        let citys_list = await getCitysList({ province_name })
        citys_list.forEach(function(value) {
            city_inner += `<option>${value.city_name}</option>`
        })
        city.innerHTML = city_inner;
        sessionStorage.setItem("area_name", province_name);
        let page = sessionStorage.getItem("cur_page");
        let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
        let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
        let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
        await getPage({ page, area_name: province_name, subject_name, type_name, grade_name });
    }
})



//TAG 点击页码，跳转页码
$(".pageButton").on("click", ".page_btn", async(btnThis) => {
    let page = $(btnThis.target).html();
    let area_name = sessionStorage.getItem("area_name") ? sessionStorage.getItem("area_name") : "";
    let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
    let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
    let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
    if (page != sessionStorage.getItem("cur_page")) {
        await getPage({ page, area_name, subject_name, type_name, grade_name });
        sessionStorage.setItem("cur_page", page);
    }
});

//TAG 点击上一页
$(".pageButton").on("click", "#page_up", async() => {
    //TAG 点击是先获取当前页码与总页码，已存储；
    let page = sessionStorage.getItem("cur_page");
    let area_name = sessionStorage.getItem("area_name") ? sessionStorage.getItem("area_name") : "";
    let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
    let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
    let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
    if (page > 1) {
        page--;
        await getPage({ page, area_name, subject_name, type_name, grade_name });
        // TAG 点击完，更新页码存储
        sessionStorage.setItem("cur_page", page);
    }
})

// TAG 点击下一页
$(".pageButton").on("click", "#page_dowm", async() => {
    //TAG 点击是先获取当前页码与总页码，已存储；
    let page = sessionStorage.getItem("cur_page");
    let pageSum = sessionStorage.getItem("pageSum");
    let area_name = sessionStorage.getItem("area_name") ? sessionStorage.getItem("area_name") : "";
    let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
    let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
    let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
    if (page < pageSum) {
        page++;
        await getPage({ page, area_name, subject_name, type_name, grade_name });
        // TAG 点击完，更新页码存储
        sessionStorage.setItem("cur_page", page);
    }
})

// TAG 点击热门城市，刷新本地存储area_name
$("#hot_city").on("click", "td", async(This) => {
    let city_name = $(This.target).html();
    if (city_name == "石家庄市" || city_name == "长春市") {
        let [{ province_name }] = await getProvinceBycity({ city_name });
        sessionStorage.setItem("area_name", province_name);
    } else {
        sessionStorage.setItem("area_name", city_name);
    }
});

// TAG 点击选择年级
$(".grade_class").on("click", "td", async(This) => {
    let grade_name = $(This.target).html();
    let page = sessionStorage.getItem("cur_page");
    let area_name = sessionStorage.getItem("area_name") ? sessionStorage.getItem("area_name") : "";
    let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
    let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
    if ($(This.target).hasClass("active") === true) {
        sessionStorage.removeItem("grade_name");
        await getPage({ page, area_name, subject_name, type_name });
    } else {
        sessionStorage.setItem("grade_name", grade_name);
        await getPage({ page, area_name, subject_name, type_name, grade_name });
    }
})

// TAG 点击选择学科
$("#subject_name_class").on("click", "td", async(This) => {
    let subject_name = $(This.target).html();
    let page = sessionStorage.getItem("cur_page");
    let area_name = sessionStorage.getItem("area_name") ? sessionStorage.getItem("area_name") : "";
    let type_name = sessionStorage.getItem("type_name") ? sessionStorage.getItem("type_name") : "";
    let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
    if ($(This.target).html() == "全部") {
        sessionStorage.removeItem("subject_name");
        await getPage({ page, area_name, type_name, grade_name });
    } else if ($(This.target).hasClass("active") === true) {
        sessionStorage.removeItem("subject_name");
        await getPage({ page, area_name, type_name, grade_name });
    } else {
        sessionStorage.setItem("subject_name", subject_name);
        await getPage({ page, area_name, subject_name, type_name, grade_name });
    }
})

// TAG 点击选择版本
$("#type_name_class").on("click", "td", async(This) => {
    let type_name = $(This.target).html();
    let page = sessionStorage.getItem("cur_page");
    let area_name = sessionStorage.getItem("area_name") ? sessionStorage.getItem("area_name") : "";
    let subject_name = sessionStorage.getItem("subject_name") ? sessionStorage.getItem("subject_name") : "";
    let grade_name = sessionStorage.getItem("grade_name") ? sessionStorage.getItem("grade_name") : "";
    if ($(This.target).hasClass("active") === true) {
        sessionStorage.removeItem("type_name");
        await getPage({ page, area_name, subject_name, grade_name });
    } else {
        sessionStorage.setItem("type_name", type_name);
        await getPage({ page, area_name, subject_name, type_name, grade_name });
    }
})




// 点击表格项给予样式
$("tr:not(tr:first-Child)").on("click", "td", (This) => {
    $(This.target).siblings().removeClass("active")
    $(This.target).toggleClass("active")
});
// 点击第三行或第四行的时候,把另外一行的子元素的样式清空
// 因为这两行实际上是属于一类的,并不想要在选择的时候能够同时选择两行,但是在布局的时候并没有做到这一点,导致这个地方需要写得这么麻烦;
$("tr:nth-child(3)").on("click", "td", (This) => {
    $(This.target).parent().next().children().removeClass("active")
})
$("tr:nth-child(4)").on("click", "td", (This) => {
    $(This.target).parent().prev().children().removeClass("active")
});

// TAG 只要province_name改变，就更新本地存储的area_name的值
$("#province").on("change", () => {
    sessionStorage.setItem("cur_page", 1);
    let area_name = `${$("#province").val()}`;
    sessionStorage.setItem("area_name", area_name);
    // TODO 如果先点击过热门城市，再更改省份，两者不一致，则清楚热门城市的点击样式
    $.each($("#hot_city").children("td"), (index, item) => {
        // TODO 元素.classList.contains(类名)或者 JQ中的元素.hasClass(类名)可以判断是否有类名
        if (item.classList.contains('active')) {
            if ($(item).html() != $("#province").val()) {
                $(item).removeClass("active");
            }
        }
    })
})