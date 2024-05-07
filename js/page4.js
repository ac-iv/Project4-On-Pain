const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const text = "Therefore trust the physician, and drink his remedy in silence and tranquility";
const words = text.split(' ');
const fontSize = 24;
ctx.font = `${fontSize}px Arial`;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
const centerY = height / 2;
const speed = 2;

let wordIndex = 0;
let x = width / 2;
let y = centerY;

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(words[wordIndex], x, y);
}

function update() {
  x += speed;
  if (x > width + ctx.measureText(words[wordIndex]).width) {
    wordIndex = (wordIndex + 1) % words.length;
    x = -ctx.measureText(words[wordIndex]).width;
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

canvas.addEventListener('click', () => {
  speed *= -1; // Reverse direction on click
});
