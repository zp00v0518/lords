const { updateDB } = require("../tube.js");
const update = new updateDB();

//обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
function updateStateTown(castleId, serverName, updateDoc, ops) {
  console.log("********** updateStateTown ************");
  // console.log(updateDoc)
  const optionsForUpdate = {
    collectionName: serverName,
    filtr: { id: castleId },
    updateDoc: { $set: { castle: updateDoc } },
    ops: { upsert: false }
  };
  update.one(optionsForUpdate, result => {
    console.log(result.result);
  });
}

module.exports = updateStateTown;
