document.querySelectorAll('.colorText p').forEach(paragraph => {
    const color = paragraph.id;
    paragraph.addEventListener('mouseover', () => {
        paragraph.style.background = `#${color}`;
        
        if (paragraph.classList.contains('whiteText')) {
            paragraph.style.color = 'white';
            paragraph.style.textDecoration = `underline #fff`;
        } else {
            paragraph.style.color = 'black';
            paragraph.style.textDecoration = `underline #000`;
        }
    });

    paragraph.addEventListener('mouseout', () => {
        paragraph.style.textDecoration = 'none';
        paragraph.style.background = 'none';
        paragraph.style.color = '';
    });


});