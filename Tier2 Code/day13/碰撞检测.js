var block = document.querySelector("div")
var section = document.querySelector("section")

block.onmousedown = event => {
    var event = window.event || event
    console.log(event)
    var blockLeft = event.clientX - block.offsetLeft
    var blockTop = event.clientY - block.offsetTop

    document.onmousemove = event => {
        var event = window.event || event
        block.style.left = event.clientX - blockLeft + "px"
        block.style.top = event.clientY - blockTop + "px"
        // 判断碰撞检测
        if(
            block.offsetLeft + block.offsetWidth >= section.offsetLeft &&
            section.offsetLeft + section.offsetWidth >= block.offsetLeft &&
            block.offsetTop + block.offsetHeight >= section.offsetTop &&
            section.offsetTop + section.offsetHeight >= block.offsetTop
        ){
            section.style.backgroundColor = "#000"
        }else{
            section.style.backgroundColor = "#bfa"
        }
    }
    event.preventDefault()
}

document.onmouseup = () => {
    document.onmousemove = null
}
console.log(section.offsetTop)
console.log(section.offsetLeft)