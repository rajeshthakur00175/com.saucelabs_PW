# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: components.spec.ts >> [COMPONENTS] >> [Side-Panel] Link: About. Validate that User is able to navigate to official website using About link.
- Location: tests/components.spec.ts:155:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1   | // Importing necessary modules for Playwright test
  2   | import { test } from '@playwright/test';
  3   | 
  4   | // Importing page objects
  5   | import LoginPage from '../src/pages/LoginPage.js';
  6   | import CartPage from '../src/pages/CartPage.js';
  7   | import Components from '../src/pages/Components.js';
  8   | 
  9   | // Importing utilities
  10  | import verificationUtils from '../src/utils/VerificationUtils.js';
  11  | import waitUtils from '../src/utils/WaitUtils.js';
  12  | import tagUtils from '../src/utils/TagUtils.js';
  13  | 
  14  | /**
  15  |  * Test suite for Sauce Demo Application Components.
  16  |  */
  17  | test.describe('[COMPONENTS]', () => {
  18  | 
  19  |   /**
  20  |    * Before each test, navigate to the application homepage and login.
  21  |    */
  22  |   test.beforeEach(async ({ page }) => {
  23  |     // Navigate to application and Login
> 24  |     await page.goto('/');  
      |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  25  |     const loginPage = new LoginPage(page);
  26  |     await loginPage.loginToApplicationWithValidCredentials();
  27  |   });
  28  | 
  29  |   /**
  30  |    * Test case: [Header] Static Messages. Validate that User is able to see messages in Header component.
  31  |    * @tags {regression, sanity}
  32  |    */
  33  |   test('[Header] Static Messages. Validate that User is able to see messages in Header component.', {tag: [tagUtils.REGRESSION, tagUtils.SANITY ]}, async ({ page }) => {
  34  |    
  35  |     // Verify the side-panel expand icon on the header
  36  |     const components = new Components(page);    
  37  |     verificationUtils.elementIsVisible(components.side_panel_icon_expand, "Side-Panel: Expand icon");
  38  | 
  39  |     // Verify the logo on the header
  40  |     verificationUtils.elementHasText(components.header_logo_swag_labs, 'Swag Labs');
  41  |     
  42  |     // Verify the cart icon on the header
  43  |     verificationUtils.elementIsVisible(components.header_icon_cart, "Header: Cart icon");
  44  | 
  45  |     // Verify the CSS Property of the logo
  46  |     verificationUtils.elementHasCSSPropertyAndHasValue(components.header_logo_swag_labs, "Header: Swag Labs", "font-size","24px")
  47  |     // verificationUtils.elementHasCSSPropertyAndHasValue(components.header_logo_swag_labs, "Header: Swag Labs", "font-family",'"DM Mono", "sans-serif"')
  48  |     verificationUtils.elementHasCSSPropertyAndHasValue(components.header_logo_swag_labs, "Header: Swag Labs", "color","rgb(19, 35, 34)")
  49  | 
  50  |     });  
  51  |   
  52  |   /**
  53  |    * Test case: [Header] Navigate to Cart Page. Validate that User is able to navigate to Cart Page using Cart icon.
  54  |    * @tags {regression}
  55  |    */
  56  |   test('[Header] Navigate to Cart Page. Validate that User is able to navigate to Cart Page using Cart icon.', {tag: [tagUtils.REGRESSION ]}, async ({ page }) => {
  57  |    
  58  |     // Click on Cart icon
  59  |     const components = new Components(page);
  60  |     await components.click_header_icon_cart();
  61  | 
  62  |     // Verify that User is on Cart Page
  63  |     const cartPage = new CartPage(page);
  64  |     verificationUtils.elementHasText(cartPage.heading_your_cart, 'Your Cart');
  65  |   
  66  |     // Verify the Page URL
  67  |     verificationUtils.pageContainsUrl(page, 'cart');
  68  |     // verificationUtils.pageHasUrl(page, 'https://www.saucedemo.com/cart.html');
  69  |     verificationUtils.pageHasUrl(page, 'cart.html'); // baseUrl value will be fetched from playwright.config.ts file
  70  | 
  71  |     // Verify the Page Title
  72  |     // verificationUtils.pageContainsTitle(page, 'Labs');
  73  |     verificationUtils.pageHasTitle(page, 'Swag Labs');
  74  |   });
  75  | 
  76  |   /**
  77  |    * Test case: [Footer] Static Messages. Validate that User is able to see messages in Footer component.
  78  |    * @tags {regression, sanity}
  79  |    */
  80  |   test('[Footer] Static Messages. Validate that User is able to see messages in Footer component.', {tag: [tagUtils.REGRESSION, tagUtils.SANITY ]}, async ({ page }) => {
  81  |     const components = new Components(page);
  82  | 
  83  |     // Verify the social links icons are visible  
  84  |     verificationUtils.elementIsVisible(components.footer_link_twitter, "Footer: Twitter link");
  85  |     verificationUtils.elementIsVisible(components.footer_link_facebook, "Footer: Facebook link");
  86  |     verificationUtils.elementIsVisible(components.footer_link_linkedin, "Footer: LinkedIn link");
  87  | 
  88  |     // Verify the copyright message
  89  |     verificationUtils.elementContainsText(components.footer_msg_copyright, 'Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
  90  | 
  91  |   });
  92  | 
  93  |   /**
  94  |    * Test case: [Footer] Links navigation. Validate that User is able to navigate to social platforms using icons.
  95  |    * @tags {regression}
  96  |    */
  97  |   test('[Footer] Links navigation. Validate that User is able to navigate to social platforms using icons.', {tag: [tagUtils.REGRESSION ]}, async ({ page }) => {
  98  |     const components = new Components(page);
  99  | 
  100 |     // Verify the social links have correct href attributes
  101 |     verificationUtils.elementHasAttributeAndHasValue(components.footer_link_twitter, "Footer: Twitter link", "href", "https://twitter.com/saucelabs");
  102 | 
  103 |     verificationUtils.elementHasAttributeAndHasValue(components.footer_link_facebook, "Footer: Facebook link", "href", "https://www.facebook.com/saucelabs");
  104 | 
  105 |     verificationUtils.elementHasAttributeAndHasValue(components.footer_link_linkedin, "Footer: LinkedIn link", "href", "https://www.linkedin.com/company/sauce-labs/");
  106 | 
  107 |   });
  108 | 
  109 |   /**
  110 |    * Test case: [Side-Panel] Static Messages. Validate that User is able to see messages in Side-Panel component.
  111 |    * @tags {regression, sanity}
  112 |    */
  113 |   test('[Side-Panel] Static Messages. Validate that User is able to see messages in Side-Panel component.', {tag: [tagUtils.REGRESSION, tagUtils.SANITY ]}, async ({ page }) => {
  114 | 
  115 |     // Open Side-Panel
  116 |     const components = new Components(page);    
  117 |     await components.click_side_panel_icon_expand();
  118 | 
  119 |     // Verify Links in Side-Panel
  120 |     verificationUtils.elementHasText(components.side_panel_link_allItems, "All Items");
  121 |     verificationUtils.elementHasText(components.side_panel_link_about, "About");
  122 |     verificationUtils.elementHasText(components.side_panel_link_logout, "Logout");
  123 |     verificationUtils.elementHasText(components.side_panel_link_resetAppState, "Reset App State");
  124 | 
```