const serverList = gameVariables.serverList;
const { calcStorageNowValue } = require("../tube.js");
const { globalCalcUnit } = require("../army");
const { formEventsList, controlStateEventsList } = require("../events");
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
        sectors.forEach(sector => {
          calcStorageNowValue(sector.town.storage);
          globalCalcUnit(sector.town);
        });
        controlStateEventsList(userServer).then(res => {
          formEventsList(userInOnline.user._id, userServer).then(listEvents => {
            const response = {
              type: "controlState",
              status: true,
              sectors: sectors,
              eventsList: listEvents,
              heroesList: userInOnline.heroesList
            };
            if (ws.readyState === 1) {
              ws.send(JSON.stringify(response));
            }
          });
        });
      });
    });
  }
}

module.exports = controlStateGlobal;
