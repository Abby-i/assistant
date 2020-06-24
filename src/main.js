// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import store from './store/modules/store'// 所有组件对象都多了一个属性：$store

Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
