const timeline = {
  state: {
    eventsList: []
  },
  mutations: {
    SET_EVENTS(state, payload) {
      state.eventsList = payload;
    },
    UPDATE_EVENTS(state) {
      state.eventsList = state.eventsList.map(item => item)
    }
  },
  actions: {
  }
};

export default timeline;
