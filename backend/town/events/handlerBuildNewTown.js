const { getOneTownFromDB } = require('../DB');
const { addEventToDB } = require('../../events');

async function handlerBuildNewTown(event) {
	const {serverName, target, init} = event;
	const targetSector = await getOneTownFromDB(serverName, target.sector);
}

module.exports = handlerBuildNewTown;
