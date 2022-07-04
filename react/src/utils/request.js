import axios from 'axios'
import { message as Message } from 'antd'
// const duration = 3000
// create an axios instance

// const baseURL = process.env.VUE_APP_BASE_URL

const service = axios.create({
  baseURL: '/', // process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const handleCode = (code, error) => {
  try {
    let message = ''
    switch (code) {
      // 跳转
      case 400:
        message = '错误请求'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求错误'
        break
      case 405:
        console.log(error)
        message = 'Method Not Supported'
        break
      case 500:
        message = '服务端出错'
        break
      case 502:
        message = 'Bad Gateway'
        break
    }
    if (message) {
      Message.error(message)
    }
  } catch (error) {
    return Promise.reject(error)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
}

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message.error(res.msg)
      return Promise.reject((res || 'Error'))
    } else {
      return res
    }
  },
  error => {
    return handleCode(error.response.status, error)
  }
)

export default service
