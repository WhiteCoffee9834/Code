function uni(arr: number[]) {
    var m = new Map();
    return arr.filter((item) => {
        return !m.has(item) && m.set(item, item);
    });
}
console.log(uni([1, 1, 2, 3, 4, 1]));
