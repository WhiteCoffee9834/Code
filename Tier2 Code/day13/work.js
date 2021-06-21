var photo = document.querySelector("div")
var block = document.querySelector("p")
var bigBox = document.querySelector("section")
var bigBoxImg = bigBox.getElementsByTagName("img")[0]

photo.onmouseenter = function(){
    block.style.display = "block"
    bigBox.style.display = "block"
}
photo.onmouseleave = function(){
    block.style.display = "none"
    bigBox.style.display = "none"
}
photo.onmousemove = function(event){
    // 将光标设置在滑块的中心
    var left = event.clientX - block.offsetWidth / 2
    var top = event.clientY - block.offsetHeight / 2

    // 边缘碰撞，不让移动的滑块溢出
    if(left < 0){
        left = 0
    }
    if(top < 0){
        top = 0
    }
    if(left > photo.offsetWidth - block.offsetWidth){
        left = photo.offsetWidth - block.offsetWidth
    }
    if(top > photo.offsetHeight - block.offsetHeight){
        top = photo.offsetHeight - block.offsetHeight
    }
    // 让滑块移动
    block.style.left = left + "px"
    block.style.top = top + "px"
    // 计算比例
    var percentX = left / (photo.offsetWidth - block.offsetWidth)
    var percentY = top / (photo.offsetHeight - block.offsetHeight)
    // 将计算后的比例赋值给右侧图片移动
    bigBoxImg.style.left = -percentX * (bigBoxImg.offsetWidth - bigBox.offsetWidth) + "px"
    bigBoxImg.style.top = -percentY * (bigBoxImg.offsetHeight - bigBox.offsetHeight) + "px"
}