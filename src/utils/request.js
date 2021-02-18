import { message } from 'antd'

export const baseUrl = 'http://47.111.230.61:22980'

/**
 * Fetch Request
 * @param {*} url 
 * @param {*} config 
 */
export const request = (url, config) => {
  return fetch(baseUrl+url, config).then(res => {
    // eslint-disable-next-line
    if (res.ok) {
      return res.json()
    } else {
      // 服务器异常
      message.error('错误信息：', res.message)
      throw Error('服务器异常')
    }
  }).then(resJson => {
    if (resJson.code === -1) {
      message.error(resJson.message)
    }

    return resJson
  }).catch(err => {
    message.error('错误信息：', err)
  })
}

/**
 * Get 请求
 * @param {*} url 
 * @param {*} params 
 */
export const get = (url, params) => {
  let _url = url
  if (params) {
    let paramsArray = []

    // 拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`))

    if (_url.search(/\?/) === -1) {
      _url += '?' + paramsArray.join('&')
    } else {
      _url += '&' + paramsArray.join('&')
    }
  }

  return request(_url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'cors' 
  })
}

/**
 * Post 请求
 * @param {*} url 
 * @param {*} params 
 */
export const post = (url, params = {}) => {
  return request(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'cors',
    body: JSON.stringify(params)
  })
}

// 引用的时候可以
// import * as FetchRequest from 'utils/request'
// 使用的时候就是
// FetchRequest.get('/api/xxx')
