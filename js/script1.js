document.addEventListener('DOMContentLoaded', () => {
    const numCircles = 10;
    const container = document.querySelector('.container');
    const shapeButton = document.getElementById('shapeButton');

    // Динамически создаем фигуры
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        container.appendChild(circle);
    }

    const circles = document.querySelectorAll('.circle');
    let shapeIndex = 0;
    const shapes = ["circle", "square", "rhombus", "triangle", "star"]; // Очередь форм

    // Следование за мышью
    document.addEventListener('mousemove', (event) => {
        let delay = 0;
        circles.forEach((circle) => {
            setTimeout(() => {
                circle.style.transform = `translate(${event.clientX - circle.clientWidth / 2}px, ${event.clientY - circle.clientHeight / 2}px)`;
            }, delay);
            delay += 35; // Чем больше delay, тем больше "шлейф" от фигур
        });
    });

    // Изменение формы
    shapeButton.addEventListener('click', () => {
        shapeIndex = (shapeIndex + 1) % shapes.length; // Переход к следующей форме

        circles.forEach(circle => {
            circle.className = "circle"; // Убираем все предыдущие классы
            circle.classList.add(shapes[shapeIndex]); // Добавляем новый класс формы
        });
    });
});

document.getElementById('invertButton').addEventListener('click', () => {
    const container = document.querySelector('.container');
    const circles = Array.from(container.children);
    
    // Инвертируем порядок элементов
    circles.reverse().forEach(circle => container.appendChild(circle));
});
