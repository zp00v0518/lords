const { insertDB } = require('../tube.js');
const insert = new insertDB();

function addEventToDB(data, serverName) {
  const doc = {
    class: 'event',
    target: data.target,
    init: data.init,
    start: data.start,
    end: data.end,
    data: data.data,
    type: data.type,
    status: true
  };
  insert.one({ collectionName: serverName, doc: doc }, result => {});
}

module.exports = addEventToDB;

const schema = {
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
