require('chromedriver');
const {
  Builder, Key, By, until,
} = require('selenium-webdriver');
const { assert } = require('chai');

const baseURL = 'https://algotrition.herokuapp.com';
const TIMEOUT = 10000;

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
    await driver.get(`${baseURL}/generator`);
    const title = await driver.getTitle();
    assert.equal(title, 'Plan Generator');
  });

  it('calendar redirects to generator when there is no plan', async () => {
    await driver.get(`${baseURL}/calendar`);
    const title = await driver.getTitle();
    assert.equal(title, 'Plan Generator');
  });

  // it('generate meal plan', async () => {
  //   await driver.get(baseURL + '/generator');
  //   await driver.findElement(By.id('potassium-toggle')).click();
  //   await driver.findElement(By.id('generator-nutr-button')).click();
  //   await driver.manage().setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
  //   await driver.findElement(By.id('generator-opt-button')).click();
  //   await driver.manage().setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
  //   await driver.findElement(By.id('generate')).click();
  //   await driver.wait(until.elementLocated(By.id('plan-calendar')), 10000);
  //   const title = await driver.getTitle();
  //   assert.equal(title, 'Calendar');
  // });

  it('reset password', async () => {
    await driver.get(`${baseURL}/passwordReset`);

    const title = await driver.getTitle();
    assert.equal(title, 'Reset Password');
  });

  it('login', async () => {
    await driver.get(`${baseURL}/login`);
    await driver.findElement(By.id('username')).sendKeys('sean');
    await driver.findElement(By.id('password')).sendKeys('test');
    await driver.findElement(By.id('login')).click();

    const title = await driver.getTitle();
    assert.equal(title, 'Algotrition');
  });

  describe('profile', async () => {
    await driver.get(`${baseURL}/profile`);
    it('view username', async () => {
      assert.isTrue(driver.findElement(By.id('username')).isDisplayed());
    });
    it('view height', async () => {
      assert.isTrue(driver.findElement(By.id('height')).isDisplayed());
    });
    it('view weight', async () => {
      assert.isTrue(driver.findElement(By.id('weight')).isDisplayed());
    });
    it('view age', async () => {
      assert.isTrue(driver.findElement(By.id('age')).isDisplayed());
    });
    it('view gender', async () => {
      assert.isTrue(driver.findElement(By.id('gender')).isDisplayed());
    });
    it('view allergens', async () => {
      assert.isTrue(driver.findElement(By.id('allergens')).isDisplayed());
    });
  });

  it('view calendar', async () => {
    await driver.get(`${baseURL}/calendar`);

    const title = await driver.getTitle();
    assert.equal(title, 'Calendar');
  });

  it('view recipes', async () => {
    await driver.get(`${baseURL}/recipes`);

    const title = await driver.getTitle();
    assert.equal(title, 'Recipes');
  });

  after(() => driver && driver.quit());
});
