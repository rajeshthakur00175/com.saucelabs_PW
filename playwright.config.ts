import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


const envName = process.env.TEST_ENV || 'qa';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({
  path: path.resolve(__dirname, `config/${envName}.env`),
});



/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    //baseURL: 'https://www.saucedemo.com/',
    ///* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //trace: 'on',
    video: 'retain-on-failure',
    //video: 'on',
    screenshot: 'only-on-failure',
    //screenshot: 'on',
    headless: false,
  },
  testDir: './tests',
  timeout: 60000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: 1,
  /* Opt out of parallel tests on CI. */
 // workers: process.env.CI ? 1 : undefined,
 workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  globalSetup: './global.setup.ts',
  reporter: [
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results', // Specifies target folder for raw data
      },
    ],
    ['html'], 
    ['json']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 

  /* Configure projects for major browsers */
  projects: [
   {
     name: 'chromium',
     use: { ...devices['Desktop Chrome'],launchOptions: {
          args: ['--start-maximized']
        } },
   },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, 

     /*Test against mobile viewports. */
   // {
    //  name: 'Mobile Chrome',
    //  use: { ...devices['Pixel 5'] },
   // },
    //{
    //  name: 'Mobile Safari',
    //  use: { ...devices['iPhone 12'] },
   // },

    /* Test against branded browsers. */
   {
      name: 'Microsoft Edge',
     use: { ...devices['Desktop Edge'], channel: 'msedge', launchOptions: {
          args: ['--start-maximized']
        }  },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', launchOptions: {
          args: ['--start-maximized']
        } },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
