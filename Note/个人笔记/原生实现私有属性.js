// 私有属性
function fun() {
    var obj = {
        name: "123",
    };
    var a = 10;
    obj.getValue = () => a;
    obj.setValue = (value) => (a = value);
    return obj;
}
let res = fun();
console.log(res.getValue());
res.setValue(200);
console.log(res.getValue());
