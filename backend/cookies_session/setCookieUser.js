import { updateDB, config } from '../tube.js';
import { getRandomString } from 'template_func';
const update = new updateDB();

function setCookieUser(userId, cookie = getRandomString(config.cookieSize)) {
  // const cookie = getRandomString(config.cookieSize);
  const optionsForUpdate = {
    collectionName: config.db.collections.users,
    filtr: {
      _id: userId
    },
    updateDoc: {
      $set: { cookie: cookie, 'date.addCookie': new Date() }
    }
  };
  update.one(optionsForUpdate).then(resultUpdate => { });
  return cookie;
}

export default setCookieUser;
