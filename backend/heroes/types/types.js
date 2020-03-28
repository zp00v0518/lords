const setProgress = require('./setProgress');

class TypesHeroes {
  constructor(type, stat, progress) {
    this.type = type;
    this.stat = {
      atack: stat[0] || 0,
      def: stat[1] || 0,
      magic: stat[2] || 0
    };
    this.progress = setProgress(progress);
  }
}
const list = ['warrior', 'defender', 'wizard'];

const types = {
  list
};

(function createTypes() {
  list.forEach((type, index) => {
    if (index === 0) {
      types[type] = new TypesHeroes(type, [3, 2, 0], [50, 30, 20]);
      return;
    }
    if (index === 1) {
      types[type] = new TypesHeroes(type, [1, 3, 1], [20, 50, 30]);
      return;
    }
    if (index === 2) {
      types[type] = new TypesHeroes(type, [0, 2, 3], [20, 30, 50]);
      return;
    }
  });
})();

module.exports = types;
