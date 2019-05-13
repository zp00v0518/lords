const document = {
  class: {
    map:'map',
    letter:"letter",
    art: "art",
    hero:"hero",
    clan:"clan",
    storage:"storage",
    market: 'market',
    fort: 'fort',
    guild:'guild',
    tavern:'tavern',
    army:"army",
    mine:"mine",
    town:"town",
    event: "event",
  }
};
const event = {
  type: String,
  target: {
    user: "ObjectId",
    sector: "ObjectId",
  },
  init: {
    user: "ObjectId",
    sector: "ObjectId",
  },
  start: Date,
  end: Date,
  data: Object,
  status: Boolean,
}

const map = {
  type: Number,
  id: Number,
  x: Number,
  y: Number,
  region: Object,
  town: Object,
  nickName: String,
};

const town = {
  id: Number,
  name: String,
  lvl: Number,
  race: Number,
  storage: Object,
  regionMap: Array,
};

const storage = {
  type: 'storage',
  lvl: Number,
  maxValue: Object,
  sources: Object,
  parent: "town",
  upgrade: Object,
};

const region = {
  id: Number,
  x: Number,
  y: Number,
  type: Number,
  sector: Object,
};

const sector ={
  parent: 'region',
  type: String,
  lvl: Number,
  mining: Object,
  upgrade: Object,
};

const upgrade = {
  is: Boolean,
  date: Date,
  bonus: Number,
};

const mining = {
  is: Boolean,
  date: Date,
  bonus: Number,
  addValue: Number,
};

const maxValue = {
  gold: Number,
  baseResource: Number,
  unicResource: Number,
};

module.exports = {
  document,
  map,
  town,
  upgrade,
  mining,
  maxValue,
  sector,
  region,
  storage,
  event,
}