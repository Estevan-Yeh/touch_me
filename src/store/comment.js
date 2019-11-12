import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    commentList: [],
    commentDetails: {}
  },
  mutations: {
    initCommentList(state, val) {
      state.commentList = val
    },
    addCommentList(state, val) {
      state.commentList = state.commentList.concat(val)
    },
    initCommentDetails(state, val) {
      state.commentDetails = val
    }
  }
})
