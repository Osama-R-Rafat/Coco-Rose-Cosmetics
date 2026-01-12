const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('file:///f:/cosmatics/index.html', { waitUntil: 'networkidle2' });
    const count = await page.$$eval('.product-card', els => els.length);
    console.log('PRODUCT_COUNT', count);
    await browser.close();
  } catch (e) {
    console.error('ERR', e.message);
    process.exit(1);
  }
})();