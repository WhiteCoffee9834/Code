# 19讲:响应式布局之grid网格布局

s局 更加灵活好用 相对于弹性盒兼容性差(ie11以及以上)

![](media/grid布局容器.png)

```html
<div class="container">
    
    <div class="item">
          <p>1</p>
    </div>
     <div class="item">2</div>
     <div class="item">3</div>
      <div class="item">4</div>
       <div class="item">5</div>
       <div class="item">6</div>
       <div class="item">7</div>
       <div class="item">8</div>
       <div class="item">9</div>
       <div class="item">10</div>
    
    


</div>
.container {
display:grid;//默认网格块类型  display:inline-grid;
}
```



## 1.加在容器上的属性

###   1、grid-template-columns,grid-template-rows

   ```css
grid-template-columns:100px 100px 100px;规定项目在容器排三列，每列100px宽度
grid-template-rows:100px 100px 100px 100px;规定项目在容器排四行，每行100px宽度
   ```

###   grid-template-*相关 

####      1. repeat() 第一个参数是重复的次数，第二个参数是要重复的值

```css
grid-template-columns:repeat(3,100px);

grid-template-columns:repeat(2,100px 80px 200px);
                                      100px 80px 200px 100px 80px 200px; 6列  以3份为一组一样

```

####       2.auto-fill 当单元格大小固定时，容器大小不固定时这个属性就会自动填充

```css
grid-template-columns:repeat(auto-fill,100px);
```

####       3.fr 为了方便表示比例关系，网格布局提供了fr关键字(fraction片段)

```css
grid-template-columns:repeat(4,1fr);宽度均分为4份
grid-template-columns:1fr 2fr 3fr;
```

####       4.minmax(,)函数产生一个长度范围，表示长度就在这个范围之中

 ```css
grid-template-columns:1fr minmax(150px,1fr);//最小不会小于150px
 ```

####       5.auto  表示宽度自动

 ```css
grid-template-columns:100px auto 100px; 中间列宽度自动
 ```

####       6.网格线 可以用方括号定义网格线名称，方便后期定位引用

```css
grid-template-columns:[c1] 100px [c2] 100px [c3] 100px [c4];
```



### 2.网格间距grid-gap

```css
grid-gap:grid-row-gap grid-column-gap;    / gap:row-gap column-gap;
grid-row-gap:10px; /  row-gap:10px
grid-column-gap:20px; /column-gap:20px;
```

==新的网格布局把该属性的grid-取消==





###  3、容器属性grid-template-areas

一个区域由单个或多个单元格组成，由你决定(具体使用，需要在项目属性里面设置)

```css
grid-template-areas: 'a b c'
                     'd e f'
                     'g h i'
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c'

grid-template-areas: 'a · c'
                     'd · f'
                     'g · i'  区域不需要利用，则使用点表示 

区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start
终止网格线自动命名为区域名-end
```

### 4、grid-auto-flow

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是“先行后列”，即先填满第一行，再开始放入第二行(就是子元素的排放顺序)

```css
grid-auto-flow:row;
grid-auto-flow:column;
grid-auto-flow:row dense;  dense紧凑布局 (空间利用率较高)
grid-auto-flow:column dense;  dense值用于某些项目指定位置以后，剩下的项目怎么自动放置
```

![](media/dense.png)



### 5:对齐方式 justify-items和align-items

**设置单元格内容(项目)的水平和垂直对齐方式**

```css
justify-items:start|end|center|stretch（默认值）水平
align-items:start|end|center|stretch 垂直
```

### place-items是以上两个属性的合并简写形式

```css
place-items:align-items  justify-items;
```

### 6：对齐方式justify-content/align-content

**设置整个内容区域的水平和垂直对齐方式**

```css
justify-content:start/end/center/space-around/space-between/space-evenly
align-content:start/end/center/space-around/space-between/space-evenly
```

### 7：grid-auto-columns/grid-auto-rows

**设置多出来(没有设置的剩余项目)的大小**

```css
3*3 剩余1个 
grid-auto-rows:50px;
```







## 2.加在项目上的属性

### 

**指定项目具体位置**

```css
grid-column-start:1;
grid-column-end:3;
grid-row-start:1;
grid-row-end:3;
```

### 属性简写:

### grid-column:1/3;

### grid-row:1/3;

![](media/star-end.png)









### 二：grid-area

**指定项目放在哪一个区域**

```css
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c'

grid-area:b;
```

### 



### 三:justify-self/align-self/palce-self

**跟justify-items属性用法一致 只是针对一个项目**