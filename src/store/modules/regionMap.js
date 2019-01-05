const regionMap = {
  state: {
    currentRegion: []
    },
  mutations: {
    SET_CURRENT_REGION(state, town) {
      state.currentRegion = town.region;
    },
  },
  actions: {}
}

export default regionMap;
