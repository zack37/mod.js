import { expect } from 'chai';

import load, { loadAsync } from '../mod';

describe('mod.js', () => {

  it('should be able to require load as a function (babel 6 sanity check)', () => {
    const loadFromRequire = require('../');
    expect(loadFromRequire).to.be.a('function');
  });

  it('should be able to require loadAsync as a function (babel 6 sanity check)', () => {
    const loadAsyncFromRequire = require('../').loadAsync;
    expect(loadAsyncFromRequire).to.be.a('function');
  });

  describe('load', () => {

    let directory;

    before(() => {
      directory = load(__dirname + '/loadTest');
    });

    it('should load all normal files but index from loadTest/ into an object', () => {
      expect(directory).to.have.property('one').that.is.eql({ name: 'one.js' });
      expect(directory).to.have.property('two').that.is.eql({ name: 'two.js' });
      expect(directory).to.not.have.property('index');
    });

    it('should load json files from loadTest/ into an object', () => {
      expect(directory).to.have.property('test').that.is.eql({ name: 'test.json' });
    });

    it('should load files with dots in the name excluding extension', () => {
      expect(directory).to.have.property('one.two').that.is.eql({ name: 'one.two.js' });
    });

    it('should load files with snake_casing as camelCasing', () => {
      expect(directory).to.have.property('snakeCase').that.is.eql({ name: 'snake_case.js' });
    });

    it('should load files with snake_casing and dots as camelCasing with dots', () => {
      expect(directory).to.have.property('snakeCase.other').that.is.eql({ name: 'snake_case.other.js' });
    });

  });

  describe('loadAsync', () => {

    let directory;

    before(() =>  {
      return loadAsync(__dirname + '/loadTest')
        .then(files => directory = files);
    });

    it('should load all normal named files but index from loadTest/ into an object asynchronously', () => {
      expect(directory).to.have.property('one').that.is.eql({ name: 'one.js' });
      expect(directory).to.have.property('two').that.is.eql({ name: 'two.js' });
      expect(directory).to.not.have.property('index');
    });

    it('should load json files from loadTest/ into an object asynchronously', () => {
      return expect(directory).to.have.property('test').that.is.eql({ name: 'test.json' });
    });

    it('should load files with dots in the name excluding extension asynchronously', () => {
      return expect(directory).to.have.property('one.two').that.is.eql({ name: 'one.two.js' });
    });

    it('should load files with snake_casing as camelCasing asynchronously', () => {
      return expect(directory).to.have.property('snakeCase').that.is.eql({ name: 'snake_case.js' });
    });

    it('should load files with snake_casing and dots as camelCasing with dots asynchronously', () => {
      return expect(directory).to.have.property('snakeCase.other').that.is.eql({ name: 'snake_case.other.js' });
    });

  });

});
