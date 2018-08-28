/*
 * @Author: wllluoo.zhongpeipei 
 * @Date: 2018-08-28 16:24:27 
 * @Last Modified by: wllluoo.zhongpeipei
 * @Last Modified time: 2018-08-28 17:02:04
 */

export default function ({
    method,
    url,
    query,
    body,
    post,
    throttle = true, // 默认不能连续多次发送请求
    ...res,
}) {
    // if (query && query.inlude('unde')) 
    console.log(method, url, query, post, body);
}