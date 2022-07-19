Array.prototype.my_forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

const arr1 = [{ a: 1 }, { b: 2 }, { c: 3 }];

arr1.my_forEach((item, index, arr) => {
  console.log(item, index, arr);
});

Array.prototype.my_flat = function (depth = 1) {
  let arr = this;
  while (arr.some((i) => Array.isArray(i)) && depth > 0) {
    arr = [].concat(...arr);
    depth--;
  }
  return arr;
};

const arr2 = [1, [2, 3, [4, 5, [7, 8, 9]]], 10, [11, 12]];

console.log(arr2.my_flat());
console.log(arr2.my_flat(2));
console.log(arr2.my_flat(3));
console.log(arr2.my_flat(Infinity));
