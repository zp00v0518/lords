const template = require('template_func');
const console = new template.Log(__filename);
const upValueInStorage = require('../../town/storage/upValueInStorage');
const { updateStateTown } = require('../../town/DB');
const { inActiveteEvent } = require('../../events/db');
const { updateStateRegion } = require('../../region/db');

async function handlerStopMineEvent(event, sector) {
  const { data } = event;
  const { mineCoords } = data;
  const region = sector.region;
  const mine = region[mineCoords.x][mineCoords.y].sector;
  const workSection = mine.work;
  const { storage } = sector.town;
  upValueInStorage(mine.type, workSection.addValue, storage);
  workSection.is = true;
  workSection.date = 0;
  await updateStateTown(sector);
  await updateStateRegion(sector);
  await inActiveteEvent(event);
}

module.exports = handlerStopMineEvent;
