import createBasicBuilding from '../../createBasicBuilding.js';
import schema from '../../../workWithMongoDB/schema.js';
const { document } = schema;
import workSection from '../workSection.js';

function createTavern({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.tavern, lvl);
  basic.work = workSection({});
  return basic;
}

export default createTavern;
