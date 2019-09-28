class TypesHeroes {
  constructor(type, stat) {
    this.type = type;
    this.stat = {
      attack: stat[0] || 0,
      def: stat[1] || 0,
      magic: stat[2] || 0
    };
  }
}
const list = ['warrior', 'defender', 'wizard'];

const types = {
  list
};

(function createTypes() {
  list.forEach((type, index) => {
    if (index === 0) {
      types[type] = new TypesHeroes(type, [3, 2, 0]);
      return;
    }
    if (index === 1) {
      types[type] = new TypesHeroes(type, [1, 3, 1]);
      return;
    }
    if (index === 2) {
      types[type] = new TypesHeroes(type, [0, 2, 3]);
      return;
    }
  });
})();

module.exports = types;
