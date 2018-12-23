class WS {
  init(wsAddr, store) {
    this.connectionToWs(wsAddr);
    this.store = store || null;
    this.incoming = {
      chatMessage: eventData => this.chatMessage(eventData),
      startMessages: eventData => this.startMessages(eventData)
    };
    this.outgoing = {};
  }
  connectionToWs(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => {
      console.log(`WebSocket open in ${wsAddr}`);
      // this.store.dispatch('getData')
    };
    this.wsInstance.onmessage = event => {
      const data = JSON.parse(event.data);
      this.incoming[data.type](data);
    };
  }
  startMessages(eventData) {
    this.store.commit("START_MESSAGES", eventData);
  }
  chatMessage(eventData) {
    this.store.commit("UNSHIFT_MESSAGE", eventData);
  }
  sendMessage(message) {
    console.log(message);
    this.wsInstance.send(JSON.stringify(message));
  }
}
export default WS;
