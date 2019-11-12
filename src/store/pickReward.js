import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    orderList: []
  },
  mutations: {
    setList(state, val) {
      state.orderList = val
    },
    addList(state, val) {
      state.orderList = state.orderList.concat(val)
    }
  }
})
