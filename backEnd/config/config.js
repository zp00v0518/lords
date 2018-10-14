module.exports = {
	port: {
		http: 3001,
		ws: 3002,
	},
	db:{
		name: 'lords',
		collections:{
			users: 'users',
			session: 'session',
		},
	},
	basePathToFiles: 'frontEnd', //папка, в которой находятся файлы для клиента
};