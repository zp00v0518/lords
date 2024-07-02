import { Race } from '../../race/index.js'
const race = Race;

function getParamsForFinish(eventData) {
  const indexRace = eventData.init.race;
  const raceName = race.typeList[indexRace];
  const buildName = eventData.data.type;
  const nextLvl = eventData.data.nextLvl;
  const buildingInfo = race[raceName].buildings[buildName];
  return {
    nextLvl,
    buildingInfo
  };
}
export default getParamsForFinish;
