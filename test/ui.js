require('chromedriver');
const { Builder, Key, By, until } = require('selenium-webdriver');
const { assert } = require('chai');

const baseURL = 'https://algotrition.herokuapp.com';

describe('UI', () => {
  let driver;
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('load home', async () => {
    await driver.get(baseURL);
    // await driver.findElement(By.id('potassium-toggle')).click();
    const title = await driver.getTitle();
    assert.equal(title, 'Algotrition');
  });

  after(() => driver && driver.quit());
});
