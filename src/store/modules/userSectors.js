import Vue from 'vue';

const userSectors = {
  state: {
    sectors: null,
    currentSector: null,
    changeSectors: false
  },
  mutations: {
    SET_SECTORS(state, sectors) {
      Vue.set(state, 'sectors', [...sectors]);
    },
    SET_CURRENT_SECTOR(state, sector) {
      Vue.set(state, 'currentSector', sector);
    },
    CHANGE_STORAGE(state, payload) {
      state.sectors[payload.sectorIndex].town.storage = payload.storage;
      Vue.set(state, 'sectors', [...state.sectors]);
    }
  },
  actions: {
    SET_DATA_CONNECTION({ commit }, sectors) {
      commit('SET_SECTORS', sectors);
      commit('SET_CURRENT_SECTOR', sectors[0]);
    },
    SET_SECTORS_WITH_CURRENT_SECTOR(state, sectors) {
      const id = state.state.currentSector._id;
      for (let i = 0; i < sectors.length; i++) {
        if (sectors[i]._id === id) {
          state.commit('SET_CURRENT_SECTOR', sectors[i]);
          break;
        }
      }
      state.commit('SET_SECTORS', sectors);
    }
  }
};

export default userSectors;
