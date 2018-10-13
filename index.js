require('./backEnd/variables/global_variables.js')

const httpServer = require('http');
const wsServer = require('ws');
const path = require('path')

const {config, getMethod} = require('./backEnd/tube.js');
const watchFs = require('./backEnd/liveReload/watchFs.js')

const template = require('template_func');
const log = new template.Log(__filename);


const http = httpServer.createServer();
http.listen(config.port.http, () => {
	log.log(`**************HTTP-сервер запущен на порту: ${config.port.http} **************`)
})

http.on('request',(req, res) => {
	appStatistic.request.count++;
	const method = req.method;
	if (method === 'GET') {
		getMethod(req,res, __dirname);
		return;
	}
})


let ws = new wsServer.Server({ 
	port: config.port.ws
}, ()=>{
	log.log(`**************WS-cервер запущен на порту: ${config.port.ws} **************`)
});

let developerOnline = {};

ws.on("connection", (ws, req)=>{
  const id = Math.random();
  developerOnline[id] = ws;
  const pathJoin = path.join(__dirname, config.basePathToFiles)
  watchFs(pathJoin,()=>{
  	  for (let key in developerOnline){
  	  	developerOnline[key].send("change")
  	  }
  })
	ws.on('close', function(ws, qw) {
		delete developerOnline[id];
  });
 
});