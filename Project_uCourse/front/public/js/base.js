// XXX 当前文件目前只做判断头部头像的显示与否
import "/data/jquery.min.js"
import {
    httpAjax
} from "/data/http.js"


// 回到顶部
$(".pagetop").on("click", "img", () => {
    $(document.documentElement).animate({
        "scrollTop": 0
    })
})

$(window).on("scroll", () => {
    // 页脚距离顶部距离取负值 + 滚动的距离 + 视口的高度
    let scrollDistance = (-$("footer").offset().top) + $(document.documentElement).scrollTop() + $(window).height()
    if (scrollDistance > 0) {
        $(".subnav").css("bottom", scrollDistance + "px")
    } else {
        $(".subnav").css("bottom", 0)
    }
})


try {
    // 获取该用户的midToken
    let midToken = sessionStorage.getItem("mid")
    // 发送请求,解密该midToken
    let data = await httpAjax("post", "/token", {
        midToken,
        token: midToken
    })
    if (data.mid) {
        $(".login-reg").css("display", "none")
        $(".user-avatar-relative").css("display", "block")
    } else {
        $(".login-reg").css("display", "flex")
        $(".user-avatar-relative").css("display", "none")
    }

    $(".user-option-ul").on("click", "li:last", () => {
        sessionStorage.removeItem("mid")
        location.reload()
    })

    $(".user-option-ul").on("click", "li:nth-child(5)", () => {
        location.href = "/pages/personInfo.html"
    })
    $(".user-option-ul").on("click", "li:nth-child(1)", () => {
        location.href = "/pages/personInfo.html"
    })
    // 发送请求查询mid对应的用户名
    let {
        result
    } = await httpAjax("get", "/user/:id", {
        token: midToken,
        mid: data.mid
    })
    $(".user-option-ul li:nth-child(1)").html(result[0].username)
} catch (error) {
    console.log("你没有登录")
}