const container = document.getElementById('container');
const colorPicker = document.getElementById('colorPicker');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear');
let drawing = false;
let eraseMode = false;

container.addEventListener('mousedown', () => drawing = true);
container.addEventListener('mouseup', () => drawing = false);
container.addEventListener('mousemove', function(e) {
    if (!drawing) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createShards(x, y);
});

eraserButton.addEventListener('click', () => eraseMode = !eraseMode);
clearButton.addEventListener('click', () => container.innerHTML = '');

function createShards(x, y) {
    for (let i = 0; i < 3; i++) {
        const shard = document.createElement('div');
        shard.className = 'shard';
        shard.style.left = `${x + Math.random() * 20 - 10}px`;
        shard.style.top = `${y + Math.random() * 20 - 10}px`;
        shard.style.width = `${Math.random() * 15 + 5}px`;
        shard.style.height = `${Math.random() * 15 + 5}px`;
        shard.style.background = eraseMode ? '#333' : colorPicker.value;
        shard.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(shard);
    }
}