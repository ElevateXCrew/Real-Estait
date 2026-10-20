const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const pub = path.join(process.cwd(), "public");
const files = [
  "about.png",
  "hero-back-1.png",
  "hero-back-2.png",
  "hero-back-3.png",
  "hero-back-4.png",
  "hero-back-5.png",
  "hero-back-6.png",
  "cta-image.png",
  "testimonials-bg.png",
  "logo.png",
];

(async () => {
  for (const f of files) {
    const src = path.join(pub, f);
    if (!fs.existsSync(src)) continue;
    const out = path.join(pub, f.replace(/\.png$/, ".webp"));
    const before = fs.statSync(src).size;
    await sharp(src, { limitInputPixels: false })
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    const after = fs.statSync(out).size;
    console.log(`${f}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB`);
  }
})();
