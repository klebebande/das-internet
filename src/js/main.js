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
    spinCursor.style.left = `${e.clientX - 32}px`;
    spinCursor.style.top = `${e.clientY - 32}px`;
});

// tremble effect
const headlineSpans = document.querySelectorAll('h1 span');

function trembleBurst(letter) {
    let count = 0;
    const maxShakes = 3 + Math.floor(Math.random() * 6);

    function singleShake() {
        const x = (Math.random() - 0.5) * 6;
        const y = (Math.random() - 0.5) * 6;
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
const faceImages = ['face0.png', 'face1.png', 'face2.png', 'face3.png'];
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