class WS {
  init(wsAddr, store) {
    this.connectionToWs(wsAddr);
    this.store = store || null;
    this.incoming = {
      chatMessage: eventData => this.chatMessage(eventData),
      startMessages: eventData => this.startMessages(eventData),
      change: eventData => this.change(eventData),
      moveGlobalMap: eventData => this.moveGlobalMap(eventData)
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
      if (data.status === true) {
        this.incoming[data.type](data);
      } else {
        if (data.redirectUrl) {
          location = data.redirectUrl;
        } else {
          console.log(data);
        }
      }
    };
  }
  moveGlobalMap(eventData) {
    this.store.commit("SET_CURRENTMAP", eventData);
  }
  startMessages(eventData) {
    console.log(eventData);
    this.store.commit("START_MESSAGES", eventData);
    this.store.commit("SET_CURRENTMAP", eventData);
    this.store.dispatch("SET_DATA_CONNECTION", eventData.towns);
    // this.store.commit("SET_CURRENT_REGION", eventData.towns[0]);
    this.store.commit("SET_DICTIONARY", eventData.dictionary);
  }
  chatMessage(eventData) {
    this.store.commit("UNSHIFT_MESSAGE", eventData);
  }
  sendMessage(message) {
    this.wsInstance.send(JSON.stringify(message));
  }
  sendChatMessage(message) {
    message.type = "chatMessage";
    this.sendMessage(message);
  }

  change() {
    location.reload();
  }
}
export default WS;
