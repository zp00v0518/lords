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
  },
  getOneHero(race_name, type){
    const allHeroes = this.getHeroes(race_name);
    return allHeroes.find(item => item.type === type);
  },
  checkHeroesInRace(race_name, type){
    if (race_name  === undefined || type === undefined){
      console.log("checkHeroesInRace: inncorrect arguments")
      return false;
    }
    const { races } = this;
    const heroes_in_race = races[race_name];
    if(!heroes_in_race) return false;
    const result = Object.keys(heroes_in_race).some(key => {
      const item = heroes_in_race[key];
      return item.type === type
    });
    return result;
  }
};
module.exports = Heroes;
