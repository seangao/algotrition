const assert = require('chai').assert;
const expect = require('chai').expect;

const user_model = require('../models/user');

describe('Models', function() {
  describe('user', function() {

    it('should return a name field', function() {
      expect(user_model.get_info(0)).to.have.property('name');
    });

    it('should return a calorie field', function() {
      expect(user_model.get_info(0)).to.have.property('calories');
    });

    it('the calorie field returned should be a number', function() {
      expect(user_model.get_info(0).calories).to.be.a('number');
    });

  });
});
