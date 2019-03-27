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

    it('should return gender field', function() {
      expect(user_model.get_info(0)).to.have.property('gender');
    });

    it('gender should be male / female', function() {
      expect(user_model.get_info(0).gender).to.satisfy(function(x) {
        return x == 'Male' || x == 'Female';
      });
    });

    it('should return age', function() {
      expect(user_model.get_info(0)).to.have.property('age');
    });

    it('the age field returned should be a number', function() {
      expect(user_model.get_info(0).age).to.be.a('number');
    });

    it('should return weight', function() {
      expect(user_model.get_info(0)).to.have.property('weight');
    });

    it('the weight field returned should be a number', function() {
      expect(user_model.get_info(0).weight).to.be.a('number');
    });

    it('should return height (ft)', function() {
      expect(user_model.get_info(0)).to.have.property('height_ft');
    });

    it('the height (ft) field returned should be a number', function() {
      expect(user_model.get_info(0).height_ft).to.be.a('number');
    });

    it('should return height (in)', function() {
      expect(user_model.get_info(0)).to.have.property('height_in');
    });

    it('the height (in) field returned should be a number', function() {
      expect(user_model.get_info(0).height_in).to.be.a('number');
    });

  });
});
