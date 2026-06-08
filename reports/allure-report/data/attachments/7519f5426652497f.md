# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: components.spec.ts >> [COMPONENTS] >> [Side-Panel] Panel Expand/Collapse. Validate that User is able to expand/collapse panel using icons.
- Location: tests/components.spec.ts:135:7

# Error details

```
Error: expect.toBeVisible: Target page, context or browser has been closed
```

```
Error: locator.click: Target page, context or browser has been closed
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
     |                       ^ Error: locator.click: Target page, context or browser has been closed
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