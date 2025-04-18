document.addEventListener("DOMContentLoaded", function () {
    var stripes = document.querySelectorAll('.stripe');
    var words = ["Yoki", "Alpha", "Beta", "Gamma"];
    // Массив цветов для каждой полосы (индексы совпадают)
    var colors = ["#b5f697", "#00aa00", "#0000ff", "#ff00ff"];

    stripes.forEach(function (stripe, index) {
        var overlay = document.createElement('div');
        overlay.classList.add('overlay-text');

        // Настройки шрифта
        var fontSize = 48; // px
        var lineHeight = fontSize * 1.2;

        // Размеры полосы
        var stripeHeight = stripe.offsetHeight;
        var stripeWidth = stripe.offsetWidth;

        // Рассчитываем количество строк для вертикального заполнения
        var numLines = Math.ceil(stripeHeight / lineHeight);

        // Берем слово для этой полосы
        var word = words[index] || "Default";

        // Создаем временный элемент для измерения ширины слова
        var tempSpan = document.createElement('span');
        tempSpan.style.fontSize = fontSize + "px";
        tempSpan.style.fontFamily = "'Montserrat', sans-serif";
        tempSpan.style.visibility = "hidden";
        tempSpan.textContent = word + " ";
        document.body.appendChild(tempSpan);
        var wordWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);

        // Рассчитываем количество повторений слова по горизонтали
        var numCopies = Math.ceil(stripeWidth / wordWidth) + 1;
        var baseLine = "";
        for (var j = 0; j < numCopies; j++) {
            baseLine += word + " ";
        }
        // Дублируем строку для бесшовного эффекта
        var seamlessLine = baseLine + baseLine;

        // Создаем строки, заполняющие оверлей
        for (var i = 0; i < numLines; i++) {
            var lineDiv = document.createElement('div');
            lineDiv.style.whiteSpace = "nowrap";
            lineDiv.textContent = seamlessLine;
            // Присваиваем цвет для этой полосы
            lineDiv.style.color = colors[index] || "rgba(255,255,255,0.8)";
            overlay.appendChild(lineDiv);
        }

        stripe.appendChild(overlay);
    });
});
