import Vue from "vue";
import { deepClone } from "../../utils";

const userSectors = {
  state: {
    sectors: [],
    currentSector: 0,
    changeSectors: false
  },
  mutations: {
    SET_SECTORS(state, sectors) {
      state.sectors = deepClone(sectors);
    },
    SET_CURRENT_SECTOR(state, sectorIndex) {
      state.currentSector = sectorIndex;
    },
    CHANGE_STORAGE(state, payload) {
      state.sectors[payload.sectorIndex].town.storage = payload.storage;
      Vue.set(state, "sectors", [...state.sectors]);
    },
    UPDATE_TOWN_ARMY(state, payload) {
      const { sectorIndex, army } = payload;
      const sector = state.sectors[sectorIndex];
      if (sector) {
        sector.town.army.units = deepClone(army);
      } else {
        console.log("Сектор не найден");
      }
    }
  },
  actions: {
    SET_DATA_CONNECTION({ commit }, sectors) {
      commit("SET_SECTORS", sectors);
      commit("SET_CURRENT_SECTOR", 0);
    },
    SET_SECTORS_WITH_CURRENT_SECTOR(state, sectors) {
      const currIndex = state.state.currentSector;
      const id = state.state.sectors[currIndex]._id;
      const index = sectors.findIndex(i => i._id === id);
      if (index !== currIndex) {
        state.commit("SET_CURRENT_SECTOR", index);
      }
      state.commit("SET_SECTORS", sectors);
    }
  }
};

export default userSectors;
