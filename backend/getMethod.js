const url = require('url');
const path = require('path');
const Cookies = require('cookies');
const { fileReader, mimeType, sendResponse, config, findUserInDB } = require('./tube.js');
const { addCollectionsToUser } = require('./user');
const { getCollectionName } = require('./template_modules');
const MODE = process.env.MODE;
const listFile = config.listFile[MODE] || config.listFile.html;

async function getMethod(req, res, startPath) {
  let urlParse = url.parse(req.url, true);
  let cookies = new Cookies(req, res);
  let userCookies = cookies.get('user');
  let sessionCookies = cookies.get('session');
  let pathName = urlParse.path;
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // блок проверяющий статические файлы
  let regPath = /.*js.*|.*img.*|.*style.*|.*ico.*|.*css.*/gi;
  let check = regPath.test(pathName);
  if (check) {
    const ext = path.parse(pathName).ext;
    const pathJoin = path.join(startPath, config.basePathToFiles, pathName);
    fileReader(pathJoin, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      sendResponse(res, data, mimeType[ext]);
    });
    return;
  }
  // если userCookies, то переходим на страницу авторизации
  if (!userCookies) {
    pathName = listFile.login + '.html';
    var pathJoin = path.join(startPath, config.basePathToFiles, pathName);
    var ext = path.parse(pathName).ext;
    fileReader(pathJoin, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      sendResponse(res, data, mimeType[ext]);
    });
    // если userCookies есть, ищем совпадение в БД
  } else if (userCookies) {
    const resultFinUser = await findUserInDB(userCookies);
    if (resultFinUser) {
      const serverName = getCollectionName(pathName.split('/')[1]);
      if (!serverName) {
        // отправляем пользователя в личный кабинет
        pathName = listFile.cabinet + '.html';
      } else if (!Object.values(resultFinUser.collections).find(i => i.name === serverName)) {
        addCollectionsToUser(resultFinUser, serverName);
        pathName = listFile.game + '.html';
      } else {
        pathName = listFile.game + '.html';
      }
    } else {
      pathName = listFile.login + '.html';
    }

    // pathName = config.listFile.html.cabinet + ".html";
    const pathJoin = path.join(startPath, config.basePathToFiles, pathName);
    const ext = path.parse(pathName).ext;
    fileReader(pathJoin, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      sendResponse(res, data, mimeType[ext]);
    });
  }
}

module.exports = getMethod;
