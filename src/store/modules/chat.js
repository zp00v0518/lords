const chat = {
  state: {
    is: false,
    messages: [],
    },
  mutations: {
    CHANGE_CHAT(state){
      state.is = !state.is;
    },
    UNSHIFT_MESSAGE(state, payload) {
      const chat = state.messages;
      if (chat.length === 99) chat.pop(); 
      chat.unshift(payload)
    },
    START_MESSAGES(state, payload) {
      state.messages = payload.chat;
    },
  },
  actions: {
    getData({}) {
      console.log('getData in Store')
    }
  }
}

export default chat;
