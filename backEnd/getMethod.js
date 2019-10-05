const url = require('url');
const path = require('path');
const Cookies = require('cookies');
const template = require('template_func');
const {
  fileReader,
  mimeType,
  sendResponse,
  config,
  findUserInDB,
  addCollectionsToUser
} = require('./tube.js');
const log = new template.Log(__filename);
const { getCollectionName } = require('./template_modules');

function getMethod(req, res, startPath) {
  // log.log("**********getMethod work*********");
  let urlParse = url.parse(req.url, true);
  let cookies = new Cookies(req, res);
  let userCookies = cookies.get('user');
  let sessionCookies = cookies.get('session');
  let pathName = urlParse.path;
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //блок проверяющий статические файлы
  let regPath = /.*js.*|.*img.*|.*style.*|.*ico.*|.*css.*/gi;
  let check = regPath.test(pathName);
  if (check) {
    const ext = path.parse(pathName).ext;
    const pathJoin = path.join(startPath, config.basePathToFiles, pathName);
    fileReader(pathJoin, (err, data) => {
      sendResponse(res, data, mimeType[ext]);
      return;
    });
    return;
  }
  // если userCookies, то переходим на страницу авторизации
  if (!userCookies) {
    pathName = config.listFile.html.login + '.html';
    var pathJoin = path.join(startPath, config.basePathToFiles, pathName);
    var ext = path.parse(pathName).ext;
    fileReader(pathJoin, (err, data) => {
      sendResponse(res, data, mimeType[ext]);
      return;
    });
    //если userCookies есть, ищем совпадение в БД
  } else if (userCookies) {
    findUserInDB(userCookies).then(resultFinUser => {
      if (resultFinUser) {
        const checkServerName = getCollectionName(pathName.split('/')[1]);
        if (!checkServerName) {
          //отправляем пользователя в личный кабинет
          pathName = config.listFile.html.cabinet + '.html';
        } else if (!resultFinUser.collections.includes(checkServerName)) {
          log.log(123);
          addCollectionsToUser(resultFinUser._id, checkServerName);
          pathName = config.listFile.html.game + '.html';
        } else {
          pathName = config.listFile.html.game + '.html';
        }
      } else {
        pathName = config.listFile.html.login + '.html';
      }

      // pathName = config.listFile.html.cabinet + ".html";
      const pathJoin = path.join(startPath, config.basePathToFiles, pathName);
      const ext = path.parse(pathName).ext;
      fileReader(pathJoin, (err, data) => {
        sendResponse(res, data, mimeType[ext]);
        return;
      });
    });
  }
}

module.exports = getMethod;
