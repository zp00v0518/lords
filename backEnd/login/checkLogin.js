const {config, findInDB} = require('../tube.js')
const {Log} = require('template_func');
const log = new Log(__filename)

const findDB = new findInDB();

function checkLogin(req, loginData, callback = function (){}){
	log.log('Start Work')
	if (!loginData.data.email || !loginData.data.nickName) {
		log.log('Авторизационные данные не полные');
		return;
	}
	return new Promise((resolve, reject) =>{
		const ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		const emailUser = loginData.data.email || 0;
		const nickName = loginData.data.nickName || 0;
		const passUser = loginData.data.pass || 0;
		const usersCollection = config.db.collection.users;
		switch (loginData.form) {
			case 'registrationForm':
				let findOptions = {
					collectionName: usersCollection,
					query:{$or:[{email:emailUser}, {nickName:nickName}]},
				}
				//ищу совпадения по логину и почте
				findDB.one(findOptions).then((findResult) => {
					log.log(findResult)
				})
		}
	})
}

module.exports = checkLogin;