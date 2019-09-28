const types = require('./types');
const rampart = require('./rampart');

const Heroes = {
  types,
  races: {
    rampart
  },
  getHeroes(race_name) {
    const { races } = this;
    if (race_name) {
      return getHeroesForOnRace(races[race_name]);
    }
    const result = Object.keys(races).reduce((accum, key) => {
      const race = races[key];
      const arr = getHeroesForOnRace(race);
      accum.push(...arr);
      return accum;
    }, []);
    return result;
    function getHeroesForOnRace(race) {
      return Object.values(race);
    }
  }
};

module.exports = Heroes;
