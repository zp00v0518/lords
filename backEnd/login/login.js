const checkLogin = require("./checkLogin.js");
const { Log } = require("template_func");
const { config, sendResponse } = require("../tube.js");
const log = new Log(__filename);
const twoWeek = config.time.week * 2;

function login(req, res, loginData, Cookies) {
  // log.log('start work')
  checkLogin(req, loginData)
    .then(checkLoginResult => {
      const status = checkLoginResult.status;
      if (status === "registrOk") {
        Cookies.set("user", checkLoginResult.userCookies, { maxAge: twoWeek });
        Cookies.set("session", checkLoginResult.sessionCookies);
        const answer = {};
        answer.status = "registrOk";
        answer.nextStep = config.listFile.html.cabinet + ".html";
        sendResponse(res, JSON.stringify(answer));
        //добавляю юзера в список онлайновых
        // UserOnline[checkLoginResult.userCookies] = {};
        return;
      } else if (status === "registrErr") {
        sendResponse(res, JSON.stringify(checkLoginResult));
      } else if (status === "authErr") {
        sendResponse(res, JSON.stringify(checkLoginResult));
      } else if (status === "authOk") {
        Cookies.set("user", checkLoginResult.userCookies, { maxAge: twoWeek });
        Cookies.set("session", checkLoginResult.sessionCookies);
        const answer = {};
        answer.status = "authOk";
        answer.nextStep = config.listFile.html.cabinet + ".html";
        sendResponse(res, JSON.stringify(answer));
        //добавляю юзера в список онлайновых
        // UserOnline[checkLoginResult.userCookies] = {};
        return;
      }
      sendResponse(res, JSON.stringify(checkLoginResult));
    })
    .catch(err => {
      sendResponse(res, JSON.stringify(err));
    });
}

module.exports = login;
