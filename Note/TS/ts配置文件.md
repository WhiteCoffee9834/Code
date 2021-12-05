## compilerOptions中的子选项
+ `target` 用来指定ts编译的ES的版本 使用`ESNext`来使用最新版本
+ `module` 指定使用哪种模块化的解决方案
+ `lib` 用来指定项目中要使用的库,例如`DOM,es6`
+ `outDir` 指定编译后的文件所在的目录
+ `outFile` 将代码合并到一个文件.设置这个以后,所有的`全局作用域`的代码会合并到同一个文件中,一般不用,交给打包工具就好
+ `allowJs` 是否对JS文件进行编译,默认为false.因为有的时候模块可能用的是JS,这时候就需要使用这个选项
+ `checkJs` 是否检查JS代码是否符合语法规范,默认为false
+ `removeComments` 是否移除注释,默认为false
+ `noEmit` 不生成编译后的文件,如果仅仅只是想检查语法,不想生成文件,则可以使用该功能,默认为false
+ `noEmitOnError` 当有错误的时候不生成编译后的文件,把编译变得更加严格,默认为false,常用.

***

+ `alwaysStrict` 用来设置编译后的文件是否使用严格模式,默认为false
**注意,如果使用了ES6模块化,则自动采用严格模式,因此模块头部将没有use strict**
+ `strict` 所有严格检查的总开关,如果设置为`true`,则严格检查相关的都会被打开

### 严格检查相关
+ `noImplicitAny` 禁止隐式的any类型.默认为false
+ `noImplicitThis` 不允许不明确类型的this
+ `strictNullChecks` 严格地检查空值,有可能是空值的代码将会显示警告
    ``` js
    let box1 = document.getElementById("box1")
    // 此处的box1有可能根本就不存在
    box1.addEventListener("click",function(){})

    // 解决方法,使用ES2020的链式判断
    box1?.addEventListener("click",()=>{})
    ```
## include:[
    ** 表示任意目录
    *  表示任意文件
    例如"./src/**/*"
] 表示编译需要编译的文件或目录
## exclude:[] 表示编译器需要排除的文件或文件夹
## extends:"" 引入其他的json配置文件,继承配置
