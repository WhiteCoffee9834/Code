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

form.onsubmit = function () {
    form.tel.focus()
    form.password.focus()
    form.password.blur()

    var checkArr = arr.every(function (value) {
        return value
    })
    if (checkArr == true) {
        // var userArr = localStorage.getItem("user")
        var userArr = JSON.parse(localStorage.getItem("user"))
        // 如果本地没有数据,就说明还没有注册
        if (!userArr) {
            alert("还没有注册")
            location.href = "./reg.html"

            return //直接终止函数执行
        }
        // 如果本地已经有数据(有数组),那就直接循环遍历数组
        for (var i = 0; i < userArr.length; i++) {
            if (userArr[i].tel == form.tel.value && userArr[i].password == form.password.value) {
                alert("登录成功,即将回到首页")
                location.href = "../index.html"
                return
            } else if (userArr[i].tel == form.tel.value) {
                alert("密码输入错误")
                return
            }
        }
        var con = confirm("改手机号还未注册")
        if (con == true) {
            location.href = "./reg.html"
        } else {
            return
        }
    }
}