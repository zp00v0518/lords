const config = require('../config');

const chat = {
  template: {
    author: 'admin',
    chanel: '',
    privat: '',
    status: true,
    text:
      'Добро пожаловать в мой пэт-проект. После старта сессии, в чате отображается до 30 последних сообщений ',
    time: '2019-03-10T22:00:00.934Z',
    type: 'chatMessage'
  }
};

config.db.collections.servers.forEach(item => {
  chat[item.collectionName] = [];
});

module.exports = chat;
