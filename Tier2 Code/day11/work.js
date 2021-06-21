var pink = document.querySelector("#pink")
var div = document.querySelectorAll("div")

var offsetTop = pink.offsetTop
var clientHeight = document.documentElement.clientHeight

window.onscroll = () => {
    var scrollTop = document.documentElement.scrollTop
    console.log(scrollTop)
    if (scrollTop >= offsetTop) {
        pink.style.position = "fixed"
    }
    if (scrollTop < clientHeight) {
        pink.style.position = "static"
    }
}