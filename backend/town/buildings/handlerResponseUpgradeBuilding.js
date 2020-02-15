const { checkSchema, redirectMessage, gloss } = require("../../tube");
const { Race } = require("../../race");
const { checkSource, deleteSource } = require("../../resources");
const Town = require("../Town");
const setUpUpgradeChange_building = require("./setUpUpgradeChange_building");

function handlerResponseUpgradeBuilding(message, info) {
  const data = message.data;
  const ws = info.player.ws;

  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }

  const sector = info.player.sectors[data.sectorIndex];
  if (!sector) {
    redirectMessage(ws);
    return;
  }
  const typeBuilding = data.building.type;
  const raceName = Race.typeList[sector.town.race];
  const race = Race[raceName];
  const building = sector.town[typeBuilding];
  if (!building) {
    redirectMessage(ws);
    return;
  }
  const lvl = building.lvl;
  const build_for_upgrade = race.buildings[typeBuilding].lvl[lvl + 1];
  const response = {
    type: "upgradeBuilding",
    status: true,
    upgrade: false,
    message: ""
  };
  const lang = info.player.user.lang;
  if (!build_for_upgrade) {
    response.message = gloss.dialog.maxLvl[lang];
    ws.send(JSON.stringify(response));
    return;
  }
  const price = build_for_upgrade.price;
  const storage = sector.town.storage;
  const persent = data.persent;
  const price_for_upgrade = Town.getResourcesForUpgrade(price, persent);
  const qwer = {
    message,
    info,
    building,
    race,
    sector,
    gloss
  };
  if (checkSource(price_for_upgrade, storage.sources)) {
    const time_in_gold = gameVariables.resources.getInGold(price);
    const sec = gameVariables.time.sec;
    const seconds = sec / gameVariables.time.speedGame;
    const time_for_upgrade = Town.getTimeForUpgrade(
      time_in_gold * seconds,
      persent
    );
    setUpUpgradeChange_building({ building, time_for_upgrade, sector, info })
      .then(result => {
        response.storage = deleteSource(price_for_upgrade, storage);
        response.upgrade = true;
        response.message = gloss.dialog.upgradeDone[lang];
        response.sectorIndex = data.sectorIndex;
        response.eventsList = info.player.eventsList;
        ws.send(JSON.stringify(response));
      })
      .catch(err => console.log(err));
    qwer.time_for_upgrade = time_for_upgrade;
    // ws.send(JSON.stringify(qwer));
  } else {
    response.message = gloss.dialog.notResources[lang];
    ws.send(JSON.stringify(response));
  }
}

module.exports = handlerResponseUpgradeBuilding;

const schema = {
  building: { type: "object" }, // здесь может отвалится схема. Нужно добавить поле fields
  type: { type: "string", regExp: /^[a-z_0-9]{4,9}$/gi },
  persent: { type: "number", min: 70, max: 130 },
  sectorIndex: { type: "number", min: 0 }
};
