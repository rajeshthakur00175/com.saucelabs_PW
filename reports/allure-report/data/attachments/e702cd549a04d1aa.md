# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> [LOGIN] >> Login with invalid credentials. Validate that User is unable to login using invalid credentials.
- Location: tests/login.spec.ts:123:7

# Error details

```
Error: page.goto: NS_ERROR_UNKNOWN_HOST
Call log:
  - navigating to "https://uat.saucedemo.com/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading [level=1] [ref=e5]
  - paragraph
  - paragraph
```

# Test source

```ts
  1   | // @ts-check
  2   | import { test, expect } from '@playwright/test';
  3   | 
  4   | // Importing page objects
  5   | import LoginPage from '../src/pages/LoginPage.js';
  6   | import ProductsPage from '../src/pages/ProductsPage.js';
  7   | import Components from '../src/pages/Components.js';
  8   | import verificationUtils from '../src/utils/VerificationUtils.js';
  9   | import tagUtils from '../src/utils/TagUtils.js';
  10  | //import logger from '../src/utils/Logger.js';
  11  | import loggerFactory from '../src/utils/LoggerFactory.js';
  12  | 
  13  | // Importing test data
  14  | import loginCredentials from '../src/testData/login_credentials.json';
  15  | 
  16  | 
  17  | // Extracting credentials for both valid and invalid cases
  18  | const {
  19  |   credentials_valid: { valid_username, valid_password },
  20  |   credentials_invalid: { invalid_username, invalid_password }
  21  | } = loginCredentials.data;
  22  | 
  23  | /**
  24  |  * Test suite for Sauce Demo login functionality.
  25  |  */
  26  | test.describe('[LOGIN]', () => {
  27  | 
  28  |   /**
  29  |    * Before each test, navigate to the application homepage.
  30  |    */
  31  |   test.beforeEach(async({ page, browserName }, testInfo) =>{
  32  |     // Navigate to application
  33  |     const logger = loggerFactory.createLogger(
  34  |         process.env.TEST_ENV || 'uat',
  35  |         browserName,
  36  |         testInfo.title
  37  |     );
  38  |     logger.info(`Navigating to the application homepage before each test: ${testInfo.title}`)
> 39  |     await page.goto('/')  
      |                ^ Error: page.goto: NS_ERROR_UNKNOWN_HOST
  40  |   })
  41  | 
  42  | 
  43  |   /**
  44  |    * [LOGIN] Test Case:
  45  |    * Validate that a user is able to successfully log in using valid credentials.
  46  |    * - Verify Products page heading after login
  47  |    * - Verify header logo
  48  |    * - Verify footer elements and LinkedIn link
  49  |    * 
  50  |    * Tags: @regression @sanity @bvt
  51  |    */
  52  |  //Test to created to test logs
  53  |  /* test('Login Test', async ({ page, browserName }, testInfo) => {
  54  | 
  55  |     const logger = loggerFactory.createLogger(
  56  |         process.env.TEST_ENV || 'uat',
  57  |         browserName,
  58  |         testInfo.title
  59  |     );
  60  | 
  61  |     logger.info('Test Started');
  62  | 
  63  |     await page.goto('/');
  64  | 
  65  |     logger.info('Application Loaded');
  66  | 
  67  |     logger.info('Entering Username');
  68  | 
  69  |     logger.info('Click Login');
  70  | 
  71  |     logger.info('Test Completed');
  72  | });*/
  73  | 
  74  |   test('Login with valid credentials. Validate that User is able to login using valid credentials.', {tag: [tagUtils.REGRESSION, tagUtils.SANITY, tagUtils.BVT ]}, async ({ page, browserName }, testInfo) => {
  75  |     
  76  |     // Navigate to application
  77  |    // await page.goto('/');
  78  |     const logger = loggerFactory.createLogger(
  79  |         process.env.TEST_ENV || 'uat',
  80  |         browserName,
  81  |         testInfo.title
  82  |     );
  83  |     logger.info(`Navigating to the application homepage : ${testInfo.title}`)
  84  |     // Perform login with valid credentials
  85  |     const loginPage = new LoginPage(page)
  86  |     logger.info(`Attempting to log in with valid credentials: ${valid_username} / ${valid_password}`)
  87  |     await loginPage.loginToApplication(valid_username, valid_password)
  88  | 
  89  |     // Assertions for successful login
  90  | 
  91  |     // Verify the heading on the Products page
  92  |     
  93  |     const productsPage = new ProductsPage(page)
  94  |     logger.info('Verifying Products page heading')
  95  |     verificationUtils.elementHasText(productsPage.heading_products, 'Products')
  96  |     
  97  |     // Verify the logo on the header
  98  |     const components = new Components(page)
  99  |     logger.info('Verifying header logo')
  100 |     verificationUtils.elementHasText(components.header_logo_swag_labs, 'Swag Labs')
  101 | 
  102 |     // Verify the copyright message in the footer
  103 |     logger.info('Verifying footer copyright message')
  104 |     verificationUtils.elementContainsText(components.footer_msg_copyright, ' Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
  105 | 
  106 |     // Verify that LinkedIn link in the footer is present
  107 |     logger.info('Verifying LinkedIn link in the footer')
  108 |     verificationUtils.elementIsVisible(components.footer_link_linkedin, "Footer: LinkedIn link")
  109 | 
  110 |     // Verify the href attribute and value for the LinkedIn link in the footer
  111 |     logger.info('Verifying LinkedIn attribute in the footer')
  112 |     verificationUtils.elementHasAttributeAndHasValue(components.footer_link_linkedin, "Footer: LinkedIn link", 'href', 'https://www.linkedin.com/company/sauce-labs/')    
  113 |     
  114 |   });
  115 | 
  116 |   /**
  117 |    * [LOGIN] Test Case:
  118 |    * Validate that a user is unable to log in using invalid credentials.
  119 |    * - Verify the error message for incorrect Username and Password
  120 |    * 
  121 |    * Tags: @regression @sanity
  122 |    */
  123 |   test('Login with invalid credentials. Validate that User is unable to login using invalid credentials.', {tag: [tagUtils.REGRESSION, tagUtils.SANITY ]}, async ({ page, browserName }, testInfo) => {
  124 |     const logger = loggerFactory.createLogger(
  125 |         process.env.TEST_ENV || 'uat',
  126 |         browserName,
  127 |         testInfo.title
  128 |     );
  129 |     logger.info(`Navigating to the application homepage : ${testInfo.title}`)
  130 |     // Navigate to application
  131 |     await page.goto('/');
  132 | 
  133 |     // Perform login with invalid credentials
  134 |     
  135 |     const loginPage = new LoginPage(page)
  136 |     logger.info(`Attempting to log in with invalid credentials: ${invalid_username} / ${invalid_password}`)
  137 |     await loginPage.loginToApplication(invalid_username, invalid_password)
  138 | 
  139 |     // Verify the error message for Username and Password mismatch
```