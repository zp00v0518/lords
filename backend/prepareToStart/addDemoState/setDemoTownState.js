const createTown = require('../../town/createTown');

function setDemoTownState(demoUser) {
  const newTown = createTown({ status: 'first' });
  if (demoUser.town) {
    Object.keys(demoUser.town).forEach(key => {
      newTown[key] = demoUser.town[key];
    });
  }
  return newTown;
}

module.exports = setDemoTownState;
