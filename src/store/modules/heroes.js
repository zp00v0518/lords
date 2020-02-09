const heroes = {
  state: {
    heroesList: [],
    activeHeroId: ""
  },
  mutations: {
    SET_HEROES_LIST(state, allheroes) {
      state.heroesList = allheroes;
    },
    UPDATE_HERO_ARMY(state, data) {
      const { heroId, army } = data;
      const hero = state.heroesList.find(i => i._id === heroId);
      if (hero) {
        hero.army = army;
      } else {
        console.log("Герой не найден");
      }
    },
    SET_ACTIVE_HERO_ID(state, id) {
      console.log(id)
      state.activeHeroId = id;
    }
  },
  getters: {
    getHeroesFromTown: state => townId => {
      if (!townId) return [];
      return state.heroesList.filter(heroes => heroes.townId === townId);
    }
  }
};

export default heroes;
