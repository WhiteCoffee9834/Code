#### 注意:所有的`node_modules`均未上传,在开发前你应该使用`npm i`命令安装所有package.json中的插件.
在本项目中:
前端服务器端口800
后端端口1000

***

### server.bat是什么?
是一个启动服务器的bat脚本,直接打开就可以同时启动前后端啦

***

### 目录结构
1. front 前端目录
2. tail 后端目录

***

### git分支相关

+ 使用 `git branch -av` 查看所有分支(本地分支以及远程分支)以及版本
+ 使用 `git branch -rv` 查看远程分支以及版本
+ 使用 `git remote -v` 查看远程仓库,弹出的信息,最左边的是名字,也就是使用`git remote add`后面你加的名字
+ 使用 `git config -l` 查看配置信息

+ `git push -u ProjectU Chen`
作用:
1. 推送本地分支Chen到远程ProjectU的Chen中
2. 追踪远程分支,如果ProjectU没有Chen则创建该分支,前提是你本地存在Chen.如果本地都不存在,那肯定会报错
3. 设置ProjectU为默认主机,Chen为默认分支.也就是说你可以不用再git pull接地址以及分支了