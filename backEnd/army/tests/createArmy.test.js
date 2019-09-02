const createArmy = require('../Army/createArmy');

it('Army create', function(){
  const powerRange = [10000, 15000];
  const stackRange = [1,7];
  const result = createArmy({powerRange, stackRange});
  if (result.length <= 0 ){
     throw new Error(`result length <=0`);
  }
  if (result.length > 7 ){
     throw new Error(`result length > 7`);
  }
})