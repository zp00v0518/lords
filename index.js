require('./backEnd/variables/global_variables.js')
const {config, getMethod} = require('./backEnd/tube.js');

const template = require('template_func');
const log = new template.Log(__filename);

const httpServer = require('http');
const wsServer = require('ws');

const http = httpServer.createServer();
http.listen(config.port.http, () => {
	log.log('HTTP-сервер запущен на порту: '+ config.port.http)
})

http.on('request',(req, res) => {
	appStatistic.request.count++;
	const method = req.method;
	if (method === 'GET') {
		getMethod(req,res, __dirname);
		return;
	}

	res.end('Hello')
})
