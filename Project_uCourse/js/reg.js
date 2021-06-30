var form = document.querySelector("form")
var verificationCodeBox = form.getElementsByClassName("verificationCodeBox")[0]
var code = ""

function getCode() {
    var str = "123456789qwertyupasdfghjkzxcvbnmQWERTYUPASDFGHJKZXCVBNM"
    for (var i = 0; i < 4; i++) {
        var index = parseInt(Math.random() * str.length - 1 - 0 + 1) //随机抽取下标
        code += str[index] //将下标对应的字符串组合在一起就形成了四位随机验证码
    }
    return code //将验证码当作函数返回值返回出去
}
verificationCodeBox.value = getCode()
verificationCodeBox.onclick = function (event) {
    code = ""
    verificationCodeBox.value = getCode()
}
var arr = [true, true, true, true]
form.tel.onblur = function () {
    var em = this.nextElementSibling || this.nextSibling
    if (/^1(3|5|7|8|9)\d{9}$/.test(this.value)) {
        em.innerText = ""
        arr[0] = true
    } else {
        em.innerText = "手机号格式不正确"
        arr[0] = false
    }
}
form.password.onblur = function () {
    var em = this.nextElementSibling || this.nextSibling
    if (/\w{6,20}/.test(this.value)) {
        em.innerText = ""
        arr[1] = true
    } else {
        em.innerText = "密码应为6-20位"
        arr[1] = false
    }
}
form.confirmPassword.onblur = function () {
    var em = this.nextElementSibling || this.nextSibling
    if (this.value == form.password.value) {
        em.innerText = ""
        arr[2] = true
    } else {
        em.innerText = "两次输入的密码不相同"
        arr[2] = false
    }
}
form.verificationCode.onblur = function () {
    var em = form.querySelector(".checkCode")
    if (this.value.toUpperCase() == verificationCodeBox.value.toUpperCase()) {
        em.innerText = ""
        arr[3] = true
    } else {
        em.innerText = "验证码输入错误"
        arr[3] = false
    }
}
form.onsubmit = function () {
    form.tel.focus()
    form.password.focus()
    form.confirmPassword.focus()
    form.verificationCode.focus()
    form.verificationCode.blur()

    var checkArr = arr.every(function (value) {
        return value
    })
    if (checkArr == true) {
        //本地存储
        var obj = {
            "tel": form.tel.value,
            "password": form.password.value
        }
        // 先获取数组
        var myAccount = JSON.parse(localStorage.getItem("user"))
        // 如果数组存在
        if (myAccount) {
            myAccount.push(obj)
            localStorage.setItem("user", JSON.stringify(myAccount))
        } else {
            //不存在则创建数组
            localStorage.setItem("user", JSON.stringify([obj])) //需要添加第一个用户的信息,不能直接添加空数组
        }
        alert("注册成功,即将返回登录页")
        location.href = "./login.html"
    } else {
        alert("请检查表单项是否填写正确")
    }
}