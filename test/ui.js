require('chromedriver');
const { Builder, Key, By, until } = require('selenium-webdriver');
const { assert } = require('chai');

const baseURL = 'https://algotrition.herokuapp.com';
const TIMEOUT = 1000;

describe('UI', () => {
  let driver;
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('load home', async () => {
    await driver.get(baseURL);
    const title = await driver.getTitle();
    assert.equal(title, 'Algotrition');
  });

  it('access generator without logging in', async () => {
    await driver.get(baseURL + '/generator');
    const title = await driver.getTitle();
    assert.equal(title, 'Plan Generator');
  });

  it('generate meal plan', async () => {
    await driver.get(baseURL + '/generator');
    await driver.findElement(By.id('potassium-toggle')).click();
    await driver.findElement(By.id('generator-nutr-button')).click();
    await driver.manage().setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
    await driver.findElement(By.id('generator-opt-button')).click();
    await driver.manage().setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
    await driver.findElement(By.id('generate')).click();
    await driver.wait(until.elementLocated(By.id('plan-calendar')), 10000);
    const title = await driver.getTitle();
    assert.equal(title, 'Calendar');
  });

  it('login', async () => {
    await driver.get(baseURL + '/login');
    await driver.findElement(By.id('username')).sendKeys('sean');
    await driver.findElement(By.id('password')).sendKeys('test');
    await driver.findElement(By.id('login')).click();

    const title = await driver.getTitle();
    assert.equal(title, 'Algotrition');
  });

  after(() => driver && driver.quit());
});
