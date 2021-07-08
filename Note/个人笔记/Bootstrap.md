### 容器
1. 流体容器 `container-fluid`
2. 固定容器 `container`
    | 阈值 | width |
    | :--- | :--- |
    | 大于等于1200px(lg) | width = 1170px (1140+槽宽) |
    | 大于等于992px<br>小于等于1200px(md) | width = 970px (940+槽宽) |
    | 大于等于768px<br>小于等于992px(sm) | width = 750px (720+槽宽) |
    | 小于768px(xs) | width = auto |
3. 栅格系统
    默认分为12列,每一列都有阈值 lg md sm xs
    1. 流体容器&固定容器都用的一套公共样式
        ``` css
        margin-right:auto;
        margin-left:auto;
        padding-left:15px;
        padding-right:15px;
        ```
    2. 固定容器 特定样式 顺序不可变
        ``` css
        @media (min-width: @screen-sm-min) {
            width: @container-sm
        }
        @media (min-width: @screen-md-min) {
            width: @container-md
        }
        @media (min-width: @screen-lg-min) {
            width: @container-lg
        }
        ```
    3. 使用栅格系统
        `col-xs-*`
        `col-sm-*`
        `col-md-*`
        `col-lg-*`
    4. 列排序
        `col-xx-push-*` 向右拉
        `coll-xx-pull-*` 向左推
        注意使用排序不能隔一个xs/sm/md进行排序,否则会导致异常
    5. 列偏移
        使用`col-xx-offset-*`可以将列向右侧偏移.这些类实际是通过使用`*`选择器为当前元素增加了左侧的边距(margin).例如`.col-md-offset-4`类将`.col.md-4`元素向右侧偏移了4个 column 的宽度
### 响应式工具
[响应式工具](https://v3.bootcss.com/css/#responsive-utilities)