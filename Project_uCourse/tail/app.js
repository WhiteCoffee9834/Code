const express = require("express")
const path = require("path")
const app = express()

const cors = require("cors")
const {
    checkData,
    decryptToken
} = require("./utils/utils")
// TAG 跨域请求
app.use(cors())
// TAG 解析post请求格式
app.use(express.urlencoded({
    extended: false
}))
// TAG 处理交互式数据
app.use(express.json())

// TAG 静态资源中间件
app.use(express.static(path.join(__dirname, "public")))
// TAG 子路由
app.use("/api", require("./routers/mainRouter"))
app.use("/api", require("./routers/courseRouter"))
// TAG 拦截器
app.use((req, res, next) => {
    let token = req.body.token || req.query.token
    if (checkData(token)) {
        res.send({
            status: 201,
            msg: "当前登录信息不合法"
        })
    } else {
        try {
            decryptToken(token)
            next()
        } catch (err) {
            if (err.message.includes("expired")) {
                res.send({
                    status: 201,
                    msg: "token校验失败,请重新登录"
                })
            } else {
                res.send({
                    status: 201,
                    msg: "当前登录信息不合法"
                })
            }
        }
    }
})

app.use("/api", require("./routers/userRouter"))
app.use("/api",require("./routers/studentCourseRouter"))
// TAG 资源不存在全路由响应 
app.all("/*", (req, res) => {
    res.status(404)
    res.send({
        status: 404, 
        msg: "404 NOT FOUND"
    })
})
// TAG 错误中间件
app.use((err, req, res, next) => {
    res.status(500)
    res.send({
        status: 500,
        msg: "服务器错误"
    })
})
app.listen(1000, () => {
    console.log("后端服务器已启动,端口1000")
})