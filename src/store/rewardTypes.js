import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        rewardTypes: []
    },
    mutations: {
        initRewardTypes(state, val) {
            state.rewardTypes = val
        }
    }
})