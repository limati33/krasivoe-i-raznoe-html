const asciiArtElement = document.getElementById("ascii-art");

const cubeVertices = [
    [-0.45, -0.45, -0.45], [ 0.45, -0.45, -0.45], [ 0.45,  0.45, -0.45], [-0.45,  0.45, -0.45], // задняя грань
    [-0.45, -0.45,  0.45], [ 0.45, -0.45,  0.45], [ 0.45,  0.45,  0.45], [-0.45,  0.45,  0.45]  // передняя грань
];

const cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // задняя грань
    [4, 5], [5, 6], [6, 7], [7, 4], // передняя грань
    [0, 4], [1, 5], [2, 6], [3, 7]  // соединяющие рёбра
];

const edgeSymbols = {
    horizontal: '-',
    vertical: '|',
    diagonal: '/',
    backslash: '\\',
    corner: '+'
};

let rotationX = 0;
let rotationY = 0;

// Функция для вращения в 3D
function rotate(vertices) {
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    return vertices.map(vertex => {
        const [x, y, z] = vertex;
        
        // Вращение вокруг оси X
        const yRot = y * cosX - z * sinX;
        const zRot = y * sinX + z * cosX;
        // Вращение вокруг оси Y
        const xRot = x * cosY + zRot * sinY;
        const zFinal = -x * sinY + zRot * cosY;

        return [xRot, yRot, zFinal];
    });
}

// Функция для проекции 3D в 2D (на экран)
function project(vertex) {
    const [x, y, z] = vertex;
    const scale = 150 / (z + 5); // Масштабирование для глубины (уменьшено еще больше)
    const xProj = Math.round(x * scale + 40);
    const yProj = Math.round(y * scale + 10);
    return [xProj, yProj];
}

// Алгоритм Брезенхема для рисования линий
function drawLine(x1, y1, x2, y2, symbol, output) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        // Ограничение координат
        if (x1 >= 0 && x1 < output[0].length && y1 >= 0 && y1 < output.length) {
            output[y1][x1] = symbol;
        }
        if (x1 === x2 && y1 === y2) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

// Отображение куба в виде ASCII
function draw() {
    const rotatedVertices = rotate(cubeVertices);
    const projectedVertices = rotatedVertices.map(project);

    // Очистка экрана
    let output = Array(20).fill().map(() => Array(80).fill(' '));

    // Рисование рёбер куба с разными символами
    cubeEdges.forEach(([startIdx, endIdx]) => {
        const [x1, y1] = projectedVertices[startIdx];
        const [x2, y2] = projectedVertices[endIdx];

        if (Math.abs(x1 - x2) < Math.abs(y1 - y2)) {
            drawLine(x1, y1, x2, y2, edgeSymbols.vertical, output);
        } else if (Math.abs(y1 - y2) < Math.abs(x1 - x2)) {
            drawLine(x1, y1, x2, y2, edgeSymbols.horizontal, output);
        } else {
            if (x1 < x2) {
                drawLine(x1, y1, x2, y2, edgeSymbols.diagonal, output);
            } else {
                drawLine(x1, y1, x2, y2, edgeSymbols.backslash, output);
            }
        }
    });

    // Конвертация массива в строку
    asciiArtElement.textContent = output.map(line => line.join('')).join('\n');
}

// Обработчик мыши для изменения углов вращения
document.addEventListener('mousemove', (e) => {
    rotationX = (e.clientY / window.innerHeight) * Math.PI * 2;
    rotationY = (e.clientX / window.innerWidth) * Math.PI * 2;
    draw();
});

// Инициализация
draw();
