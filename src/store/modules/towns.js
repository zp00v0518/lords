const towns = {
  state: {
    towns: [],
    currentTown: {}
  },
  mutations: {
    SET_TOWNS(state, towns) {
      state.towns = towns;
    },
    SET_CURRENT_TOWN(state, town) {
      state.currentTown = town;
    }
  },
  actions: {
    SET_DATA_CONNECTION({ commit }, towns) {
      commit("SET_TOWNS", towns);
      commit("SET_CURRENT_TOWN", towns[0]);
    }
  }
};

export default towns;
