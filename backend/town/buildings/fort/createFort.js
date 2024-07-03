import createBasicBuilding from '../../createBasicBuilding.js';
import { document } from '../../../workWithMongoDB/schema.js';
import workSection from '../workSection.js';

function createFort({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.fort, lvl);
  basic.work = workSection({ addValue });
  return basic;
}

export default createFort;
