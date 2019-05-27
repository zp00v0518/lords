require('./backEnd/config/srcRequire.js');
require('./backEnd/variables/global_variables.js');
require('./backEnd/wsServer/wsServer.js');
require('./get_files.js');

const http = require('http');

const {
  config,
  getMethod,
  postMethod,
  controlStateGlobal,
  saveDataInDB
} = require('./backEnd/tube.js');

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
      resp.writeHead(200, { 'Content-Type': 'text/plain' });
      resp.end('Сервер не может удовлетворить Ваши запросы');
    }
  } else {
    resp.writeHead(200, { 'Content-Type': 'text/plain' });
      resp.end('Сервер не готов, поробуйте немного позже');
    }
});

setInterval(() => {
  controlStateGlobal({ target: 'all' });
}, gameVariables.timer.controlState);

setInterval(() => {
  saveDataInDB({ target: 'all' });
}, gameVariables.timer.saveDataDB);
