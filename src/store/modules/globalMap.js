const globalMap = {
  state: {
    currentMap: []
    },
  mutations: {
    SET_CURRENTMAP(state, payload) {
      state.currentMap = payload.currentMap;
    },
  },
  actions: {}
}

export default globalMap;
