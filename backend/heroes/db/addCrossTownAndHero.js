const addHeroToTown = require('./addHeroToTown');
const addTownToHero = require('./addTownToHero');

async function addCrossTownAndHero(serverName, townId, heroId) {
  const z = await addTownToHero(serverName, townId, heroId);
  const x = await addHeroToTown(serverName, townId, heroId);
  return { addHeroResult: x, addTownResult: z };
}

module.exports = addCrossTownAndHero;
