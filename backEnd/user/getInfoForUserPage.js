// const {findInDB} = require('./tube.js')
const template = require('template_func');
const {config} = require('../tube.js');
const log = new template.Log(__filename);
// const find = new findInDB();
const connectMongoDB = require("../workWithMongoDB/connectMongoDB.js");
const mongo = new connectMongoDB();
mongo.connect({dbName:config.db.name});

function getInfoForUserPage() {
	mongo.getCollections().then((result) => console.log(result))
}

module.exports = getInfoForUserPage;