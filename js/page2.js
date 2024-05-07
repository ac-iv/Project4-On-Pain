// Define variables for background and cauldron
let backgroundImage;
let cauldronImage;
let tableImage;
let ingredients = ["Fear", "Doubt", "Regret", "Resentment"];
let promptIndex = 0; // Index for the current prompt
let shuffledPrompts = []; // Shuffled array of ingredient prompts
let promptX = 100; // X position for the first ingredient prompt
let promptY = 100; // Y position for the ingredient prompts
let promptSpacing = 150; // Spacing between ingredient prompts
let catalogX = 0; // X position for the word catalog
let catalogY; // Y position for the word catalog
let catalogWidth = 800; // Width for the word catalog
let catalogHeight = 100; // Height for the word catalog
let catalogOpacity = 180; // Opacity for the word catalog background (out of 255)
let cauldronX = 300;
let cauldronY = 280;
let cauldronWidth = 200;
let cauldronHeight = 200;
let draggedIngredient = null;
let completedIngredients = 0;
let showPopup = false;
let fadeOut = false;
let fadeAmount = 5;
let poemOpacity = 0;

function preload() {
  // Load assets needed for the page
  backgroundImage = loadImage('img/Lair.png'); // Assuming this is the layered background image
  tableImage = loadImage('img/wooden_table.png');
  cauldronImage = loadImage('img/Cauldron.png');
}

function setup() {
  createCanvas(800, 600); // Set canvas size as needed
  textAlign(CENTER, CENTER);
  textSize(20);
  catalogY = height - catalogHeight / 2; // Center the word catalog vertically
  shuffledPrompts = shuffle(ingredients.slice()); // Shuffle a copy of the ingredients array
}

function draw() {
  background(255, poemOpacity); // Clear canvas with poem opacity

  // Draw background image
  image(backgroundImage, 0, 0, width, height);

  // Draw table
  image(tableImage, 0, 0, width, height); // Assuming the table image covers the entire canvas

  // Draw cauldron
  image(cauldronImage, cauldronX, cauldronY, cauldronWidth, cauldronHeight); // Cauldron is centered

  // Draw ingredient prompts
  drawIngredientPrompts();

  // Draw word catalog
  drawWordCatalog();

  // If all ingredients have been added, display poem
  if (completedIngredients === ingredients.length) {
    fadeOut = true; // Trigger fade out effect
    drawPoem();
  }

  // If an ingredient is being dragged, draw it at mouse position
  if (draggedIngredient) {
    fill(255, 30); // White with 30% opacity
    rect(mouseX - 50, mouseY - 15, 100, 30);
    fill(255, 0, 0); // Red text color
    text(draggedIngredient, mouseX, mouseY);
  }

  // If showPopup is true, display the popup
  if (showPopup) {
    drawPopup();
  }

  // Fade out effect
  if (fadeOut) {
    fadeOutElements();
  }
}

function fadeOutElements() {
  // Fade out elements gradually
  if (catalogOpacity > 90) {
    catalogOpacity -= fadeAmount;
  }
}

function drawIngredientPrompts() {
  fill(255); // White text color for visibility
  
  let prompt = shuffledPrompts[promptIndex];
  if (prompt !== undefined) {
    textStyle(BOLD); // Set text style to bold
    text("Add " + prompt + ":", width / 2, promptY);
    textStyle(NORMAL); // Reset text style
  } else {
    fill(255, 0); // Set text opacity to 0%
  }
}

function drawWordCatalog() {
  fill(255, catalogOpacity); // White with catalogOpacity opacity
  rect(catalogX, catalogY - catalogHeight / 2, catalogWidth, catalogHeight);
  fill(255, 0, 0); // Red text color
  for (let i = 0; i < ingredients.length; i++) {
    let x = catalogX + catalogWidth / ingredients.length * (i + 0.5); // Adjusted to remove left margin
    let y = catalogY;
    text(ingredients[i], x, y);
  }
}

function drawPoem() {
  // Display the poem when all ingredients have been added to the cauldron
  textSize(24);
  fill(255);
  text("It is the bitter potion by which the physician within you heals your sick self.", width / 2, height / 2);
  poemOpacity = 90; // Set opacity for poem
}

function drawPopup() {
  fill(255, 200); // Semi-transparent white background
  rect(width / 4, height / 3, width / 2, height / 3, 20); // Popup box
  fill(0); // Black text color
  textSize(24);
  text("Wrong ingredient, starting over", width / 2, height / 2 - 20); // Popup text
  fill(255); // White text color
  rect(width / 2 - 50, height / 2 + 20, 100, 40, 10); // OK button background
  fill(0); // Black text color
  text("OK", width / 2, height / 2 + 40); // OK button text
}

function mousePressed() {
  // If an ingredient is being dragged, return
  if (draggedIngredient) return;

  // Check if the mouse is pressed on the word catalog
  for (let i = 0; i < ingredients.length; i++) {
    let x = catalogX + catalogWidth / ingredients.length * i;
    let y = catalogY - catalogHeight / 2;
    let w = catalogWidth / ingredients.length;
    let h = catalogHeight;
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      draggedIngredient = ingredients[i]; // Start dragging this ingredient
      break;
    }
  }

  // If showPopup is true, check if the mouse is pressed on the OK button
  if (showPopup && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
    promptIndex = 0; // Reset prompt index
    completedIngredients = 0; // Reset completed ingredients count
    shuffledPrompts = shuffle(ingredients.slice()); // Reshuffle prompts
    showPopup = false; // Close the popup
  }
}

function mouseReleased() {
  // If an ingredient is not being dragged, return
  if (!draggedIngredient) return;

  // Check if the mouse is released over the cauldron
  if (mouseX > cauldronX && mouseX < cauldronX + cauldronWidth && mouseY > cauldronY && mouseY < cauldronY + cauldronHeight) {
    // Check if the correct ingredient is added
    if (draggedIngredient === shuffledPrompts[promptIndex]) {
      completedIngredients++; // Increment completed ingredients count
      promptIndex++; // Move to the next prompt
      if (promptIndex < ingredients.length) {
        // If there are more prompts, display next prompt
        displayPrompt();
      }
    } else {
      // If the wrong ingredient is added, show the popup
      showPopup = true;
    }
  }

  draggedIngredient = null; // Reset dragged ingredient
}

function displayPrompt() {
  fill(255); // White text color
  let prompt = shuffledPrompts[promptIndex];
  if (prompt !== undefined) {
    textStyle(BOLD); // Set text style to bold
    text("Add " + prompt + ":", width / 2, promptY);
    textStyle(NORMAL); // Reset text style
    back
  } else {
    fill(255, 0); // Set text opacity to 0%
  }
}

// Fisher-Yates shuffle algorithm to shuffle an array
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
