# 第4-6讲 Node基础

## Node简介

Node.js 是一个基于 Chrome V8 引擎的解析器和运行环境。

**Node的特点**

1.单线程

2.非阻塞I/O机制

3.事件驱动

## 第一个Node程序

文件

```
let a="憨憨";
let b=20;
console.log("你好node,%s喜%d喜",a,b);
console.log("你好node,%d喜喜",b);
```

运行指令

```
node 文件夹名
```

## 命令行和CMD

### 命令

完整的命令是由单词或词组的全称/简写。

### 使用命令步骤：

打开cmd(命令提示行)->输入命令 ->回车执行命令

### 打开cmd方法：

(1)windows + R  -> cmd  回车 
(2)打开任意文件夹 -> 在地址栏输入cmd -> 回车
(3)运行/搜索->输入cmd->回车

### cmd操作技巧：

(1)tab键  快速补全文件或目录名称
(2)上下箭头 ↑↓  快速定位最近执行的命令 
(3)Esc键 取消本次命令

### 常用命令

#### 清屏

**语法：**

```
cls
```

#### 列出当前目录下所有文件

**语法：**

```
dir
```

#### 进入指定目录

**语法：**

```
cd 目录名/绝对路径
```

当绝对路径跨盘符的时候，运行命令后，需要切盘符操作。

#### 切换盘符

```
盘符：
```

#### 返回上一层目录/根目录

**语法：**

```
cd ..   /   cd /
```

#### 创建文件夹

**语法：**

```
md/mkdir 文件夹名
```

#### 删除文件夹

**语法：**

```
rd/rmdir 文件夹名
```

#### 删除文件

**语法：**

```
del 文件名
```

## 环境变量

环境变量就是访问文件或文件夹的另一种快速通道，在系统在中配置环境变量，可以快速访问文件或文件夹。

## FS文件系统

### 文件概念

一篇文章、一段视频、一个可执行程序、一个网页，都可以被保存为一个文件，并赋予一个文件名，存储在计算机的硬盘中。

### Node的FS模块

FS模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的fs.readFileSync()。写文件使用方法fs.writeFile() 和fs.writeFileSync()。在繁忙的进程中，强烈建议使用这些调用的异步版本。这样可以避免阻塞。
Node.js的文件操作系统提供了两套API，一套是采用callback风格的API，另一组是Promise 对象风格的API。

**引入方式：**

```
const fs = require(‘fs’);//此方式是回调函数版的引入。
const fs = require(‘fs’).promises 或 require(‘fs/promises’);//只支持V14及以上版本
```

### 文件操作流程： 

**文件操作步骤：**

(1)打开文件 
(2)写入内容 
(3)关闭文件

#### 打开文件操作：

**语法：**

```
fs.open("./test.txt",(err,fd)=>{
    if(err)console.log(err.message);
    else console.log(fd);
});
```

**参数：**

path：文件路径
flags：设置打开文件的模式(访问模式)。默认值 r
mode ：设置文件权限模式（权限和粘滞位）。默认值: 0o666。
callback：
	err:错误信息
	fd:文件句柄

打开文件模式

| **模式** | **描述**                                                     |
| -------- | ------------------------------------------------------------ |
| a        | 打开文件用于追加。  如果文件不存在，则创建该文件。           |
| ax       | 打开文件用于追加。  如果文件不存在，则创建该文件，如果路径存在，则失败。 |
| a+       | 打开文件用于读取和追加。  如果文件不存在，则创建该文件。     |
| ax+      | 打开文件用于读取和追加。  如果文件不存在，则创建该文件，如果路径存在，则失败 |
| as       | 打开文件用于追加（在同步模式中）。  如果文件不存在，则创建该文件。 |
| as+      | 打开文件用于读取和追加（在同步模式中）。  如果文件不存在，则创建该文件。 |
| r        | 打开文件用于读取。  如果文件不存在，则会发生异常。           |
| r+       | 打开文件用于读取和写入。  如果文件不存在，则会发生异常。     |
| rs+      | 打开文件用于读取和写入（在同步模式中）。  指示操作系统绕过本地的文件系统缓存。 |
| w        | 打开文件用于写入。  如果文件不存在则创建文件，如果文件存在则截断文件。 |
| wx       | 打开文件用于写入。  如果文件不存在则创建文件，如果文件存在则截断文件，如果路径存在，则失败。 |
| w+       | 打开文件用于读取和写入。  如果文件不存在则创建文件，如果文件存在则截断文件。 |
| wx+      | 打开文件用于读取和写入。  如果文件不存在则创建文件，如果文件存在则截断文件，如果路径存在，则失败。 |

#### 写入操作：

​	将内容写入文件

**语法：**

```
fs.open("./test.txt","w",(err,fd)=>{
    if(err)console.log(err.message);
    else{
        fs.write(fd,"我们在上课！",20,"utf8",(err)=>{
            if(err)console.log(err);
        });
    }
});
```

**参数：**

fd<integer>，文件句柄
string <string> | <Object>，写入内容
position <integer>，写入位置的偏移量
encoding <string> 编码格式，默认值: 'utf8'
callback <Function>
	err <Error>，错误信息
	written <integer>，指定写入内容的字节
	string <string> ，写入内容

#### 关闭操作

**语法：**

```
fs.close(fd);
```

**参数：**

fd<integer>，文件句柄
callback <Function>
	err <Error>，错误信息

### 进制

#### 概念

进制描述的是进位计数规则。对于任何一种进制---X进制，就表示每一位置上的数运算时都是逢X进一位。 十进制是逢十进一，十六进制是逢十六进一，二进制就是逢二进一，以此类推，x进制就是逢x进位。

#### 常见进制

二进制、八进制、十进制、十六进制...

#### 进制转换原理

**二进制：**二进制由1和0组成，逢2进1，计算机在底层运算中都把数据转换成了二进制。

**十进制：**十进制是由0-9组成，逢10进1。

#### 计算机存储原理

计算机中最小的单位是位bit比特。存储文件的的最小的单位是 B 字节   1B = 8bit。计算机中文件以十六进制存储：计算机中常用十六进制表示2进制，这样位数就不需要那么长。由0-F组成。

**进制换算方式：**

1Kb = 1024B
1MB= 1024KB
1GB = 1024MB
1TB  = 1024GB

#### ascii码：

ascii是最通用的信息交换标准。

### 常用文件操作方法

#### 读文件

**语法：**

```
fs.readFile(path[, options], callback);
fs.readFileSync(path[, options]);
```

**参数：**

● path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
● options <Object> | <string> 可选参数
	■ encoding <string> | <null> 编码格式，默认值: null。注：目前只有两个读方法的编码格式未空。
	■ flag <string> 文件系统标志。默认值: 'r’。
	■ signal <AbortSignal> 允许程序终止此方法，此属性只有异步操作可以支持
● callback <Function>
	■ err <Error>，错误信息
	■ data <string> | <Buffer>，读取的文件内容，若未设置编码格式，默认是Buffer类型。

#### 写文件

**语法：**

```
fs.writeFile(file,data[, options], callback);
fs.writeFileSync(file,data[, options]);
```

**参数：**

● file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
● data <string> | <Buffer> | <TypedArray> | <DataView> 需要写入文件的内容
● options <Object> | <string> 可选参数
	■ encoding <string> | <null> 编码格式，默认值:’utf8’。
	■ mode <integer> 设置文件模式（权限和粘滞位）。默认值: 0o666。
	■ flag <string> 文件系统标志。默认值: 'w'。即默认写入为覆盖写入
	■ signal <AbortSignal> 允许程序终止此方法，此属性只有异步操作可以支持
● callback <Function> 回调函数
	■ err <Error>，错误信息

#### 拼接文件

**语法：**

```
fs. appendFile(file,data[, options], callback);
fs. appendFileSync(file,data[, options]);
```

**参数：**

● path <string> | <Buffer> | <URL> | <number> 文件名或文件描述符。
● data <string> | <Buffer> 需要写入文件的内容
● options <Object> | <string> 可选参数
	■ encoding <string> | <null> 编码格式，默认值:’utf8’。
	■ mode <integer> 设置文件模式（权限和粘滞位）。默认值: 0o666。
	■ flag <string> 文件系统标志。默认值: 'w'。即默认写入为覆盖写入
● callback <Function> 回调函数
	■ err <Error>，错误信息

#### Stat类

获取文件基本信息，查看文件状态功能，同时可以对文件进行判断是文件还是目录。

**语法：**

```
fs.stat(path[, options], callback)
fs.statSync(path[, options])
```

**参数：**

● path <string> | <Buffer> | <URL> 文件路径。
● options <Object>
	■ bigint <boolean> 返回的 fs.Stats 对象中的数值是否应为 bigint 型。默认值: false。
● callback <Function> 回调函数
	■ err <Error>，错误信息
	■ stats <fs.Stats>

**常用方法**

● 引用.isFile() 判断当前路径是否是文件
● 引用.isDirectory()判断当前路径是否是文件夹

#### try...catch块： 

捕获并处理可预知类错误的代码块关键词。

**语法：**

```
try{
   // console.log(age);
}catch(err){
    console.log(err.message);
}finally{
    console.log("永久执行代码");
}
```

#### 重命名文件/文件夹

**语法：**

```
fs.rename(oldPath, newPath, callback)；
fs.renameSync(oldPath, newPath)；
```

**参数：**

● oldPath <string> | <Buffer> | <URL> 旧文件路径及文件名。
● newPath <string> | <Buffer> | <URL> 新文件路径及文件名。
● callback <Function> 回调函数
	■ err <Error>，错误信息

#### 删除文件

**语法：**

```
fs.unlink(path,callback)
fs.unlinkSync(path)
```

**参数：**

● path <string> | <Buffer> | <URL>文件名。
● callback <Function> 回调函数
           ■ err <Error>，错误信息

#### 创建文件夹

**语法：**

```
fs.mkdir(path[, options], callback);
fs.mkdirSync(path[, options]);
```

参数：

● path <string> | <Buffer> | <URL> 要创建的文件夹完整路径名称
● options <Object> | <integer>
	■ recursive <boolean> 指定是否创建父文件夹。默认值: false。
	■ mode <integer> 设置文件模式（权限和粘滞位）。默认值: 0o777。注：Windows 上不支持。
● callback <Function>
	■ err <Error>

#### 删除目录

**语法：**

```
fs.rmdir(path[, options], callback)
fs.rmdirSync(path[, options], callback)
```

**参数：**

● path <string> | <Buffer> | <URL>要删除的文件夹完整路径
● options <Object>
	■ maxRetries <integer>表示出现异常后重试的次数， 如果遇到EBUSY, EMFILE, ENFILE, ENOTEMPTY, 或者 EPERM 错误,则 Node.js将会在每次尝试时以 retryDelay设置的毫秒线性回退等待重试该操作。此选项代表重试的次数。如果 recursive选项不为true，则忽略此选项。默认值: 0.
	■ recursive <boolean> 如果为 true，则执行递归的目录删除。在递归模式中，如果 path 不存在则不报告错误，并且在失败时重试操作。默认值: false.
	■ retryDelay<integer>出现异常后重试之间等待毫秒数，单位是ms。如果recursive选项不为true，则忽略此选项。默认值: 100ms。
● callback <Function>
	■ err <Error>

#### 读取文件夹内容

**语法：**

```
fs.readdir(path[, options], callback)；
fs.readdirSync(path[, options])；
```

**参数：**

● path <string> | <Buffer> | <URL> 要读取的文件夹的完整路径
● options <string> | <Object>
	■ encoding <string> 编码格式。默认值: 'utf8'。
	■ withFileTypes <boolean> 设置files 文件名数组中是否包含fs.Dirent对象。 默认值: false。
● callback <Function>
	■ err <Error> 错误信息
	■ files <string[]> | <Buffer[]> | <fs.Dirent[]> 目录中的文件/文件夹名的数组

## 全局变量

### node全局对象：

```
global
```

### 跨平台全局对象：

```
globalThis
```

### 获取目录名

获取当前正在执行脚本的目录名，以绝对路径输出：

```
_ _dirname
```

### 获取文件名

当前正在执行脚本的文件名，以绝对路径输出：

```
_ _filename
```
