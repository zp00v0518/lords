class WS {
  init(wsAddr, store) {
    this.connectionToWs(wsAddr);
    this.store = store || null;
    this.incoming = {
      chatMessage: eventData => this.chatMessage(eventData),
      startMessages: eventData => this.startMessages(eventData),
      change: eventData => this.change(eventData)
    };
    this.outgoing = {};
  }
  connectionToWs(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => {
      console.log(`WebSocket open in ${wsAddr}`);
      this.is = true;
      // this.store.dispatch('getData')
    };
    this.wsInstance.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.status === "success") {
        this.incoming[data.type](data);
      } else {
        if (data.redirectUrl) {
          location = data.redirectUrl
        } else {
          console.log(data)
        }
      }
    };
  }
  startMessages(eventData) {
    console.log(eventData);
    this.store.commit("START_MESSAGES", eventData);
  }
  chatMessage(eventData) {
    this.store.commit("UNSHIFT_MESSAGE", eventData);
  }
  sendMessage(message) {
    this.wsInstance.send(JSON.stringify(message));
  }
  change() {
    location.reload();
  }
}
export default WS;
