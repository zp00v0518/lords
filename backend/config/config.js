const path = require('path');
const schema = require('../workWithMongoDB/schema');

module.exports = {
  server: {
    port: {
      http: 4000,
      ws: 4001
    },
    ready_to_work: false
  },
  frontEnd: {
    watchFolder: path.resolve(__dirname, '../../frontEnd'),
    folder: 'frontEnd'
  },
  db: {
    check: false,
    name: 'lords',
    collections: {
      users: 'users',
      session: 'session',
      servers: [
        { name: 'First', collectionName: 'server_1' },
        { name: 'Second', collectionName: 'server_2' }
      ],
      map: 'globalMap',
      chat: 'chat'
    }
  },
  cookieSize: 10,
  basePathToFiles: 'frontEnd', //папка, в которой находятся файлы для клиента
  time: {
    sec: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 31,
    speedGame: 50 // делитель. Влияет на время улучшения строений. Чем больше, тем быстрее. Не может быть 0
  },
  listFile: {
    html: {
      login: 'login',
      cabinet: 'user',
      err: '404',
      game: 'game'
    }
  },
  schema
};