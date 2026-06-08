import fs from 'fs';
import os from 'os';

async function globalSetup() {
  const envInfo = `
Environment=${process.env.TEST_ENV || 'QA'}
BaseURL=${process.env.BASE_URL}
OS=${os.platform()}
NodeVersion=${process.version}
Headless=${process.env.HEADLESS}  
Retries=${process.env.RETRIES}  

`;

  fs.mkdirSync('allure-results', { recursive: true });

  fs.writeFileSync(
    'allure-results/environment.properties',
    envInfo.trim()
  );
}

export default globalSetup;