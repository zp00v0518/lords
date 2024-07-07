import ZoneControl from '../ZoneControl.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb
import updateDB from '../../workWithMongoDB/updateDB.js'
const update = new updateDB()

async function removeOldContolValuesFromDB(serverName, sectorId, values) {
  const computedTime = ZoneControl.computedTime
  const now = Date.now()
  const lastTime = now - computedTime

  const listKey = Object.keys(values).filter((keyTime) => +keyTime < lastTime)
  const removeList = {}
  if (listKey.length === 0) return
  listKey.forEach((key) => {
    removeList[`control.values.${key}`] = 1
  })
  const optionsForUpdate = {
    collectionName: serverName,
    filtr: { _id: new ObjectId(sectorId) },
    updateDoc: { $unset: removeList }
  }
  const result = await update.one(optionsForUpdate)
  return result
}

export default removeOldContolValuesFromDB
