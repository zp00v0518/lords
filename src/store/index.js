import Vue from 'vue'
import Vuex from 'vuex'
// import WS from '../api/ws'
// import config from '../../backEnd/config/config'

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    chat: {
      is: true,
      messages: [],
    }
  },
  mutations: {
    closeChat(state){
      state.chat.is = !state.chat.is;
    },
    PUSH_MESSAGE(state, payload) {
      state.chat.messages.push(payload)
    },
    START_MESSAGES(state, payload) {
      state.chat.messages = payload.chat;
    },
  },
  actions: {
    getData({}) {
      console.log('getData in Store')
    }
  }
})

export default store
