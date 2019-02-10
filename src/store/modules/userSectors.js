import Vue from 'vue';

const userSectors = {
  state: {
    sectors: null,
    currentSector: null,
    changeSectors: false,
  },
  mutations: {
    SET_SECTORS(state, sectors) {
      Vue.set(state, 'sectors', [...sectors]);
    },
    SET_CURRENT_SECTOR(state, sector) {
      Vue.set(state, 'currentSector', sector);
    },
    CHANGE_STORAGE(state, payload){
      state.sectors[payload.sectorIndex].town.storage = payload.storage;
      Vue.set(state, 'sectors', [...state.sectors]);
    },
  },
  actions: {
    SET_DATA_CONNECTION({ commit }, sectors) {
      commit("SET_SECTORS", sectors);
      commit("SET_CURRENT_SECTOR", sectors[0]);
    }
  }
};

export default userSectors;
