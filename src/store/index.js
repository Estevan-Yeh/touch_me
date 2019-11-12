import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    orderList: []
  },
  mutations: {
    initOrderList(state, val) {
      state.orderList = state.orderList.concat(val)
    }
  }
})
