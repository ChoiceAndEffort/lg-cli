/*
    按钮点击事件·节流
    fn:函数，
    delay:延迟时间/秒
    适用情景：提交按钮（避免高频率重复点击）
    调用:
    1.import 引入
    2.throttle(butClick事件,500)
*/
export function throttle(fn, delay) {
  let first = true;
  let timestamp;
  let ctx = this;
  return function () {
    if (first) {
      timestamp = Date.now();
      fn.apply(ctx, arguments);
      first = false;
    } else {
      let t = Date.now();
      if (t - timestamp < delay) {
        timestamp = t;
        return;
      } else {
        fn.apply(ctx, arguments);
      }
      timestamp = t;
    }
  };
}

/*
  输入框input事件·防抖
  fn:函数，
  delay:延迟时间/秒
  适用情景：输入框、搜索框input事件，等待一次性输入完后请求
  调用:
  1.import 引入
  2.throttle(input事件,500)
*/
export function bounce(fn, delay, ctx = window) {
  let timer = null;
  return function (...args) {
    return new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (fn instanceof Promise) {
          fn.apply(ctx, args).then((res) => {
            resolve(res);
          });
        } else {
          resolve(fn.apply(ctx, args));
        }
      }, delay);
    });
  };
}
/**
 * 处理空的参数
 * @param datas
 * @returns
 */
export function cleanParams(datas) {
  var v_data = {};
  for (var a in datas) {
    if (datas[a] != null && datas[a] instanceof Array) {
      v_data[a] = [];
    } else {
      v_data[a] = null;
    }
  }
  return v_data;
}
/**
 * 数组拆分
 * array:需拆分的数组
 * subGroupLength:拆分后子数组的长度
 */
export function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}
/**
 * 数组
 * array:原数组
 * value:需要变更的字段名
 * name:需要变更的字段名
 */
export function saveOptionsArr(array, value, name) {
  let data = [];
  array.forEach((element) => {
    let objs = element;
    objs.value = element[value];
    objs.label = element[name];
    data.push(objs);
  });
  console.log(data);
  return data;
}
