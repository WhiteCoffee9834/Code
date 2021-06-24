## DOM操作

​	浏览器在解析界面的时候会将HTML结构解析成DOM树

### 获取DOM元素

#### 	querySelector()

​	可以通过Id、类名、标签名获取，获取的都是单个元素；

```js
var oUl = document.querySelector("ul");//通过标签名获取 获取单个元素
var oUl = document.querySelector("#list");//通过id获取
var oUl = document.querySelector(".box");//通过类名获取
```

#### 	querySelectorAll()

​	可以通过Id、类名、标签名获取，获取的都是节点列表 可以使用数组方法

```js
var list = document.querySelectorAll("ul");
var list = document.querySelectorAll("#list");
var list = document.querySelectorAll(".box");
```

### 获取节点

#### 获取子节点

##### 		父节点.children

​	非标准的 通常使用这种方式获取子节点

```js
var oLi = oUl.children;//HTMLCollection(5) [li, li, li, li, li]
```

##### 		父节点.childNodes

​	标准的 会把空格、回车等解析成文本节点，并且获取到

```js
var oLi = oUl.childNodes;//NodeList(11) [text, li, text, li, text, li, text, li, text, li, text]
```

#### 节点属性

##### 		nodeType

​	节点类型

```js
console.log(oLi[0].nodeType);//文本节点——3
console.log(oLi[1].nodeType);//注释节点——8
console.log(oLi[3].nodeType);//标签节点——1
```

##### 		nodeName

​	节点名称

```js
console.log(oLi[0].nodeName);//#text
console.log(oLi[1].nodeName);//#comment
console.log(oLi[3].nodeName);//LI
```

##### 		nodeValue

​	节点内容

```js
//可以设置节点内容
 oLi[0].nodeValue = "红烧肉";
```

#### 获取父节点

##### 	子节点.parentNode

​	获取子节点的直接父节点

```html
<div>
    <p>
        <span>child</span>
    </p>
</div>
<script>
    var oSpan = document.querySelector("span");
    console.log(oSpan.parentNode);//<p></p>
</script>
```

##### 	子节点.offsetParent;

​	获取子节点的定位父节点，如果没有定位父元素，获取的就是body

```html
<div>
    <p>
        <span>child</span>
    </p>
</div>
<script>
    var oSpan = document.querySelector("span");
    console.log(oSpan.parentNode);//<p></p>

    console.log(oSpan.offsetParent);//<div></div>
</script>
```

###### 	案例：点击按钮删除整行

```js
var btn = document.getElementsByTagName("button");
var oLi = document.getElementsByTagName("li");
for(var i = 0;i < btn.length;i++){
    btn[i].index = i;
    btn[i].onclick = function(){
        this.parentNode.remove();
        // oLi[this.index].remove();
    }
}
```

#### 获取第一个子节点

- 父元素.firstChild


​		IE和标准浏览器中都能使用，但是IE8-获取到的是元素节点，IE9+、标准浏览器能获取到文本节点；

- 父元素.firstElementChild


​		IE8-不能使用，但是IE9+、标准浏览器都可以直接获取到元素节点；

```js
var oUl = document.getElementById("oUl");
//父元素.firstChild  在标准浏览器中会获取到文本节点，但是在IE8-就可以只获取元素节点
console.log(oUl.firstChild);//#text
oUl.firstChild.style.background = "red";

//父元素.firstElementChild
oUl.firstElementChild.style.background = "red";

//处理兼容  使用短路或运算赋值，要把不容易实现的放在前面
var oLi = oUl.firstElementChild || oUl.firstChild;
oLi.style.background = "red";

```

#### 获取最后一个子节点

- 父元素.lastChild


- 父元素.lastElementChild     IE8-不能使用


```js
//获取最后一个子元素
var oLi1 = oUl.lastElementChild || oUl.lastChild;
oLi1.style.background = "green";
```

#### 获取上一个兄弟节点

- 参考节点.previousSibling


- 参考节点.previousElementSibling	 IE8-不能使用


```js
var mala = document.getElementById("mala");
var lvrou = mala.previousElementSibling || mala.previousSibling;
lvrou.style.color = "red";
```

#### 获取下一个兄弟节点

- 参考节点.nextSibling


- 参考节点.nextElementSibling		IE8-不能使用


```js
var gali = mala.nextElementSibling || mala.nextSibling;
gali.style.color = "green";
```

### 	添加节点

#### 	创建节点

- 创建元素节点      document.createElement("节点名称");


```js
//创建元素节点
var oLi = document.createElement("li");
```

- 创建文本节点	 document.createTextNode("文本内容");


```js
//创建文本节点
var text = document.createTextNode("王浩");
```

#### 	追加节点

​	向父元素的末尾追加一个子节点	 父元素.appendChild(节点名称);

​	如果追加了原有的节点，那么就会发生物理位移；

```js
//追加节点  父元素.appendChild(要添加的节点)
oLi.appendChild(text);
oUl.appendChild(oLi);
oUl.appendChild(oUl.children[3]);
```

#### 	插入节点

​	在父元素中的指定位置插入节点 	父元素.insertBefore(新的节点,目标节点);

```js
//插入节点  父元素.insertBefore(新的节点,目标节点);
var oLi1 = document.createElement("li");
oLi1.innerHTML = "奥特曼之父";
oUl.insertBefore(oLi1,oUl.children[0]);
```

#### 	删除节点

- 删除目标节点 	目标节点.remove();   IE不支持


```js
//删除节点  目标节点.remove();
oUl.children[5].remove();
```

- 父元素.removeChild();


```js
//父元素.removeChild()
oUl.removeChild(oUl.children[6]);
```

#### 替换节点

​	父元素.replaceChild(新的节点,目标节点);

```js
<div id="box"></div>
<script>
    var box = document.getElementById("box");
    var oText = document.createTextNode("我要被换掉啦");
    var newText = document.createTextNode("我要换掉你");
    box.appendChild(oText);
    //替换节点
    box.replaceChild(newText,oText);
</script>
```

#### 	克隆节点

​	目标节点.cloneNode(布尔值)   布尔值：默认是false——不复制文本节点，true——复制文本节点；

```js
box.appendChild(oText.cloneNode());
var op = document.getElementById("op");

console.log(op.cloneNode(true));
```

### 操作节点属性

```js
	<div class="aoteman" id="dijia"></div> //元素的固有属性
```

#### 	获取

​		元素.getAttribute("属性名");

#### 	设置

​		元素.setAtrribute("属性名","属性值");

​		可以获取自定义属性；

```html
<div class="aoteman" id="fav">迪迦奥特曼</div>
<div class="aoteman">盖亚奥特曼</div>
<div class="aoteman" flag=true>泰罗奥特曼</div>
<div class="aoteman">佐菲奥特曼</div>
<script>
    var aoTe = document.querySelectorAll("div");

    //获取 元素.getAttribute("属性名");
    console.log(aoTe[0].getAttribute("id"));
    console.log(aoTe[0].getAttribute("class"));

    //设置 元素.setAttribute("属性名","属性值");
    aoTe[1].setAttribute("class","gaiya");
    console.log(aoTe[2].flag);//undefined  不能通过 元素.属性名的方式获取自定义属性
    console.log(aoTe[2].getAttribute("flag"));// true
    //设置样式
    aoTe[3].setAttribute("style","background:red;color:white;line-height:50px;");
</script>
```

### 操作表格

```js
//获取table
var oTab = document.querySelector("#tab");
//获取thead
var tH = oTab.tHead;
//获取tfoot
var tF = oTab.tFoot;
//获取tbody
var tB = oTab.tBodies;//HTMLCollection [tbody]
//获取行
var tRows = tB[0].rows;
//获取列
var tCells = tRows[2].cells;

//操作列的内容
tCells[2].innerHTML = 10;
console.log(tCells);
```
