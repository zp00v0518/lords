const config = require('../config');
const { time } = config;

const ZoneControl = {
  computedTime: (time.day * 4) / time.speedGame,
  stepArea: 20000
};

module.exports = ZoneControl;
