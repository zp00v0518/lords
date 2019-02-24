const timeline = {
  state: {
    eventsList: []
  },
  mutations: {
    SET_EVENTS(state, payload) {
      state.eventsList = payload;
    }
  },
  actions: {}
};

export default timeline;
