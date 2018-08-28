/*
 * @Author: wllluoo.zhongpeipei 
 * @Date: 2018-08-28 15:55:27 
 * @Last Modified by: wllluoo.zhongpeipei
 * @Last Modified time: 2018-08-28 16:59:58
 */

export default function (url, query) {
    const _url = url;
    const _query = query;
    const queryArray = [];

    // query需是对象
    if (!ifObject(_query)) {
        throw new Error('the query type must be the object');
    }
    if (!Object.keys(_query).length) return _url;

    Object.keys(_query).forEach(key => {
        if (ifSpecial(_query[key])) {
            // TODO:
            return
        }
        queryArray.push(
            `${key}=${_query[key]}`
        );
    })
    return `${_url}?${queryArray.join('&')}`
}

var ifObject = val => Object.prototype.toString.call(val) !== "[object Object]"

var ifFunction = val => Object.prototype.toString.call(val) !== "[object Function]"

var ifSpecial = (val) => val instanceof Array || ifObject(val) || ifFunction(val)

