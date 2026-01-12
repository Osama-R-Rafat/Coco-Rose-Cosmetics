const puppeteer = require('puppeteer');
const path = require('path');

const url = `file://${path.join(process.cwd(), 'index.html')}`;
const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-414', width: 414, height: 896 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-1024', width: 1024, height: 1366 },
  { name: 'desktop-1440', width: 1440, height: 900 }
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 500));

    // Check documentElement scroll width vs viewport width
    const pageReport = await page.evaluate(() => {
      const report = { overflow: false, viewportWidth: document.documentElement.clientWidth, offenders: [] };
      const elems = Array.from(document.querySelectorAll('body *'));
      elems.forEach(el => {
        try {
          const r = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          const marginLeft = parseFloat(style.marginLeft) || 0;
          const marginRight = parseFloat(style.marginRight) || 0;
          const totalWidth = r.width + marginLeft + marginRight;
          if (totalWidth > document.documentElement.clientWidth + 1) {
            report.offenders.push({
              tag: el.tagName.toLowerCase(),
              class: el.className || null,
              width: Math.round(totalWidth),
              top: Math.round(r.top),
              html: el.outerHTML.slice(0, 200).replace(/\n/g, ' ')
            });
          }
        } catch (e) { /* ignore errors */ }
      });
      report.overflow = report.offenders.length > 0;
      return report;
    });

    console.log(`\nViewport: ${vp.name} (${vp.width}x${vp.height})`);
    if (!pageReport.overflow) {
      console.log('  No horizontal overflow detected.');
    } else {
      console.log(`  Found ${pageReport.offenders.length} potential overflow elements (showing up to 10):`);
      pageReport.offenders.slice(0, 10).forEach((o, i) => {
        console.log(`   ${i+1}. <${o.tag}> class="${o.class}" width=${o.width} top=${o.top}`);
      });
    }
  }

  await browser.close();
})();
