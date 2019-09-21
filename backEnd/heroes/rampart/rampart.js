const types = require('../types');

const rampart = {
  [types[0]]: {
    default: {
      attack: 3,
      def: 2,
      magic: 0
    },
    up: {
      attack: 50,
      def: 30,
      magic: 20
    }
  },
  [types[1]]: {
    default: {
      attack: 1,
      def: 3,
      magic: 1
    },
    up: {
      attack: 20,
      def: 50,
      magic: 30
    }
  },
  [types[2]]: {
    default: {
      attack: 0,
      def: 2,
      magic: 3
    },
    up: {
      attack: 20,
      def: 30,
      magic: 50
    }
  }
};

module.exports = rampart;
