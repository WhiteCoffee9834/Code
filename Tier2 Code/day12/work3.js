var div = document.querySelector("div")
var ul = document.querySelector("ul")
var n = true

div.onclick = () => {
    if (n == true) {
        ul.style.display = "block"
    } else {
        ul.style.display = "none"
    }
    n = !n
}

var li = document.querySelectorAll("li")

for (var i = 0; i < li.length; i++) {
    li[i].onclick = function () {
        for (var j = 0; j < li.length; j++) {
            li[j].style.backgroundColor = "#fff"
            li[j].style.color = "#000"
        }
        div.innerHTML = this.innerHTML
        ul.style.display = "none"
        this.style.backgroundColor = "orange"
        this.style.color = "#fff"
        n = !n
    }
}