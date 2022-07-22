class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  [Symbol.iterator]() {
    let i = 1,
      limit = this.limit;
    return {
      next() {
        if (i <= limit) {
          return { done: false, value: i };
        } else {
          return { done: true };
        }
      },
      return() {
        console.log('中断迭代')
        return {done: true}
      },
    };
  }
}
