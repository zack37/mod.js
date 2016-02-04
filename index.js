'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');

function jsOrJson(file) {
 return _.endsWith(file, '.js') || _.endsWith(file, '.json');
}

function getFileName(file) {
  return _.initial(file.split('.')).join('.');
}

function addPropertyFrom(dir){
  return function(acc, cur) {
    acc[cur] = require(dir+'/'+cur);
    return acc;
  }
}

function requireFiles(dir, files) {
  return _.chain(files)
    .without('index.js')
    .filter(jsOrJson)
    .map(getFileName)
    .reduce(addPropertyFrom(dir), {})
    .value();
}

var load = function(dir) {
  return requireFiles(dir, fs.readdirSync(dir));
};

var loadAsync = function(dir) {
    return fs.readdirAsync(dir)
      .then(function(files) {
        return requireFiles(dir, files);
      });
};

module.exports = load;
module.exports.loadAsync = loadAsync;
