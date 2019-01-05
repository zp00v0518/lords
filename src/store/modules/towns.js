const towns = {
  state: {
    towns: [],
    currentTown: {},
    },
  mutations: {
    SET_TOWNS(state, towns) {
      state.towns = towns;
    },
  },
  actions: {}
}

export default towns;
