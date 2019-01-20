const dialog = {
  state: {
    show: true,
    data: {},
    title: "",
  },
  mutations: {
    DIALOG_CLOSE(state) {
      state.show = false;
    },
    DIALOG_SHOW(state, payload) {
      state.show = true;
      state.data = payload.data;
      state.title = payload.title;
    }
  },
  actions: {}
};

export default dialog;
