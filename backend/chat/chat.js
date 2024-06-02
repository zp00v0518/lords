const config = require('../config');

const chat = {
  template: {
    author: 'admin',
    chanel: '',
    privat: '',
    status: true,
    text:
      'После старта сессии, в чате отображается до 30 последних сообщений ',
    time: new Date(),
    type: 'chatMessage'
  }
};

config.db.collections.servers.forEach(item => {
  chat[item.collectionName] = [];
});

module.exports = chat;
