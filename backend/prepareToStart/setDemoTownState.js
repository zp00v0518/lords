function setDemoTownState(demoTown, baseTown) {
  Object.keys(demoTown).forEach(key => {
    baseTown[key] = demoTown[key];
  });
}

module.exports = setDemoTownState;
