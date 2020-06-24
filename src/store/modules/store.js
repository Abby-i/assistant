/*
vuex的核心管理对象模块：Store
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  account: {}
}
const getters = {
  status: account => state.account
}
const mutations = {
  ACCOUNTS: (state, account) => {
    state.account = account
  }

}
const actions = {}

export default new Vuex.Store({
  state, // 状态对象
  mutations, // 包含多个更新state函数的对象
  actions, // 包含多个对应事件回调函数的对象
  getters // 包含多个getter计算属性函数的对象
})
