const grid = document.getElementById('grid');
const cellSize = 20;
const cols = Math.floor(window.innerWidth / cellSize);
const rows = Math.floor(window.innerHeight / cellSize);
const cells = [];

for (let y = 0; y < rows; y++) {
  cells[y] = [];
  for (let x = 0; x < cols; x++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
    cells[y][x] = cell;
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 155 + 100);
  const g = Math.floor(Math.random() * 155 + 100);
  const b = Math.floor(Math.random() * 155 + 100);
  return `rgb(${r}, ${g}, ${b})`;
}

const waves = [];

grid.addEventListener('click', (e) => {
  const rect = grid.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);
  waves.push({
    x,
    y,
    start: performance.now(),
    color: getRandomColor()
  });
});

function animate(time) {
  const radiusSpeed = 0.25; // медленнее волна
  const waveDuration = 12000;
  const waveWidth = 4; // толщина кольца (в клетках)

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let baseColor = "#111";
      let brightness = 0;

      for (const wave of waves) {
        const dx = x - wave.x;
        const dy = y - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = (time - wave.start) * radiusSpeed / cellSize;

        const delta = Math.abs(dist - radius);
        if (delta < waveWidth) {
          // Чем ближе к центру кольца — тем ярче
          const intensity = 1 - delta / waveWidth;
          brightness = Math.max(brightness, intensity);
          baseColor = wave.color;
        }
      }

      if (brightness > 0) {
        const match = baseColor.match(/\d+/g);
        const r = Math.floor(parseInt(match[0]) * brightness);
        const g = Math.floor(parseInt(match[1]) * brightness);
        const b = Math.floor(parseInt(match[2]) * brightness);
        cells[y][x].style.backgroundColor = `rgb(${r},${g},${b})`;
      } else {
        cells[y][x].style.backgroundColor = "#111";
      }
    }
  }

  while (waves.length && time - waves[0].start > waveDuration) {
    waves.shift();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
