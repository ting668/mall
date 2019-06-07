/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        id: '',
        orderId:'',
    },
    mutations: {
        setId(state, newId) {
            state.id = newId
        },
        setOrderId(state, newId) {
          state.orderId = newId
      },
    }

})
