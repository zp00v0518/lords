import createBasicBuilding from '../../createBasicBuilding.js';
import schema from '../../../workWithMongoDB/schema.js';
const document = schema.document;
import workSection from '../workSection.js';

function createFort({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.fort, lvl);
  basic.work = workSection({ addValue });
  return basic;
}

export default createFort;
