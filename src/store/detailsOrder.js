import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  mutations: {
    setDetails(state, val) {
      state.details = val
    },
    setButtonFooter(state, val) {
      state.buttonFooter = val
    },
    setPhone(state, val) {
      state.phone = val
    }
  }
})
