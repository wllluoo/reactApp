/*
 * @Author: wllluoo.zhongpeipei 
 * @Date: 2018-08-28 16:24:27 
 * @Last Modified by: wllluoo.zhongpeipei
 * @Last Modified time: 2018-08-31 00:23:29
 */

var $ = require('jquery');
const { mockjs } =  require('./mock')

// fetch 也能拦截吗
export default function ({
    method,
    url,
    query,
    body,
    post,
    throttle = true, // 默认不能连续多次发送请求
    mock = false,
    responseBody = {},
    ...res,
}) {
      // TODO:
      // if (query && query.inlude('unde')) 
      // console.log(method, url, query, post, body);
      // 输出结果
      // console.log(JSON.stringify(data, null, 4))
      let _url = url;
      // TODO: 拼接接口地址

      if (mock) {
        importMockData(_url, responseBody);
      }
      $.ajax({
        type: method,
        url: _url,
        success: data => {
          console.log('data', data);
        }
      })
}

// 引入mockjs，拦截请求
const importMockData = (url, responseBody) => mockjs(url, responseBody)
