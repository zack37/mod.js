'use strict';

import { promisify } from 'bluebird';
import _ from 'lodash';
import { readdir, readdirSync } from 'fs';

const readdirAsync = promisify(readdir);

function addPropertyFrom(dir){
  return (acc, cur) => {
    let propName = cur.split('.').map(_.camelCase).join('.');
    acc[propName] = require(`${dir}/${cur}`);
    return acc;
  };
}

function requireFiles(dir, files) {
  return _.chain(files)
    .without('index.js')
    .filter(file => file.endsWith('.js') || file.endsWith('.json')) // Only grab js and json files
    .map(file => _.initial(file.split('.')).join('.')) // Grab all but the extension of the file name
    .reduce(addPropertyFrom(dir), {}) // Build object of modules keyed by filename
    .value();
}

let load = dir => requireFiles(dir, readdirSync(dir));

load.loadAsync = dir => readdirAsync(dir).then(files => requireFiles(dir, files));

export default load;
