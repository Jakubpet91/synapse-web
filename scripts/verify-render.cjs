const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/jakub.petricek/.gemini/antigravity/brain/34f1f2fd-9991-4eab-ba45-d27f204e408e';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function run() {
  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:5173/#funkce...');
  await page.goto('http://localhost:5173/#funkce', { waitUntil: 'networkidle0' });

  // Wait 1s for any animations
  await new Promise(r => setTimeout(r, 1000));

  // Verify text content in DOM for mojibake
  const pageText = await page.evaluate(() => document.body.innerText);
  const mojibakeRegex = /[\u00C0-\u00FF][\u0080-\u00BF]|Ĺ|Ă|ÄŤ|Ä›|Â|â€/g;
  const matches = pageText.match(mojibakeRegex);
  if (matches) {
    console.error('FAIL: Found ' + matches.length + ' mojibake matches on rendered page!');
  } else {
    console.log('PASS: Rendered DOM text is 100% clean UTF-8!');
  }

  // Print sample texts from #funkce
  const funkceHeading = await page.$eval('#funkce h2', el => el.innerText).catch(() => 'N/A');
  const funkceDesc = await page.$eval('#funkce p', el => el.innerText).catch(() => 'N/A');
  console.log('Funkce H2:', funkceHeading);
  console.log('Funkce P:', funkceDesc);

  // Take screenshot of #funkce
  const funkceEl = await page.$('#funkce');
  if (funkceEl) {
    const shotPath = path.join(ARTIFACT_DIR, 'synapse_funkce_verified.png');
    await funkceEl.screenshot({ path: shotPath });
    console.log('Saved screenshot to:', shotPath);
  }

  // Navigate / scroll to simulator
  const simEl = await page.$('#simulator');
  if (simEl) {
    await simEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 500));
    const simHeading = await page.$eval('#simulatorCaseTitle', el => el.innerText).catch(() => 'N/A');
    const simMeta = await page.$eval('#simulatorCaseMeta', el => el.innerText).catch(() => 'N/A');
    console.log('Simulator Title:', simHeading);
    console.log('Simulator Meta:', simMeta);

    const shotPath = path.join(ARTIFACT_DIR, 'synapse_simulator_verified.png');
    await simEl.screenshot({ path: shotPath });
    console.log('Saved screenshot to:', shotPath);
  }

  // Full page screenshot
  const fullShotPath = path.join(ARTIFACT_DIR, 'synapse_fullpage_verified.png');
  await page.screenshot({ path: fullShotPath, fullPage: true });
  console.log('Saved full page screenshot to:', fullShotPath);

  await browser.close();
  console.log('Done verification!');
}

run().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
