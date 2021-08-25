import "/data/jquery.min.js"
import {
    httpAjax
} from "/data/http.js"


$(".sendButton").click(async function () {
    try {
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
        let username = result[0].username

        // NOTE 使用trim()方法判断输入的值是否全部为空格,如果全部为空格,则trim后的值就是空的,自然过不了判断语句
        if ($("textarea").val().trim()) {
            $(".comment-core").html(
                `<li>
            <p>
                <img src="../img/login/user.png" alt="">
                <span>${username}</span>
                <span>${new Date().getHours()}:${new Date().getMinutes()}</span>
            </p>
        </li>
        <li>
            ${$("textarea").val()}
        </li>
        ${$(".comment-core").html()}
    `)
            $("textarea").val("")
        } else {
            alert("输入的值不能为空")
        }
    } catch (error) {
        alert("你还没有登录,请先登录")
        location.href = "/pages/login.html"
    }
})


$(".switchClassContent").click(function () {
    $(".class-content-core").css("display", "block")
    $(".more-content").css("display", "block")
    $(".classInfo").css("display", "none")
})
$(".switchClassInfo").click(function () {
    $(".class-content-core").css("display", "none")
    $(".more-content").css("display", "none")
    $(".classInfo").css("display", "block")
})


var seeAll = document.querySelector(".seeAll")
var classContent = document.querySelector(".class-content-core")
var classTitle = classContent.querySelectorAll("p")

for (var i = 0; i < classTitle.length; i++) {
    classTitle[i].index = true
    classTitle[i].onclick = function () {
        if (this.index) {
            this.lastElementChild.className = "triangle-top"
            this.nextElementSibling.style.display = "block"
        } else {
            this.lastElementChild.className = "triangle-down"
            this.nextElementSibling.style.display = "none"
        }
        this.index = !this.index
    }
    classTitle[i].onmousedown = function () {
        return false
    }
}


var tag = true
$(".seeAll").click(function () {
    if (tag) {
        classTitle.forEach((value) => {
            value.nextElementSibling.style.display = "block"
            value.lastElementChild.className = "triangle-top"
            $(this).html("点我隐藏全部")
            tag = false
        });
    } else {
        classTitle.forEach((value) => {
            value.nextElementSibling.style.display = "none"
            value.lastElementChild.className = "triangle-down"
            $(this).html("点我展开全部")
            tag = true
        });
    }
})
$(".more-content").mousedown(function () {
    return false
})