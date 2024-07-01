import ZoneControl from "../ZoneControl.js";

function getRadiusZone(value) {
  return Math.ceil(value / ZoneControl.stepArea);
}

export default getRadiusZone;
