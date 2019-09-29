const { findUserInDB } = require('../user/findUser');
const { redirectMessage } = require('../wsServer/defaultMessages');
const { getCollectionName, checkSchema } = require('../template_modules');

function choicesRace(message, { userCookies, ws }) {
  if (!checkSchema(message, schema)) {
    redirectMessage(ws);
    return;
  }
  const { url, race, heroes } = message;
  const checkServerName = getCollectionName(url.split('/')[1]);
  if (!checkServerName) {
    redirectMessage(ws);
    return;
  }
  findUserInDB(userCookies).then(user => {
    if (!user) {
      redirectMessage(ws);
      return;
    }

    ws.send(JSON.stringify(user));
  });
}

module.exports = choicesRace;

const schema = {
  race: { type: 'string' },
  url: { type: 'string', regExp: /^\/{1}[^\/]/gi },
  heroes: { type: 'string' }
};
