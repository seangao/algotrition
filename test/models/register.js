const assert = require('chai').assert;
const expect = require('chai').expect;

const registerModel = require('../../models/register');

describe ('models/register', function() {
  it('convertHeight', function() {
   expect(registerModel.convertHeight(5, 9)).to.equal(175.26);
  });

  it('reverseHeight', function() {
    expect(registerModel.reverseHeight(175.26)).to.satisfy(function(x) {
      return x[0] == 5 && x[1] == 9;
    });
  });
});