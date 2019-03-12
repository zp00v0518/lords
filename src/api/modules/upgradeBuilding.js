export default function upgradeBuilding(data) {
  if (!data.upgrade) {
    const message = {
      type: "message",
      data: {
        txt: data.message
      }
    };
    this.store.commit("DIALOG_SHOW", message);
  }
  if (data.upgrade) {
    const storageChange = {
      sectorIndex: data.sectorIndex,
      storage: data.storage,
    }
    this.store.commit("CHANGE_STORAGE", storageChange);
    this.store.commit('SET_EVENTS', data.eventsList);
    const message = {
      type: "message",
      data: {
        txt: data.message
      }
    };
    this.store.commit("DIALOG_SHOW", message);
  }
}
