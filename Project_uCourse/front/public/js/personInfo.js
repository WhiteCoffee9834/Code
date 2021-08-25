import "/data/jquery.min.js";
import {
    httpAjax
} from "/data/http.js";

$(".user-info-setting").addClass("display")

// 侧边栏点击
$("aside p").on("click", (This) => {
    $(This.target).next().toggleClass("display")
})
// 学员档案,安全设置选项卡点击
$(".tab").on("click", "button", (This) => {
    $(This.target).parent().children().removeClass("active")
    $(This.target).addClass("active")
    if ($(This.target).html() == "学员档案") {
        $(".user-info-setting").addClass("display")
        $(".security-setting").removeClass("display")
    } else {
        $(".user-info-setting").removeClass("display")
        $(".security-setting").addClass("display")
    }
})
// 表单互动
$(".user-info-setting p").on("click", (This) => {
    $(This.target).parent().next().toggleClass("displayOption")

    // 更改表单内容
    $(".provinceTab").on("click", (That) => {
        $(That.target).parent().prev().find("p").html($(That.target).html())
    })

    $(".tierTab").on("click", (That) => {
        $(That.target).parent().prev().find("p").html($(That.target).html())
    })

    $(document).on("click", () => {
        $("ul").removeClass("displayOption")
    })
    return false
})
// 获取省份
let provinceData = await httpAjax("post", "/provinces");
let province = provinceData.result

$.each(province, function (index, item) {
    $(".provinceTab").append(`<li>${item.province_name}</li>`)
})


// 保存更改时发送请求
$(".save").on("click", async (This) => {
    let {
        mid
    } = await httpAjax("post", "/token", {
        midToken: sessionStorage.getItem("mid"),
    })
    let data = await httpAjax("put", "/user/:id", {
        token: sessionStorage.getItem("mid"),
        mid,
        username: $(".username").val(),
        realname: $(".realName").val(),
        sex: $(":radio:checked").val(),
        birthdate: $(".birthDate").val(),
        city: $(".select").html()
    })
    console.log(data)
    alert(data.msg)
})

// 发送请求查询联系方式
let midToken = sessionStorage.getItem("mid") // 拿到本地存储中存的经过加密的mid
let midData = await httpAjax("post", "/token", {
    midToken, // 把加密后的mid传出去解密
    token: midToken // token验证
})

let {
    result
} = await httpAjax("get", "/user/:id", {
    token: midToken,
    mid: midData.mid //拿到mid
})
$(".phoneNumber").html(result[0].username)


// 显示更改登录密码框
$(".changePwd").on("click", (This) => {
    $(".changePwdWindow").css("display", "block")
    $(".changePwdForm h2").html("更改密码")
    $(".changePwdForm span").html("新密码:")
})
// 显示更改电话框
$(".changePhone").on("click", (This) => {
    $(".changePwdWindow").css("display", "block")
    $(".changePwdForm h2").html("更改手机号")
    $(".changePwdForm span").html("新号码:")
})

// 点击保存按钮
$("#savePwd").on("click", async () => {
    let a = $("#sp").html()
    if ($("#insertPwd").val() == "") {
        if (a == "新密码:") {
            alert("请输入新密码")
        } else {
            alert("请输入新手机号")
        }
    } else {
        if (a == "新密码:") {
            let data = await httpAjax("put", "/password", {
                token: midToken,
                mid: midData.mid,
                pwd: $("#insertPwd").val()
            })
            alert(data.msg)
        } else {
            let data = await httpAjax("put", "/password", {
                token: midToken,
                mid: midData.mid,
                username: $("#insertPwd").val()
            })
            alert(data.msg)
        }
        $(".changePwdWindow").css("display", "none")
        location.reload()
    }
    $("#insertPwd").val("")
})
// 点击取消按钮
$("#cancelPwd").on("click", () => {
    $(".changePwdWindow").css("display", "none")
})