const settings = {
  state: {
    baseColor: 'yellow',
    isReady: false,
    canvas: {
      map: {
        marginTop: 4,
        marginBottom: 10,
        tileScale: 0.85,
      },
    },
  },
  mutations: {
    SET_IS_READY_APP(state) {
      state.isReady = true;
    },
  },
};

export default settings;
