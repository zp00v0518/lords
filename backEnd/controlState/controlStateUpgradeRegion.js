const Region = require("../tube.js").Region;
const Mine = require("../tube.js").Mine;
const regionTypeList = Region.typeList;


//проверяет состояние обновления объекта
function controlStateUpgradeRegion(castle){
		console.log("*********controlStateUpgradeRegion***********")
	const regionMap = castle.region;
	for(let x=0; x<regionMap.length; x++){
		const arrX = regionMap[x];
		for(let y=0; y<arrX.length; y++){
			let sector = arrX[y];
			let typeNumber = sector.type; 
			if (typeNumber <=2){
				continue;
			}
			let type = regionTypeList[typeNumber];
			let bulding = sector[type];
			//если объект в процессе обновления - проверяем окончание обновления
			if (bulding.upgrade.is){
				checkUpgrade(bulding, type, castle);
			}
		}
	}
}

//проверяет окончание обновления объекта
//если время обновления закончилось - вносит соответствующие изменения 
function checkUpgrade(bulding, type, castle){
	// console.log(bulding)
	let now = new Date().getTime();
	let endUpgrade = bulding.upgrade.date;
	if (now > endUpgrade){
		bulding.upgrade.is = false;
		bulding.upgrade.date = 0;
		bulding.lvl++;
		bulding.work.is = true;
		bulding.work.date = 0;

		if(type == "mine"){
			const typeMine = bulding.type;
			const valueMining = Mine.valueMining[typeMine];
			bulding.work.addValue = valueMining;
			const storage = castle.castle.storage;
			storage.sources[typeMine].addValue += valueMining;
		}
	}
}

module.exports = controlStateUpgradeRegion;
