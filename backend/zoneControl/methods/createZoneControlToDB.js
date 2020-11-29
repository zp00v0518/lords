function createZoneControlToDB() {
  return {
    lastDate: new Date(),
    power: 0,
    userId: '',
    color: '',
    values: {}
  };
}

module.exports = createZoneControlToDB;
