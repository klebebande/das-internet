// spin-cursor logic
const spinCursor = document.getElementById('spin-cursor');
const latestNews = document.getElementById('latest-news');

latestNews.addEventListener('mouseenter', () => {
    document.body.classList.add('spin-mode');
    spinCursor.style.display = 'block';
});

latestNews.addEventListener('mouseleave', () => {
    document.body.classList.remove('spin-mode');
    spinCursor.style.display = 'none';
});

document.addEventListener('mousemove', (e) => {
    const cursorWidth = 128;
    spinCursor.style.left = `${e.clientX - cursorWidth / 2}px`;
    spinCursor.style.top = `${e.clientY}px`;
});

// tremble effect
const headlineSpans = document.querySelectorAll('h1 span');

headlineSpans.forEach(span => {
    span.addEventListener('mouseenter', () => {
        if (!span.dataset.busy) {
            span.dataset.busy = "true";
            animateLetterAroundFrame(span);
            setTimeout(() => { span.dataset.busy = ""; }, 2500); // prevent spam
        }
    });
});

function trembleBurst(letter) {
    let count = 0;
    const maxShakes = 3 + Math.floor(Math.random() * 6);

    function singleShake() {
        const x = (Math.random() - 0.5) * 60;
        const y = (Math.random() - 0.5) * 60;
        letter.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(() => {
            letter.style.transform = '';
            count++;
            if (count < maxShakes) setTimeout(singleShake, 40);
        }, 40);
    }

    singleShake();
}

function randomTremble() {
    const index = Math.floor(Math.random() * headlineSpans.length);
    trembleBurst(headlineSpans[index]);
    const delay = 3000 + Math.random() * 4000;
    setTimeout(randomTremble, delay);
}

randomTremble();

// random background image + matching bg color
const faceImages = ['face0.png', 'face1.png', 'face2.png', 'face3.png', 'face4.png', 'face5.png', 'face6.png', 'face7.png'];
const randomFace = faceImages[Math.floor(Math.random() * faceImages.length)];
const imagePath = `src/img/facesOfTheInternet/${randomFace}`;
const container = document.querySelector('.container');

const img = new Image();
img.crossOrigin = "anonymous";
img.src = imagePath;

img.onload = function () {
    container.style.backgroundImage = `url('${imagePath}')`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'top center';

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const pixel = ctx.getImageData(0, 0, 1, 1).data;
    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    document.body.style.backgroundColor = rgb;
};



function animateLetterAroundFrame(letter) {
    const containerRect = container.getBoundingClientRect();
    const letterRect = letter.getBoundingClientRect();

    const flyingLetter = letter.cloneNode(true);
    const letterStyles = window.getComputedStyle(letter);

    // Apply visual styles
    Object.assign(flyingLetter.style, {
        position: 'absolute',
        left: `${letterRect.left}px`,
        top: `${letterRect.top}px`,
        width: `${letterRect.width}px`,
        height: `${letterRect.height}px`,
        zIndex: 9999,
        transition: 'all 0.4s linear',
        pointerEvents: 'none',
        fontFamily: letterStyles.fontFamily,
        fontSize: letterStyles.fontSize,
        fontWeight: letterStyles.fontWeight,
        color: letterStyles.color,
        textShadow: letterStyles.textShadow,
        letterSpacing: letterStyles.letterSpacing,
        lineHeight: letterStyles.lineHeight,
        textAlign: letterStyles.textAlign,
    });

    document.body.appendChild(flyingLetter);
    letter.style.visibility = 'hidden';

    const original = {
        x: letterRect.left,
        y: letterRect.top
    };

    const path = [
        original,
        { x: containerRect.right - letterRect.width, y: containerRect.top },
        { x: containerRect.right - letterRect.width, y: containerRect.bottom - letterRect.height },
        { x: containerRect.left, y: containerRect.bottom - letterRect.height },
        { x: containerRect.left, y: containerRect.top },
        original  // return to original position
    ];

    let i = 0;
    function moveNext() {
        if (i >= path.length) {
            letter.style.visibility = '';
            document.body.removeChild(flyingLetter);
            return;
        }

        flyingLetter.style.left = `${path[i].x}px`;
        flyingLetter.style.top = `${path[i].y}px`;
        i++;
        setTimeout(moveNext, 300);
    }

    moveNext();
}


document.addEventListener('mousedown', () => {
    document.documentElement.style.setProperty('--cursor-default', 'url("../img/cursed_cursor_state-1-small.svg") 32 2, auto');
});

document.addEventListener('mouseup', () => {
    document.documentElement.style.setProperty('--cursor-default', 'url("../img/cursed_cursor_state-1.svg") 64 5, auto');
});

document.addEventListener('mousedown', () => {
    document.documentElement.style.setProperty('--cursor-hover', 'url("../img/cursed_cursor_state-2-small.svg") 32 2, auto');
});

document.addEventListener('mouseup', () => {
    document.documentElement.style.setProperty('--cursor-hover', 'url("../img/cursed_cursor_state-2.svg") 64 5, auto');
});


document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const indicator = document.getElementById("touch-indicator");
    indicator.style.left = `${touch.clientX}px`;
    indicator.style.top = `${touch.clientY}px`;
    indicator.style.display = "block";

    setTimeout(() => {
        indicator.style.display = "none";
    }, 500); // auto-hide after 0.5s
});