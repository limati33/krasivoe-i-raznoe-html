const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

const spacing = 25;
const cols = Math.floor(w / spacing);
const rows = Math.floor(h / spacing);
const particles = [];

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const px = x * spacing + spacing / 2;
    const py = y * spacing + spacing / 2;
    particles.push({
      x: px,
      y: py,
      ox: px,
      oy: py,
      vx: 0,
      vy: 0
    });
  }
}

const gravityPoints = [];
let mouse = { x: 0, y: 0, down: false };
let ripples = [];

canvas.addEventListener('mousedown', (e) => {
  mouse.down = true;
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  gravityPoints.push({
    x: e.clientX,
    y: e.clientY,
    time: performance.now(),
    force: e.button === 2 ? -1 : 1
  });

  createRipple(e.clientX, e.clientY, e.button === 2 ? 'red' : 'cyan');
  playClickSound(e.button === 2 ? 300 : 600);
});

canvas.addEventListener('mouseup', () => {
  mouse.down = false;
});

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener('contextmenu', e => e.preventDefault());

function createRipple(x, y, color) {
  ripples.push({
    x, y, color,
    radius: 0,
    maxRadius: 600
  });
}

function playClickSound(freq) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

function animate(time) {
  ctx.clearRect(0, 0, w, h);

  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    const alpha = 1 - r.radius / r.maxRadius;

    // внешнее кольцо
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
    ctx.lineWidth = 8; // толще
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.stroke();

    // внутренняя яркая часть
    const gradient = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
    gradient.addColorStop(0, `rgba(0,255,255,${alpha * 0.5})`);
    gradient.addColorStop(1, 'rgba(0,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.fill();

    r.radius += 6;
    if (r.radius > r.maxRadius) ripples.splice(i, 1);
  }

  for (const p of particles) {
    for (const g of gravityPoints) {
      const dx = g.x - p.x;
      const dy = g.y - p.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);
      const force = Math.min(30000 / (distSq + 100), 4) * g.force;

      const age = time - g.time;
      if (age > 1000) continue;

      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }

    if (mouse.down) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.min(20000 / (dist * dist + 100), 2);
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }

    p.vx += (p.ox - p.x) * 0.01;
    p.vy += (p.oy - p.y) * 0.01;
    p.vx *= 0.9;
    p.vy *= 0.9;
    p.x += p.vx;
    p.y += p.vy;

    ctx.beginPath();
    ctx.fillStyle = '#0ff';
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  while (gravityPoints.length && time - gravityPoints[0].time > 1500) {
    gravityPoints.shift();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
window.addEventListener('resize', () => location.reload());
