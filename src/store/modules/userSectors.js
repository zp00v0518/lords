const userSectors = {
  state: {
    sectors: null,
    currentTown: null
  },
  mutations: {
    SET_SECTORS(state, sectors) {
      state.sectors = sectors;
    },
    SET_CURRENT_TOWN(state, town) {
      state.currentTown = town;
    }
  },
  actions: {
    SET_DATA_CONNECTION({ commit }, sectors) {
      commit("SET_SECTORS", sectors);
      commit("SET_CURRENT_TOWN", sectors[0]);
    }
  }
};

export default userSectors;
