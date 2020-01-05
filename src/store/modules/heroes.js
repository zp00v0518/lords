const heroes = {
  state: {
    heroesList: []
  },
  mutations: {
    SET_HEROES_LIST(state, allheroes) {
      state.heroesList = allheroes;
    }
  },
  actions: {},
  getters: {
    getHeroesFromTown: state => townId => {
      if (!townId) return [];
      return state.heroesList.filter(heroes => heroes.townId === townId);
    }
  }
};

export default heroes;
