const url = require("url");
const {
  reqOn,
  sendResponse,
  getVariable,
  login,
  getInfoForUserPage
} = require("./tube.js");
const Cookies = require("cookies");
const template = require("template_func");
const log = new template.Log(__filename);

function postMethod(req, res, startPath) {
  let urlParse = url.parse(req.url);
  let pathName = urlParse.path;
  let cookies = new Cookies(req, res);
  let userCookies = cookies.get("user");
  reqOn(req)
    .then(data => {
      let requestData = template.tryJsonParse(data);
      if (requestData) {
        if (pathName === "/login") {
          login(req, res, requestData, cookies);
        } else if (pathName === "/dev") {
          //получает значение любой глобальной переменной. Сделано в целях разработки
          const target = getVariable(JSON.parse(data));
          if (target) {
            const result = template.stringCircular(target);
            sendResponse(res, result);
          } else {
            sendResponse(res, "По такому ключу ничего не найдено");
          }
        } else if (pathName === "/userPage") {
          requestData = {
            status: "ok",
            message: "asd",
            data: data
          };
          getInfoForUserPage();
          sendResponse(res, JSON.stringify(requestData));
        } else if (pathName === '/choiseServer') {
          console.log(data)
        }
      } else {
        log.log("Информацию полученную от клиента распарсить не удалось");
        requestData = {
          status: "err",
          message: "Информацию полученную от клиента распарсить не удалось",
          data: data
        };
        sendResponse(res, JSON.stringify(requestData));
      }
    })
    .catch(err => {
      log.log(err);
    });
}

module.exports = postMethod;
