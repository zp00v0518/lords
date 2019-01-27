const resources = require('../../resources/Resources');

const Mine = {
	valueUpgrade: [1,2,3,5,8,13,21,34,55],
	typeList: resources.typeList,
		//возвращает время в течении которого будет проводиться улучшение, в милисекундах
	getTimeUpgrade: function(lvl){
		let sec = 1000;
		let minute = 60*sec;
		let lvl2 = minute*20;
		if (lvl > 1){
			let result = lvl2; //с первого на второй лвл
			for(let i=2; i<lvl; i++){
					 result = lvl2*2.1;
	 				lvl2 = result;
			}
			return result;
		} else if (lvl <= 1){
			return 10*sec; 
		}
	},
	getResourcesForUpgrade(lvl) {
		return [{resource: resources.typeList[0], value: this.valueUpgrade[lvl] * 1000}]
	}
}

module.exports  = Mine;