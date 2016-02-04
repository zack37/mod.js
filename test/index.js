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

    var directory;

    beforeEach(function() {
      directory = load(__dirname + '/loadTest');
    });

    it('should load all file but index from loadTest/ into an object', function() {
      expect(directory).to.have.property('one');
      expect(directory).to.have.property('two');
    });

    it('should load files with dots in the name excluding extension', function() {
      expect(directory).to.have.property('one.two');
    });

  });

  describe('loadAsync', function() {

    var directory;

    beforeEach(function() {
      directory = loadAsync(__dirname + '/loadTest');
    });

    it('should load all file but index from loadTest/ into an object asynchronously', function() {
      return Promise.all([
        expect(directory).to.eventually.have.property('one'),
        expect(directory).to.eventually.have.property('two')
      ]);
    });

  });

});
