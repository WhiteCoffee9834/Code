var syncLesson = document.getElementsByClassName("sync-main-img-wrapper")[0] //找到同步课程main容器
//数据插入函数
function insertSyncLesson(data) {
    var inner = ""
    data.forEach(function (value) {
        inner += '<div class="fl sync-img-box-relative"><img src=' + value.src + ' alt=""><div class="img-mask"><span>' + value.num + '人在学习</span></div><div class="img-info"><p>' + value.title + '</p><p>' + value.time + '课时</p></div><div class="free-to-study">免费学习</div></div>'
    })
    syncLesson.innerHTML = inner
}
// 不选择在这里直接生成页码 insertSyncLesson(online)
var data = online //引入外部数据,使用一个变量装,方便以后的筛选
var n = 0 //控制当前页码的值
var pageContent = 9 //每页显示的内容数量
var pageNum = Math.ceil(data.length / pageContent) //页码数量,使用数据的总量除以每页的内容再向上取整可得页码
var pageData = data.slice(n * pageContent, (n + 1) * pageContent) //控制按下页码按钮后每页显示的内容.应为0-9 9-18 18-27,不包含结尾值

insertSyncLesson(pageData) //调用数据插入
clickPageButton() //生成页码,点击页码
//筛选

var table = document.getElementsByTagName("table")[0] //获取表格
var tr = table.getElementsByTagName("tr")[4] //获取行
var td = tr.getElementsByTagName("td") //获取筛选条件单元格
//遍历筛选条件单元格
for (var i = 0; i < td.length; i++) {
    //给每一个筛选条件单元格添加点击事件
    td[i].onclick = function () {
        var attr = this.getAttribute("subject") //点击后就获取当前被点击的筛选条件的自定义属性值
        //重新赋值为满足条件的数组
        data = online.filter(function (value) {
            //判断点击的这个自定义属性是否符合全部条件 ? 如果符合则直接引入外部的数据 : 如果不符合则返回外部数据中等于当前自定义属性的值的对象
            return attr == "all" ? online : value.subject == attr //返回符合条件的数组
        })
        pageNum = Math.ceil(data.length / pageContent) //数字页码的数量
        n = 0 //让n重新回到0,否则会出现页码不可点击
        pageData = data.slice(n * pageContent, (n + 1) * pageContent) //当前页面显示的内容

        insertSyncLesson(pageData) //数据插入
        clickPageButton() //生成页码,点击页码
    }
}
//封装生成页码,点击页码函数
function clickPageButton() {
    // 动态生成页码
    var buttonWrapper = "" //声明空字符串
    var pageUl = document.getElementsByClassName("pageButton")[0] //获取按钮容器Ul
    buttonWrapper += '<button>上一页</button><button>下一页</button>' //往ul中添加上一页下一页按钮
    //有几页就循环几遍,添加相应数量的页码
    for (var i = 0; i < pageNum; i++) {
        buttonWrapper += '<li>' + (i + 1) + '</li>' //往ul中添加数字页码按钮
    }
    pageUl.innerHTML = buttonWrapper //将页码入到容器中

    var pageBtn = pageUl.getElementsByTagName("button") //获取上下页按钮
    pageBtn[1].onclick = function () {
        if (n == pageNum - 1) {
            alert("已经是最后一页了")
            return
        }
        n++ //页码+1
        pageData = data.slice(n * pageContent, (n + 1) * pageContent) //控制当前页面显示的内容
        insertSyncLesson(pageData) //数据插入
        changeStyle() //改变按钮样式
    }
    pageBtn[0].onclick = function () {
        if (n == 0) {
            alert("已经是第一页了")
            return
        }
        n-- //页码-1
        pageData = data.slice(n * pageContent, (n + 1) * pageContent) //控制当前页面显示的内容
        insertSyncLesson(pageData) //数据插入
        changeStyle() //改变按钮样式
    }
    var pageLi = pageUl.getElementsByTagName("li") //获取数字页码按钮
    //改变样式函数
    function changeStyle() {
        //每一次点击都清除之前的样式
        for (var i = 0; i < pageLi.length; i++) {
            pageLi[i].style.backgroundColor = "#fff"
            pageLi[i].style.color = "black"
        }
        pageLi[n].style.backgroundColor = "#bfa" //当前按钮背景颜色样式
        pageLi[n].style.color = "white" //当前按钮字体颜色
    }
    //遍历数字页码
    for (var i = 0; i < pageLi.length; i++) {
        pageLi[i].index = i //自定义索引
        // 数字页码点击事件
        pageLi[i].onclick = function (event) {
            n = this.index //让n等于当前按钮的索引值
            pageData = data.slice(n * pageContent, (n + 1) * pageContent) //控制当前页面显示的内容
            insertSyncLesson(pageData) //数据插入
            console.log(this)
            changeStyle() //改变样式
        }
    }
}