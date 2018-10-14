const checkLogin = require('./checkLogin.js')
const {Log} = require('template_func')
const {config,sendResponse} = require('../tube.js')
const log = new Log(__filename)
const twoWeek = config.time.week*2;

function login(req, res, loginData, Cookies) {
	log.log('start work')
	checkLogin(req, loginData).then((checkLoginResult) =>{
		if (checkLoginResult.status === "registerOk") {
			log.log(checkLoginResult)
			Cookies.set("user", checkLoginResult.userCookies, {maxAge: twoWeek});
			Cookies.set("session", checkLoginResult.sessionCookies);
			const answer = {};
			answer.status = "registerOk";
			answer.nextStep = "user.html";
			sendResponse(res, JSON.stringify(answer));
		};

	}).catch((err) => {log.log(err)})

}

module.exports = login;