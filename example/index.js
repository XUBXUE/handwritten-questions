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
    const args = [...arguments];
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

function throttle() {}
