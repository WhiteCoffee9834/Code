/* 获取非行间样式 */

/* 
    @params el{Object}  元素
    @params attr{String}   样式属性
*/

function getStyle(el, attr) {
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el)[attr];
    }
}

/* 匀速运动的框架 */

/* 
    @params：el {Object} 元素
    @params：attr {String} 样式属性
    @params：step {Number} 步长
    @params：target {Number} 运动的目标值
*/

var timer = null;

function move(el,attr,step,target) {
    //判断step的正负值
    //如果当前位置<目标值，step为正（向右走）；如果当前位置>目标值，step为负（向左走）
    step = parseInt(getStyle(el,attr)) < target ? step : -step;

    clearInterval(timer);
    timer = setInterval(function () {
        var cur = parseInt(getStyle(el, attr)); 
        cur += step;

        //如果向右走，step>0，当前值>=目标值 停止 或者 向左走，step<0,当前值 <= 目标值 停止

        if(step > 0 && cur >= target || step < 0 && cur <= target){
            cur = target;
            clearInterval(timer);
        }
        el.style[attr] = cur + "px";
    }, 60)
}