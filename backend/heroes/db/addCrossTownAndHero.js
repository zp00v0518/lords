import addHeroToTown from './addHeroToTown.js';
import addTownToHero from './addTownToHero.js';

async function addCrossTownAndHero(serverName, townId, heroId) {
  const z = await addTownToHero(serverName, townId, heroId);
  const x = await addHeroToTown(serverName, townId, heroId);
  return { addHeroResult: x, addTownResult: z };
}

export default addCrossTownAndHero;
