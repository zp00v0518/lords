function 	checkWorkBuilding(bulding, time){
	console.log("********** checkWorkBuilding Work ************");
	const checkTime = bulding.work.date;
	if (time > checkTime) {
		bulding.work.date = time;
	}
}

module.exports = checkWorkBuilding;