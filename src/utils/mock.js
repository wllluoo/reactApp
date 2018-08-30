/*
 * @Author: wllluoo.zhongpeipei 
 * @Date: 2018-08-31 00:23:21 
 * @Last Modified by:   wllluoo.zhongpeipei 
 * @Last Modified time: 2018-08-31 00:23:21 
 */


export const mockjs = (url, responseBody) => {
    let Mock = require('mockjs')
    const mockData = getMockData(responseBody);
    let data = Mock.mock(mockData);
    // let url = 'http://rap2api.taobao.org/app/mock/12749/getAllMajors';
    Mock.mock(url, data);
}

const getMockData = (responseBody) => {
    // TODO: 生成mock规则
    return responseBody;
}
