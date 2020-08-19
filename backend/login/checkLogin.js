const { config, findInDB, userCreate, insertDB, setCookieUser, sessionCreate } = require('../tube.js');
const { Log } = require('template_func');
const log = new Log(__filename);

const find = new findInDB();
const insert = new insertDB();

async function checkLogin(req, requestData, callback = function() {}) {
  // log.log('Start Work')
  const userData = requestData.data;
  return new Promise((resolve, reject) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const emailUser = userData.email;
    const nickName = userData.nickName;
    const passUser = userData.pass || 0;
    const usersCollection = config.db.collections.users;
    const checkLoginResult = {};
    if (requestData.form === 'registrForm') {
      if (!userData.email || !userData.nickName) {
        checkLoginResult.status = 'registrErr';
        checkLoginResult.answer = 'Авторизационные данные не полные';
        resolve(checkLoginResult);
        return callback(checkLoginResult);
      }
      const findOptions = {
        collectionName: usersCollection,
        query: { $or: [{ email: emailUser }, { nickName: nickName }] }
      };
      // ищу совпадения по логину и почте
      find
        .one(findOptions)
        .then(findResult => {
          // если совпадения логина или пароля отсутствуют....
          if (findResult === null) {
            // определяю количество юзеров, для присвоения ID очередному
            find.count({ collectionName: usersCollection }).then(count => {
              userData.id = count + 1;
              const user = userCreate(userData);
              // добавляю пользователя в БД
              insert
                .one({ collectionName: usersCollection, doc: user })
                .then(insertUser => {
                  const user_id = insertUser.ops[0]._id;
                  // устанавливаю новому Пользователю куки и заношу в БД
                  const userCookies = setCookieUser(user_id);
                  // создаю сессию
                  const headers = req.headers;
                  headers.platform = userData.platform;
                  headers.ip = ip;
                  headers.user_id = user_id;
                  sessionCreate(headers)
                    .then(resultSessionCreate => {
                      checkLoginResult.status = 'registrOk';
                      checkLoginResult.userCookies = userCookies;
                      checkLoginResult.sessionCookies = resultSessionCreate.cookie;
                      checkLoginResult.userId = user_id;
                      resolve(checkLoginResult);
                      return callback(checkLoginResult);
                    })
                    .catch(err => {
                      log.log(err);
                    });
                })
                .catch(err => {
                  log.log(err);
                });
            });
          } else {
            // если совпадения логина или пароля есть....
            (checkLoginResult.status = 'registrErr'),
              (checkLoginResult.answer = nickName === findResult.nickName ? 'badNickName' : 'badEmail');
            resolve(checkLoginResult);
            return callback(checkLoginResult);
          }
        })
        .catch(err => {
          log.log(err);
        });
    } else if (requestData.form === 'authForm') {
      const findOptions = {
        collectionName: usersCollection,
        query: { email: emailUser, pass: passUser }
      };
      find.one(findOptions).then(findResult => {
        // log.log(findResult)
        if (findResult === null) {
          checkLoginResult.status = 'authErr';
          checkLoginResult.answer = 'authErr';
          resolve(checkLoginResult);
          return callback(checkLoginResult);
        } else {
          const headers = req.headers;
          headers.platform = userData.platform;
          headers.ip = ip;
          headers.user_id = findResult._id;
          const userCookies = findResult.cookie ? findResult.cookie : setCookieUser(findResult._id);
          console.log(userCookies);
          sessionCreate(headers)
            .then(resultSessionCreate => {
              console.log(findResult);
              checkLoginResult.userCookies = userCookies;
              checkLoginResult.sessionCookies = resultSessionCreate.cookie;
              checkLoginResult.userId = headers.user_id;
              checkLoginResult.status = 'authOk';
              // log.log(resultSessionCreate)
              resolve(checkLoginResult);
              return callback(checkLoginResult);
            })
            .catch(err => {
              log.log(err);
            });
        }
      });
    }
  });
}

module.exports = checkLogin;
