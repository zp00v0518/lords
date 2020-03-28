const types = require('./types');
const rampart = require('./rampart');
const gameVariables = require('../variables/game_variables.js');
const { getLengthBeetweenTwoPoint } = require('../template_modules/phisicFunc');

const Heroes = {
  types,
  heroMove: gameVariables.timer.heroMove,
  races: {
    rampart
  },
  role: {
    atack: 'atack',
    def: 'def'
  },
  coeff: {
    atack: 0.05,
    def: 0.05
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
  getOneHero(race_name, type) {
    const allHeroes = this.getHeroes(race_name);
    return allHeroes.find(item => item.type === type);
  },
  getHeroImg(race_name, type, type_img = 'ava') {
    if (!window) {
      console.log(`${this.getHeroImg.name}: this method for only frontend`);
      return;
    }
    const hero = this.getOneHero(race_name, type);
    const imgInfo = hero.img;
    const dir = imgInfo[type_img].dir;
    const base = imgInfo[type_img].base;
    return `./${dir}/${base}`;
  },
  checkHeroesInRace(race_name, type) {
    if (race_name === undefined || type === undefined) {
      console.log('checkHeroesInRace: inncorrect arguments');
      return false;
    }
    const { races } = this;
    const heroes_in_race = races[race_name];
    if (!heroes_in_race) return false;
    const result = Object.keys(heroes_in_race).some(key => {
      const item = heroes_in_race[key];
      return item.type === type;
    });
    return result;
  },
  getTimeMove(start, end, time = this.heroMove) {
    const length = getLengthBeetweenTwoPoint(start.x, start.y, end.x, end.y);
    const result = length * (time / gameVariables.time.speedGame);
    return +result.toFixed();
  },
  getHeroBonus(hero, role = this.role.atack) {
    if (!hero) return 0;
    if (role === this.role.atack) {
      return hero.stat.atack * this.coeff.atack;
    } else if (role === this.role.def) {
      return hero.stat.def * this.coeff.def;
    }
  }
};
module.exports = Heroes;
