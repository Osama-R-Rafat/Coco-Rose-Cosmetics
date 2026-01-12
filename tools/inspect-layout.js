const puppeteer = require('puppeteer');
const url = process.argv[2] || 'file:///f:/cosmatics/index.html';
const viewports = [
  {name: 'mobile-375', width: 375, height: 812},
  {name: 'mobile-414', width: 414, height: 896},
  {name: 'tablet-768', width: 768, height: 1024}
];
(async()=>{
  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  for (const vp of viewports) {
    await page.setViewport({width: vp.width, height: vp.height, isMobile: true});
    await page.goto(url, {waitUntil: 'networkidle2'});
    const rects = await page.evaluate(()=>{
      const sel = (s)=>{const el=document.querySelector(s); if(!el) return null; const r=el.getBoundingClientRect(); return {x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height)} };
      return {
        body: sel('body'),
        html: sel('html'),
        container: sel('.container'),
        hero: sel('.hero'),
        heroContent: sel('.hero-content'),
        productsGrid: sel('.products-grid') || sel('.products'),
        firstProduct: (()=>{const el=document.querySelector('.product-card'); if(!el) return null; const r=el.getBoundingClientRect(); return {x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height)} })(),
      };
    });
    console.log(JSON.stringify({viewport: vp.name, rects}, null, 2));
    await page.screenshot({path:`tools/screenshots/inspect-${vp.name}.png`, fullPage:true});
  }
  await browser.close();
})();
