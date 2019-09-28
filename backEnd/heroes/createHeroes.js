const types = require('./types');
const setProgress = require('./types/setProgress');

function createHeroes({type, progress, img, name}){
  const heroes = {
    name,
    progress: setProgress(progress),
    img: {
      name: img
    }
  }
  Object.assign(heroes, types[type])
  return heroes;
}

module.exports = createHeroes;
