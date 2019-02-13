const { updateDB } = require("../tube.js");
const update = new updateDB();

//обновляет состояние региона в БД (не замка или его-то другого. ТОлько региона)
function updateStateRegion(sectorId, serverName, updateDoc, ops){
		console.log("********** updateStateRegion ************");
		// console.log(updateDoc)
	const optionsForUpdate = {
		collectionName:serverName,
		filtr:{"id":sectorId},
		updateDoc:{$set:{region:updateDoc}},
		ops:{upsert:false},
	};
	updateDb.one(optionsForUpdate, (result)=>{
		console.log(result.result)
	})
};

module.exports = updateStateRegion;