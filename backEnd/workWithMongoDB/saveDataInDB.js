const updateStateCastle = require("../tube.js").updateStateCastle;
const updateStateRegion = require("../tube.js").updateStateRegion;
const gameVariable = require("../tube.js").gameVariable;
const serverList = gameVariable.serverList;

function saveDataInDB(param){
	console.log("********** saveDataInDB ************");
	if (param.target == "all"){
		for (let i=0; i<serverList.length; i++){
			const userServer = serverList[i];

			//перебор юзеров по  серверу
			for(let user in UserOnline[userServer]){
				const castleList = UserOnline[userServer][user].globalMap.castle;

				//перебор замков по  списку замков
				for (let h=0; h<castleList.length; h++){
					const castle = castleList[h];
					const castleId = castle.id;

					updateStateCastle(castleId,userServer, castle.castle);
					updateStateRegion(castleId, userServer, castle.region);
				}
			}
		}
	}
	else if (param.target == "castle"){
		console.log(param.castle)
		const castle = param.castle;
		const castleId = castle.id;
		const userServer = param.userServer;
		updateStateCastle(castleId, userServer,castle);
	}
	else if (param.target == "region"){
		// console.log(param)
		const region = param.region.region;
		const regionId = param.region.castle.id;
		const userServer = param.userServer;
		updateStateRegion(regionId, userServer,region);
	}

}


module.exports = saveDataInDB;