const ZoneControl = require("../ZoneControl");

function getRadiusZone(value) {
  return Math.ceil(value / ZoneControl.stepArea);
}

module.exports = getRadiusZone;
