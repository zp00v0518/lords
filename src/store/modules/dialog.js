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
      state.title = "";
      state.component = "";
      state.data = {};
    },
    DIALOG_SHOW(state, payload) {
      const type = payload.type
      state.show = true;
      state.data = payload.data;
      state.title = payload.title;
      state.component = payload.componentName;
    }
  },
  actions: {
    DIALOG_SHOW({commit}, payload){
      commit("DIALOG_CLOSE");
      commit("DIALOG_SHOW", payload);
    }
  }
};

export default dialog;


const typeDialog = {
  upgradeRegion: "UpgradeRegion",
  message: "Message"
}