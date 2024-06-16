import { deepClone } from '../../utils';

const user = {
  state: {
    id: null,
    user: {}
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.id = id;
    },
    SET_USER_IN_STORE(state, user) {
      state.user = deepClone(user);
    }
  },
  getters: {
    getUserColor: state => {
      return state.user.color;
    }
  }
};

export default user;
