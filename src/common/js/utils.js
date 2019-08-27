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