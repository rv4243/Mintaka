const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const inspectDir = path.resolve(__dirname, '..', '.taste-skill', 'inspect');
fs.mkdirSync(inspectDir, { recursive: true });

const htmlFile = path.resolve(__dirname, '..', 'dist', 'index.html').replace(/\\/g, '/');
const fileUrl = 'file:///' + htmlFile;

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const viewports = [
  { name: 'desktop-1440.png', width: 1440, height: 1200 },
  { name: 'tablet-768.png', width: 768, height: 1024 },
  { name: 'mobile-390.png', width: 390, height: 900 }
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
    ], { timeout: 30000 });
    console.log(`Saved screenshot: ${vp.name}`);
  } catch (err) {
    console.error(`Failed ${vp.name}:`, err.message);
  }
}
console.log('Capture finished.');
