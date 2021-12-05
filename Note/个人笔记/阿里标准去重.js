function uni(arr) {
    var m = new Map();
    return arr.filter((item) => {
        return !m.has(item) && m.set(item);
    });
}
var res = uni([1, 1, 2, 3, 4, 1]);
console.log(res);
