const types = require('./types');
const setProgress = require('./types/setProgress');

function createHeroes({type, progress, img, name}){
  const heroes = {
    name,
    ...types[type],
    progress: setProgress(progress),
    img: {
      name: img
    }
  }
  return heroes;
}

module.exports = createHeroes;
