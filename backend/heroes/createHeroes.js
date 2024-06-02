const types = require('./types');

function createHeroes({ type, img, name, race }) {
  const heroes = {
    name,
    img,
    race,
    active: true
  };
  Object.assign(heroes, types[type]);
  return heroes;
}

module.exports = createHeroes;
