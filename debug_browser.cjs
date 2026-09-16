const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error('[Browser PageError]', err.toString());
  });

  page.on('requestfailed', request => {
    console.error(`[Browser RequestFailed] ${request.url()} - ${request.failure().errorText}`);
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    const rootHTML = await page.$eval('#root', el => el.innerHTML);
    console.log('[Root HTML]', rootHTML.substring(0, 200));
  } catch (e) {
    console.error('[Puppeteer Error]', e);
  }

  await browser.close();
})();
