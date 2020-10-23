const template = require("template_func");
const console = new template.Log(__filename);
const { getUsersTownFromDB } = require('../../town');
const { getSectorsForAttack, Region } = require('../../region');

async function handlerAttackEnemyRegionEvent(event, defTown) {
  const { serverName, init, data } = event;
  const initTowns = await getUsersTownFromDB(init.user, serverName);
  // TODO: подумать над действиями, когда, якобы, герой атакует собственный город;
  if (initTowns.find(i => i.id.toString() === defTown._id.toString())) return;
  const f = initTowns.filter(i => i.town.army.units.length > 0);
  const { goal } = data;
  const { coords } = goal;
  const targetSectors = getSectorsForAttack(coords, defTown.region);
  const mineId = Region.types.mine.id;
  const sectorsWithMine = targetSectors.filter(i => i.type === mineId);
  console.log(sectorsWithMine);
}

module.exports = handlerAttackEnemyRegionEvent;
