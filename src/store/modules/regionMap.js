import { deepClone } from "../../utils";

const regionMap = {
  state: {
    currentRegion: []
  },
  mutations: {
    SET_CURRENT_REGION(state, region) {
      state.currentRegion = deepClone(region);
    }
  },
  actions: {}
};

export default regionMap;
