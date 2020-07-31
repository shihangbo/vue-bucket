// 遍历对象
const forEach = (obj = {}, fn) => {
  Object.keys(obj).forEach((key,index) => fn(obj[key], key))
}

export {
  forEach
}