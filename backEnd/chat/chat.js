const config = require('../config');

const chat = {};

config.db.collections.servers.forEach(item => {
  chat[item.collectionName] = [];
});

module.exports = chat;
