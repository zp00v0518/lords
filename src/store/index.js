import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    chat: {
      is: true,
    }
  },
  mutations: {
    closeChat(state){
      state.chat.is = !state.chat.is;
    },
  }
})

export default store
