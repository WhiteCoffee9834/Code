# 选择器
+ 交集选择器是由两个选择器直接连接构成的，其中第一个必须是标签选择器，第二个必须是类选择器或者ID选择器，这两个选择器之间不能有空格，必须连续书写

==内联样式>id选择器>类选择器>标签选择器>通配选择器>继承>默认样式==

id多看id,类名多看类名,标签多看标签.
当选择器优先级一样时,写在后面的样式将会生效
行内样式仅支持水平方向的边距设置,不支持垂直方向的边距设置
给父容器加边框也可以解决父子外边距传递现象

使用!important可以将优先级提升至最高
    1.只能直接选中,不能用于间接选中
    2.通配符选中标签也是直接选中的
    3.仅仅提升选中的样式,而其他的样式不会提升
    4.必须写在分号前面

# 表格
+ 当设置display:table时,table的padding设置会失效.
+ 当设置display:table-row时,margin和padding设置会失效.
+ 当设置display:table-cell时,margin设置会失效
+ 可以通过display:table-cell和vertical-align:middle来进行垂直居中设置.table-cell时,vertical-align属性生效
+ table   tr td必须配合使用,如果想添加其他内容,只能在单元格里面写
+ colspan   跨列延长
+ rowspan   跨行延长

# 过渡
1. transition-property 规定设置过渡效果的CSS属性的名称
2. transition-duration 规定完成过渡效果需要多少秒或毫秒
3. transition-timing-function  过渡时间函数
    + linear  匀速运动
    + ease    慢速开始，然后变快，然后慢速结束
    + ease-in 慢速开始，然后一直加速
    + ease-out    快速开始，慢速结束
    + ease-in-out 慢速开始慢速结束
    + steps步进函数
4. transition-delay    定执行过渡效果的延时
5. transition-origin 旋转中心

# -webkit-box-orient
目前没有浏览器支持 box-orient 属性.
FF 支持替代的 -moz-box-orient 属性
其余的支持替代的 -webkit-box-orient 属性
box-orient 属性规定框的子元素应该被`水平`或`垂直`排列
使用方法:
``` css
box-orient: horizontal | vertical | inline-axis | block-axis
 | inherit
 ```
 + horizontal 在水平行中从左向右排列子元素
 + vertical 从上向下垂直排列子元素
 + inline-axis 沿着内轴来排列子元素(映射为horizontal)
 + block-axis 沿着块轴来排列子元素(映射为vertical)
 + inherit 从父元素继承 box-orient 属性的值
 # -webkit-line-clamp
 把块容器中的内容限制为指定的行数
 它只有在display属性设置为-webkit-box或者-webkit-inline-box并且-webkit-box-orient属性设置成vertical时才有效果
 在大部分情况下也需要设置overflow属性为hidden,否则,里面的内容不会被裁减,并且在内容显示为指定行数后还会显示省略号