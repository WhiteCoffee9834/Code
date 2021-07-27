# 第2-3讲 ECMAScript

## 模块系统

### 概念

在Node.js中，一个js文件就称之为一个模块（Module）。

### 模块思想：

当解决一个复杂问题时，自顶向下逐层把系统划分成若干模块。对于整个系统来说，模块是可组合、分解和更换的单元。

### Commonjs规范

Node本身遵循的是CommonJs规范。

### 模块的分类

模块分为三类：内置模块、自定义模块、第三方模块。

#### 内置模块：

指的是node官方提供的模块，供开发者使用。

**语法：**

```
require( 模块名称 )；//引入模块
```

##### URL模块：（新版）

用于处理与解析 URL，获取给定url的每一部分。

**引入：**

```
import url from 'url';
const url = require('url');
```

**语法：**

```
new URL(input[, base]);
```

**参数：**

input：要解析的绝对或相对的 URL。
base：如果 input 不是绝对路径，则为要解析的基础地址

**URL形式及含义：**

```
协议：//子域名.域名.顶级域名:端口号/目录/文件名.文件后缀?参数=值#标识
```

##### Query string模块：

用于解析和格式化 URL 查询字符串的实用工具。

**常用方法：**

**qs.parse()：**将URL格式的字符串序列化为Object类型的对象，且自带转码功能

**语法：**

```
querystring.parse(str[, sep[, eq[, options]]])
```

**参数：**

str <string>URL字符串。

sep <string>键值对切割字符，默认值“＆”。

eq <string>键值和键名切割字符，默认值“＝”。

options <Object>

​	decodeURIComponent <Function>自带解码格式，默认值querystring.unescape().

​	maxKeys <number> 最大字符个数，默认值1000

qs.stringify()：将一个Object类型的对象序列化一个URL格式的字符串，且自带编码功能

**语法：**

```
querystring.stringify(obj[, sep[, eq[, options]]])
```

**参数：**

obj<string>URL对象。

sep <string>键值对拼接字符，默认值“＆”。

eq <string>键值和键名拼接字符，默认值“＝”。

options <Object>

​	encodeURIComponent<Function>自带编码格式，默认值querystring.escape()

##### path模块：

提供了一些实用工具，用于处理文件和目录的路径，经常和fs模块结合使用。

**常用方法：**

**path.basename()：**获取路径中最后的一部分

**语法：**

```
path.basename(path[, ext])
```

**参数：**

path：必选参数，路径地址
ext：可选参数，是否忽略扩展名

**path.extname()：**获取path路径的扩展名

**语法：**

```
path.extname(path)
```

**参数：**

path：必选参数，路径地址

**path.join()：**将所有给定的 path 片段连接到一起，使新的路径更加规范化。

**语法：**

```
path.join([...paths])
```

**参数：**

paths，一组路径列表参数

**path.parse()：**格式化路径，返回一个对象，包含路径中的所有信息

**语法：**

```
path.parse(path))
```

**参数：**

path必选参数，完整的路径地址

#### 自定义模块：

指的是开发者将特定的功能/算法封装到js模块文件中，其包含一些公共函数或其它数据，每一个js文件都可以称为一个模块。

##### 使用步骤

1、定义模块：将功能/算法进行模块文件的封装。

2、抛出模块：使用module.exports/exports将模块进行抛出。

3、引入模块：使用require()方法，将模块化的文件引入，该方法读取一个文件并加载，且返回文件使用module.exports/exports抛出的名字。

**注：**自定义模块，必须以相对路径引入自定义模块，根据实际情况 以 ./ 或 ../ 开头。

##### module.exports与exports区别：

(1)exports是module.exports的引用。 
(2)module.exports是实体抛出功能方法。
(3)当两个关键词混用的时候会造成暴露混乱导致未达到抛出效果。

#### 第三方模块

由第三方开源出来的模块，使用前需要npm工具从npm社区下载。

**使用步骤：**

(1)新建js文件并命名 
(2)在此文件同级目录下打开cmd 
(3)运行 npm i trim 
(4)引入trim。并去除字符串中的空格