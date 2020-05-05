const game_variables = require('../variables/game_variables');

const types = {
  empty: {
    id: 0
  },
  town: {
    id: 1
  },
  nishtyak: {
    id: 2
  }
};

class WorldMap {
  constructor(types, vars) {
    this.types = types;
    this.numSectionGlobalMap = vars.numSectionGlobalMap;
    this.heroMoveOnGlobalMap = vars.timer.heroMoveOnGlobalMap;
  }
  getTimeMoveOnMap(init, target, options = {}) {
    const x1 = init.x;
    const y1 = init.y;
    const x2 = target.x;
    const y2 = target.y;
    const distance = this.getDistanceOnMap(x1, y1, x2, y2);
    let time = distance * this.heroMoveOnGlobalMap;
    if (options.hero && options.hero.army.length === 0) {
      time = time / 4;
    }
    return Math.round(time);
  }
  // аналог getShortDistanceOnMap
  getDistanceOnMap(x1, y1, x2, y2) {
    const size = this.numSectionGlobalMap;
    const clamp = v => (v > size / 2 ? size - v : v);
    const dx = clamp(Math.abs(x1 - x2));
    const dy = clamp(Math.abs(y1 - y2));
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }
}

module.exports = new WorldMap(types, game_variables);
