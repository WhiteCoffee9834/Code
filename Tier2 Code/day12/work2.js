var button = document.querySelectorAll("button")
var ul = document.querySelector("ul")
var addButton = document.querySelector("#add")
var n = 0
addButton.onclick = function () {
    n++
    var li = document.createElement("li")
    li.innerHTML = "<span>" + "列表" + n + "</span>" + "<div><button>修改</button><button>删除</button></div>"
    ul.appendChild(li)
    // 在生成按钮的同时,顺便给予点击事件,这样就不需要到外面再去写
    // 这个地方不能使用箭头函数,this将会指向window
    li.children[1].children[1].onclick = function () {
        this.parentNode.parentNode.remove()
    }
    li.children[1].children[0].onclick = () => {
        li.children[0].innerHTML = prompt()
    }
}