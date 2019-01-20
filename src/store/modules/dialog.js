const dialog = {
  state: {
    show: false,
    data: {},
    title: "",
    component: ''
  },
  mutations: {
    DIALOG_CLOSE(state) {
      state.show = false;
    },
    DIALOG_SHOW(state, payload) {
      state.show = true;
      state.data = payload.data;
      state.title = payload.title;
      state.component = payload.component;
    }
  },
  actions: {}
};

export default dialog;
