const addHeroToDB = require('./addHeroToDB');
const addHeroToTown = require('./addHeroToTown');
const addTownToHero = require('./addTownToHero');
const getHeroesFromDB = require('./getHeroesFromDB');
const updateHeroInDB = require('./updateHeroInDB');
const removeHeroFromTown = require('./removeHeroFromTown');
const transferHeroBetweenTown = require('./transferHeroBetweenTown');

module.exports = {
  addHeroToDB,
  addHeroToTown,
  addTownToHero,
  getHeroesFromDB,
  updateHeroInDB,
  removeHeroFromTown,
  transferHeroBetweenTown
};
