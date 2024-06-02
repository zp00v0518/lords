const timeLine = require('./timeline');
const mine = require('./mine');
const date = require('./date');
const general = require('./general');
const dialog = require('./dialog');
const town = require('./town/town');
const region = require('./region/region');
const eventLang = require('./eventLang');
const worldMap = require('./worldMap');

module.exports = { timeLine, mine, date, general, dialog, town, region, ...eventLang, ...worldMap };
