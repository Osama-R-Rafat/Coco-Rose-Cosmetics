Image Optimization Script

This project includes a helper script to batch-convert PNG/JPEG images in `images/` to WebP and place them in `images/optimized/`.

Usage

1. Install dependencies in the project root:

```bash
npm install sharp
```

2. Run the optimizer:

```bash
node tools/optimize-images.js
```

What it does

- Converts `.png` and `.jpg/.jpeg` files found in `images/` to WebP into `images/optimized/`.
- Creates backups of any files it updates (adds `.bak` files for `index.html` and `app.js` before modifying them).
- Replaces references to `images/<name>.png|jpg` in `index.html` and `app.js` with `images/optimized/<name>.webp` only for files it successfully converted.

Notes

- Review the `.bak` files if you want to revert changes.
- Adjust quality settings in `tools/optimize-images.js` if you want higher/lower fidelity.
