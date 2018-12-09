//составляю массив карты из данных хранящихся в БД
//чтобы не обращаться постоянно в БД

const {findInDB, gameVariable, config} = require("../tube.js")
const  find = new findInDB();
const GlobalMap = {}
const serverList = config.db.collections.servers;

function constractGlobalMap() {
	serverList.forEach((serverName) => {
		GlobalMap[serverName] = []
		const findOptions = {
			collectionName: serverName
		}
		find.all(findOptions).then((result) => {
			GlobalMap[serverName] = result.result
		})
	})
}

function returnGlobalMap (){
	return GlobalMap
}

function startConstractMap() {
	const flag = config.db.check 
	if (flag) {
		constractGlobalMap()
	} else {
		setTimeout(startConstractMap, )
	}
}
module.exports = returnGlobalMap();