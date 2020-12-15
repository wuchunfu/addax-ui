import Vue from 'vue'
import Axios from 'axios'
// import router from '../router'
import config from '../config'
import { Message } from 'element-ui'
// import { MessageBox } from 'element-ui'
console.log(config.apiBaseUrl)
Axios.defaults.baseURL = config.apiBaseUrl
Axios.defaults.timeout = 300000
// Axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'

window.__axiosPromiseArr = []
// Axios 请求拦截器
Axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers['token'] = token
  }
  // 将cancel放置于全局变量的数组中, 用于取消请求
  config.cancelToken = new Axios.CancelToken(cancel => {
    window.__axiosPromiseArr.push({
      cancel
    })
  })
  return config
}, err => {      
  console.log(err); 
})

// Axios 响应拦截器 对返回码进行处理处理
Axios.interceptors.response.use(res => {
  // console.log(res)
  // if (res.headers.sid) {
  //   sessionStorage.setItem('SID', res.headers.sid)
  // }
  if (res.status === 200) {
    if (res.data.returnCode === '0') return res.data
    else if(res.data.returnCode === '50001') {
      // MessageBox.alert(res.data.returnMsg, "登录失效", {
      //   confirmButtonText: "跳转登录页面",
      //   callback: () => {
          // 跳转登录页
          // let userType = JSON.parse(sessionStorage.userInfo).userType
          // // sessionStorage.removeItem('userInfo')
          // sessionStorage.removeItem('userRouters')
          // sessionStorage.removeItem('token')
          // console.log(userType)
          // if (userType && userType === 1) {
          //   location.href = "/#/admin"
          // } else {
          //   location.href = "/"
          // } 
        // }
      // })
    } else if(res.data.returnCode === '-1'){
        return res.data
    } else {
      Message.error(res.data.returnMsg)
      return Promise.reject(res.data.returnMsg)
    }
    // else if (res.data.rspCd === '30002') return router.replace({ name: 'Login' })
    // else if (res.data.rspCd === 'B0703') {
    //   sessionStorage.removeItem('userInfo')
    //   return router.replace({ name: 'Login' })
    // } else if (res.data.rspCd === 'B0803') {
    //   Message.error(res.data.rspInf)
    //   return Promise.reject(res.data.rspInf)
    // }
  }
  // if (res.data.rspInf) {
  //   Message.error(res.data.rspInf)
  // }
  // return Promise.reject(res.data.rspInf)
}, err => {
  if (err.response) {
    switch (err.response.status) {
      case 502:
        Message.error('服务器内部错误')
        break
      case 404:
        Message.error('请求地址错误')
        break
      case 405:
        Message.error('请求方式错误')
        break
      default:
        Message.error('服务器繁忙')
        break
    }
  }
  return Promise.reject(err.response)
})
// const token = {token: sessionStorage.getItem('token') || ''}
// console.log(token)
// 接口方法
Vue.prototype.$post = function (url, query) {
  return new Promise((resolve, reject) => {
    Axios.post(url, query || {})
      .then(resp => {
        resolve(resp)
      })
      .catch(e => {
        console.log(e)
        reject(e)
      })
  })
}

Vue.prototype.$get = function (url, query) {
  return new Promise((resolve, reject) => {
    Axios.get(url, query || {})
        .then(resp => {
          resolve(resp)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
  })
}
// Vue.prototype.$axios = Axios