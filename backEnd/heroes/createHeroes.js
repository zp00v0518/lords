const types = require('./types');
const setProgress = require('./types/setProgress');

function createHeroes({ type, img, name }) {
  const heroes = {
    name,
    img
  };
  Object.assign(heroes, types[type]);
  return heroes;
}

module.exports = createHeroes;
