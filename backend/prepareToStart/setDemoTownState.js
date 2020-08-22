const createTown = require('../town/createTown');

function setDemoTownState(demoUser) {
  const newTown = createTown({ status: 'first' });
  delete newTown.regionMap;
  if (demoUser.town) {
    Object.keys(demoUser.town).forEach(key => {
      newTown[key] = demoUser.town[key];
    });
  }
  return newTown;
}

module.exports = setDemoTownState;
