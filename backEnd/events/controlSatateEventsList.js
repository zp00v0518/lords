const { checkUpgrade, calcStorageNowValue } = require('../tube.js');

function controlSatateEventsList(player){
  const eventList = player.eventList;
  eventList.every(item => {
    const now = new Date();
    const end = new Date(item.end)
    if (end > now) return false;
    
  });
}

module.exports = controlSatateEventsList;