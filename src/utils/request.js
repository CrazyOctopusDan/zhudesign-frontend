import { message } from 'antd'

const baseUrl = ''

export const request = (url, config) => {
  return fetch(url, config).then(res => {
    if (res.code == '0') {
      return res.json()
    } else {
      // 服务器异常
      message.error('错误信息：', res.message)
      throw Error('服务器异常')
    }
  }).then(resJson => {
    return resJson
  }).catch(err => {
    message.error('错误信息：', err)
  })
}

export const get = (url) => {
  return request(url, { method: 'GET' })
}

export const post = (url, config) => {
  return request(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(config)
  })
}

// 引用的时候可以
// import * as FetchRequest from 'utils/request'
// 使用的时候就是
// FetchRequest.get('/api/xxx')
