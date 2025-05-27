document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll('.circle');

  circles.forEach((circle, i) => {
    const baseScale = 1;
    const amplitude = 0.4 + i * 0.05;     // заметная пульсация
    const speed = 0.01 + i * 0.002;       // быстрая анимация
    let t = Math.random() * 1000;

    function animate() {
      t += speed;
      const scale = baseScale + Math.sin(t) * amplitude;
      circle.style.transform = `scale(${scale})`;
      requestAnimationFrame(animate);
    }

    animate();
  });
});
