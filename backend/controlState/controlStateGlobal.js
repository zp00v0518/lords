const serverList = gameVariables.serverList;
const { calcStorageNowValue, controlSatateEventsList } = require("../tube.js");
const { globalCalcUnit } = require("../army");
const controlEvent = require('../events/controlEvent');
const template = require("template_func");
const log = new template.Log(__filename);

function controlStateGlobal(param) {
  if (param.target === "all") {
    serverList.forEach(item => {
      const userServer = item.collectionName;
      Object.keys(UserOnline[userServer]).forEach(key => {
        if (key === "count") return;
        const userInOnline = UserOnline[userServer][key];
        const sectors = userInOnline.sectors;
        const ws = userInOnline.ws;
        // controlSatateEventsList(userInOnline.eventsList);
        controlEvent(userServer);
        sectors.forEach(sector => {
          calcStorageNowValue(sector.town.storage);
          globalCalcUnit(sector.town);
        });
        const response = {
          type: "controlState",
          status: true,
          sectors: sectors,
          eventsList: userInOnline.eventsList,
          heroesList: userInOnline.heroesList
        };
        // log.log(ws.readyState)
        ws.send(JSON.stringify(response));
      });
    });
  }
}

module.exports = controlStateGlobal;
