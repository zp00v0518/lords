const path = require('path');
const root = __dirname.replace(/\\config/,'');
global.srcRequire = _path => require(path.resolve(root, './' + _path))
