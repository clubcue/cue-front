/* element-ui.common.js?ccbf:9948 [Violation] Added non-passive event
   listener to a scroll-blocking 'mousewheel' event. Consider marking
   event handler as 'passive' to make the page more responsive.
*/
import 'default-passive-events'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { store } from './store/store'// 引入store
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/css/global.css'
import eleCalendar from 'ele-calendar'
import less from 'less'
// import { handleErrorMsg } from '@/common/common'
// import 'ele-calendar/dist/vue-calendar.css'
Vue.prototype.$axios = axios

const AUTH_TOKEN = sessionStorage.getItem('Authorization')
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
Vue.config.productionTip = false

/* 注入 */
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(eleCalendar)
Vue.use(less)

// 全局请求处理
axios.interceptors.request.use((config) => {
  // if (config.headers.loading) globalLoading.startLoading()
  const AUTH_TOKEN = sessionStorage.getItem('Authorization')
  if (AUTH_TOKEN) config.headers.common['Authorization'] = AUTH_TOKEN
  return config
}, (err) => {
  // globalLoading.endLoading()
  // 对请求错误的处理
  return Promise.reject(err)
})

// 全局响应处理
axios.interceptors.response.use(
  (config) => {
    // globalLoading.endLoading()
    switch (config.data.code) {
      case 200:
        return config
      case 500:
        ElementUI.Message.error(config.data.msg)
        return config
      default:
        return config
    }
  },
  (err) => {
    const { config, code, message } = err
    // globalLoading.endLoading()
    console.log('code', code)
    console.log('config', config)
    console.log('message', message)
    if (code === 'ECONNABORTED') ElementUI.Message.warning(`请求超时,请稍后重试`)
    switch (err.response.status) {
      case 401:
        ElementUI.Message.error(err.response.data)
        sessionStorage.removeItem('Authorization')
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
        return Promise.reject(err)
    }
    return Promise.reject(err)
  }
)

/* eslint-disable no-new */
// 实例化 router store
new Vue({
  el: '#app',
  store,
  router,
  axios,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
