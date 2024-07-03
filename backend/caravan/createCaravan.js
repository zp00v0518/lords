import schema from "../workWithMongoDB/schema.js";
import Caravan from './Caravan.js';

function createCaravan() {
  const template = {
    class: schema.document.class.caravan
  };
  const { available } = Caravan;
  Object.keys(available).forEach(key => {
    template[key] = 0;
  });
  return template;
}

export default createCaravan
