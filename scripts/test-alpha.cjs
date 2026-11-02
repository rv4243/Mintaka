const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const html = `<!DOCTYPE html>
<html>
<body style="background: red; padding: 40px; display: flex; gap: 20px;">
  <img src="file:///C:/Users/rvasa/.gemini/antigravity/brain/af1efb2b-9f20-4da5-8a8a-64df98668543/.user_uploaded/media_1793621924830_a80d038b.png" style="width: 300px;">
  <img src="file:///C:/Users/rvasa/.gemini/antigravity/brain/af1efb2b-9f20-4da5-8a8a-64df98668543/.user_uploaded/media_1793621924851_6ad40b9e.png" style="width: 300px;">
  <img src="file:///C:/Users/rvasa/.gemini/antigravity/brain/af1efb2b-9f20-4da5-8a8a-64df98668543/.user_uploaded/media_1793621924869_7a1c7966.png" style="width: 300px;">
</body>
</html>`;
fs.writeFileSync('.taste-skill/test-alpha.html', html);
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlUrl = 'file:///' + path.resolve('.taste-skill/test-alpha.html').replace(/\\/g, '/');
const outImg = path.resolve('.taste-skill', 'inspect', 'test-alpha.png');
execFileSync(chromePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--allow-file-access-from-files',
  '--enable-local-file-accesses',
  '--window-size=1000,500',
  `--screenshot=${outImg}`,
  htmlUrl
]);
console.log('Saved test-alpha.png');
