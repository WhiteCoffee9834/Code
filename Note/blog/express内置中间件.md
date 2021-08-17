### Express内置的中间件

***

自从`Express4.16`开始,Express就内置了三个常用的中间件,可以借助这三个中间件提高项目的开发效率.
1. `express.static()`
作用:
快速托管静态资源的内置中间件.一般可用于`public`目录.该目录中存放index.html,img目录,css目录,js目录.
用法:
``` js
const express = require("express")
const app = express()
app.use(express.static(路径))
```
在路径中使用绝对路径,一般使用如下的方式
``` js
const express = require("express")
const app = express()
const path = require("path")
app.use(express.static(path.join(__dirname,"public")))
```
使用`path.join()`结合`__dirname`可以获取到当前文件所在的目录,然后就可以指向至公共的静态文件目录了.

2. `express.json()`
作用:
解析`JSON`格式的请求体数据.
用法:
``` js
const express = require("express")
const app = express()
app.use(express.json())
```

3. `express.urlencoded()`
作用:
解析`urlencoded`格式的请求体数据.
一般都用于处理POST请求中的数据
用法:
``` js
const express = require("express")
const app = express()
// 通过 express.urlencoded() 这个中间件,解析表单中的 urlencoded 格式的数据
// 如果不配置这个解析,则 req.body 默认等于 undefined/
app.use(express.urlencoded({extended;false}))
app.post("/testRouter",(req,res)=>{
    // 使用 req.body 属性来接收POST请求的数据
    console.log(req.body)
    res.send(req.body,"OK")
})
app.listen(3000)
```
上面的代码中,对象参数`extended`的值为`Boolean`,一般填`false`.