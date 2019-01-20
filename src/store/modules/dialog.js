const dialog = {
  state: {
    show: true
  },
  mutations: {
    DIALOG_CLOSE(state) {
      state.show = false;
    },
  },
  actions: {}
};

export default dialog;
