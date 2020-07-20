import Vue from 'vue'
import './plugins/axios'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


 
// Vue.use(VueQuillEditor);


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

window.BASE_API = process.env.VUE_APP_BASE_API
window.LOGIN_API = process.env.VUE_APP_LOGIN_API
window.CDN_URL = process.env.VUE_APP_CDN_URL
window.SKILL_API = process.env.VUE_APP_SKILL_API

window.BLOG_API = process.env.VUE_APP_BLOG_API

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
