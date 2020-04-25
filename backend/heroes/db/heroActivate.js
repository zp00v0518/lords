const updateHeroInDB = require('./updateHeroInDB');

async function heroActivate(serverName, heroId) {
  const result = await updateHeroInDB(serverName, heroId, {active: true});
  return result;
}

module.exports = heroActivate;
