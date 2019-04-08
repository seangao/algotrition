const { expect } = require('chai');

const registerModel = require('../../models/register');

describe('models/register', () => {
  it('convertHeight', () => {
    expect(registerModel.convertHeight(5, 9)).to.equal(175.26);
  });

  it('reverseHeight', () => {
    expect(registerModel.reverseHeight(175.26)).to.satisfy(x => x[0] === 5 && x[1] === 9);
  });
});
