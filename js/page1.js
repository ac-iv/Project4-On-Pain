let appleImg, groundImg, skyImg, treeImg, basketImg;
let apples = [];
let basket;
let progressBar;
let allPicked = false;
let dragging = null; // Track the apple being dragged

function preload() {
  appleImg = loadImage('img/Apple.png');
  groundImg = loadImage('img/Ground.png');
  skyImg = loadImage('img/Sky.png');
  treeImg = loadImage('img/Tree.png');
  basketImg = loadImage('img/Basket.png');
}

function setup() {
  createCanvas(800, 600);
  let treeScale = (height - groundImg.height) / treeImg.height;
  let treeX = width / 2 - treeImg.width * treeScale / 2;
  let treeY = height - groundImg.height - treeImg.height * treeScale + 50; // Lower the tree by adjusting this value
  let top40Height = treeY + treeImg.height * treeScale * 0.5; // Calculate the top 40% height of the tree

  for (let i = 0; i < 8; i++) {
    let appleX, appleY;
    let overlap = true;
    while (overlap) {
      appleX = random(treeX, treeX + treeImg.width * treeScale);
      appleY = random(treeY, top40Height); // Limit apple Y position to top 40% of the tree
      overlap = false;
      for (let apple of apples) {
        let d = dist(appleX, appleY, apple.x, apple.y);
        if (d < apple.diameter / 2) {
          overlap = true;
          break;
        }
      }
    }
    apples.push(new Apple(appleX, appleY));
  }

  basket = new Basket(600, height - 100, 150, 100); // Adjust basket position and size
  progressBar = new ProgressBar(1000,1000,1000,1000);
}



function draw() {
  background(220);
  image(skyImg, 0, 0, width, height);
  image(groundImg, 0, height - groundImg.height, width, groundImg.height);
  let treeScale = (height - groundImg.height) / treeImg.height;
  image(treeImg, width / 2 - treeImg.width * treeScale / 2, height - groundImg.height - treeImg.height * treeScale + 50, treeImg.width * treeScale, treeImg.height * treeScale);

  apples.forEach(apple => apple.show());
  basket.show();
  progressBar.show();

  if (allPicked) {
    displayCompletionMessage();
  }
}

function mousePressed() {
  for (let apple of apples) {
    if (apple.isMouseOver() && !apple.picked) {
      dragging = apple;
      break;
    }
  }
}

function mouseReleased() {
  if (dragging && basket.isOverBasket()) {
    dragging.pick();
    basket.addApple();
    let pickedApples = 0;
    apples.forEach(apple => {
      if (apple.picked) pickedApples++;
    });
    progressBar.update(pickedApples); // Update progress bar with the count of picked apples
    checkAllPicked();
  }
  dragging = null;
}


function checkAllPicked() {
  allPicked = apples.every(apple => apple.picked);
  if (allPicked) {
    displayCompletionMessage();
  }
}

function displayCompletionMessage() {
  fill(0, 0, 0, 127);
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Much of your pain is self-chosen", width / 2, height / 2);
}

class Apple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 50;
    this.picked = false;
    this.selfImposedPain = [
      "Regret",
      "Guilt",
      "Shame",
      "Fear",
      "Anger",
      "Jealousy",
      "Resentment",
      "Insecurity",
      "Perfectionism",
      "Overthinking",
      "Self-doubt",
      "Procrastination",
      "Self-sabotage",
      "People-pleasing",
      "Avoidance",
      "Indecision",
      "Self-criticism"
    ];
    this.randomPain = random(this.selfImposedPain);
  }

  show() {
    if (!this.picked) {
      if (dragging === this) {
        image(appleImg, mouseX - this.diameter / 2, mouseY - this.diameter / 2, this.diameter, this.diameter);
      } else {
        image(appleImg, this.x, this.y, this.diameter, this.diameter);
        textAlign(CENTER, CENTER);
        fill(255);
        text(this.randomPain, this.x + this.diameter / 2, this.y + this.diameter / 2);
      }
    }
  }

  isMouseOver() {
    let d = dist(mouseX, mouseY, this.x + this.diameter / 2, this.y + this.diameter / 2);
    return d < this.diameter / 2;
  }

  pick() {
    this.picked = true;
  }
}


class Basket {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.apples = 0;
  }

  addApple() {
    this.apples++;
  }

  show() {
    image(basketImg, this.x, this.y, this.width, this.height);
  }

  isOverBasket() {
    return mouseX > this.x && mouseX < this.x + this.width &&
           mouseY > this.y && mouseY < this.y + this.height;
  }
}

class ProgressBar {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.progress = 0;
  }

  update(pickedApples, totalApples) {
    let fillWidth = map(pickedApples, 0, totalApples, 0, this.width);
    fill(0, 255, 0);
    noStroke();
    rect(this.x, this.y, fillWidth, this.height);
  }
  

  show() {
    noFill();
    stroke(0);
    rect(this.x, this.y, this.width, this.height);
  }
}

function changePage() {
  document.getElementById('next').style.display = 'none'; // Hide the button
  let script = document.createElement('script');
  script.src = 'js/page2.js';
  document.body.appendChild(script);
}



