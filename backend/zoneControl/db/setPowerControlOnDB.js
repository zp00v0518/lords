const template = require('template_func');
const console = new template.Log(__filename);
const { bulkWrite, schema } = require('../../workWithMongoDB');
const bulk = new bulkWrite();

// TODO: остановился на формировании запроса за секторами
async function setPowerControlOnDB(serverName, arr, user) {
  // const result = await bulkWrite.all(serverName);
}

module.exports = setPowerControlOnDB;
