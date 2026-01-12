/*
 Image optimization script
 - Converts PNG/JPEG images in `images/` to WebP in `images/optimized/` using sharp
 - Updates references in `index.html` and `app.js` to point to optimized images (creates backups)

 Usage:
 1. Install dependencies: `npm install sharp` (in project root)
 2. Run: `node tools/optimize-images.js`

 The script is conservative: it only replaces references for files it actually converts.
*/

const fs = require('fs');
const path = require('path');

async function ensureSharp() {
  try {
    return require('sharp');
  } catch (err) {
    console.error('Missing dependency: sharp. Please run `npm install sharp` and re-run this script.');
    process.exit(1);
  }
}

async function getImageFiles(imagesDir) {
  const files = await fs.promises.readdir(imagesDir);
  return files.filter(f => /\.(png|jpe?g)$/i.test(f));
}

async function convertAll() {
  const sharp = await ensureSharp();
  const imagesDir = path.join(__dirname, '..', 'images');
  const optimizedDir = path.join(imagesDir, 'optimized');

  if (!fs.existsSync(imagesDir)) {
    console.error('images/ directory not found.');
    process.exit(1);
  }

  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  const imgs = await getImageFiles(imagesDir);
  if (imgs.length === 0) {
    console.log('No PNG/JPEG images found in images/. Nothing to convert.');
    return [];
  }

  const converted = [];

  for (const img of imgs) {
    const srcPath = path.join(imagesDir, img);
    const baseName = path.parse(img).name;
    const outName = `${baseName}.webp`;
    const outPath = path.join(optimizedDir, outName);

    try {
      await sharp(srcPath)
        .webp({ quality: 75 })
        .toFile(outPath);
      console.log(`Converted ${img} -> optimized/${outName}`);
      converted.push({ original: `images/${img}`, optimized: `images/optimized/${outName}` });
    } catch (e) {
      console.error(`Failed to convert ${img}:`, e.message || e);
    }
  }

  return converted;
}

function backupFile(filePath) {
  const bak = `${filePath}.bak`;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(filePath, bak);
    console.log(`Backup created: ${path.relative(process.cwd(), bak)}`);
  }
}

function updateReferences(converted) {
  if (!converted.length) return;

  const targets = [path.join(process.cwd(), 'index.html'), path.join(process.cwd(), 'app.js')];

  targets.forEach(file => {
    if (!fs.existsSync(file)) return;
    const text = fs.readFileSync(file, 'utf8');
    let updated = text;

    converted.forEach(pair => {
      // Escape slashes for regex
      const origEsc = pair.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(origEsc, 'g');
      updated = updated.replace(re, pair.optimized);
    });

    if (updated !== text) {
      backupFile(file);
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`Updated references in ${path.basename(file)}`);
    }
  });
}

(async () => {
  console.log('Starting image optimization...');
  const converted = await convertAll();
  if (converted.length) updateReferences(converted);
  console.log('Image optimization complete.');
})();
