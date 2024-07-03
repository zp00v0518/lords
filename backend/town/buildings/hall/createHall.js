import createBasicBuilding from '../../createBasicBuilding.js';
import { document } from '../../../workWithMongoDB/schema.js';
import workSection from '../workSection.js';

function createHall() {
  const basic = createBasicBuilding(document.class.hall, 1);
  basic.work = workSection({});
  return basic;
}

export default createHall;
