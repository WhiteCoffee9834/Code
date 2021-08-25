
import { getBannerDate, getCourseList } from "/data/index.js"

(async function () {
    // 课程数据引入
    var tbLesson = document.getElementsByClassName("index-class-wrapper")[0] //同步课程
    var zxLesson = document.getElementsByClassName("index-class-wrapper")[1] //在线课程
    var jpLesson = document.getElementsByClassName("index-class-wrapper-890")[0] //精品课程

    // TAG 首页课程列表渲染
    // TAG 同步课堂
    let course_online = await getCourseList({ type: 1 });
    // TAG 精品课程
    let course_good = await getCourseList({ type: 2 });
    // TAG 在线测试
    let course_test=await getCourseList({type:3})
    setHtml(course_online, tbLesson)
    setHtml(course_test, zxLesson)
    setHtml(course_good, jpLesson)
    // TAG 首页课程列表渲染函数
    function setHtml(data, ul) {
        var inner = ""
        // 使用forEach遍历数据文件内部对象
        data.forEach(function (value) {
            // TAG 同步课堂
            if (data == course_online) {
                inner += `<div class="fl class-img-box-relative class-a"><img src=${value.image_src} alt=""><div class="class-top-mask"><span>${value.type_name}</span></div><div class="class-bottom-mask"><span>${value.rs>0?value.rs:0}人在学习</span></div><div class="free-to-study"><span>${value.price > 0 ? "￥"+value.price : "免费学习"}</span></div><div class="class-img-box-footer"><p>${value.title}</p><p>${value.ks}课时</p></div></div>`;
            }
            // 如果是在线测试
            if (data == course_test) {
                inner += `<div class="fl online-test-relative"><img src=${value.image_src} alt=""><div class="class-top-mask"><span>${value.type_name}</span></div><div class="class-bottom-mask2"><span>${value.rs>0?value.rs:0}人已考试</span><span>${value.subject_name}</span></div><div class="free-to-study"><span>${value.price > 0 ? "￥"+value.price : "免费学习"}</span></div><div class="class-info"><p>${value.title}</p></div></div>`
            }
            // TAG 精品课程
            if (data == course_good) {
                inner += `<div class="fl class-img-box-relative"><img src=${value.image_src} + ' alt=""><div class="class-top-mask">${value.area_name}</div><div class="free-to-study"><span>${value.price > 0 ? "￥"+value.price : "免费学习"}</span></div><div class="class-img-box-footer"><p>${value.title}</p><p>${value.ks>0?value.ks:0}课时</p></div></div>`;
            }
            // 往父元素内部添加
            ul.innerHTML = inner
        })
    }
    // TAG轮播图
    var headBanner = document.querySelector(".index-head-banner-relative") //获取整个轮播图外部容器
    var scrollImg = document.querySelector(".scroll-img") //轮播图图片ul容器
    var scrollTitle = document.querySelector(".scroll-title") //轮播图子标题ul容器
    var titleLi = scrollTitle.getElementsByTagName("li") //轮播图子标题li
    var img = scrollImg.getElementsByTagName("li") //轮播图图片容器li
    // TAG 数据库信息渲染

    let banners = await getBannerDate();
    //调用函数,引用外部数据文件.再根据不同的父元素使用不同的数据对象
    setImg(banners, scrollImg);
    setImg(banners, scrollTitle);
    // 光标滑过小标题
    for (var i = 0; i < titleLi.length; i++) {
        //自定义索引
        titleLi[i].index = i
        //每一个li光标移入事件
        titleLi[i].onmouseenter = function () {
            //这里需要-1,不然会不好用,因为执行上方循环的时候已经+1了
            n = this.index - 1
            //渲染
            scrollTimer()
        }
    }
    //TAG 调用数据文件引入图片
    function setImg(data, ul) {
        // 声明两个空字符串,用来装图片元素标签
        var innerImg = ""
        var innerTitle = ""
        // 遍历数据文件
        data.forEach(function (value) {
            innerImg += '<li><img src=' + value.image_src + ' alt=""></li>' //添加一个li,li内部有图片路径
            innerTitle += '<li>' + value.title + '</li>' //添加一个子标题,子标题来源数据文件
        })
        //根据不同的父元素王内部插入不同的数据
        if (ul == scrollImg) ul.innerHTML = innerImg
        if (ul == scrollTitle) ul.innerHTML = innerTitle
    }

    //TAG 开启定时器
    scrollImg.timer = setInterval(scrollTimer, 2000);
    //TAG 声明一个n,用来指示当前显示的图片以及高亮的子标题
    var n = 0
    //TAG 定时器中调用的函数
    function scrollTimer() {
        n++ //每次触发定时器让n+1,指示当前的图片的值
        if (n == img.length) n = 0 //如果达到图片最大长度,则让n=0重新循环
        //每次触发定时器都清空样式
        for (var i = 0; i < img.length; i++) {
            //调用运动函数,让所有图片隐藏
            bufferMove(img[i], {
                "opacity": 0
            })
            //将所有子标题的颜色都为白色
            titleLi[i].style.color = "white"
        }
        //下一张图片显示
        bufferMove(img[n], {
            "opacity": 1
        })
        //对应的指示子标题的样式
        titleLi[n].style.color = "#bfa"
    }
    //TAG 光标移入移出
    headBanner.onmouseenter = function () {
        //停止计时器
        clearInterval(scrollImg.timer)
    }
    headBanner.onmouseleave = function () {
        //重新执行定时器
        scrollImg.timer = setInterval(scrollTimer, 2000);
    }

    //TAG 获取非行间样式函数
    function getStyle(el, attr) {
        if (el.currentStyle) {
            return el.currentStyle[attr]
        } else {
            return getComputedStyle(el)[attr]
        }
    }

    //TAG 运动函数
    function bufferMove(el, props) {
        clearInterval(el.timer)
        el.timer = setInterval(() => {
            var tag = true
            for (var attr in props) {
                if (attr == "opacity") {
                    props[attr] = props[attr] <= 1 ? props[attr] * 100 : props[attr]
                    var current = parseInt(getStyle(el, attr) * 100)
                } else {
                    var current = parseInt(getStyle(el, attr))
                }
            }
            // 过渡效果 目前值-当前值/步进系数
            var step = (props[attr] - current) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step)

            if (current != props[attr]) {
                tag = false
            } else {
                tag = true
            }
            if (attr == "opacity") {
                el.style.opacity = (current + step) / 100
            } else {
                el.style[attr] = current + step + "px"
            }
        }, 60);
    }
})();
