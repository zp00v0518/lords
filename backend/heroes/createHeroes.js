import types from './types/index.js';

function createHeroes({ type, img, name, race, appName }) {
  const heroes = {
    name,
    img,
    race,
    active: true,
    appName,
  };
  Object.assign(heroes, types[type]);
  return heroes;
}

export default createHeroes;
