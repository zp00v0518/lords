import updateHeroInDB from './updateHeroInDB.js';

async function heroActivate(serverName, heroId) {
  const result = await updateHeroInDB(serverName, heroId, { active: true });
  return result;
}

module.exports = heroActivate;

export default heroActivate
