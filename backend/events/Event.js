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
    attackEnemyRegion: 'attackEnemyRegion',
    stopMine: 'stopMine'
  },
  mode: {
    global: 'global',
    region: 'region',
    hidden: 'hidden',
    system: 'system'
  }
};

module.exports = Event;
