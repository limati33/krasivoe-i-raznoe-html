const input = document.getElementById('thoughtInput');

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && input.value.trim()) {
    echoThought(input.value.trim());
    input.value = '';
  }
});

function echoThought(text) {
  const span = document.createElement('span');
  span.className = 'echo';
  span.textContent = text;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  span.style.left = `${centerX}px`;
  span.style.top = `${centerY}px`;

  document.body.appendChild(span);

  // Увеличиваем длительность на основе длины текста
  const duration = 3000 + text.length * 100;

  setTimeout(() => {
    span.style.transform = `translate(-50%, -50%) scale(1.4)`;
    span.style.opacity = '0';
  }, 50);

  setTimeout(() => {
    span.remove();
  }, duration);
}
