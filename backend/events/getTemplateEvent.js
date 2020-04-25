const ObjectID = require('mongodb').ObjectID;

function getTemplateEvent() {
  return {
    data: Object,
    target: {
      sector: ObjectID,
      user: ObjectID,
      x: Number,
      y: Number
    },
    init: {
      sector: ObjectID,
      user: ObjectID,
      x: Number,
      y: Number
    },
    start: new Date().getTime(),
    end: Date,
    type: String
  };
}

module.exports = getTemplateEvent;
