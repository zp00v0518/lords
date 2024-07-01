import createBasicBuilding from '../../createBasicBuilding.js';
import { schema } from "../../../workWithMongoDB/index.js";
const { document } = schema
import workSection from '../workSection.js';

function createBarraks({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.barraks, lvl);
  basic.work = workSection({ addValue, static: false });
  return basic;
}

module.exports = createBarraks;

export default createBarraks
