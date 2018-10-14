const {updateDB, config} = require("../tube.js");
const update = new updateDB();

//добавляет кукис сессии в массив сессий Пользователя
function userSessionUpdate(user_id, session_id) {
	const options = {
			collectionName:config.db.collections.users,
			filtr: {
				$or: [{_id:user_id}, {cookie:session_id} ],
				}, //добавить условие поиска по id или cookies
			updateDoc:{$push:{session:session_id}},
			ops: {
				upsert: false,
			},
		};
		update.one(options);
	}

module.exports = userSessionUpdate;