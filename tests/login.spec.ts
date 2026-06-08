// @ts-check
import { test, expect } from '@playwright/test';

// Importing page objects
import LoginPage from '../src/pages/LoginPage';
import ProductsPage from '../src/pages/ProductsPage';
import Components from '../src/pages/Components';
import verificationUtils from '../src/utils/VerificationUtils';
import tagUtils from '../src/utils/TagUtils';
//import logger from '../src/utils/Logger.js';
import loggerFactory from '../src/utils/LoggerFactory';
import { allure } from 'allure-playwright';

// Importing test data
import loginCredentials from '../src/testData/login_credentials.json';


// Extracting credentials for both valid and invalid cases
const {
  credentials_valid: { valid_username, valid_password },
  credentials_invalid: { invalid_username, invalid_password }
} = loginCredentials.data;

/**
 * Test suite for Sauce Demo login functionality.
 */
test.describe('[LOGIN]', () => {

  /**
   * Before each test, navigate to the application homepage.
   */
  test.beforeEach(async({ page, browserName }, testInfo) =>{
    // Navigate to application
    const logger = loggerFactory.createLogger(
        process.env.TEST_ENV || 'uat',
        browserName,
        testInfo.title
    );
    logger.info(`Test Environment: ${process.env.TEST_ENV }`)
    logger.info(`Navigating to the application homepage before each test: ${testInfo.title}`)
    await allure.step('Navigate to the application homepage', async () => {
      await page.goto('/')
    })
    //await page.goto('/')  
  })


  /**
   * [LOGIN] Test Case:
   * Validate that a user is able to successfully log in using valid credentials.
   * - Verify Products page heading after login
   * - Verify header logo
   * - Verify footer elements and LinkedIn link
   * 
   * Tags: @regression @sanity @bvt
   */
 //Test to created to test logs
 /* test('Login Test', async ({ page, browserName }, testInfo) => {

    const logger = loggerFactory.createLogger(
        process.env.TEST_ENV || 'uat',
        browserName,
        testInfo.title
    );

    logger.info('Test Started');

    await page.goto('/');

    logger.info('Application Loaded');

    logger.info('Entering Username');

    logger.info('Click Login');

    logger.info('Test Completed');
});*/

  test('Login with valid credentials. Validate that User is able to login using valid credentials.', {tag: [tagUtils.REGRESSION, tagUtils.SANITY, tagUtils.BVT ]}, async ({ page, browserName }, testInfo) => {
    
    // Navigate to application
   // await page.goto('/');
    const logger = loggerFactory.createLogger(
        process.env.TEST_ENV || 'uat',
        browserName,
        testInfo.title
    );
    logger.info(`Navigating to the application homepage : ${testInfo.title}`)
    // Perform login with valid credentials
    const loginPage = new LoginPage(page)
    logger.info(`Attempting to log in with valid credentials: ${valid_username} / ${valid_password}`)
    await allure.step('Perform login with valid credentials', async () => {
      await loginPage.loginToApplication(valid_username, valid_password)
    });
    //await loginPage.loginToApplication(valid_username, valid_password)

    // Assertions for successful login

    // Verify the heading on the Products page
    await allure.step('Verify Products page heading', async () => {
      const productsPage = new ProductsPage(page)
      logger.info('Verifying Products page heading')
      verificationUtils.elementHasText(productsPage.heading_products, 'Products')
    });
    // Verify the logo on the header
    const components = new Components(page)
    await allure.step('Verify header logo', async () => {
      logger.info('Verifying header logo')
      verificationUtils.elementHasText(components.header_logo_swag_labs, 'Swag Labs')
    });

    // Verify the copyright message in the footer
    await allure.step('Verify footer copyright message', async () => {
      logger.info('Verifying footer copyright message')
      verificationUtils.elementContainsText(components.footer_msg_copyright, ' Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    });

    // Verify that LinkedIn link in the footer is present
    await allure.step('Verify LinkedIn link in the footer', async () => {
      logger.info('Verifying LinkedIn link in the footer')
      verificationUtils.elementIsVisible(components.footer_link_linkedin, "Footer: LinkedIn link")
    });

    // Verify the href attribute and value for the LinkedIn link in the footer
    await allure.step('Verify LinkedIn attribute in the footer', async () => {
      logger.info('Verifying LinkedIn attribute in the footer')
      verificationUtils.elementHasAttributeAndHasValue(components.footer_link_linkedin, "Footer: LinkedIn link", 'href', 'https://www.linkedin.com/company/sauce-labs/')    
    });
    
  });

  /**
   * [LOGIN] Test Case:
   * Validate that a user is unable to log in using invalid credentials.
   * - Verify the error message for incorrect Username and Password
   * 
   * Tags: @regression @sanity
   */
  test('Login with invalid credentials. Validate that User is unable to login using invalid credentials.', {tag: [tagUtils.REGRESSION, tagUtils.SANITY ]}, async ({ page, browserName }, testInfo) => {
    const logger = loggerFactory.createLogger(
        process.env.TEST_ENV || 'uat',
        browserName,
        testInfo.title
    );
    // Navigate to application

    await allure.step('Navigate to the application homepage allure log ', async () => {
      logger.info(`Navigating to the application homepage : ${testInfo.title}`)
      await page.goto('/')
      logger.info(`Navigating to the application homepage : ${testInfo.title}`)
    })
    
    // Perform login with invalid credentials
    const loginPage = new LoginPage(page)
    await allure.step('Perform login with invalid credentials allure logs', async () => {
      logger.info(`Attempting to log in with invalid credentials: ${invalid_username} / ${invalid_password}`)
      await loginPage.loginToApplication(invalid_username, invalid_password)
    })
   // const loginPage = new LoginPage(page)
    //logger.info(`Attempting to log in with invalid credentials: ${invalid_username} / ${invalid_password}`)
  //  await loginPage.loginToApplication(invalid_username, invalid_password)

    // Verify the error message for Username and Password mismatch
    await allure.step('Verify error message for invalid login attempt', async () => { 
      logger.info('Verifying error message for invalid login attempt')
      verificationUtils.elementContainsText(loginPage.message_error_not_match, 'Username and password do not match')
    })
  }); 
});
