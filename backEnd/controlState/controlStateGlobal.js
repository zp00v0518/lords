const serverList = gameVariables.serverList;
const controlStateUpgradeRegion = require("../tube.js").controlStateUpgradeRegion;
const calcStorageNowValue = require("../tube.js").calcStorageNowValue;


//
function controlStateGlobal(param){
	console.log("*********controlStateGlobal***********")
	if(param.target === "all"){
		for (let i=0; i<serverList.length; i++){
			const userServer = serverList[i];
				//перебор юзеров по  серверу
			for(let user in UserOnline[userServer]){
				const castleList = UserOnline[userServer][user].globalMap.castle;
				//перебор замков по  списку замков
				for (let h=0; h<castleList.length; h++){
					const castle = castleList[h];
					// const castleId = castle.id;
					// const regionMap = castle.region;
					const storage = castle.castle.storage;
					controlStateUpgradeRegion(castle);
					for (let source in storage.sources){
						let nowTime = new Date().getTime();
						const lastCalc = storage.sources[source].lastCalc;
						calcStorageNowValue(storage, nowTime, lastCalc, source);
					}


				}
			}
		}
	}
}

function controlStateGlobal(param) {
	if(param.target === "all"){
		serverList.forEach(item => {
			const userServer = item.collectionName;
			Object.keys(UserOnline[userServer]).forEach(key => {
				const userInOnline = UserOnline[userServer][key];
				const sectors = userInOnline.sectors;
				const ws = userInOnline.ws;
				sectors.forEach(sector => {
					calcStorageNowValue(sector.town.storage)
				})
			})
		})
	}
}

module.exports = controlStateGlobal;