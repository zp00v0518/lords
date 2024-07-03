import path from 'node:path';
const __dirname = path.parse(import.meta.url).dir
const root = __dirname.replace(/\\config/, '');
global.srcRequire = _path => import(path.resolve(root, './' + _path))
