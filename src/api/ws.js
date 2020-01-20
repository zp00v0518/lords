import modules from "./modules";

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
      choicesRace: eventData => this.choicesRace(eventData),
      buyUnits: eventData => this.buyUnits(eventData)
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
      console.log(`Входящий запрос: ${data.type}`);
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
    this.store.commit("SET_CURRENTMAP", eventData);
  }
  startMessages(eventData) {
    console.log(eventData);
    this.store.commit("CHOICE_RASE", { status: false });
    this.store.commit("START_MESSAGES", eventData);
    this.store.commit("SET_CURRENTMAP", eventData);
    this.store.dispatch("SET_DATA_CONNECTION", eventData.sectors);
    // this.store.commit("SET_CURRENT_REGION", eventData.sectors[0]);
    this.store.commit("SET_DICTIONARY", eventData.dictionary);
    this.store.commit("SET_EVENTS", eventData.eventsList);
    this.store.commit("SET_HEROES_LIST", eventData.heroes);
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

  choicesRace(message) {
    this.store.commit("CHOICE_RASE", { status: true });
  }

  reload() {
    console.log("reload");
    location.reload();
  }
  controlState(eventData) {
    this.store.dispatch("SET_SECTORS_WITH_CURRENT_SECTOR", eventData.sectors);
    this.store.commit("SET_EVENTS", eventData.eventsList);
  }
  setEvents(eventData) {
    this.store.commit("SET_EVENTS", eventData.eventsList);
  }

  consoles(e) {
    console.log(e);
  }
  get(e) {
    const { wsInstance } = this;
    const { type } = e;
    return new Promise((resolve, reject) => {
      wsInstance.send(JSON.stringify(e));
      wsInstance.addEventListener("message", res => {
        const data = JSON.parse(res.data);
        if (data.type === type) {
          resolve(data);
        }
      });
    });
  }
  upgradeBuilding = modules.upgradeBuilding;
  buyUnits = modules.buyUnits;
}
export default WS;
