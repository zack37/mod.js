'use strict';

import { join } from 'bluebird';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import load, { loadAsync } from '../mod';

chai.use(chaiAsPromised);

describe('mod.js', () => {

  it('should be able to require load as a function (babel 6 sanity check)', () => {
    const loadFromRequire = require('../');
    console.log(loadFromRequire.toString());
    expect(loadFromRequire).to.be.a('function');
  });

  it('should be able to require loadAsync as a function (babel 6 sanity check)', () => {
    const loadAsyncFromRequire = require('../').loadAsync;
    console.log(loadAsyncFromRequire.toString());
    expect(loadAsyncFromRequire).to.be.a('function');
  });

  describe('load', () => {

    let directory;

    before(() => {
      directory = load(__dirname + '/loadTest');
    });

    it('should load all normal files but index from loadTest/ into an object', () => {
      expect(directory).to.have.property('one').that.is.eql({});
      expect(directory).to.have.property('two').that.is.eql({});
      expect(directory).to.not.have.property('index');
    });

    it('should load json files from loadTest/ into an object', () => {
      expect(directory).to.have.property('test').that.is.eql({});
    });

    it('should load files with dots in the name excluding extension', () => {
      expect(directory).to.have.property('one.two').that.is.eql({});
    });

    it('should load files with snake_casing as camelCasing', () => {
      expect(directory).to.have.property('snakeCase').that.is.eql({});
    });

    it('should load files with snake_casing and dots as camelCasing with dots', () => {
      expect(directory).to.have.property('snakeCase.other').that.is.eql({});
    });

  });

  describe('loadAsync', () => {

    let directory;

    before(() =>  {
      directory = loadAsync(__dirname + '/loadTest');
    });

    it('should load all normal named files but index from loadTest/ into an object asynchronously', () => {
      return join(
        expect(directory).to.eventually.have.property('one').that.is.eql({}),
        expect(directory).to.eventually.have.property('two').that.is.eql({}),
        expect(directory).to.not.eventually.have.property('index')
      );
    });

    it('should load json files from loadTest/ into an object asynchronously', () => {
      return expect(directory).to.eventually.have.property('test').that.is.eql({});
    });

    it('should load files with dots in the name excluding extension asynchronously', () => {
      return expect(directory).to.eventually.have.property('one.two').that.is.eql({});
    });

    it('should load files with snake_casing as camelCasing asynchronously', () => {
      return expect(directory).to.eventually.have.property('snakeCase').that.is.eql({});
    });

    it('should load files with snake_casing and dots as camelCasing with dots asynchronously', () => {
      return expect(directory).to.eventually.have.property('snakeCase.other').that.is.eql({});
    });

  });

});
