$(".sendButton").click(function () {
    $(".comment-core").html('<li><p><img src="../img/login/user.png" alt=""><span>哈哈哈哈</span><span>' + new Date().getHours() + ':' + new Date().getMinutes() + '</span></p></li><li>' + $("textarea").val() + '</li>' + $(".comment-core").html())
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