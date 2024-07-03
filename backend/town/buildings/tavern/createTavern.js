import createBasicBuilding from '../../createBasicBuilding.js';
import { document } from '../../../workWithMongoDB/schema.js';
import workSection from '../workSection.js';

function createTavern({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.tavern, lvl);
  basic.work = workSection({});
  return basic;
}

export default createTavern;
