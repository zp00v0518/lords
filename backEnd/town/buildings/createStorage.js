const tube = require("../../tube.js");

function createStorage(listMine = gameVariables.mineTypeList){
	const {upgradeSection} = tube;
	//listMine - массив типов шахт;
	const storage = {
		lvl: 1,
		upgrade: upgradeSection(),
		maxValue:{
				gold: 100000,
				baseResource: 18,
				unicResource: 10,
			}
	}
	//создаются поля, которые соответствуют перечню шахт
	for (let i=0; i<listMine.length; i++){
			const type = listMine[i];
			const obj = {
				lastCalc: 0,
				addValue: 0,
				nowValue: 0,
			}
			storage[type] = obj;
			if (type == "gold"){
				storage.gold.nowValue = 5000;
			}

	}
	return storage;
}

module.exports = createStorage;
