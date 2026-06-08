# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: components.spec.ts >> [COMPONENTS] >> [Side-Panel] Panel Expand/Collapse. Validate that User is able to expand/collapse panel using icons.
- Location: tests/components.spec.ts:135:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#react-burger-menu-btn')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: standard_user
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]: secret_sauce
        - img [ref=e16]
      - 'heading "Epic sadface: Username and password do not match any user in this service" [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Username and password do not match any user in this service"
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { Locator } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * BasePage class provides common actions that can be performed on web elements.
  5  |  */
  6  | class BasePage {
  7  | 
  8  |     /**
  9  |      * Clicks on a specified web element.
  10 |      * @param element - The Locator of the element to click.
  11 |      * @param elementName - A descriptive name of the element (used for logging).
  12 |      */
  13 |     async clickOnWebElement(element: Locator, elementName: string): Promise<void> {
  14 |         console.log(`Clicking on '${elementName}'.`);
> 15 |         await element.click();
     |                       ^ Error: locator.click: Test timeout of 60000ms exceeded.
  16 |     }
  17 | 
  18 |     /**
  19 |      * Fills a textbox with the provided value.
  20 |      * @param element - The Locator of the textbox element.
  21 |      * @param value - The value/text to be entered into the textbox.
  22 |      * @param textboxName - A descriptive name of the textbox (used for logging).
  23 |      */
  24 |     async fillTextBox(element: Locator, value: string, textboxName: string): Promise<void> {
  25 |         console.log(`Filling '${value}' in '${textboxName}' textbox.`);
  26 |         await element.fill(value);
  27 |     }
  28 | }
  29 | 
  30 | /**
  31 |  * Exports the BasePage class as the default export of this module.
  32 |  * @module BasePage
  33 |  */
  34 | export default BasePage;
```