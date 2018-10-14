const {config, findInDB, userCreate, insertDB, setCookieUser,sessionCreate} = require('../tube.js')
const {Log} = require('template_func');
const log = new Log(__filename)

const find = new findInDB();
const insert = new insertDB();

function checkLogin(req, requestData, callback = function (){}){
	log.log('Start Work')
	const userData = requestData.data;
	if (!userData.email || !userData.nickName) {
		log.log('Авторизационные данные не полные');
		return;
	}
	return new Promise((resolve, reject) =>{
		const ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		const emailUser = userData.email;
		const nickName = userData.nickName;
		const passUser = userData.pass || 0;
		const usersCollection = config.db.collections.users;
		switch (requestData.form) {
			case 'registrationForm':
				const findOptions = {
					collectionName: usersCollection,
					query:{$or:[{email:emailUser}, {nickName:nickName}]},
				}
				//ищу совпадения по логину и почте
				find.one(findOptions).then((findResult) => {
					//если совпадения логина или пароля отсутствуют....
					if (findResult === null) {
					//определяю количество юзеров, для присвоения ID очередному
						find.count({collectionName: usersCollection}).then((count) => {
							userData.id = count+1;
							const user = userCreate(userData);
							//добавляю пользователя в БД
							insert.one({collectionName: usersCollection, doc: user}).then((insertUser) => {
								const user_id = insertUser.ops[0]._id;
								const userId = insertUser.ops[0].id;
								const nickName = insertUser.ops[0].nickName;
								//устанавливаю новому Пользователю куки и заношу в БД
								const userCookie = setCookieUser(user_id)
								//создаю сессию
								const headers = req.headers;
								headers.platform =  userData.platform;
								headers.ip = ip;
								headers.user_id = user_id;
								sessionCreate(headers).then((resultSessionCreate) => {
									const checkLoginResult = {
										status:"registerOk",
										userCookies:userCookie,
										sessionCookies:resultSessionCreate.cookie,
										userId:user_id,
									};
										resolve(checkLoginResult)
										return callback(checkLoginResult)
								}).catch((err) => {log.log(err)})

							}).catch((err) => {log.log(err)})
						})
					}
				}).catch((err) => { log.log(err)})
		}
	})
}

module.exports = checkLogin;