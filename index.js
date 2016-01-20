'use strict';

var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');

function endsWith(string, pattern) {
  return new RegExp(pattern + '$').test(string);
}

function jsOrJson(file) {
 return endsWith(file, '.js') || endsWith(file, '.json');
}

function getFileName(file) {
  return _.head(file.split('.'));
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
  return new Promise(function(resolve, reject) {
    fs.readdir(dir, function(err, files) {
      if(err) {
        return reject(err);
      }
      return resolve(requireFiles(dir, files));
    });
  });
};

module.exports = load;
module.exports.loadAsync = loadAsync;
