## 数组对象

​	用于在单个变量中存储多个值，再进行相关操作，数组中可以是任意数据类型的值；

### 创建数组

#### 字面量创建

​	直接使用[]创建；

​	var arr = [];

```js
var arr = [1,"a",undefined,null,{"name":"张三"},function fn(){alert(1)}];
console.log(arr);//[1, "a", undefined, null, {…}, ƒ]
```

#### 实例化创建

​	使用new关键字实例化

​	var arr = new Array();

​	**注意：如果Array()中只有一项数值型的数据，那么这个数据就代表创建数组的个数；**

```js
var arr1 = new Array("A","b","C","d","e");
var arr2 = new Array(1,2,3,4);
console.log(arr1);//["A","b","C","d","e"]
console.log(arr2);//[1,2,3,4)]

var arr3 = new Array(4);
console.log(arr3);//[empty × 4]
```

### 数组的使用

#### 	arr.length

​	获取数组的长度（获取数组中数据的个数）；

```js
var arr = new Array("A","b","C","d","e");
console.log(arr.length);//5
```

#### 	arr[下标]

​	获取数组中对应的一项

```js
var arr = ["a","b","c","d"];
console.log(arr[2]);//"c"
```

#### 	arr[下标] = 值

​	通过下标给数组设置数据项；

​	注意：数组中的数据可以直接通过键值对的形式设置，但是不计算在长度中；

```js
var arr = [];
arr[0] = "a";
arr[10] = "c";
console.log(arr);//["a", empty × 9, "c"]

//通过键值对的形式设置
var arr = [];
arr[0] = "a";
arr[1] = "b";
arr.name = "web";
console.log(arr);//["a", "b", name: "web"]
console.log(arr.length);//2
console.log(arr.name);//"web"
```

#### 	数组存储

​	数据类型一共有6类：number、string、boolean、null、undefined和复杂数据类型（array、object、function）；

- 基本数据类型：数据量较小，结构单一，数据直接存储在变量中，存储在栈区；
- 复杂数据类型：数据量大，结构复杂，数据不可以直接存储在变量中，存储在堆区，存在深浅拷贝的问题；

### 深浅拷贝

#### 	浅拷贝

​	复制内存地址，两个变量共用一个地址，一改全改；

```js
var arr = [1,2,3,4];
var newArr = arr;
newArr[2] = "a";
console.log(arr);//[1, 2, "a", 4]
console.log(newArr);//[1, 2, "a", 4]
```

#### 	深拷贝

​	复制值，每个变量都指向自己的地址，互不影响；

```js
var arr = [1,2,3,4];
var newArr = [];
for(var i = 0;i < arr.length;i++){
    newArr[i] = arr[i];
}
newArr[2] = "a";
console.log(arr);//[1, 2, 3, 4]
console.log(newArr);//[1, 2, "a", 4]
```

### 数组的方法

#### 	arr.push()

​	在数组末尾添加，可以接收任意数量的参数，并把它们逐个添加到末尾，返回添加后数组的长度；

```js
//添加一项
var arr = ["a","b","c"];
var l = arr.push("A");
console.log(l);//4
console.log(arr);//["a","b","c","A"]

//添加多项
var arr = ["a","b","c"];
var l = arr.push("A","B","C");
console.log(l);//6
console.log(arr);//["a", "b", "c", "A", "B", "C"]
```

#### 	arr.pop()

​	从数组末尾删除一项，返回删除的一项；

```js
var arr = ["a","b","c","d","e"];
var l = arr.pop();
console.log(l);//"e"
console.log(arr);//["a","b","c","d"]
```

#### 	arr.unshift()

​	在数组开头添加，可以接收任意数量的参数，并把它们逐个添加到开头，返回添加后的数组数组长度；

```js
var arr = ["a","b","c","d","e"];
var l = arr.unshift("A","B","C");
console.log(l);//8
console.log(arr);//["A", "B", "C", "a", "b", "c", "d", "e"]
```

#### 	arr.shift()

​	从数组开头删除一项，返回删除的一项；

```js
var arr = ["a","b","c","d","e"];
var l = arr.shift();
console.log(l);//"a"
console.log(arr);//["b", "c", "d", "e"]
```

#### 	arr.indexOf()

​	查找，如果有，则返回某一项首次在数组中出现的下标；如果没有，则返回-1；

```js
var arr = [1,2,3,4,2];
console.log(arr.indexOf(2));//1
console.log(arr.indexOf(9));//-1
```

###### 	案例：数组去重（1）

```js
var arr = [3,4,53,2,34,4,2,3,3,34];
var newArr = [];
for(var i = 0;i < arr.length;i++){
    if(newArr.indexOf(arr[i]) == -1){
        newArr.push(arr[i]);
    }
}
console.log(newArr);
```

#### 	arr.splice(start,deleteCount,items)

​	start：开始删除的下标，默认为0

​    deleteCount：可选的，默认删除到最后

​    items:可选，用于替换的元素

​	用于数组的添加、删除和替换，返回被删除元素组成的数组；

```js
//1.删除
var arr = [1,2,3,4,5];
var delArr = arr.splice(2); //从下标为2的位置开始删除，删除到最后
console.log(arr); //[1,2]
console.log(delArr); // [3, 4, 5]  被删除元素组成数组

//从下标为2的位置开始删除2个
var arr = [1,2,3,4,5];
arr.splice(2,2); 
console.log(arr); // [1, 2, 5]

//2.替换 先删除选中的元素，再用items进行替换
var arr = [89,45,67,23];
arr.splice(1,1,54,56,67,78);
console.log(arr);

//3.添加
var arr = [1,2,5,6];
var n = 4;
arr.splice(2,0,n);
console.log(arr); // [1, 2, 4, 5, 6]
```

###### 	案例：数组去重（2）

```js
var arr = [3,4,53,2,34,4,2,3,3,34];
for(var i = 0;i < arr.length;i++){
    for(var j = i + 1;j < arr.length;j++){
        if(arr[i] == arr[j]){
            arr.splice(j,1);
            j--;
        }
    }
}
console.log(arr);
```

#### 	arr.concat(arr1,arr2,……)

​	连接数组，将多个数组连接成一个数组，返回连接之后的数组

```js
var arr1 = [1,2,3];
var arr2 = ["a","b","c"];
var newArr = arr1.concat(arr2);
console.log(newArr);//[1, 2, 3, "a", "b", "c"]
var newArr = arr1.concat(arr2,"学废了");
console.log(newArr);//[1, 2, 3, "a", "b", "c", "学废了"]
```

#### 	arr.slice(start,end)

​	start：开始下标（可选），默认是0

​	end：结束下标（可选），默认一直到结束

​	数组截取，包括开始下标，不包括结束下标，返回截取好的数组

```js
var arr = [1,2,4,3,5];
console.log(arr.slice(1,4));//[2, 4, 3]
```

#### 	arr.reverse()

​	倒序排列，返回倒序排列好的数组；

```js
var arr = [4,5,3,63,2,0,0];
console.log(arr.reverse());//[0, 0, 2, 63, 3, 5, 4]
```

#### 	arr.join()

​	将数组按条件转成字符串；

```js
var arr = [4,5,3,63,2,0,0];
console.log(arr.join("*"));//0*0*2*63*3*5*4
```

###### 	案例：字符串倒序排列

```js
var str = "t5406928gjseit";
console.log(str.split("").reverse().join(""));//tiesjg8296045t
```

### 数组排序算法

#### 	选择排序

​	原理：拿一个元素跟它后面的每一项进行比较，如果后面有比它小的，则交换位置；

```js
var arr = [5,6,3,2,7,9];
for(var i = 0;i < arr.length;i++){
    for(var j = i + 1;j < arr.length;j++){
        if(arr[i] > arr[j]){
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
console.log(arr);
```

#### 	冒泡排序

​	原理：将相邻的两个数两两比较，如果后一项比前一项大，则交换位置；

```js
var arr = [6, 3, 9, 2, 7, 4, 8, 5, 1];
for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length-1-i; j++) {
        if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
console.log(arr);
```

### 数组排序方法

- arr.sort();

​	默认情况下，按照字符串排序；

```js
var arr = [53,4576,23,11,98,65,56,78];
console.log(arr.sort());//[11, 23, 4576, 53, 56, 65, 78, 98]
```

- arr.sort(function(a,b){return a - b});

  按照数值型排序，a和b是两个相邻的项，表示如果a-b>0,则互换位置（升序）；

```js
var arr = [53,4576,23,11,98,65,56,78];
arr.sort(function(a,b){
    return a - b;
})
console.log(arr);//[11, 23, 53, 56, 65, 78, 98, 4576]
```

###### 	案例：按要求排序

```js
var student = [
    { "name": "羊振疼", "age": 80, "date": "1940-12-12", "c": 89 },
    { "name": "张振", "age": 81, "date": "1939-12-12", "c": 100 },
    { "name": "马杰伦", "age": 18, "date": "2002-1-1", "c": 30 },
    { "name": "安德华", "age": 18, "date": "2002-11-3", "c": 70 },
];

/* 按照年龄排序 */
student.sort(function (a, b) {
    return a.age - b.age;
})
console.log(student);

/* 如果年龄一样，按照出生日期排序（降序） */
student.sort(function (a, b) {
    if (a.age == b.age) {
        // return new Date(b.date) - new Date(a.date);
        return Date.parse(b.date) - Date.parse(a.date);
    }else{
        return a.age - b.age;
    }

})
console.log(student)

/* 名字首字母排序（升序） */

//stringObj.localeCompare(target) 按照本地特定顺序进行排序
//stringObj > target  返回一个正数
//stringObj < target  返回一个负数
student.sort(function(a,b){
    return a.name.localeCompare(b.name);
})
console.log(student)

//new Date() - new Date() = 时间戳
//Date.parse(时间)
```

#### 	随机排序

```js
var arr = [11,34,56,67,54];
var m = arr.sort(function(a,b){
    return Math.random() - 0.5;
})
console.log(m);
```

### 数组的迭代方法

#### 	every

​		针对数组中某些内容进行判断，如果每一项都满足条件，则返回true，否则，返回false

```js
var arr = [54, 76, 7, 34, 34, 74, 89, 90];
var r = arr.every(function (value, index) {
    //看数组中的数是否都大于80
    return value > 80;
    // return value > 0;
})
console.log(r);//false
```

#### 	some

​		针对数组中某些内容进行判断，如果有满足条件的项，则返回true，否则，返回false

```js
var arr = [54, 76, 7, 34, 34, 74, 89, 90];
var r = arr.some(function (value, index) {
    return value > 80;
})
console.log(r);//true
```

#### 	filter

​		针对数组中某些内容进行判断，筛选出来满足条件的项，并返回出来

```js
var student = [
    { "name": "羊振疼", "age": 80, "date": "1940-12-12", "c": 89 },
    { "name": "张振", "age": 81, "date": "1939-12-12", "c": 100 },
    { "name": "马杰伦", "age": 18, "date": "2002-1-1", "c": 30 },
    { "name": "安德华", "age": 18, "date": "2002-11-3", "c": 70 },
];
var r = student.filter(function(value,index){
    // console.log(value)
    return value.age == 18;//筛选条件
})
console.log(r);

```

#### 	map

​		遍历数组，可以将修改后的值组成一个新的数组进行返回

```js
var arr1 = ["e","a","g","r"];
var r = arr1.map(function(value,index){
    console.log(value);
    return value + "01";
})
console.log(r);
```

#### 	forEach

​		遍历数组，没有返回值

```js
var arr1 = ["e","a","g","r"];
arr.forEach(function(value,index){
    console.log(index+"------"+value);
})
```

