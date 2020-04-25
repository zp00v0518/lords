const settings = {
  state: {
    baseColor: 'yellow',
    isReady: false
  },
  mutations: {
    SET_IS_READY_APP(state) {
      state.isReady = true;
    }
  }
};

export default settings;
