const { getRandomString, Log } = require('template_func');
const { insertDB, config } = require('../tube.js');
const userSessionUpdate = require('./userSessionUpdate.js');

const log = new Log(__filename);
const insert = new insertDB();

function sessionCreate(headers, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const sessionCookie = getRandomString(config.cookieSize);
    var session = {
      date: {
        add: new Date(),
        last: new Date()
      },
      ip: headers.ip,
      agent: headers['user-agent'] || 0,
      platform: headers.platform || 0,
      referer: headers.referer || 0,
      accept: headers.accept || 0,
      user_id: headers.user_id,
      cookie: sessionCookie
    };
    insert
      .one({ collectionName: config.db.collections.session, doc: session })
      .then(resultInsertSession => {
        //добавляю в нового пользователя ID новой сессии;
        const idSession = resultInsertSession.ops[0]._id;
        userSessionUpdate(headers.user_id, idSession);
        resolve(resultInsertSession.ops[0]);
        return callback(resultInsertSession.ops[0]);
      })
      .catch(err => {
        log.log(err);
      });
  });
}

module.exports = sessionCreate;
