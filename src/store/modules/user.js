const user = {
  state: {
    id: null
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.id = id;
    }
  }
};

export default user;
