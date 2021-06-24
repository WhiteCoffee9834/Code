## 面向对象编程

### 面向对象编程初识

​	js的开发有两种编程思想：面向过程和面向对象；面向过程注重的是过程，比如我们想要实现一个功能，那我们需要去思考每一步应该怎么做；面向对象注重的是结果，如果说我们想实现一个功能，那我们只需要使用可以实现这个功能的方法就好了，不需要考虑这个方法到底是怎么编写的；

#### 面向对象的特点

- 封装：面相对象思想要求开发者将要实现的代码隐藏到一个类中，仅对外提供一个接口，提升代码的安全性，从而实现高内聚，低耦合的目的（同一个功能的代码之间联系是非常紧密的，这样会导致执行效率很高，低耦合指不同功能代码之间没有任何关系，不会互相影响，如果功能A出现了问题，不会影响功能B的执行，这样也会提升代码的容错率）；
- 继承：在对象中，当某些方法和属性会经常使用，如果给每一个对象都编写该方法，就会造成代码冗余，这时我们可以使用父级对象存放该方法，当其他对象需要使用该方法时，只需要从父级继承就好了；
- 多态：同一功能在不同情况下，得到的结果不同，如："+"在不同情况下表现出不同的效果：数值型+数值型=加法   数值型+字符串=拼接；

#### 面向对象的组成

- 属性：用来描述对象静态特征的数据，如：{name:"李白",sex:"男"}

- 方法：用来描述对象动态行为的数据，如：{say：function(){console.log("床前明月光")}}

### 创建对象

#### 字面量创建

​	var obj = {属性名:"属性值",属性名:"属性值",……}

​	属性名不能重复，如果重复，后面的会覆盖前面的；

- 优点：简单直观
- 缺点：代码冗余，无法实现批量创建

```js
var girlFriend = {
    //静态特征
    name:"秋香",
    sex:"女",
    age:16,
    //动态行为
    fn:function(){
        console.log("点唐伯虎");
    }
}
console.log(girlFriend.name);
girlFriend.fn();

var girlFriend1 = {
    name:"如花",
    sex:"女",
    age:40,
    fn:function(){
        console.log("闭月羞花");
    }
}
console.log(girlFriend1.name);
girlFriend1.fn();

//优点：比较直观
//缺点：代码冗余，无法实现批量创建
```

#### 实例化创建

​	var obj = new Object();

​	obj.属性名 = "属性值"

- 优点：标准创建方式，类型比较强
- 缺点：代码冗余，无法实现批量创建

```js
var student = new Object();
//添加属性
student.name = "莲花";
student.age = 16;
//添加方法
student.eat = function(){console.log("干饭人")};

console.log(student);
student.eat();


var student1 = new Object();
student1.name = "李华";
student1.age = 18;
student1.learnEng = function(){console.log("学英语")};

console.log(student1);
student1.learnEng();


var dog = new Object();
dog.name = "旺财";
dog.age = 3;
dog.wang = function(){console.log("wangwangwang")};

console.log(dog);

//优点：标准创建方式
//缺点：代码冗余，无法实现批量创建；
```

#### 工厂模式创建

​	function fac(name,age,fn){

​		var obj = new Object();

​		obj.name = name;

​		obj.age = age;

​		obj.say = fn;

​		return obj;

​	}

​	fac("闰土",13,function(){console.log("刺猹")})

​	其实就是把实例化创建，封装成函数；

- 优点：可以实现批量创建
- 缺点：创建出来的所有对象都是Object，类型不明确

```js
//声明一个工厂(函数)
function student(name,age){
    //原材料(空对象)
    var obj = new Object();
    //加工(给空对象添加属性和方法)
    obj.name = name;
    obj.age = age;
    obj.eat = function(){console.log("吃饭")};
    //出厂(把函数内部加工好的obj返回给外界用)
    return obj;
}
console.log(student("李华",18));
console.log(student("梨花",28));

function dog(name,age){
    //原材料(空对象)
    var obj = new Object();
    //加工(给空对象添加属性和方法)
    obj.name = name;
    obj.age = age;
    obj.eat = function(){console.log("啃骨头")};
    //出厂(把函数内部加工好的obj返回给外界用)
    return obj;
}
console.log(dog("旺财",3))

//优点：可以实现批量创建
//缺点：类别识别不清
```

#### 构造函数创建

​	构造函数：所有通过new关键字来创建的，都是构造函数，例如：Date，Object，Array，String，创建构造函数时，构造函数命名，首字母应该大写；

​	function Fun(name,age,fn){

​		this.name = name;

​		this.age = age;

​		this.fn = function(){console.log("学习")}

​	}

​	var obj = new Fun("李华",18);

- new操作符都做了什么
  - 实例化对象时，new操作符会隐式创建一个对象 var obj = {}
  - 让构造函数中的this指向这个对象
  - 让这个对象中的__ proto __指向构造函数中的prototype
  - 隐式返回创建好的对象 return obj

- 优点：可以明确类型
- 缺点：当给构造函数中添加公共的属性或方法时，会造成内存浪费

```js
function Student(name,age){
    //添加属性
    this.name = name;
    this.age = age;
    //添加方法
    this.fn = function(){
        console.log("学习");
    }
}

//使用new关键字实例化调用（构造函数的调用方式）
var s = new Student("李华",18);
var s1 = new Student("李虎",4);
console.log(s);
console.log(s1);
console.log(s.fn === s1.fn);//false
//调用方法
s.fn();
s1.fn();
console.log(s1.age);//4

function Dog(name,age){
    this.name = name;
    this.age = age;
    this.fn = function(){console.log("汪汪汪")}
}
var d = new Dog();
console.log(d);

//优点：可以实现批量创建，类别识别清晰
//缺点：每次实例化对象都会开辟一个新的内存空间，会造成内存浪费
```

#### 原型创建

##### 	原型

​	在每个对象中，都会有一个自带的属性__ proto __，这个属性的值，就是当前对象的原型；原型也是对象，其中也可以写入属性和方法；原型中所有存在的属性和方法，子对象都可以直接使用，但这些属性和方法，并不属于子对象，还是属于原型的；

​	原型对象__ proto __中有一个constructor属性，这个属性的值就是创建子对象的构造函数；

​	构造函数中也有一个属性prototype，这个属性值就是子对象的原型对象__ proto __；

​	console.log(date.__ proto __ === Date.prototype);//true

​    console.log(date.__ proto __.constructor === Date);//true

##### 	原型链

​	查找机制，如果当前对象中没有要使用的属性或方法就向它的原型对象__ proto__中去找，如果还是没有，就再向上一层原型对象中查找，如果一直找到最底层（Object.prototype）都没有，就会返回undefined；

##### 	创建方式

​	function Teacher(){}

​	Teacher.prototype.name = "王老师";

​	var t = new Teacher();

- 优点：解决了内存浪费的问题
- 缺点：不能传参，创建的对象单一

```js
function Teacher(){}//空的构造函数
//通过构造函数原型添加
Teacher.prototype.name = "马老师";
Teacher.prototype.age = 18;
Teacher.prototype.eat = function(){console.log("吃饭")};

var t = new Teacher();
var t1 = new Teacher();
console.log(t);
console.log(t.name === t1.name);//true

console.log(t.name);

//优点：节省内存
//缺点：不能传参，创建的对象单一
```

#### 混合模式创建

​	构造函数创建（放可变的属性或方法） + 原型创建（放公共的属性和方法）

```js
function Person(name,sex,age){
    this.name = name;
    this.sex = sex;
    this.age = age;
}

Person.prototype.eat = function(){console.log("全是干饭人")};
Person.prototype.sleep = function(){console.log("全是睡觉人")};

var p1 = new Person("张三","男",19);
var p2 = new Person("李四","女",18);
console.log(p1,p2);
p1.eat();
p2.sleep();
console.log(p1.eat === p2.eat);//true
```

