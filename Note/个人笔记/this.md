解析器在调用函数每次都会向函数内部传递一个隐藏的参数 this
this 指向的是一个对象,这个对象称之为函数执行的上下文对象
根据函数的调用方式的不同,this 会指向不同的对象

1. 以函数的形式调用时,this 永远都是指向 window,因为`函数名()`相当于`window.函数名()`
2. 以方法的形式调用时,this 就指向调用方法的那个对象
3. 当以构造函数的形式调用时,this就是构造函数隐式创建的那个对象
```js
function fun() {
    console.log(this);
}

fun(); // this指向window,因为相当于window.fun()
let obj = {
    sayName: fun,
};
obj.sayName(); // this指向obj
```
