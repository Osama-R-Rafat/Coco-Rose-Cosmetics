const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const url = `file://${path.join(process.cwd(), 'index.html')}`;
const outDir = path.join(__dirname, 'screenshots');

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-414', width: 414, height: 896 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-1024', width: 1024, height: 1366 },
  { name: 'desktop-1440', width: 1440, height: 900 }
];

(async () => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // Wait a moment for lazy images to load
    await new Promise(r => setTimeout(r, 800));
    const file = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log('Saved', file);
  }

  await browser.close();
})();
