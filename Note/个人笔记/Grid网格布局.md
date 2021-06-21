# 1. 概述
***
网格布局是最强大的 CSS 布局方案
它将网页划分成一个个网格,可以任意组合不同的风格,做出各种各样的布局.以前,只能通过复杂的 CSS 框架达到的效果,现在浏览器内置了.
Grid 布局与 Flex 布局有一定的相似性,都可以指定容器内部多个项目的位置.但是,它们也存在重大区别.
Flex 布局是轴线布局,只能指定"项目"针对轴线的位置,可以看作是**一维布局**. Grid 布局则是将容器划分成了"行"和"列",产生单元格,然后指定"项目所在"的单元格,可以看作是**二维布局**. Grid 布局远比 Flex 布局强大.

# 2. 基本概念
***
## 2.1 容器和项目
***
采用网格布局的区域,称为"容器"(container).容器内部采用网格定位的子元素,称为"项目"(item)
``` html
<div>
    <div><p>1</p></div>
    <div><p>2</p></div>
    <div><p>3</p></div>
</div>
```
上面代码中,最外层的`<div>`元素就是容器,内层的三个`<div>`元素就是项目.
注意:项目只能是容器的顶层子元素,不包含项目的子元素,比如上面代码的`<p>`元素就不是项目. Grid 布局只对项目生效.
## 2.2 行和列
***
容器里面的水平区域称为 row, 垂直区域称为 column.
## 2.3 单元格
***
行和列的交叉区域,称为 cell.
正常情况下,`n`行和`m`列会产生`n x m`个单元格.比如,3行3列会产生9个单元格.
## 2.4 网格线
***
划分网格的先,称为 grid line. 水平网格线划分出行,垂直网格线划分出列.
正常情况下,`n`行有`n + 1`根水平网格线,`m`列有`m + 1`根垂直网格线,比如三行就有四根水平网格线.
![Row lines and Column lines](https://www.wangbase.com/blogimg/asset/201903/1_bg2019032503.png)
上图是一个 4 x 4 的网格,共有5根水平网格线和5根垂直网格线.
# 3. 容器属性
***
Grid 布局的实行分成两类.一类定义在容器上面,称为容器属性;另一类定义在项目上面,称为项目属性.
## 3.1 display 指定网格布局
`display: grid;`指定一个容器采用网格布局
默认情况下,容器元素都是块级元素,但也可以设置成行内元素
`display: inline-grid;`
***
#### 注意,设为网格布局以后,容器子元素(项目)的`float` `display: inline-block` `display:table-cell` `vertical-align` 和 `column-*` 等设置都将失效
***
## 3.2 grid-template-columns grid-template-rows
***
容器制定了网格布局后,接着要做的事就是划分行和列. `grid-template-columns` 属性定义每一列的列宽, `grid-template-rows` 属性定义每一行的行高.
``` css
.container {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
}
```
上面的代码生成一个三行三列的网格,列宽根行高都是`100px`
除了使用绝对单位,也可以使用%

1. repeat()
有时候,重复写同样的值非常麻烦,尤其网格很多时.这种时候可以使用 `repeat()` 函数,简化重复的值.
上面的代码可以改成
``` css
.container{
    display: grid;
    grid-template-rows: repeat(3,100px);
    grid-template-columns: repeat(3,100px);
}
```
`repeat()` 接受两个参数,第一个参数是重复的次数,第二个参数时所要重复的值.
也可以重复某种模式
``` css
.container{
    grid-template-columns: repeat(2,100px 20px 80px);
}
```
上面代码一共定义了6列,第一列和第四列的宽度为`100px`,第二列和第五列为`20px`,第三列和第六列为`80px`.

2. auto-fill 关键字
有时,单元格的大小是固定的,但是容器的大小不确定.如果希望每一行(或每一列)容纳尽可能多的单元格,这时候可以使用`auto-fill`关键字表示自动填充.
``` css
.container{
    display: grid;
    grid-template-columns: repeat(auto-fill,100px);
}
```
上面代码表示每列宽度`100px`,然后自动填充,知道容器不能放置更多的列.

3. fr 关键字
为了方便表示比例关系,网格布局提供了`fr`关键字 (fraction 的缩写,意为片段).如果两列的宽度分别为`1fr`和`2fr`,就表示后者是前者的两倍.
``` css
.container{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
```
上面表示两列同宽.
`fr`也可以与绝对长度的单位结合使用,这时将会非常方便.
``` css
.container{
    display: grid;
    grid-template-columns: 150px 1fr 2fr;
}
```
上面代码表示,第一列的宽度为150px, 第二列的宽度是第三列的一半.

4. minmax()
`minmax()`函数产生一个长度范围,表示长度就在这个范围之中.它接受两个参数,分别为最小值和最大值.
``` css
.container{
    grid-template-columns: 1fr 1fr minmax(100px, 1fr);
}
```
上面代码中,`minmax(100px, 1fr)`表示列宽不小于`100px`,不大于`1fr`.

5. auto 关键字
`auto`关键字表示由浏览器自己决定长度
``` css
.container{
    grid-template-columns: 100px auto 100px;
}
```
上面代码中,第二列的宽度,基本上等于该列单元格的最大宽度,除非单元格内容设置了`min-width`,且这个值大于最大宽度.

6. 网格线的名称
`grid-template-columns`和`grid-template-rows`属性里面,还可以使用方括号,指定每一根网格线的名字,方便以后的引用.
``` css
.container{
    display: grid;
    grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```
上面代码指定网格布局为3 x 3,因此有4根垂直网格线和4根水平网格线.方括号里面依次是这八根线的名字.
网格布局允许同一根线有多个名字,比如`[fifth-line row-5]`.

7. 布局实例
`grid-template-columns`属性对于网页布局非常有用.两栏式布局只需要一行代码
``` css
.wrapper{
    display:grid;
    grid-template-columns: 70% 30%;
}
```
左栏设为70%,右栏设为30%

## 3.3 grid-row-gap  grid-column-gap (简写属性)grid-gap
***
`grid-row-gap` 属性设置行与行的间隔(行间距), `grid-column-gap` 属性设置列于列之间的间隔(列间距)
``` css
.container{
    grid-row-gap: 20px;
    grid-column-gap: 20px;
}
```
`grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式.
语法:
`grid-gap: <grid-row-gap> <grid-column-gap>;`
因此上面的行列间距分开写的方式可以合并为:
``` css
.container{
    grid-gap: 20px 20px;
}
```
*注意:如果`grid-gap`省略了第二个值,则浏览器默认将第二个值等同于第一个值,也就是行列间距一致*
***
#### 依据最新标准,上面三个属性名`grid-`前缀已经移除,`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`,grid-gap写成`gap`
***
## 3.4 grid-template-areas
***
网格布局允许指定"区域"(area),一个区域由单个或多个单元格组成.
`grid-template-areas`属性用于定义区域
``` css
.container{
    display: grid;
    grid-template-columns: repeat(3,100px);
    grid-template-rows: repeat(3,100px);
    grid-template-areas:
                        'a b c'
                        'd e f'
                        'g h i';               
}
```
上面代码划分出9个单元格,然后将其定名为a到i九个区域,分别对应这9个单元格
多个单元格合并成一个区域的写法如下:
``` css
.container{
    grid-template-areas:
                        'a a a'
                        'b b b'
                        'c c c';
}
```
上面的代码将9个单元格分成a,b,c三个区域
当然也可以不使用abc这种字母命名方式,可以使用名词
``` css
.container{
    grid-template-areas:
                        'header header header'
                        'main main sidebar'
                        'footer footer footer';
}
```
上面的代码中,顶部是页眉区域header,底部是页脚区域footer,中间部分则为页面主体main和侧边栏sidebar.

如果有某些区域不需要使用,则可以使用点(`.`)表示
``` css
.container{
    grid-template-areas:
                        'a . c'
                        'd . f'
                        'g . i';
}
```
上面的代码中,中间一列为点,表示没有使用到该单元格,或者该单元格不属于任何区域.
***
#### 注意,区域的命名会影响到网格线.每个区域的起始网格线,会自动命名为`区域名-start`,终止网格线自动命名为`区域名-end`.
#### 比如,区域名为`header`,则起始位置的水平网格线和垂直网格线叫做`header-start`,终止位置的水平网格线叫做`header-end`.
***
## 3.5 grid-auto-flow
划分网格后,容器的子元素会按照顺序,自动放置在每一个网格.默认的防止顺序是"先行后列".即先填满第一行,再放入第二行
这个顺序由`grid-auto-flow`属性决定,默认值是`row`,即"先行后列".
也可以将值设置为`column`,变成"先列后行"
```css
.container{
    grid-auto-flow:column;
}
```
`grid-auto-flow`除了设置成`row`和`column`,还可以设置成`row dense`和`column dense`.这两个值主要用于,某些项目指定位置以后,剩下的项目怎么自动放置.
下图中,1号项目与2号项目各占据两个单元格,然后在默认的`grid-auto-flow: row`情况下,会产生的布局
![](https://www.wangbase.com/blogimg/asset/201903/bg2019032513.png)
可以看到,1号项目后面的位置是空的,这是因为3号项目默认跟着2号项目,所以会排在2号项目后面.
现在修改设置,设置为`row dense`,表示"先行后列",并且尽可能紧密填满,尽量不出现空格.
``` css
.container{
    grid-auto-flow: row dense;
}
```
上面的代码效果如下:
![](https://www.wangbase.com/blogimg/asset/201903/bg2019032514.png)
可以看到,上图中会先填满第一行,然后再填满第二行,所以3号项目就会紧跟在1号项目的后面.8号项目和号项目就会排到第四行.
当然,如果将设置改为`colum dense`,表示"先列后行",并且尽量填满空格.
效果如下:
![](https://www.wangbase.com/blogimg/asset/201903/bg2019032515.png)
可以看到,上图先填满第一列,然后再填满第二列,所以3号项目在第一列,4号项目在第二列.8号项目与9号项目被挤到第四列.
## 3.6 justify-items align-items (简写属性)place-items
***
`justify-items`属性设置单元格内容的水平位置(左中右),`align-items`属性设置单元格内容的垂直位置(上中下)
用法:
``` css
.container{
    justify-items: start | end | center | stretch;
    align-items: start | end | center | stretch;
}
```
这两个属性的写法完全相同,都可以取下面这些值
+ start: 对齐单元格的起始边缘
+ end: 对齐单元格的结束边缘
+ center: 单元格内部居中
+ stretch: 拉伸,占满单元格的整个宽度(默认值)
`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式.
`place-items: <align-items> <justify-items>;`
如果省略第二个值,则浏览器认为与第一个值相等
## 3.7 justify-content align-content (简写属性)place-content
***
`justify-content`属性是整个内容区域在容器里面的水平位置(左中右),
`align-content`属性是整个内容区域的垂直位置(上中下)
用法:
``` css
.container{
    justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
    align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```
这两个属性的写法完全相同,都可以取下面这些值
+ start: 内容将对齐容器的起始边框
+ end: 内容将对齐容器的结束边框
+ center: 内容在容器内部居中
+ stretch: 项目大小没有指定时,内容将占据整个网格容器
+ space-around: 每个项目两侧的间隔相等.所以,项目之间的间隔比项目与容器边框的间隔大一倍
+ space-between: 项目于项目之间的间隔相等,项目与容器边框之间没有间隔
+ space-evenly: 项目与项目之间的间隔相等,项目与容器边框之间的的距离也相等
`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式
`place-content: <align-content> <justify-content>;`
如果省略第二个值,则浏览器认为第二个值等于第一个值
## 3.8 grid-auto-columns grid-auto-rows
***
有时候,一些项目的指定位置,在现在现有网格的外部.(溢出了现有网格的部分)比如网格只有3行,但是某个项目指定在第5行.这时候,浏览器会自动生成多余的网格,以便放置项目.
`grid-auto-columns`属性和`grid-auto-rows`属性都用来设置,浏览器自动创建的多余网格的列宽与行高.它们的写法与`grid-template-columns`和`grid-template-rows`完全相同.如果不指定这两个属性,浏览器完全根据单元格内容的大小,决定新增网格的列宽和行高.
``` css
.container{
    display: grid;
    grid-template-columns: repeat(3,100px);
    grid-template-rows: repeat(3,100px);
    grid-auto-rows: 50px
}
```
上面的代码将网格分为3 x 3,并且指定溢出来的部分的高度为50px(宽度没设置则依据grid-template-columns: 100px)
## 3.9 (不易读,不推荐使用) grid-template grid 
***
`grid-template`是`grid-template-columns`,`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式.
`grid`是`grid-template-rows`,`grid-template-columns`,`grid-template-areas`,`grid-auto-rows`,`grid-auto-columns`,`grid-auto-flow`这六个属性的合并形式.

# 4. 项目属性
***
## 4.1 grid-column-start grid-column-end grid-row-start grid-row-end
***
项目的位置时可以指定的,具体方法就是指定项目的四个边框,分别定位在哪根网格线.

+ grid-column-start: 项目左边框所在的垂直网格线
+ grid-column-end: 项目右边框所在的垂直网格线
+ grid-row-start: 项目上边框所在的水平网格线
+ grid-row-end: 项目下边框所在的水平网格线

``` css
.item-1{
    grid-column-start: 2;
    grid-column-end: 4;
}
```
上面代码表示,1号项目的左边框是第二根垂直网格线,右边框是第四根垂直网格线.由于没有再指定上下边框,所以会采用默认位置,即上边框是第一根水平网格线,下边框是第二根水平网格线.
除了1号项目以外,其他项目都没有指定位置,由浏览器自动布局,这时它们的位置由容器的`grid-auto-flow`属性决定,这个属性的默认值是`row`,因此会"先行后列"进行排列.可以把这个属性的值改为`column`,`row dense`,`column dense`.
可以将四个边框都进行指定:
``` css
.item-1{
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
```
当然,这四个属性的值,除了指定为第几个网格线,还可以指定为网格线的名字,前提是已经使用`grid-template-areas`为网格线命了名
``` css
.item-1{
    grid-column-start: header-start;
    grid-column-end: header-end;
}
```
这四个属性的值还可以使用`span`关键字,表示"跨越",即左右边框(上下边框)之间跨越多少个网格
``` css
.item-1{
    grid-column-end: span 2;
}
```
上面代码表示,1号项目的右边框跨越2个网格.
使用这四个属性,如果产生了项目的重叠,可以使用`z-index`属性指定项目的重叠顺序.
## 4.2 (简写属性)grid-column grid-row
+ `grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式.
+ `grid-row`属性是`grid-row-start`和`grid-row-end`的合并简写形式
``` css
.item{
    grid-column: <start-line> / <end-line>;
    grid-row: <start-line> / <end-line>;
}
例如:
.item-1{
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}
等同于
.item-1{
    gird-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
}
```
上面的代码中,项目`item-1`占据第一行,从第一根列线到第三根列线.
这两个属性值中,也可以使用`span`关键字,表示跨越多少个网格.
``` css
.item-1{
    grid-column: 1 / 3;
    grid-row: 1 / 3;
}
等同于
.item-1{
    grid-column: 1 / span 2;
    grid-column: 1 / span 2;
}
```
上面代码中,项目`item-1`占据的区域,包括第一行 + 第二行,第一列 + 第二列.
## 4.3 grid-area
`grid-area`属性指定项目放在哪一个区域
``` css
.container{
    grid-template-areas: 
                        'a b c'
                        'd e f';
}
.item-1{
    grid-area: e;
}
```
上面代码中,1号项目位于`e`区域
`grid-area`属性还可以用作`grid-row-start`,`grid-column-start`,`grid-row-end`,`grid-column-end`的合并简写形式,直接指定项目的位置.
``` css
.item{
    grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
例如
.item-1{
    grid-area: 1 / 1 / 3 / 3;
}
```
## 4.4 justify-self align-self (简写属性)place-self
+ `justify-self`属性设置单元格内容的水平位置(左中右),跟`justify-items`属性用法完全一致,但只能作用于单个项目.
+ `align-self`属性设置单元格内容的垂直位置(上中下),跟`align-items`属性用法完全一致,也是只能作用于单个项目.
``` css
.item{
    justify-self: start | end | center | stretch;
    align-self: start | end | center | stretch;
}
```
值:
+ start: 对齐单元格的起始边缘
+ end: 对齐单元格的结束边缘
+ center: 单元格内部居中
+ stretch: 拉伸, 占满单元格的整个宽度(默认值)

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式.
`place-self: <align-self> <justify-self>;`
如果省略第二个值,`place-self`属性会认为这两个值相等.

# The End!