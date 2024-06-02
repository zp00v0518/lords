const template = require('template_func');
const console = new template.Log(__filename);
const { updateDB } = require('../workWithMongoDB');
const update = new updateDB();
const { createBackToTownEvent } = require('../events/createEvents');
const { addEventToDB } = require('../events/db');
const { getHeroesFromDB, updateHeroInDB } = require('../heroes/db');
const Battle = require('./Battle');
const calculateBattle = require('./calculateBattle');
const setUnitsAfterBattle = require('./setUnitsAfterBattle');
const { Region, updateStateRegion } = require('../region');
const handlerAttackEnemyRegionEvent = require('./handlerAttackEnemyRegionEvent');
const { getLostArmyAfterBattle } = require('../army/methods');
const { getControlWeightFromArmy } = require('../zoneControl/methods');
const { setValueInSectorById } = require('../zoneControl/db');

async function handlerEventBattle(event, targetSector) {
  const { data, serverName } = event;
  if (data.typeBattle === Battle.types.region.name) {
    const hero = await getHeroesFromDB(serverName, { heroId: data.initHero });
    const { endCoords } = data;
    const tile = targetSector.region[endCoords.x][endCoords.y];
    const defArmy = tile.army;
    let atackArmy = data.army.army;
    const battleResult = calculateBattle(hero, atackArmy, defArmy);
    // передаю не армию героя, а армию из Eventa
    const armyAfterBattle = setUnitsAfterBattle(battleResult, atackArmy);
    const lostArmy = getLostArmyAfterBattle(atackArmy, armyAfterBattle.atackArmy);
    const lostWeight = getControlWeightFromArmy(lostArmy);
    await setValueInSectorById(serverName, targetSector._id, -lostWeight);
    atackArmy = armyAfterBattle.atackArmy.filter(i => i.count > 0);
    await updateHeroInDB(serverName, hero._id, { army: atackArmy });
    if (battleResult.atackWin) {
      tile.army = [];
      tile.type = Region.types.empty.id;
      updateStateRegion(targetSector);
    }
    const optionsForUpdate = {
      collectionName: event.serverName,
      filtr: { _id: event._id },
      updateDoc: { $set: { status: false } }
    };
    await update.one(optionsForUpdate);
    const backEvent = createBackToTownEvent(event);
    await addEventToDB(backEvent, event.serverName);
  } else if (data.typeBattle === Battle.types.enemyRegion.name) {
    await handlerAttackEnemyRegionEvent(event, targetSector);
  }
}

module.exports = handlerEventBattle;
