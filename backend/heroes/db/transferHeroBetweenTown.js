const addHeroToTown = require('./addHeroToTown');
const addTownToHero = require('./addTownToHero');
const removeHeroFromTown = require('./removeHeroFromTown');

async function transferHeroBetweenTown(serverName, heroId, initId, targetId) {
  let flag = await removeHeroFromTown(serverName, initId, heroId);
  flag = await addHeroToTown(serverName, targetId, heroId);
  flag = await addTownToHero(serverName, targetId, heroId);
  return flag;
}

module.exports = transferHeroBetweenTown;
