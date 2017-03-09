import { expect } from 'chai';

import load, { loadAsync } from '../mod';

describe('mod.js', () => {

  describe('load', () => {

    let directory;

    before(() => {
      directory = load(__dirname + '/testFiles');
    });

    it('should load all normal files but index from testFiles/ into an object', () => {
      expect(directory).to.have.property('one').that.is.eql({ name: 'one.js' });
      expect(directory).to.have.property('two').that.is.eql({ name: 'two.js' });
      expect(directory).to.not.have.property('index');
    });

    it('should load json files from testFiles/ into an object', () => {
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
      return loadAsync(__dirname + '/testFiles')
        .then(files => directory = files);
    });

    it('should load all normal named files but index from testFiles/ into an object asynchronously', () => {
      expect(directory).to.have.property('one').that.is.eql({ name: 'one.js' });
      expect(directory).to.have.property('two').that.is.eql({ name: 'two.js' });
      expect(directory).to.not.have.property('index');
    });

    it('should load json files from testFiles/ into an object asynchronously', () => {
      expect(directory).to.have.property('test').that.is.eql({ name: 'test.json' });
    });

    it('should load files with dots in the name excluding extension asynchronously', () => {
      expect(directory).to.have.property('one.two').that.is.eql({ name: 'one.two.js' });
    });

    it('should load files with snake_casing as camelCasing asynchronously', () => {
      expect(directory).to.have.property('snakeCase').that.is.eql({ name: 'snake_case.js' });
    });

    it('should load files with snake_casing and dots as camelCasing with dots asynchronously', () => {
      expect(directory).to.have.property('snakeCase.other').that.is.eql({ name: 'snake_case.other.js' });
    });

  });

});
