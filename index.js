Error.stackTraceLimit = Infinity;
import 'dotenv/config';
import http from 'node:http';
import path from 'node:path';

import './backend/variables/global_variables.js';
import './backend/wsServer/wsServer.js';
import './get_files.js';

import config from './backend/config/config.js';

const __dirname = path.parse(import.meta.url).dir

// если подключить эти модули не через tube, то идет двойное подключение к БД, двойной запуск constractGlobalMap. 
// прям беда какая-то
import {
  getMethod,
  postMethod,
  controlStateGlobal,
  controlZoneControle
} from './backend/tube.js';


class Server {
  init(port) {
    this.server = http.createServer();
    this.server.listen(port, () => {
      console.log(new Date().toLocaleString());
      console.log(`Сервер запущен по адресу http://localhost:${port}`);
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


