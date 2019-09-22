import modules from './modules';

class WS {
  init(wsAddr, store) {
    this.connectionToWs(wsAddr);
    this.store = store || null;
    this.incoming = {
      chatMessage: eventData => this.chatMessage(eventData),
      startMessages: eventData => this.startMessages(eventData),
      reload: eventData => this.reload(eventData),
      moveGlobalMap: eventData => this.moveGlobalMap(eventData),
      upgradeBuilding: eventData => this.upgradeBuilding(eventData),
      controlState: eventData => this.controlState(eventData),
      consoles: eventData => this.consoles(eventData),
      setEvents: eventData => this.setEvents(eventData),
      choiceHeroes: eventData => this.choiceHeroes(eventData)
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
          console.log(data);
          // eslint-disable-next-line
          location = data.redirectUrl;
        } else {
          console.log(data);
        }
      }
    };
  }
  moveGlobalMap(eventData) {
    this.store.commit('SET_CURRENTMAP', eventData);
  }
  startMessages(eventData) {
    console.log(eventData);
    this.store.commit('START_MESSAGES', eventData);
    this.store.commit('SET_CURRENTMAP', eventData);
    this.store.dispatch('SET_DATA_CONNECTION', eventData.sectors);
    // this.store.commit("SET_CURRENT_REGION", eventData.sectors[0]);
    this.store.commit('SET_DICTIONARY', eventData.dictionary);
    this.store.commit('SET_EVENTS', eventData.eventsList);
  }
  chatMessage(eventData) {
    this.store.commit('UNSHIFT_MESSAGE', eventData);
  }
  sendMessage(message) {
    this.wsInstance.send(JSON.stringify(message));
  }
  sendChatMessage(message) {
    message.type = 'chatMessage';
    this.sendMessage(message);
  }

  choiceHeroes(message) {
    this.store.commit('CHOICHE_HEROES', {status: true})
  }

  reload() {
    location.reload();
  }
  controlState(eventData) {
    this.store.dispatch('SET_SECTORS_WITH_CURRENT_SECTOR', eventData.sectors);
    this.store.commit('SET_EVENTS', eventData.eventsList);
  }
  setEvents(eventData) {
    this.store.commit('SET_EVENTS', eventData.eventsList);
  }

  consoles(e) {
    console.log(e);
  }
  upgradeBuilding = modules.upgradeBuilding;
}
export default WS;
