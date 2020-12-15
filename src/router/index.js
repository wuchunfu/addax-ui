import Vue from 'vue'
import Router from 'vue-router'
import Login from '@views/login/login.vue'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}  //点击选中的路由不报错
Router.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err);
}
Vue.use(Router)
// 引入除开index.js以外的js文件
const files = require.context('.', true, /\.js$/);
let routerArray = [];
// console.log(files.keys())
files.keys().forEach(key => {
  if (key === './index.js') return
  const exportDefault = files(key).default
  // 设置默认第一个
  // exportDefault.children.push({
  //   path: '',
  //   // redirect: exportDefault.children.length ? exportDefault.children[0].path : '/home'
  //   redirect: exportDefault.children.length ? exportDefault.children[0].path : '/adminIndex'
  // })
  routerArray = routerArray.concat(exportDefault)
})

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        ignoreAuth: true
      }
    }
  ].concat(routerArray)
})
// console.log(router)
router.beforeEach((to, from, next) => {
  // 鉴权
  const userInfo = sessionStorage.getItem('userInfo')
  const userRouters = sessionStorage.getItem('userRouters')
  const token = sessionStorage.getItem('token')
  const flag = userInfo && userRouters && token
  const LOGIN_ADMIN = 'Login'
  if ((!flag && to.name !== LOGIN_ADMIN)) {
    // console.log(userInfo)
    // debugger
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_ADMIN // 跳转到管理员登录页
    })
  }else if(!flag && to.name === LOGIN_ADMIN){
    next()  //跳转管理员登录页
  }else if (flag && (to.name === LOGIN_ADMIN)) { //to.name === LOGIN_ADMIN || 
    // 已登录且要跳转的页面是管理员登录页
    let routers = JSON.parse(userRouters)
    let path = routers[0].path
    if (routers[0].children && routers[0].children.length > 0) {
      path = path + '/' + routers[0].children[0].path
    }
    next({
      path: path // 跳转到首页
    })
  }else {
    // 页面跳转取消axios的请求
    window.__axiosPromiseArr.forEach((ele, idx) => {
      ele.cancel()
      delete window.__axiosPromiseArr[idx]
    })
    next()
  }
})


export default router
