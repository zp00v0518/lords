import Vue from 'vue'
import Vuex from 'vuex'
import WS from '../api/ws'
import config from '../../backEnd/config/config'

Vue.use(Vuex);


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
  },
  actions: {
    getData({}) {
      console.log('getData in Store')
    }
  }
})
const ws = new WS().init(`ws://localhost:${config.port.ws}`, store);

export default  {
  store, 
  ws
}
