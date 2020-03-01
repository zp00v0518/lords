const setUpgradeChange = require('./setUpgradeChange');
const checkUpgrade = require('./checkUpgrade');
const Region = require('./Region');
const DB = require('./DB');

module.exports = { ...DB, setUpgradeChange, checkUpgrade, Region };
