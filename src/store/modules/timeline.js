import { deepClone } from "../../utils";

const timeline = {
  state: {
    eventsList: []
  },
  mutations: {
    SET_EVENTS(state, payload) {
      state.eventsList = deepClone(payload);
    },
    UPDATE_EVENTS(state) {
      state.eventsList = deepClone(state.eventsList);
    }
  }
};

export default timeline;
