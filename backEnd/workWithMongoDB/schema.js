const document = {
  class: {
    map: 'map',
    letter: 'letter',
    art: 'art',
    hero: 'hero',
    clan: 'clan',
    storage: 'storage',
    hall: 'hall',
    market: 'market',
    fort: 'fort',
    guild: 'guild',
    tavern: 'tavern',
    army: 'army',
    mine: 'mine',
    town: 'town',
    event: 'event',
    barraks: 'barraks'
  }
};
const event = {
  type: String,
  target: {
    user: 'ObjectId',
    sector: 'ObjectId'
  },
  init: {
    user: 'ObjectId',
    sector: 'ObjectId'
  },
  start: Date,
  end: Date,
  data: Object,
  status: Boolean
};

const map = {
  type: Number,
  id: Number,
  x: Number,
  y: Number,
  region: Object,
  town: Object,
  nickName: String
};

const town = {
  id: Number,
  name: String,
  lvl: Number,
  race: Number,
  storage: Object,
  regionMap: Array,
  hall: Object
};

const storage = {
  type: 'storage',
  lvl: Number,
  maxValue: Object,
  sources: Object,
  parent: 'town',
  upgrade: Object
};

const hall = {
  type: document.class.hall,
  lvl: Number,
  parent: 'town',
  upgrade: Object,
  work: Object
};

const region = {
  id: Number,
  x: Number,
  y: Number,
  type: Number,
  sector: Object
};

const sector = {
  parent: 'region',
  type: String,
  lvl: Number,
  work: Object,
  upgrade: Object
};

const upgrade = {
  is: Boolean,
  date: Date,
  bonus: Number
};

const work = {
  is: Boolean,
  date: Date,
  bonus: Number,
  addValue: Number
};

const maxValue = {
  gold: Number,
  baseResource: Number,
  unicResource: Number
};

const mine = {
  parent: 'region',
  class: document.class.mine,
  type: String,
  lvl: Number,
  x: Number,
  y: Number,
  upgrade: Object,
  work: Object
};

module.exports = {
  document,
  map,
  town,
  upgrade,
  work,
  maxValue,
  sector,
  region,
  storage,
  event,
  hall,
  mine
};
