import upValueInStorage from '../upValueInStorage.js';

function reduceGrowthResources(mine, storage) {
  const typeSource = mine.sector.type;
  const addValue = mine.sector.work.addValue;
  upValueInStorage(typeSource, -addValue, storage);
  // mines.forEach(mine => {
  //   const typeSource = mine.sector.type;
  //   const addValue = mine.sector.work.addValue;
  //   upValueInStorage(typeSource, -addValue, storage);
  // });
}

export default reduceGrowthResources;
