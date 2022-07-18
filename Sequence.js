/**
 * 最长递增子序列
 * @param {number[]} nums 数字数组
 * @returns {number[]} 最长严格递增子序列（下标数组）
 */
 function getSequence(nums) {
  let result = []; // 子序列下标数组
  let prevIndexs = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]; // 当前值
    const last = nums[result[result.length - 1]]; // 当前保存的索引的最大值
    if (current > last || last === undefined) {
      prevIndexs.push(result[result.length - 1]); // 获取前一位下标
      result.push(i);
    } else {
      // 二分查找
      let start = 0,
        end = result.length - 1,
        middle;
      // 这里循环结束后 start等于end
      while (start < end) {
        middle = Math.floor((start + end) / 2);
        if (current < nums[result[middle]]) {
          end = middle;
        } else {
          start = middle + 1;
        }
      }
      // 最后得到的值跟当前值相比 如果当前值小于该值则替换 大于则不做处理
      if (current < nums[result[start]]) {
        prevIndexs.push(result[start - 1]); // 获取前一位下标
        result[start] = i;
      }
    }
  }
  console.log(result.map(v => nums[v]))
  console.log(result)
  // 利用前驱节点重新计算result
  let length = result.length, //总长度
    prev = result[length - 1]; // 最后一项
  while (length-- > 0) {
    // 根据前驱节点一个个向前查找
    result[length] = prev;
    prev = prevIndexs[result[length]];
  }

  console.log(prevIndexs); // [ undefined, 0, undefined, 1, 3, 4, 4, 6, 1 ]
  return result; // 2 1 8 4 6 7 
  //013467
}
// 用前驱节点前
//                   值：1, 3, 4, 6, 7, 9
//                 索引：2, 1, 8, 4, 6, 7
console.log(getSequence([2, 3, 1, 5, 6, 8, 7, 9, 4])); // 返回下标：2 1 8 4 6 7   对应值：1 3 4 6 7 9
//            前一个索引：u, 0, u, 1, 3, 4, 4, 6, 1
// 用前驱节点后
//                   值：2, 3, 5, 6, 7, 9
//                 索引：0, 1, 3, 4, 6, 7
//235679

// console.log(getSequence([3, 2, 8, 9, 5, 6, 7, 11, 15, 4])) // 2 5 6 7 11 15