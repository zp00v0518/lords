const { findInDB, config } = require("../tube.js");
const find = new findInDB();

function formEventsList(player, serverName) {
console.log("formEventsList");
  const findOptions = {
    collectionName: serverName,
    query: {
      $or:[{"target.user": player.user._id},{"init.user": player.user._id}],
      "class": "event",
      status: true,
    }
  };
  find.all(findOptions).then(result => {
    console.log(result.result.length)
  })

}

module.exports = formEventsList;
