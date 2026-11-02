const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const cardsData = [
  {
    id: "packaging",
    title: "Flexible & Rigid Packaging",
    stat: "42k MT/yr",
    desc: "Barrier films, thin-wall food containers, and closures tuned for ultra-fast cycle times.",
    tags: ["PP RC2005", "LDPE 24FS040", "LLDPE 0120HR"],
    img: "../public/products/thinwall-food-container.jpg",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #0d2238 90%)",
    bgCard: "#0d2238"
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Utilities",
    stat: "IS & ISO Certified",
    desc: "Potable water mains, conduits, gas lines, and high-pressure compression pipe fittings.",
    tags: ["HDPE P100BLK", "PVC SG-5 (K67)", "PVC SG-7"],
    img: "../public/products/pipe-fitting-tee.jpg",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #0e1e2d 90%)",
    bgCard: "#0e1e2d"
  },
  {
    id: "automotive",
    title: "Automotive & Transport",
    stat: "-20°C Impact",
    desc: "Lightweight structural gears, battery cases, and bumper fascia with certified ductility.",
    tags: ["PP C120MN", "PP H110MA", "PVC SG-3"],
    img: "../public/products/industrial-gear.jpg",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #122234 90%)",
    bgCard: "#122234"
  },
  {
    id: "agriculture",
    title: "Agriculture & Water",
    stat: "UV-Stabilized",
    desc: "Drip irrigation laterals, micro-sprinklers, greenhouse films, and chemical tanks.",
    tags: ["LLDPE 0120HR", "HDPE B52A", "PP H030SG"],
    img: "../public/products/sprinkler-irrigation.jpg",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #0d2723 90%)",
    bgCard: "#0d2723"
  },
  {
    id: "healthcare",
    title: "Medical & Hygiene",
    stat: "USP Class VI",
    desc: "Sterile syringes, diagnostic cassettes, fluid perfusion tubing, and meltblown media.",
    tags: ["PP RC2005", "PP H110MA", "PVC SG-3"],
    img: "../public/products/medical-specimen-device.svg",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #0b232f 90%)",
    bgCard: "#0b232f"
  },
  {
    id: "consumer",
    title: "Consumer & Appliances",
    stat: "High-Gloss Finish",
    desc: "Rigid junction enclosures, appliance housings, durable crates, and storage bins.",
    tags: ["PP H110MA", "PP C120MN", "HDPE B52A"],
    img: "../public/products/electrical-junction-box.jpg",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #112038 90%)",
    bgCard: "#112038"
  }
];

const cardsHtml = cardsData.map(c => `
  <div class="luxury-card" style="--card-bg: ${c.bgCard}; background: ${c.bgCard}">
    <div class="luxury-card__top" style="background: ${c.bgTop}">
      <img src="${c.img}" alt="${c.title}" class="luxury-card__img">
      <div class="luxury-card__fade"></div>
    </div>
    <div class="luxury-card__dots">
      <span class="luxury-dot active"></span>
      <span class="luxury-dot"></span>
      <span class="luxury-dot"></span>
    </div>
    <div class="luxury-card__content">
      <div class="luxury-card__header">
        <h3 class="luxury-card__title">${c.title}</h3>
        <span class="luxury-card__badge">${c.stat}</span>
      </div>
      <p class="luxury-card__desc">${c.desc}</p>
      <div class="luxury-card__tags">
        ${c.tags.map(t => `<button type="button" class="luxury-tag">${t} ↗</button>`).join('')}
      </div>
      <button type="button" class="luxury-btn">Explore Specifications</button>
    </div>
  </div>
`).join('');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    padding: 60px 40px;
    background: #06111f;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #fff;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    max-width: 1260px;
    margin: 0 auto;
  }
  .luxury-card {
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 24px 50px -10px rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.08);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s, border-color 0.25s;
    position: relative;
  }
  .luxury-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 36px 70px -12px rgba(0,0,0,0.7);
    border-color: rgba(20, 184, 166, 0.4);
  }
  .luxury-card__top {
    height: 235px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .luxury-card__img {
    max-width: 82%;
    max-height: 82%;
    object-fit: contain;
    mix-blend-mode: multiply;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 50%, transparent 92%);
    mask-image: radial-gradient(ellipse at 50% 50%, black 50%, transparent 92%);
  }
  .luxury-card:hover .luxury-card__img {
    transform: scale(1.09);
  }
  .luxury-card__fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 65px;
    background: linear-gradient(to bottom, transparent 0%, var(--card-bg) 100%);
    pointer-events: none;
  }
  .luxury-card__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: -14px 0 14px 0;
    position: relative;
    z-index: 2;
  }
  .luxury-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transition: all 0.2s;
  }
  .luxury-dot.active {
    width: 18px;
    border-radius: 4px;
    background: rgba(255,255,255,0.9);
  }
  .luxury-card__content {
    padding: 14px 24px 26px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .luxury-card__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }
  .luxury-card__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: #ffffff;
    letter-spacing: -0.02em;
    line-height: 1.25;
  }
  .luxury-card__badge {
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(0,0,0,0.35);
    font-size: 0.78rem;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
    border: 1px solid rgba(255,255,255,0.12);
    letter-spacing: 0.02em;
  }
  .luxury-card__desc {
    font-size: 0.88rem;
    line-height: 1.5;
    color: #94a3b8;
    margin: 0 0 18px 0;
    flex: 1;
  }
  .luxury-card__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 22px;
  }
  .luxury-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
    font-size: 0.78rem;
    font-weight: 600;
    color: #e2e8f0;
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }
  .luxury-tag:hover {
    background: #0d9488;
    color: #ffffff;
    border-color: #0d9488;
    transform: translateY(-1px);
  }
  .luxury-btn {
    display: block;
    width: 100%;
    padding: 13px 0;
    border-radius: 999px;
    background: #ffffff;
    color: #06111f;
    font-size: 0.95rem;
    font-weight: 700;
    text-align: center;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    transition: transform 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s;
  }
  .luxury-btn:hover {
    background: #f1f5f9;
    color: #0d9488;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,255,255,0.25);
  }
  .luxury-btn:active {
    transform: translateY(1px);
  }
</style>
</head>
<body>
  <div class="grid">
    ${cardsHtml}
  </div>
</body>
</html>`;

fs.writeFileSync('.taste-skill/test-cards.html', html);
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlUrl = 'file:///' + path.resolve('.taste-skill/test-cards.html').replace(/\\/g, '/');
const outImg = path.resolve('.taste-skill', 'inspect', 'test-6-cards-masked.png');

execFileSync(chromePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--allow-file-access-from-files',
  '--enable-local-file-accesses',
  '--window-size=1360,1150',
  `--screenshot=${outImg}`,
  htmlUrl
]);
console.log('Saved test-6-cards-masked.png');
