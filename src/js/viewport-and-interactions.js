function setViewportHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
setViewportHeight();

// Spray bottle triangle toggle
document.addEventListener("DOMContentLoaded", () => {
    const spray = document.getElementById("spray-bottle");
    const triangle = document.getElementById("triangle-frame");
    if (spray && triangle) {
        spray.addEventListener("click", () => {
            triangle.classList.toggle("hidden");
            spray.classList.toggle("sprayed");
        });
    }

})