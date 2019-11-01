import jsonp from 'jsonp'

// parseParam函数的作用就是
// 将{
//    page:1,
//    pSize: 20
// }
// 转换成
// page=1&psize=20
const parseParam = param => {
  // 定义一个空数组
  let params = []
  // 遍历传递进来的参数
  for (const key in param) {
    // 将遍历好的参数 传进新数组
    params.push([key, param[key]])
  }
  // 得到的结果为
  // 一个二维数组 [[page,1],[psize,2]]

  return params.map(value => value.join('=')).join('&')
//  用map方法进行操作
//  [page=1,psize=2]
//  page=1&psize=2
}

export default (url, data, options) => {
  // 判断url后面是否带有？号  再将参数拼接起来  parseParam是个方法
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data)
  // 返回一个promise对象
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      // 失败时的回调
      if (err) {
        reject(err)
      } else {
        // 成功时的回调
        resolve(data)
      }
    })
  })
}
