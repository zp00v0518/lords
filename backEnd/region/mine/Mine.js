const Mine = {
	valueUpgrade: [1000,2000,3000,5000,8000,13000,21000,34000,55000],
	mineTypeList: ["gold", "wood", "ore", "sulfur", "crystal", "mercury", "gem"],
		//возвращает время в течении которого будет проводиться улучшение, в милисекундах
	timeUpgrade: function(lvl){  
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

}

module.exports  = Mine;