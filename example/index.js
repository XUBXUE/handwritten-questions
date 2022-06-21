/**
 * 防抖函数
 * @param {实际执行的函数} fn
 * @param {执行延迟时间} delay
 * @returns 防抖函数
 * 实现思路：
 * 该函数接受一个回调函数和延迟，并初始化timer和当前上下文this
 * 返回一个延迟执行回调函数的函数
 * 逻辑为先清除timer再重新定义一个timer并将上下文和参数通过apply调用回调函数
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

/**
 * 节流函数
 */
function throttle() {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn(this, arguments);
      flag = true;
    }, delay);
  };
}

/**
 * 柯里化函数
 * 实现思路：
 * 定义一个柯里化函数接受两个入参：fn要柯里化的函数、收集的要传给fn的入参
 * 获取fn的形参长度
 * 返回一个函数
 * 函数通过闭包方式收集上一次柯里化收集的参数和本次传入的参数
 * 判断参数长度是否小于形参长度 如果小于则返回柯里化函数并传入已收集的参数
 * 如果不小于则返回fn的执行结果
 */
function currying(fn, arr = []) {
  // 获取函数的形参长度
  const length = fn.length;
  return function (...arg) {
    // 将之前收集的参数和传入的参数合并
    const args = [...arr, ...arg];
    // 如果参数长度小于形参长度则继续执行柯里化收集参数
    // 否则返回函数的执行结果
    if (args.length < length) {
      return currying(fn, args);
    } else {
      return fn.apply(this, args);
    }
  };
}
