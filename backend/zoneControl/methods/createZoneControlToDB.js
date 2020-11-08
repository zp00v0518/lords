const ZoneControl = require('../ZoneControl');

function createZoneControlToDB() {
  const size = ZoneControl.computedDays;
  return {
    lastIndex: 0,
    lastDate: new Date(),
    size: 0,
    days: Array.from(Array(size)).map(() => 0),
    userId: '',
    color: '',
    values: {}
  };
}

module.exports = createZoneControlToDB;
