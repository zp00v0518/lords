const userSectors = {
  state: {
    sectors: null,
    currentSector: null
  },
  mutations: {
    SET_SECTORS(state, sectors) {
      state.sectors = sectors;
    },
    SET_CURRENT_SECTOR(state, sector) {
      state.currentSector = sector;
    }
  },
  actions: {
    SET_DATA_CONNECTION({ commit }, sectors) {
      commit("SET_SECTORS", sectors);
      commit("SET_CURRENT_SECTOR", sectors[0]);
    }
  }
};

export default userSectors;
