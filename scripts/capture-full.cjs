const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const inspectDir = path.resolve(__dirname, '..', '.taste-skill', 'inspect');
fs.mkdirSync(inspectDir, { recursive: true });

const htmlFile = path.resolve(__dirname, '..', 'dist', 'index.html').replace(/\\/g, '/');
const fileUrl = 'file:///' + htmlFile;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const viewports = [
  { name: 'desktop-full.png', width: 1440, height: 8200 },
  { name: 'tablet-full.png', width: 768, height: 9500 },
  { name: 'mobile-full.png', width: 390, height: 11000 }
];

for (const vp of viewports) {
  try {
    const outPath = path.join(inspectDir, vp.name);
    execFileSync(chromePath, [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--allow-file-access-from-files',
      '--enable-local-file-accesses',
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${outPath}`,
      fileUrl
    ], { timeout: 25000 });
    console.log(`Saved full screenshot: ${vp.name}`);
  } catch (err) {
    console.error(`Failed ${vp.name}:`, err.message);
  }
}
console.log('Finished full captures.');
