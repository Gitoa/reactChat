function transformTime(ms) {
  let now = + new Date();
  let off = (ms - now) / 1000;
  if (off < 60 ) {
    return '刚刚'
  }
  else if (off < 2 * 60) {
    return '1分钟前'
  }
}


function toCamelCase(str) {
  let arr = str.split('');
  let len = arr.length-2;
  if (len <= 0) {
    return str;
  }
  while(len) {
    if(arr[len] === '_') {
      arr[len + 1] = arr[len + 1].toUpperCase();
      arr.splice(len, 1);
    }
    len --;
  }
  return arr.join('');
}

function cloneToCamelCase(obj) {
  let result = new Object();
  for(let props in obj) {
    result[toCamelCase(props)] = obj[props]
  }
  return result;
}

function throttle(fn, ms) {
  let timer = null;
  let func = function(...args) {
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null
      }, ms)
    }
  }
  return func;
}

function debounce(fn, ms) {
  let timer = null;
  let func = function(...args) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, ms);
  }
  return func;
}

function wrapPromise(p) {
  let obj = {};
  let rejectMsg = 'cancel-promise-p';
  let promise = new Promise((resolve, reject) => {
    obj._resolve = resolve;
    obj._reject = reject;
  })
  obj.promise = Promise.race([p, promise]);
  obj.cancel = () => {
    obj._reject(rejectMsg);
  }
  return obj;
}

export {cloneToCamelCase, debounce, throttle, wrapPromise};