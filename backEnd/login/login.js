const checkLogin = require('./checkLogin.js')
const {Log} = require('template_func')
const log = new Log(__filename)

function login(req, res, data, cookies) {
	log.log('start work')
	log.log(data)

}

module.exports = login;