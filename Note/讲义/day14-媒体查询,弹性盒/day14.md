# day14

`今日知识点`：

1. 媒体查询的使用
2. 弹性盒布局的相关属性和使用

#  CSS3 媒体查询

## 概述

- media type(媒体类型)是css 2中的一个非常有用的属性，通过media type我们可以对==不同的设备指定特定的样式==，从而实现更丰富的界面。
  media query(媒体查询)是对media type的一种增强，是CSS 3的重要内容之一
- 多媒体查询由多种媒体组成，可以包含一个或多个表达式，表达式根据条件是否成立返回 true 或 false。
  如果指定的多媒体类型匹配设备类型则查询结果返回 true，文档会在匹配的设备上显示指定样式效果

## 语法

### 样式表内引入媒体查询

- 语法示例： @media  媒体类型 and|not|only  (媒体特性表达式) {   CSS-Code; }
- 媒体类型(media type)

  - all所有设备；
    screen 用于电脑屏幕，平板电脑，智能手机等；
    print 用于打印机和打印预览；
    speech 应用于屏幕阅读器等发声设备
  - （以screen和print为例）

- 设备特性(media feature)

  - width视口宽度；height视口高度；
    device-width设备宽度、device-height高度；
    orientation浏览器窗口的方向纵向还是横向，当窗口的高度值大于等于宽度时该特性值为portrait，否则为landscape；
  - （以上逐个）

- 操作符

  - and(与、和)
    not: not是用来排除掉某些特定的设备的，比如 @media not print（非打印设备)
    only: 用来定某种特别的媒体类型。
  - （以上逐个）


### 在不同的媒体上使用不同的样式文件

- 语法：

- 逻辑值 

  ```
  <link rel="stylesheet" media="screen and (max-width:1200px)" href="mystylesheet.css"> 意思：在屏幕小于1200px以下的时候就引入该样式表！！！ 
  ```

  ==现在很少这样使用了 大部分的使用情况就是上课案例那样！！==

  ### 设备的划分

  ```css
  大屏设备  width大于1200px (pc)
  中屏设备  width 992px-1200px(pad pro 1024px)
  小屏设备  width 768px-992px（pad）
  超小屏 width  < 768px (phone)
  
  ```

  

  需求:

  30个图片盒子  

  大屏  下 一行五个  

  中屏下  一行3个

  小屏下 一行2个

  超小屏 一行一个 

# CSS3 弹性盒

## 概述

==浏览器内置的，实现多行多列布局，但是 最适用于一行多列布局==

Flex布局主要思想是提供一个更加有效的方式制定、调整和分布一个==容器==里的==项目==布局。
使容器有能力改变项目的大小、排列方向、对齐等，以最佳方式填充可用空间（因此可以适应设备屏幕大小的变化）

## 相关概念

- Flex容器：设置值为 flex 或 inline-flex ，该容器会成为 Flex容器
  Flex项目：该容器下的子元素，包括 文本节点，伪元素。
  主轴
  侧轴
  主（侧）轴起点
  主（侧）轴终点

- 注

  - 弹性容器外及弹性子元素内是正常渲染的。弹性盒子只定义了弹性子元素如何在弹性容器内布局
  - 设为Flex布局以后，容器的 column-*将失效，项目的==float、clear和vertical-align==属性将失效
  
  

## 容器属性

### flex-direction

- 作用：描述弹性盒项目的排列方向
- 取值 

  - row：横向从左到右排列（左对齐），默认的排列方式。
    row-reverse：反转横向排列（右对齐，从后往前排，最后一项排在最前面。
    column：纵向排列。
    column-reverse：反转纵向排列，从后往前排，最后一项排在最上面。

### justify-content 

- 作用：弹性项沿着弹性容器的主轴线对齐
- 取值 

  - flex-start：弹性项目向行头紧挨着填充。这个是默认值。
    flex-end：弹性项目向行尾紧挨着填充。
    center：弹性项目居中紧挨着填充。
    space-between：弹性项目平均分布在该行上,相邻项目的间隔相等
    space-around：弹性项目平均分布在该行上，两边留有一半的间隔空间
    space-evenly:弹性项目平均分布在该行上,相邻项目的间隔，项目与容器之间空间相等,

  


### align-items 

- 作用：设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式
- 取值

  - flex-start：侧轴起始位置对齐
  - flex-end：侧轴末端位置对齐
  - center：项目沿侧轴居中紧挨着填充。
  - baseline：基线对齐。
  - stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸

### flex-wrap 

- 作用：指定弹性盒子的子元素换行方式
- 取值 

  - nowrap - 默认， 弹性容器为单行。该情况下弹性子项可能会溢出容器。
    wrap - 弹性容器为多行。
    wrap-reverse -反转 wrap 排列。


### align-content 

- 作用：多根轴线的对齐方式 
- 取值 

  - stretch - 默认。各行将会伸展以占用剩余的空间。
    flex-start - 各行向弹性盒容器的起始位置堆叠。
    flex-end - 各行向弹性盒容器的结束位置堆叠。
    center -各行向弹性盒容器的中间位置堆叠。
    space-between -各行在弹性盒容器中平均分布。
    space-around - 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。

- 注意：如果项目只有一根轴线，该属性不起作用

## 弹性盒项目属性

### order:

- 作用：用整数值来定义排列顺序，
- 数值小的排在前面。可以为负值。

### align-self 属性

- 用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式

- auto：为元素的父元素的'align-items'值，
  flex-start：弹性盒子元素侧轴起始边对齐。
  flex-end：弹性盒子元素侧轴结束对齐
  center：弹性盒子元素在该行的侧轴（纵轴）上居中放置。
  baseline：该值将参与基线对齐。
  stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸
  
- 注

  ```
  - center：弹性盒子元素在该行的侧轴（纵轴）上居中放置。
    - （如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
  - baseline
    - 如弹性盒子元素的行内轴与侧轴为同一条（即字号行高一致时），则该值与'flex-start'等效
  - stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。
  ```

### flex 

- 作用：用于指定弹性子元素如何分配空间。
  flex是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性

#### flex-grow

- 作用：设置或检索弹性盒子的扩展比率。。
- 取值 

  - 默认值是 0，表示即使用剩余空间也不扩展
  - 不带单位的数值

- 注意：当容器有剩余空间时有效

#### flex-basis

- 定义弹性盒子元素的默认基准值

  - 

- 取值

  - auto	默认值
  - number一个长度单位或者一个百分比

- 注意：与width同时存在时覆盖width值参与剩余空间计算
- 代码演示

#### flex-shrink 

- 定义弹性盒子元素的收缩比率
- flex 元素仅在默认宽度之和大于容器的时候才会发生收缩
- 默认值为1





#### 简写flex

- flex为以上属性的简写
- 取值 

  -  默认值为 0 1 auto
  -  none	与 0 0 auto 相同
  -  auto	与 1 1 auto 相同


- 注：如果元素不是弹性盒对象的元素，则以上属性不起作用。


- 兼容性（图示）ie10+  

- 学员练习+ 讲师巡班答疑（12分钟）

- 【综合案例：自适应页面.jpg】学员练习+讲师讲解

  

  

  


# calc函数

## 概述：

calc 是英文单词 calculate( 计算 ) 的缩写，是 CSS3 的一个新增的功能

calc() 用于动态计算长度值。

### 语法：

```
.box{ width: calc(100% - 100px);
```

### 说明

任何长度值都可以使用calc()函数进行计算；
calc()函数支持 "+", "-", "*", "/" 运算；
calc()函数使用标准的数学运算优先级规则；

运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；



# transition过渡

设置一个元素身上的==两个状态==切换时的持续时间以及运动曲线。



```css
transition: 要过渡的属性名字  过渡的时间s  延时时间s   运动的曲线;

要过渡的属性名字 : 要求这个属性必须有明确的可以计算值 (display:none/block,visibility ) transition-property

过渡的时间s transition-duration

延时时间s  默认0s transition-delay

运动的曲线: transition-timing-function 
linear线性 \ ease 放缓(默认值)\ ease-in 由慢到快  \ease-in-out 由慢到快在到慢 \ease-out

```



**注意点:**

```css
.box {
            width: 200px;
            height: 200px;
            background-color: red;
            /* 单属性变化 */
            /* transition: width 2s  0s  ease; */
            /* 多属性变化 ,,,多个属性完整的值 */
            /* transition: width 2s 0s linear ,height 3s 0s ease ,
            background-color 1s 0s linear ; */

            /* transition: width 2s 0s linear ,height 2s 0s linear ,
            background-color 2s 0s linear ;  */
            /* all自动检测 事件里写好的变化 */
            /* transition: all 2s 0s ease; */

            transition:  2s;
            /* 写到事件里  那么过渡结束回到最初状态不会有过渡时间  会立即回去 */

           

        }
        .box:hover {
            /* transition:  2s; */
            width: 700px;
            height: 700px;
            background-color: yellowgreen;
        }
```



