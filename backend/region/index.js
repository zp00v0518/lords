const setUpgradeChange = require('./setUpgradeChange');
const Region = require('./Region');
const DB = require('./DB');

module.exports = { ...DB, setUpgradeChange, Region };
