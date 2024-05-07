let targetWord = 'TRUST';
let attempts = [];
let currentAttempt = '';
let maxAttempts = 6;
let gameOver = false;
let showCustomPopup = false;
let winMessage = "Therefore trust the physician, and drink his remedy in silence and tranquility";

function setup() {
  createCanvas(800, 450);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont('Arial');
}

function draw() {
  background(220);
  drawGrid();
  if (showCustomPopup) {
    displayCustomPopup(winMessage);
  }
}

function drawGrid() {
  let gridWidth = 5 * 60;
  let gridHeight = maxAttempts * 60;
  let xOffset = (width - gridWidth) / 2;
  let yOffset = (height - gridHeight) / 2;

  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < 5; j++) {
      let x = xOffset + j * 60;
      let y = yOffset + i * 60;
      fill(255);
      stroke(0);
      square(x, y, 50);
      
      let idx = i * 5 + j;
      if (i < attempts.length || (i === attempts.length && j < currentAttempt.length)) {
        fill(0);
        if (i < attempts.length) {
          let char = attempts[i][j];
          let color = getColor(char, j);
          fill(color);
        }
        text(i < attempts.length ? attempts[i][j] : currentAttempt[j], x + 25, y + 25);
      }
    }
  }
}

function getColor(char, position) {
  if (char === targetWord.charAt(position)) {
    return color(0, 255, 0); // Green
  } else if (targetWord.includes(char)) {
    return color(255, 255, 0); // Yellow
  } else {
    return color(128); // Gray
  }
}

function keyPressed() {
  if (gameOver) return;

  if (key === 'Enter' && currentAttempt.length === 5) {
    attempts.push(currentAttempt.toUpperCase());
    if (currentAttempt.toUpperCase() === targetWord) {
      gameOver = true;
      showCustomPopup = true;
    } else if (attempts.length === maxAttempts) {
      gameOver = true;
      console.log('Game over! The correct word was ' + targetWord);
    }
    currentAttempt = '';
  } else if (key === 'Backspace' && currentAttempt.length > 0) {
    currentAttempt = currentAttempt.slice(0, -1);
  } else if (key.length === 1 && /[a-zA-Z]/.test(key) && currentAttempt.length < 5) {
    currentAttempt += key.toUpperCase();
  }
}

function displayCustomPopup(message) {
  let popupWidth = 600;
  let popupHeight = 120;
  let popupX = (width - popupWidth) / 2;
  let popupY = (height - popupHeight) / 2;

  fill('rgba(0,0,0,0.8)');
  rect(popupX, popupY, popupWidth, popupHeight);
  fill(255);
  textSize(16);
  text(message, popupX + popupWidth / 2, popupY + popupHeight / 2);
}
