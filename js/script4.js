document.addEventListener("DOMContentLoaded", function () {
    const colorPicker = document.getElementById("colorPicker");

    colorPicker.addEventListener("input", function () {
        document.body.style.backgroundColor = colorPicker.value;
    });
});
