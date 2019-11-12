import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    addressList: [],
    defaultAddress: '',
    addressDetails: {}
  },
  mutations: {
    initDefaultAddress(state, val) {
      state.defaultAddress = val
    },
    initAddressList(state, val) {
      state.addressList = val
    },
    initAddressDetails(state, val) {
      state.addressDetails = val
    }
  }
})
