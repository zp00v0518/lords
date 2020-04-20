import modules from './modules';
let stateCount = 0;
class WS {
  init(wsAddr, store) {
    window.stateCount = stateCount;
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
      buyUnits: eventData => this.buyUnits(eventData),
      updateArmyOnRegion: eventData => this.updateArmyOnRegion(eventData)
    };
    this.outgoing = {};
    this.timerId = null;
  }
  connectionToWs(wsAddr) {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => {
      console.log(`WebSocket open in ${wsAddr}`);
      this.is = true;
      // this.store.dispatch('getData')
    };

    this.wsInstance.onmessage = event => {
      this.store.commit('INCREMENT');
      const data = JSON.parse(event.data);
      console.log(`Входящий запрос: ${data.type}`);
      if (data.status === true) {
        if (this.incoming[data.type]) {
          this.incoming[data.type](data);
        }
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
    this.wsInstance.onclose = e => {
      this.timerId = setTimeout(() => {
        this.connectionToWs(wsAddr);
      }, 1000 * 10);
    };
  }
  moveGlobalMap(eventData) {
    this.store.commit('SET_CURRENTMAP', eventData);
  }
  startMessages(eventData) {
    console.log(eventData);
    this.store.commit('CHOICE_RASE', { status: false });
    this.store.commit('START_MESSAGES', eventData);
    this.store.commit('SET_CURRENTMAP', eventData);
    this.store.dispatch('SET_DATA_CONNECTION', eventData.sectors);
    this.store.commit('SET_CURRENT_REGION', eventData.sectors[0].region);
    this.store.commit('SET_DICTIONARY', eventData.dictionary);
    this.store.commit('SET_EVENTS', eventData.eventsList);
    this.store.commit('SET_HEROES_LIST', eventData.heroesList);
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

  choicesRace(message) {
    this.store.commit('CHOICE_RASE', { status: true });
  }

  reload() {
    console.log('reload');
    location.reload();
  }
  controlState(eventData) {
    window.stateCount++;
    this.store.dispatch('SET_SECTORS_WITH_CURRENT_SECTOR', eventData.sectors);
    this.store.commit('SET_EVENTS', eventData.eventsList);
    this.store.commit('SET_HEROES_LIST', eventData.heroesList);
  }
  setEvents(eventData) {
    this.store.commit('SET_EVENTS', eventData.eventsList);
  }

  consoles(e) {
    console.log(e);
  }
  get(e) {
    const { wsInstance } = this;
    const { type } = e;
    return new Promise(resolve => {
      wsInstance.send(JSON.stringify(e));
      wsInstance.addEventListener('message', handler);
      function handler(res) {
        const data = JSON.parse(res.data);
        if (data.type === type) {
          wsInstance.removeEventListener('message', handler);
          resolve(data);
        }
      }
    });
  }
  upgradeBuilding = modules.upgradeBuilding;
  buyUnits = modules.buyUnits;
  battleRequest = modules.battleRequest;
  updateArmyOnRegion = modules.updateArmyOnRegion;
}
export default WS;
