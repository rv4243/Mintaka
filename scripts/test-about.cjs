const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  :root {
    --navy-950: #06111f;
    --navy-900: #0a1a2f;
    --teal-600: #0d9488;
    --teal-50: #f0fdfa;
    --slate-50: #f8fafc;
    --slate-100: #f1f5f9;
    --slate-200: #e2e8f0;
    --slate-300: #cbd5e1;
    --slate-600: #475569;
    --border-subtle: #e2e8f0;
    --font-heading: "Plus Jakarta Sans", sans-serif;
    --font-body: "Inter", sans-serif;
  }
  body {
    margin: 0;
    padding: 60px 40px;
    background: #ffffff;
    font-family: var(--font-body);
    color: #0f172a;
  }
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }
  .section-header {
    margin-bottom: 40px;
  }
  .section-title {
    font-size: 2.4rem;
    font-weight: 800;
    color: var(--navy-950);
    margin: 0 0 10px 0;
    letter-spacing: -0.03em;
  }
  .section-lead {
    font-size: 1.1rem;
    color: #475569;
    margin: 0;
  }
  
  .about-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: stretch;
  }
  
  /* Left Hero Narrative Card */
  .about-narrative-card {
    background-color: var(--slate-50);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .about-kicker {
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--teal-600);
    margin-bottom: 8px;
    display: inline-block;
  }
  .about-subhead {
    font-size: 1.45rem;
    font-weight: 800;
    color: var(--navy-950);
    margin: 0 0 14px 0;
    letter-spacing: -0.02em;
  }
  .about-paragraph {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #334155;
    margin: 0 0 14px 0;
  }
  .about-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid var(--border-subtle);
    margin-top: 20px;
  }
  .about-stat-item {
    display: flex;
    flex-direction: column;
  }
  .about-stat-val {
    font-size: 1.65rem;
    font-weight: 800;
    color: var(--navy-950);
    line-height: 1.1;
  }
  .about-stat-lbl {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    margin-top: 4px;
  }

  /* Right Standards 2x2 Grid */
  .about-standards-panel {
    display: flex;
    flex-direction: column;
  }
  .about-standards-head {
    margin-bottom: 16px;
  }
  .about-standards-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--navy-950);
    margin: 0 0 4px 0;
  }
  .about-standards-caption {
    font-size: 0.88rem;
    color: #64748b;
    margin: 0;
  }
  .about-standards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    flex: 1;
  }
  .about-card {
    background-color: #ffffff;
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 22px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .about-card:hover {
    transform: translateY(-2px);
    border-color: var(--teal-600);
    box-shadow: 0 10px 24px -6px rgba(13, 148, 136, 0.12);
  }
  .about-card__icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background-color: var(--teal-50);
    color: var(--teal-600);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }
  .about-card__title {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--navy-950);
    margin: 0 0 6px 0;
    line-height: 1.3;
  }
  .about-card__desc {
    font-size: 0.84rem;
    line-height: 1.5;
    color: #475569;
    margin: 0;
  }
</style>
</head>
<body>
  <div class="container">
    <header class="section-header">
      <h2 class="section-title">About Mintaka Polymers</h2>
      <p class="section-lead">
        Supplying certified PP, PE, and PVC resins to precision converters across India and 60+ Countries since 1994.
      </p>
    </header>

    <div class="about-layout">
      <!-- Left Column: Story & Metrics Card -->
      <div class="about-narrative-card">
        <div>
          <span class="about-kicker">Est. 1994 // SIPCOT Industrial Complex, Hosur</span>
          <h3 class="about-subhead">Thirty Years of Polymer Reliability</h3>
          <p class="about-paragraph">
            Operating from our primary distribution hub in Hosur, we manage factory-direct allocations for blow molders, pipe extruders, and compounding facilities.
          </p>
          <p class="about-paragraph">
            Every lot is guaranteed to ±0.2 MFI tolerance, documented with lot-specific Certificates of Analysis, and dispatched through dedicated rail and road freight corridors.
          </p>
        </div>

        <div class="about-stats-grid">
          <div class="about-stat-item">
            <span class="about-stat-val">1994</span>
            <span class="about-stat-lbl">Established Year</span>
          </div>
          <div class="about-stat-item">
            <span class="about-stat-val">180,000+ MT</span>
            <span class="about-stat-lbl">Annual Throughput</span>
          </div>
          <div class="about-stat-item">
            <span class="about-stat-val">60+</span>
            <span class="about-stat-lbl">Export Markets</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Converter Standards 2x2 Grid -->
      <div class="about-standards-panel">
        <div class="about-standards-head">
          <h3 class="about-standards-title">Converter Partnership Standards</h3>
          <p class="about-standards-caption">Strict operational controls designed to protect your manufacturing line.</p>
        </div>

        <div class="about-standards-grid">
          <div class="about-card">
            <div class="about-card__icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31L4.62 18.5a2 2 0 0 0 1.73 3h11.3a2 2 0 0 0 1.73-3L14 9.31V2"/></svg>
            </div>
            <h4 class="about-card__title">In-House QA Facility</h4>
            <p class="about-card__desc">Batch MFI, density, tensile strength, and moisture verified before dispatch.</p>
          </div>

          <div class="about-card">
            <div class="about-card__icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/></svg>
            </div>
            <h4 class="about-card__title">Guaranteed Buffer Stock</h4>
            <p class="about-card__desc">Dedicated warehouse reserves protecting your plant from line stops.</p>
          </div>

          <div class="about-card">
            <div class="about-card__icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h4 class="about-card__title">Mold & R&D Support</h4>
            <p class="about-card__desc">Polymer chemists assisting with tool shrinkage and cycle optimization.</p>
          </div>

          <div class="about-card">
            <div class="about-card__icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>
            <h4 class="about-card__title">Compliance Records</h4>
            <p class="about-card__desc">Full lot traceability with BIS, REACH, RoHS, and FDA food-contact standards.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('.taste-skill/test-about.html', html);
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlUrl = 'file:///' + path.resolve('.taste-skill/test-about.html').replace(/\\/g, '/');
const outImg = path.resolve('.taste-skill', 'inspect', 'test-about.png');

execFileSync(chromePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--allow-file-access-from-files',
  '--enable-local-file-accesses',
  '--window-size=1360,750',
  `--screenshot=${outImg}`,
  htmlUrl
]);
console.log('Saved test-about.png');
