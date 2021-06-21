var timer
var block = document.querySelectorAll("div")

var getStyle = (el, attr) => {
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el)[attr];
    }
}
var bufferMove = (el, props, scaleFunction) => {
    // 清除对应的计时器
    clearInterval(el.timer)

    // 让每一个方块触发的计时器都是独立的
    el.timer = setInterval(() => {
        for (var attr in props) {

            if (attr == "opacity") {
                props[attr] = props[attr] <= 1 ? props[attr] * 1000 : props[attr]
                var current = parseInt(getStyle(el, attr) * 1000)
            } else {
                var current = parseInt(getStyle(el, attr))
            }

            var step = (props[attr] - current) / scaleFunction
            step = step > 0 ? Math.ceil(step) : Math.floor(step)

            if (current == props[attr]) {
                clearInterval(el.timer)
            }
            console.log(step)

            if (attr == "opacity") {
                el.style.opacity = (current + step) / 1000
            } else {
                el.style[attr] = current + step + "px"
            }
        }
    }, 30);
}
for (var i = 0; i < block.length; i++) {
    block[i].addEventListener("mouseenter", function () {
        bufferMove(this, {
            "width": 500,
            "height": 400,
            "opacity": 0.2
        }, 10)
    })
    block[i].addEventListener("mouseleave", function () {
        bufferMove(this, {
            "width": 100,
            "height": 100,
            "opacity": 1
        }, 10)
    })
}