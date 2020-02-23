const serverList = gameVariables.serverList;
const { formEventsList, controlStateEventsList } = require("../events");
const { globalControlStateInTown, getUsersTownFromDB } = require("../town");
const { sendWSMessage } = require("../wsServer");

function controlStateGlobal(param) {
  console.log("**************")
  if (param.target === "all") {
    serverList.forEach(item => {
      const userServer = item.collectionName;
      Object.keys(UserOnline[userServer]).forEach(key => {
        if (key === "count") return;
        const userInOnline = UserOnline[userServer][key];
        const ws = userInOnline.ws;
        globalControlStateInTown(userServer).then(resultStateSectors => {
          controlStateEventsList(userServer).then(res => {
            formEventsList(userInOnline.user._id, userServer).then(
              listEvents => {
                getUsersTownFromDB(userInOnline.user._id, userServer).then(
                  listSectors => {
                    userInOnline.sectors = JSON.parse(JSON.stringify(listSectors));
                    const response = {
                      type: "controlState",
                      status: true,
                      sectors: listSectors,
                      eventsList: listEvents,
                      heroesList: userInOnline.heroesList
                    };
                    sendWSMessage(ws, response);
                  }
                );
              }
            );
          });
        });
      });
    });
  }
}

module.exports = controlStateGlobal;
