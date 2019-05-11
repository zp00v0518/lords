const local = {
  state: {
    lang: 'ru',
    dictionary: {}
  },
  mutations: {
    SET_DICTIONARY(state, payload) {
      state.dictionary = payload;
    }
  },
  actions: {}
};

export default local;
