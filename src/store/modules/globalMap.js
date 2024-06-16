import { deepClone } from "../../utils";

const globalMap = {
  state: {
    currentMap: [],
    zoom: 1
  },
  mutations: {
    SET_CURRENTMAP(state, payload) {
      state.currentMap = deepClone(payload.currentMap);
    },
    CHANGE__ZOOM(state) {
      state.zoom = state.zoom === 1 ? 2 : 1;
    }
  },
  actions: {}
};

export default globalMap;
