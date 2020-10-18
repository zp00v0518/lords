const Event = {
  types: {
    hiringUnits: 'hiringUnits',
    battle: 'battle',
    upgradeRegion: 'upgradeRegion',
    upgradeTown: 'upgradeTown',
    backToTown: 'backToTown',
    buildNewTown: 'buildNewTown',
    heroTransfer: 'heroTransfer',
    sendCaravan: 'sendCaravan',
    caravanBackToTown: 'caravanBackToTown',
    goToCoords: 'goToCoords',
    attackEnemyRegion: 'attackEnemyRegion'
  },
  mode: {
    global: 'global',
    region: 'region',
    hidden: 'hidden'
  }
};

module.exports = Event;
