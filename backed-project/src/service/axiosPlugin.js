/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'

// 添加请求拦截器(设置token等)
axios.interceptors.request.use(config => {
  // 设置token
  let token = window.localStorage.getItem('r_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})
axios.defaults.responseType = 'json'

// // 请求参数转化(处理%+等特殊字符)
// axios.defaults.transformRequest = function (data) {
//   if (data) {
//     if (data instanceof FormData) {
//       return data
//     } else {
//       // 解决%,+编码问题
//       if (data instanceof Object) {
//         data = JSON.stringify(data)
//         data = data.replace(/\%/g, encodeURIComponent('%'))
//         data = data.replace(/\+/g, encodeURIComponent('+'))
//         return data
//       }
//     }
//   }
// }

export default {
  post(url, data) {
    let baseURL = "http://localhost:3000"
    console.log(data);
    return axios({
      method: 'post',
      url: baseURL + url,
      data: data,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },
  get(url, params) {
    let baseURL = "http://localhost:3000"
    return axios({
      method: 'get',
      url: baseURL + url,
      params,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },
  postFormData(serverUrl, formData) {

    let baseURL = "http://hzerodevb.saas.hand-china.com"
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post(baseURL + url, formData, config)
  }
}
