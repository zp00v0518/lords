import gameEvent from '../Event.js';
const eventType = gameEvent.types;
import Town from '../../town/Town.js';
const buildings = Town.listBuildings;
import finishStorage from './finish_storage.js';
import finishHall from './finish_hall.js';
import finishBarraks from './finish_barraks.js';
import finish_hiring_units from './finish_hiring_units.js';
import { inActiveteEvent } from '../db/index.js';
import finishAttackEnemyRegion from './finishAttackEnemyRegion.js';

export default {
  [buildings.storage.name]: finishStorage,
  [buildings.hall.name]: finishHall,
  [buildings.barraks_1.name]: finishBarraks,
  [buildings.barraks_2.name]: finishBarraks,
  [buildings.barraks_3.name]: finishBarraks,
  [buildings.barraks_4.name]: finishBarraks,
  [buildings.barraks_5.name]: finishBarraks,
  [buildings.barraks_6.name]: finishBarraks,
  [buildings.barraks_7.name]: finishBarraks,
  [eventType.hiringUnits]: finish_hiring_units,
  inActiveteEvent,
  finishAttackEnemyRegion
};
