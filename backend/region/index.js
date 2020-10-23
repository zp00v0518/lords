const setUpgradeChange = require('./setUpgradeChange');
const Region = require('./Region');
const DB = require('./DB');
const methods = require('./methods');

module.exports = { ...DB, ...methods, setUpgradeChange, Region };
