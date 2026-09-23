// Generates animated pixel-art SVGs for the GitHub profile README:
//   header.svg — name, roles, dithered ringed planet, twinkling stars, shooting star
//   footer.svg — "THANKS FOR VISITING · CONTINUE?" strip
// Everything is drawn with 1x1 rects on a coarse grid, scaled up with crisp edges,
// so it needs no fonts and stays pixel-perfect on GitHub.
// Usage: node assets/generate-banners.cjs assets
const fs = require('fs');
const out = process.argv[2];

const P = {
  void: '#05040c', deep: '#0d0a1f', night: '#181236', indigo: '#261b52', line: '#3a2872',
  purple: '#8446b6', pink: '#ff6f91', amber: '#ffd97a', orange: '#ffa56b', ink: '#f2f0ff',
  ice: '#9ff3ff', cyan: '#3fd0f0', blue: '#2388d0', dblue: '#18508f', navy: '#123166',
  green: '#39c47a', dgreen: '#1f7a55', lime: '#a8f06b', dim: '#6f6a92',
};

// 5x7 display font (only the glyphs the name needs)
const F7 = {
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};
// 3x5 small font
const F5 = {
  A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110',
  E: '111100110100111', F: '111100110100100', G: '011100101101011', H: '101101111101101',
  I: '111010010010111', K: '101101110101101', L: '100100100100111', M: '101111111101101',
  N: '110101101101101', O: '010101101101010', P: '110101110100100', R: '110101110101101',
  S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010',
  W: '101101111111101', Y: '101101010010010', Z: '111001010100111', ' ': '000000000000000',
  '-': '000000111000000', '.': '000000000000010', '&': '010101010101011', '·': '000000010000000',
  '?': '111001010000010', '>': '100010001010100', '1': '010110010010111', '9': '111101111001111',
  ':': '000010000010000', X: '101101010101101', ',': '000000000010100', '/': '001001010100100', '_': '000000000000111',
};

function makeCanvas(w, h) {
  const cells = new Map();
  return {
    w, h,
    set(x, y, c) {
      x = Math.round(x); y = Math.round(y);
      if (x >= 0 && y >= 0 && x < w && y < h) cells.set(`${x},${y}`, c);
    },
    get(x, y) { return cells.get(`${x},${y}`); },
    rects() {
      // merge horizontal runs, then emit one <path> per colour to keep the SVG small
      const byColor = new Map();
      for (let y = 0; y < h; y++) {
        let x = 0;
        while (x < w) {
          const c = cells.get(`${x},${y}`);
          if (!c) { x++; continue; }
          let run = 1;
          while (cells.get(`${x + run},${y}`) === c) run++;
          byColor.set(c, (byColor.get(c) || '') + `M${x} ${y}h${run}v1h-${run}z`);
          x += run;
        }
      }
      return [...byColor].map(([col, d]) => `<path fill="${col}" d="${d}"/>`).join('');
    },
  };
}

function text7(cv, str, x, y, color, scale = 1) {
  for (const ch of str) {
    const g = F7[ch] || F7[' '];
    g.forEach((row, gy) => [...row].forEach((b, gx) => {
      if (b === '1') for (let sy = 0; sy < scale; sy++) for (let sx = 0; sx < scale; sx++) cv.set(x + gx * scale + sx, y + gy * scale + sy, color);
    }));
    x += 6 * scale;
  }
}
function text5(cv, str, x, y, color) {
  for (const ch of str) {
    const g = F5[ch] || F5[' '];
    for (let i = 0; i < 15; i++) if (g[i] === '1') cv.set(x + (i % 3), y + Math.floor(i / 3), color);
    x += 4;
  }
  return x;
}
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bayer = (x, y) => BAYER[(y & 3) * 4 + (x & 3)] / 16;

// deterministic RNG
let seed = 1337;
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);

function starfield(cv, n, avoid = () => false) {
  const twinklers = [];
  for (let i = 0; i < n; i++) {
    const x = Math.floor(rnd() * cv.w), y = Math.floor(rnd() * cv.h);
    if (avoid(x, y)) continue;
    const r = rnd();
    const c = r < 0.6 ? P.dim : r < 0.8 ? P.ink : r < 0.9 ? P.ice : P.amber;
    if (rnd() < 0.3) twinklers.push({ x, y, c, big: rnd() < 0.3 });
    else cv.set(x, y, c);
  }
  return twinklers;
}
function twinkleSvg(twinklers) {
  return twinklers.map((t, i) => {
    const cls = `tw d${i % 5}`;
    if (!t.big) return `<rect class="${cls}" x="${t.x}" y="${t.y}" width="1" height="1" fill="${t.c}"/>`;
    return `<g class="${cls}" fill="${t.c}"><rect x="${t.x - 1}" y="${t.y}" width="3" height="1"/><rect x="${t.x}" y="${t.y - 1}" width="1" height="3"/></g>`;
  }).join('');
}
const STYLE = `<style>
.tw{animation:tw 2.4s steps(1) infinite}
.d1{animation-delay:.5s}.d2{animation-delay:1s}.d3{animation-delay:1.5s}.d4{animation-delay:1.9s}
@keyframes tw{50%{opacity:.15}}
.blink{animation:tw 1s steps(1) infinite}
.shoot{animation:shoot 7s linear infinite}
@keyframes shoot{0%{transform:translate(0,0);opacity:0}2%{opacity:1}14%{transform:translate(-120px,40px);opacity:0}100%{transform:translate(-120px,40px);opacity:0}}
@media (prefers-reduced-motion:reduce){.tw,.blink,.shoot{animation:none}}
</style>`;

// ------------------------------------------------------------------ header
{
  const W = 300, H = 78, S = 4;
  const cv = makeCanvas(W, H);
  // background with a faint dithered nebula band
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const band = Math.exp(-Math.pow((y - 50 + x * 0.12 - 20) / 18, 2)) * 0.9;
    // stepped bands (no per-pixel dither) keep the SVG small
    const v = band + (y % 2 ? 0 : 0.04);
    cv.set(x, y, v > 0.66 ? P.indigo : v > 0.36 ? P.night : v > 0.12 ? P.deep : P.void);
  }
  // planet
  const pcx = 250, pcy = 38, R = 21;
  const inPlanet = (x, y) => Math.hypot(x + 0.5 - pcx, y + 0.5 - pcy) <= R;
  const twinklers = starfield(cv, 150, (x, y) => (x < 205 && y > 10 && y < 64) || Math.hypot(x - pcx, y - pcy) < 34);
  const ring = (front) => {
    const tilt = -0.32;
    for (let a = 0; a < Math.PI * 2; a += 0.004) {
      if ((Math.sin(a) > 0) !== front) continue;
      for (let t = 0; t < 1; t += 0.34) {
        const rx = 36 - t * 7, ry = 8.5 - t * 1.6;
        const ex = Math.cos(a) * rx, ey = Math.sin(a) * ry;
        const x = pcx + ex * Math.cos(tilt) - ey * Math.sin(tilt);
        const y = pcy + ex * Math.sin(tilt) + ey * Math.cos(tilt);
        if (!front && inPlanet(Math.floor(x), Math.floor(y))) continue;
        const gap = t > 0.3 && t < 0.4;
        if (gap) continue;
        cv.set(Math.floor(x), Math.floor(y), t < 0.3 ? (Math.cos(a) < -0.2 ? P.orange : P.amber) : P.purple);
      }
    }
  };
  ring(false);
  for (let y = pcy - R - 1; y <= pcy + R + 1; y++) for (let x = pcx - R - 1; x <= pcx + R + 1; x++) {
    if (!inPlanet(x, y)) continue;
    const dx = (x + 0.5 - pcx) / R, dy = (y + 0.5 - pcy) / R;
    const dz = Math.sqrt(Math.max(0, 1 - dx * dx - dy * dy));
    let l = -dx * 0.55 - dy * 0.55 + dz * 0.63; // light from upper-left-front
    l += (bayer(x, y) - 0.5) * 0.28;
    const n = Math.sin(dx * 7.3 + dy * 3.1) + Math.sin(dy * 9.7 - dx * 2.3) * 0.8 + Math.sin((dx + dy) * 5.1 + 1.7) * 0.6;
    const land = n > 1.05;
    let c;
    if (land) c = l > 0.35 ? P.green : l > -0.05 ? P.dgreen : P.navy;
    else c = l > 0.72 ? P.ice : l > 0.42 ? P.cyan : l > 0.12 ? P.blue : l > -0.2 ? P.dblue : P.navy;
    // night-side city lights
    if (l < -0.05 && land && ((x * 7 + y * 13) % 5 === 0)) c = P.amber;
    cv.set(x, y, c);
  }
  // atmosphere rim
  for (let a = 0; a < Math.PI * 2; a += 0.01) {
    const x = Math.floor(pcx + Math.cos(a) * (R + 1)), y = Math.floor(pcy + Math.sin(a) * (R + 1));
    if (!inPlanet(x, y) && Math.cos(a) * -0.7 + Math.sin(a) * -0.7 > -0.2) cv.set(x, y, P.cyan);
  }
  ring(true);

  // text block
  text5(cv, 'PLAYER 1 READY · SFAX, TUNISIA', 14, 10, P.lime);
  cv.set(10, 11, P.lime); cv.set(11, 11, P.lime); cv.set(10, 12, P.lime); cv.set(11, 12, P.lime);
  const name = 'HAMZA BEN ISMAIL';
  text7(cv, name, 14 + 2, 22 + 2, P.purple, 2); // deep shadow
  text7(cv, name, 14 + 1, 22 + 1, P.pink, 2); // pink shadow
  text7(cv, name, 14, 22, P.ink, 2);
  text5(cv, 'FULL-STACK DEVELOPER · AI & AUTOMATION · GAME DEV', 14, 45, P.amber);
  const endX = text5(cv, '> HAMZABENISMAIL.CLOUD-IP.CC', 14, 56, P.cyan);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * S}" height="${H * S}" shape-rendering="crispEdges" role="img" aria-label="Hamza Ben Ismail — Full-stack developer, AI &amp; automation, game dev">
${STYLE}
${cv.rects()}
${twinkleSvg(twinklers)}
<rect class="blink" x="${endX + 1}" y="56" width="3" height="5" fill="${P.cyan}"/>
<g class="shoot"><rect x="200" y="4" width="1" height="1" fill="${P.ink}"/><rect x="201" y="4" width="3" height="1" fill="${P.ice}" opacity=".6"/><rect x="204" y="3" width="3" height="1" fill="${P.dim}" opacity=".5"/></g>
</svg>
`;
  fs.writeFileSync(`${out}/header.svg`, svg);
  console.log('header.svg', svg.length);
}

// ------------------------------------------------------------------ footer
{
  seed = 4242;
  const W = 300, H = 26, S = 4;
  const cv = makeCanvas(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) cv.set(x, y, y === 0 ? P.line : P.void);
  const msg = 'THANKS FOR VISITING · CONTINUE?';
  const mw = msg.length * 4;
  const mx = Math.floor((W - mw - 8) / 2);
  const twinklers = starfield(cv, 60, (x, y) => y < 2 || (x > mx - 6 && x < mx + mw + 14 && y > 6 && y < 20));
  const endX = text5(cv, msg, mx, 11, P.amber);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * S}" height="${H * S}" shape-rendering="crispEdges" role="img" aria-label="Thanks for visiting">
${STYLE}
${cv.rects()}
${twinkleSvg(twinklers)}
<g class="blink" fill="${P.pink}">${(() => { const c = makeCanvas(W, H); text5(c, '9', endX + 3, 11, P.pink); return c.rects(); })()}</g>
</svg>
`;
  fs.writeFileSync(`${out}/footer.svg`, svg);
  console.log('footer.svg', svg.length);
}
