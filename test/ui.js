require('chromedriver');
const { Builder, Key, By, until } = require('selenium-webdriver');
const { assert } = require('chai');

describe('UI', () => {
  let driver;
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('Load home', async () => {
    await driver.get('https://localhost:3000');
    const title = await driver.getTitle();
    assert.equal(title, 'Algotrition');
  });

  after(() => driver && driver.quit());
});
