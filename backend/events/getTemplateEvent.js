import mongodb from 'mongodb';

const { ObjectId } = mongodb;

function getTemplateEvent() {
  return {
    data: Object,
    target: {
      sector: ObjectId,
      user: ObjectId,
      x: Number,
      y: Number,
    },
    init: {
      sector: ObjectId,
      user: ObjectId,
      x: Number,
      y: Number,
    },
    start: new Date().getTime(),
    end: Date,
    type: String,
  };
}

export default getTemplateEvent;
