import { promisify } from 'bluebird';
import _ from 'lodash';
import { readdir, readdirSync } from 'fs';

const readdirAsync = promisify(readdir);

function addPropertyFrom(dir) {
  return (acc, cur) => {
    let propName = cur.split('.').map(_.camelCase).join('.');
    acc[propName] = require(`${dir}/${cur}`);
    return acc;
  };
}

function requireFiles(dir, files) {
  return _(files)
    .without('index.js')
    .filter(file => _.endsWith(file, '.js') || _.endsWith(file, '.json')) // Only grab js and json files
    .map(file => _.initial(file.split('.')).join('.')) // Grab all but the extension of the file name
    .reduce(addPropertyFrom(dir), {}); // Build object of modules keyed by filename
}

const load = dir => requireFiles(dir, readdirSync(dir));

load.loadAsync = dir => readdirAsync(dir).then(requireFiles.bind(null, dir));

export default load;
