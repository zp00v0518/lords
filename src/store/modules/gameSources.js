import Vue from "vue";

const gameSources = {
  state: {},
  mutations: {
    SET_GAME_SOURCES(state, sources) {
      Object.keys(sources).forEach(key => {
        const item = sources[key];
        Vue.set(state, key, item);
      });
    }
  }
};

export default gameSources;
