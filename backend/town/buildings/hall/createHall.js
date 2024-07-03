import createBasicBuilding from '../../createBasicBuilding.js';
import schema from '../../../workWithMongoDB/schema.js';
const { document } = schema;
import workSection from '../workSection.js';

function createHall() {
  const basic = createBasicBuilding(document.class.hall, 1);
  basic.work = workSection({});
  return basic;
}

export default createHall;
