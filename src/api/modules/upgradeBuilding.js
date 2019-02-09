
export default function upgradeBuilding(data) {
  if (!data.upgrade) {
    const message = {
      type: 'message',
      data: {
        txt: data.message,
      }
    }
    this.store.commit("DIALOG_SHOW", message)
  }
}