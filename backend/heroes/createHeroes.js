import types from './types/index.js';

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

export default createHeroes;
