// --- Звёзды ---
const stars = document.querySelector('.stars');
const count = 100;

for (let i = 0; i < count; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  star.style.animationDuration = `${2 + Math.random() * 4}s`;
  stars.appendChild(star);
}

// --- Меняющийся текст ---
const quotes = [
  "Her will shines even in the darkest night",
  "Kiana Kaslana — a light reborn from shadow",
  "Fate may fall, but she stands again",
  "She is the moon in a shattered sky"
];

const textElem = document.querySelector('.kiana-glow p');
let index = 0;

function changeQuote() {
  textElem.classList.add('fade-out');
  setTimeout(() => {
    index = (index + 1) % quotes.length;
    textElem.textContent = quotes[index];
    textElem.classList.remove('fade-out');
    textElem.classList.add('fade-in');
    setTimeout(() => textElem.classList.remove('fade-in'), 1000);
  }, 1000);
}

setInterval(changeQuote, 6000); // Каждые 6 секунд

// --- Кометы ---
function createComet() {
  const comet = document.createElement('div');
  comet.className = 'comet';

  const startX = window.innerWidth - Math.random() * 100;
  const startY = Math.random() * 100;

  comet.style.top = `${startY}px`;
  comet.style.left = `${startX}px`;
  comet.style.animationDuration = `${1.5 + Math.random()}s`;

  document.body.appendChild(comet);

  setTimeout(() => comet.remove(), 3000);
}

setInterval(() => {
  if (Math.random() < 0.7) createComet();
}, 5000);
