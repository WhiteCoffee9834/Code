// 获取滑块
var block = document.querySelector("#block")
// 获取滚动条载体
var scrollbar = document.querySelector("#scrollbar")
// 获取文本区
var text = document.querySelector("#text")
// 获取可视区
var section = document.querySelector("section")
// 获取文本的实际高度
var textHeight = text.offsetHeight
// 获取可视区高度
var sectionHeight = section.offsetHeight
// 获取滚动条滑块高度
var blockHeight = block.offsetHeight

function scroll(ev) {
    var event = window.event || ev;
    //谷歌/IE
    // console.log(event.wheelDelta);
    //火狐
    // console.log(event.detail);

    //处理滚轮方向
    var tag = true;//如果tag为true，代表向上，如果为false，代表向下

    //谷歌/IE 向下：-120   向上：120
    if (event.wheelDelta) {
        tag = event.wheelDelta > 0 ? true : false;
    } else {//火狐：event.detail  向下：3  向上：-3
        tag = event.detail < 0 ? true : false;
    }

    if (tag == true) {
        console.log("向上")
        var speed = 20
        if (block.offsetTop <= 0) {
            block.style.top = 0 + "px"
            text.style.top = 0 + "px"
        } else {
            block.style.top = block.offsetTop - speed + "px"
            text.style.top = - block.offsetTop / (scrollbar.offsetHeight - blockHeight) * (textHeight - sectionHeight) + "px"
        }
        conflictCheck()
    } else {
        console.log("向下")
        var speed = 20
        if (block.offsetTop >= scrollbar.offsetHeight - blockHeight) {
            block.style.top = scrollbar.offsetHeight - blockHeight + "px"
            text.style.top = - (textHeight - sectionHeight) + "px"
        } else {
            block.style.top = block.offsetTop + speed + "px"
            text.style.top = - block.offsetTop / (scrollbar.offsetHeight - blockHeight) * (textHeight - sectionHeight) + "px"
        }
        conflictCheck()
    }
}
// 冲撞检测及超出范围无效化
var conflictCheck = () => {
    if (block.offsetTop <= 0) {
        block.style.top = 0
        text.style.top = 0
    }
    if (block.offsetTop >= scrollbar.offsetHeight - block.offsetHeight) {
        block.style.top = scrollbar.offsetHeight - block.offsetHeight + "px"
        text.style.top = - block.offsetTop / (scrollbar.offsetHeight - blockHeight) * (textHeight - sectionHeight) + "px"
    }
}
// 滚动事件
section.onmousewheel = scroll
// 按住滚动条事件
scrollbar.onmousedown = function (event) {
    var Y = event.clientY - block.offsetHeight / 2
    block.style.top = Y + "px"
    text.style.top = - block.offsetTop / (scrollbar.offsetHeight - blockHeight) * (textHeight - sectionHeight) + "px"
    conflictCheck()
    document.onmousemove = function (event) {
        var Y = event.clientY - block.offsetHeight / 2
        block.style.top = Y + "px"
        text.style.top = - block.offsetTop / (scrollbar.offsetHeight - blockHeight) * (textHeight - sectionHeight) + "px"
        conflictCheck()
    }
    document.onmouseup = function (event) {
        document.onmousemove = null
    }
    event.preventDefault()
}

// 可视内容区的高度 / 内容区的实际高度 = 滚动条的高度 / 滑道的高度
if (sectionHeight / textHeight < 1) {
    block.style.height = (sectionHeight / textHeight) * scrollbar.offsetHeight + "px"
} else {
    block.style.height = scrollbar.offsetHeight + "px"
}
text.onmousedown = function (event) {
    event.preventDefault()
}