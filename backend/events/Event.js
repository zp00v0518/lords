const Event = {
  types: {
    hiringUnits: 'hiringUnits',
    battle: 'battle',
    upgradeRegion: 'upgradeRegion',
    upgradeTown: 'upgradeTown',
    backToTown: 'backToTown',
    buildNewTown: 'buildNewTown',
    heroTransfer: 'heroTransfer'
  },
  mode: {
    global: 'global',
    region: 'region',
    hidden: 'hidden'
  }
};

module.exports = Event;
