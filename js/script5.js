const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Настройка размеров канвы
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let animationType = 'waves';
let settingsVisible = false;

// Функция для переключения отображения панели настроек
function toggleSettings() {
  settingsVisible = !settingsVisible;
  const settingsPanel = document.getElementById("settings");
  settingsPanel.style.display = settingsVisible ? 'block' : 'none';
}

// Функция для смены анимации и отображения соответствующих настроек
function setAnimation(type) {
  animationType = type;
  toggleSettings();
  document.querySelectorAll('.settings-section').forEach(section => section.style.display = 'none');
  if (type === 'waves') document.getElementById('wave-settings').style.display = 'block';
  else if (type === 'grid') document.getElementById('grid-settings').style.display = 'block';
  else if (type === 'fractals') document.getElementById('fractal-settings').style.display = 'block';
  else if (type === 'kaleidoscope') document.getElementById('kaleido-settings').style.display = 'block';
  else if (type === 'particles') document.getElementById('particle-settings').style.display = 'block';
}

// Получение элементов настроек
const waveColorInput = document.getElementById('wave-color');
const waveSpeedSlider = document.getElementById('wave-speed');
const waveAmplitudeSlider = document.getElementById('wave-amplitude');
const waveFrequencySlider = document.getElementById('wave-frequency');
const waveOffsetSlider = document.getElementById('wave-offset');
const waveDirectionSelect = document.getElementById('wave-direction');

const gridColorInput = document.getElementById("grid-color");
const gridSizeSlider = document.getElementById("grid-size");
const gridSpeedSlider = document.getElementById("grid-speed");

const fractalColorInput = document.getElementById("fractal-color");
const fractalSizeSlider = document.getElementById("fractal-size");

const kaleidoSpeedSlider = document.getElementById("kaleido-speed");
const kaleidoRadiusSlider = document.getElementById("kaleido-radius");

const particleColorInput = document.getElementById("particle-color");
const particleSpeedSlider = document.getElementById("particle-speed");
const particleSizeSlider = document.getElementById("particle-size");
const particleCountSlider = document.getElementById("particle-count");

// Глобальные переменные
function getWaveSettings() {
  return {
    color: waveColorInput.value,
    speed: parseFloat(waveSpeedSlider.value),
    amplitude: parseFloat(waveAmplitudeSlider.value),
    frequency: parseInt(waveFrequencySlider.value),
    offset: parseInt(waveOffsetSlider.value),
    direction: waveDirectionSelect.value
  };
}
function getGridSettings() {
  return {
    color: gridColorInput.value,
    size: parseInt(gridSizeSlider.value),
    speed: parseFloat(gridSpeedSlider.value)
  };
}
function getFractalSettings() {
  return {
    color: fractalColorInput.value,
    size: parseInt(fractalSizeSlider.value)
  };
}
function getKaleidoSettings() {
  return {
    speed: parseFloat(kaleidoSpeedSlider.value),
    radius: parseInt(kaleidoRadiusSlider.value)
  };
}
function getParticleSettings() {
  return {
    color: particleColorInput.value,
    speed: parseFloat(particleSpeedSlider.value),
    size: parseFloat(particleSizeSlider.value),
    count: parseInt(particleCountSlider.value)
  };
}

// --- Анимации ---
// Волны
function drawWaves() {
  const { color, speed, amplitude, frequency, offset, direction } = getWaveSettings();
  
  // Устанавливаем цвет
  ctx.fillStyle = color;
  
  // Направление волн: если 'horizontal', то волны будут двигаться слева направо, иначе по вертикали
  const waveDirection = direction === 'horizontal' ? 1 : -1;
  
  for (let i = 0; i < canvas.width; i += 10) {
    // Частота волн
    let waveFrequency = frequency * Math.PI / 180;  // Преобразуем в радианы для использования в синусе

    // Двигаем волны по времени
    let height = Math.sin((i + performance.now() / (100 - speed * 20) + offset) * waveFrequency) * amplitude + 50;
    
    // Корректируем движение волн в зависимости от направления
    if (waveDirection === 1) {
      ctx.fillRect(i, canvas.height / 2 - height / 2, 5, height);
    } else {
      ctx.fillRect(i, canvas.height / 2 + height / 2, 5, height);
    }
  }
}

// 3D Сетка
function drawGrid() {
  const { color, size, speed } = getGridSettings();
  ctx.strokeStyle = color;
  for (let x = 0; x < canvas.width; x += size) {
    for (let y = 0; y < canvas.height; y += size) {
      let offset = Math.sin((x + y + performance.now() / (200 - speed * 100)) * 0.1) * 10;
      ctx.strokeRect(x + offset, y + offset, size - 2, size - 2);
    }
  }
}

// Фракталы
function drawFractals() {
  const { color, size } = getFractalSettings();
  ctx.strokeStyle = color;
  function drawBranch(x, y, length, angle) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    const x2 = x + length * Math.cos(angle);
    const y2 = y + length * Math.sin(angle);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (length > 10) {
      drawBranch(x2, y2, length * 0.7, angle - Math.PI / 4);
      drawBranch(x2, y2, length * 0.7, angle + Math.PI / 4);
    }
  }
  drawBranch(canvas.width / 2, canvas.height, size, -Math.PI / 2);
}

// Калейдоскоп
function drawKaleidoscope() {
  const { speed, radius } = getKaleidoSettings();
  ctx.strokeStyle = `hsl(${performance.now() / speed % 360}, 100%, 50%)`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    let angle = Math.PI / 3 * i + performance.now() / 1000;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, angle, angle + Math.PI / 3);
    ctx.stroke();
  }
}

// Частицы
function drawParticles() {
  const { color, speed, size, count } = getParticleSettings();
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = Math.random() * speed - speed / 2;
    let dy = Math.random() * speed - speed / 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Анимация
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (animationType === 'waves') drawWaves();
  else if (animationType === 'grid') drawGrid();
  else if (animationType === 'fractals') drawFractals();
  else if (animationType === 'kaleidoscope') drawKaleidoscope();
  else if (animationType === 'particles') drawParticles();
  requestAnimationFrame(animate);
}

animate();
