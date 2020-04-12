const { checkSchema } = require('../../template_modules');
const { redirectMessage, sendWSMessage } = require('../../wsServer');
const { getHeroesFromDB } = require('../../heroes/db');
const { Resources, deleteSource } = require('../../resources');
const { Town, updateStateTown, getOneTownFromDB } = require('../../town');
const setEventForBuildNewTown = require('./setEventForBuildNewTown');

async function handlerBuildNewTownRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const allSectors = info.player.sectors;
  const curSector = allSectors[data.sectorIndex];
  if (!curSector) {
    redirectMessage(ws);
    return;
  }
  const { serverName } = curSector;

  const response = {
    status: false,
    type: message.type,
    data: {}
  };
  try {
    const targetSector = await getOneTownFromDB(serverName, data.targetSector);
    if (!targetSector || targetSector.town) {
      redirectMessage(ws);
    }

    const sector = await getOneTownFromDB(serverName, curSector._id);
    if (!sector) {
      redirectMessage(ws);
      return;
    }
    const sourseForBuild = Town.getSourceForNewTown(allSectors.length + 1);
    let storage = sector.town.storage;
    const haveSource = Resources.checkSource(sourseForBuild, storage.sources);
    if (!haveSource) {
      redirectMessage(ws);
      return;
    }

    const { heroId } = data;
    const heroes_in_town = sector.heroes;
    if (!heroes_in_town || !heroes_in_town.some(i => i.toString() === heroId)) {
      redirectMessage(ws);
      return;
    }

    // необходимость получения героя из БД под вопросом
    const hero = await getHeroesFromDB(serverName, { heroId });
    if (!hero.active) {
      redirectMessage(ws);
      return;
    }
    const event = await setEventForBuildNewTown(sector, targetSector, hero);
    storage = deleteSource(sourseForBuild, storage);
    const updateTownResult = await updateStateTown(sector);
    response.data.targetSector = targetSector;
    response.data.hero = hero;
    response.data.sector = sector;
    response.data.sourseForBuild = sourseForBuild;
    response.data.event = event;
    sendWSMessage(ws, response);
  } catch (err) {
    console.log(err);
    redirectMessage(ws);
  }
}

const schema = {
  heroId: { type: 'string', regExp: /^.{13,}\b/g },
  targetSector: { type: 'string', regExp: /^.{13,}\b/g },
  sectorIndex: { type: 'number', min: 0 }
};
module.exports = handlerBuildNewTownRequest;
