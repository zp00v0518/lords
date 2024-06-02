const updateHeroInDB = require('./updateHeroInDB');

async function heroInActivate(serverName, heroId) {
  const result = await updateHeroInDB(serverName, heroId, { active: false });
  return result;
}

module.exports = heroInActivate;
