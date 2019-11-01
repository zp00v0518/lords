const race = require('../../race').Race;

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
module.exports = getParamsForFinish;
