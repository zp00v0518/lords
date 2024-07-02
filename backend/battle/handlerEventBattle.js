import updateDB from '../workWithMongoDB/updateDB.js';
const update = new updateDB();
import { createBackToTownEvent } from '../events/createEvents.js';
import { addEventToDB } from '../events/db.js';
import { getHeroesFromDB, updateHeroInDB } from '../heroes/db.js';
import Battle from './Battle.js';
import calculateBattle from './calculateBattle.js';
import setUnitsAfterBattle from './setUnitsAfterBattle.js';
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
