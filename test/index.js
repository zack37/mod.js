'use strict';

var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var load = require('../');
var loadAsync = load.loadAsync;

chai.use(chaiAsPromised);

describe('mod.js', function() {

  describe('load', function() {

    it('should load all file but index from loadTest/ into an object', function() {
      var directory = load(__dirname + '/loadTest');
      expect(directory).to.have.property('one');
      expect(directory).to.have.property('two');
    });

  });

  describe('loadAsync', function() {

    it('should load all file but index from loadTest/ into an object asynchronously', function() {
      var directory = loadAsync(__dirname + '/loadTest');
      return Promise.all([
        expect(directory).to.eventually.have.property('one'),
        expect(directory).to.eventually.have.property('two')
      ]);
    });

  });

});
