import { deepClone } from "../../utils";

const timeline = {
  state: {
    eventsList: []
  },
  mutations: {
    SET_EVENTS(state, payload) {
      state.eventsList = deepClone(payload);
      // state.eventsList = payload.map(item => item);
    },
    UPDATE_EVENTS(state) {
      state.eventsList = deepClone(state.eventsList);
      // state.eventsList = state.eventsList.map(item => item);
    }
  }
};

export default timeline;
