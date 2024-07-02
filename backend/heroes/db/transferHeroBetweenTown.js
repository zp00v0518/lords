import addHeroToTown from './addHeroToTown.js';
import addTownToHero from './addTownToHero.js';
import removeHeroFromTown from './removeHeroFromTown.js';

async function transferHeroBetweenTown(serverName, heroId, initId, targetId) {
  let flag = await removeHeroFromTown(serverName, initId, heroId);
  flag = await addHeroToTown(serverName, targetId, heroId);
  flag = await addTownToHero(serverName, targetId, heroId);
  return flag;
}

export default transferHeroBetweenTown
