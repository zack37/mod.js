import camelCase from 'lodash.camelcase';
import R from 'ramda';
import { readdir, readdirSync } from 'fs';

R.endsWith = suffix => list => {
  return R.equals(R.takeLast(suffix.length, list), suffix);
};

function addPropertyFrom(dir) {
  return (acc, cur) => {
    const propName = R.map(camelCase, cur).join('.');
    acc[propName] = require(`${dir}/${cur.join('.')}`);
    return acc;
  };
}

const requireFiles = R.curryN(2, (dir, files) => {
  return R.pipe(
    R.without('index.js'), // Remove index.js
    R.filter(R.either(R.endsWith('.js'), R.endsWith('.json'))), // Only grab js and json files
    R.map(file => R.init(file.split('.'))), // Filename without extensions
    R.reduce(addPropertyFrom(dir), {}) // Build object of modules keyed by filename with javascript naming conventions
  )(files);
});

const load = dir => requireFiles(dir, readdirSync(dir));

load.loadAsync = dir => new Promise((resolve, reject) => {
  return readdir(dir, (err, files) => err ? reject(err) : resolve(files));
}).then(requireFiles(dir));

export default load;
