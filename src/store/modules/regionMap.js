const regionMap = {
  state: {
    currentRegion: []
    },
  mutations: {
    SET_CURRENT_REGION(state, town) {
      state.currentRegion = town.town.regionMap;
    },
  },
  actions: {}
}

export default regionMap;
