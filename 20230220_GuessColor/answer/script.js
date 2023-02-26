/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
// globalVar
let numSquares = 6;
let colors = [];
let pickedColor;

// cacheDom
const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#color-display');
const messageDisplay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');
const easyButton = document.querySelector('.mode');

init();

function init() {
  colorDisplay.textContent = pickedColor; // The RGB value
  setupSquares();
  setupMode();
  reset();
}

resetButton.addEventListener('click', () => {
  reset();
});

function setupSquares() {
  for (let i = 0; i < squares.length; i += 1) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener('click', function () {
      const clickedColor = this.style.backgroundColor;
      // this == the node clicked, so don't use arrow function here
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct';
        resetButton.textContent = 'Play Again';
        changeColors(pickedColor);
      } else {
        this.style.backgroundColor = '#232323'; // Fade to background
        messageDisplay.textContent = 'try again';
      }
    });
  }
}

function setupMode() {
  for (let i = 0; i < modeButtons.length; i += 1) {
    modeButtons[i].addEventListener('click', function () { // easy hard button
      for (let j = 0; j < modeButtons.length; j += 1) {
        modeButtons[j].classList.remove('selected');
      }
      this.classList.add('selected');
      if (this.textContent === 'Easy') {
        numSquares = 3;
      } else {
        numSquares = 6;
      }
      reset();
    });
  }
}

function reset() {
  colors = genRandomColors(numSquares);
  pickedColor = chooseColor();
  colorDisplay.textContent = pickedColor;
  h1.style.backgroundColor = '#2C8E99'; // Reset the color of header panel
  resetButton.textContent = 'New Colors';
  messageDisplay.textContent = '';
  for (let i = 0; i < squares.length; i += 1) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i += 1) {
    squares[i].style.backgroundColor = color; // Oh can just pass string like that
    h1.style.backgroundColor = color;
  }
}

function chooseColor() { // Pick one color as answer
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function genRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(makeColor());
  }
  return arr;
}

function makeColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
