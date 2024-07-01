import config from '../config/config.js';
const { time } = config;

const ZoneControl = {
  computedTime: (time.day * 4) / time.speedGame,
  stepArea: 50000
};

export default ZoneControl;
