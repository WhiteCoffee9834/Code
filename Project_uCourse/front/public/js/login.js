import "/data/jquery.min.js"
import {
    httpAjax
} from "/data/http.js"
var form = document.querySelector("form")

var arr = [true, true]
form.tel.onblur = function () {
    var em = this.nextElementSibling || this.nextSibling
    if (/^1(3|5|7|8|9)\d{9}$/.test(this.value)) {
        em.innerText = ""
        arr[0] = true
    } else {
        em.innerText = "请输入正确的账号"
        arr[0] = false
    }
}
form.password.onblur = function () {
    var em = this.nextElementSibling || this.nextSibling
    if (/\w{6,20}/.test(this.value)) {
        em.innerText = ""
        arr[1] = true
    } else {
        em.innerText = "请输入密码"
        arr[1] = false
    }
}

form.onsubmit = async function () {
    form.tel.focus()
    form.password.focus()
    form.password.blur()

    var checkArr = arr.every(function (value) {
        return value
    })
    if (checkArr == true) {
        let data = await httpAjax("post", "/login", {
            username: form.tel.value,
            pwd: form.password.value
        })
        if (data.status == 200) {
            sessionStorage.setItem("mid", data.token)
            alert(data.msg)
            location.href = "/index.html"
        } else {
            alert(data.msg)
        }
    }
}