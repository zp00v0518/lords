const connectMongoDB = require('./connectMongoDB.js');
const findInDB = require('./findInDB.js');
const updateDB = require('./updateDB.js');
const insertDB = require('./insertDB.js');

module.exports = {
	connectMongoDB,
	findInDB,
	updateDB,
	insertDB
}