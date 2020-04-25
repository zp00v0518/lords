const Event = {
  types: {
    hiringUnits: 'hiringUnits',
    battle: 'battle',
    upgradeRegion: 'upgradeRegion',
    upgradeTown: 'upgradeTown',
    backToTown: 'backToTown',
    buildNewTown: 'buildNewTown'
  },
  mode: {
    global: 'global',
    region: 'region'
  }
};

module.exports = Event;
