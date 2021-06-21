var img = document.getElementsByTagName("img")
var clientHeight = document.documentElement.clientHeight

for (var i = 0; i < img.length; i++) {
    var imgOffsetOp = img[i].offsetTop

    if (imgOffsetOp <= clientHeight) {
        img[i].src = img[i].getAttribute("_src")
    }
}

window.onscroll = () => {
    var scrollTop = document.documentElement.scrollTop

    newFunction(scrollTop)

}

function newFunction(scrollTop) {
    for (var i = 0; i < img.length; i++) {
        if (img[i].offsetTop <= scrollTop + clientHeight) {
            img[i].src = img[i].getAttribute("_src")
        }
    }

}