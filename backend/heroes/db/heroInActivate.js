import updateHeroInDB from './updateHeroInDB.js';

async function heroInActivate(serverName, heroId) {
  const result = await updateHeroInDB(serverName, heroId, { active: false });
  return result;
}

export default heroInActivate;
