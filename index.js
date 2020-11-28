require('dotenv').config();
// require('./backend/config/srcRequire.js');
require('./backend/variables/global_variables.js');
require('./backend/wsServer/wsServer.js');
require('./get_files.js');
require('./backend/tube.js');

const http = require('http');
const config = require('./backEnd/config');

// если подключить эти модули не через tube, то идет двойное подключение к БД, двойной запуск constractGlobalMap. 
// прям беда какая-то
const {
  getMethod,
  postMethod,
  controlStateGlobal,
  controlZoneControle
} = require('./backend/tube.js');

const template = require('template_func');
const log = new template.Log(__filename);

class Server {
  init(port) {
    this.server = http.createServer();
    this.server.listen(port, () => {
      log.log(new Date().toLocaleString());
      console.log(`Сервер запущен по адресу http://loclahost:${port}`);
    });
  }
  on(event, callback) {
    this.server.on(event, callback);
  }
}
const server = new Server();
server.init(config.server.port.http);
server.on('request', (req, res) => {
  if (config.server.ready_to_work) {
    const method = req.method;
    if (method === 'GET') {
      getMethod(req, res, __dirname);
    } else if (method === 'POST') {
      postMethod(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Сервер не может удовлетворить Ваши запросы');
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Сервер не готов, поробуйте немного позже');
    }
});

setInterval(() => {
  controlStateGlobal({ target: 'all' });
}, global.gameVariables.timer.controlState);

setInterval(() => {
  controlZoneControle();
}, global.gameVariables.timer.zoneControle);
