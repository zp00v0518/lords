const upValueInStorage = require('../upValueInStorage');

function reduceGrowthResources(mines, storage) {
  mines.forEach(mine => {
    const typeSource = mine.sector.type;
    const addValue = mine.sector.work.addValue;
    upValueInStorage(typeSource, -addValue, storage);
  });
}

module.exports = reduceGrowthResources;
