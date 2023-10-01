const color = document.querySelectorAll('.color');
const buttonRandomColor = document.querySelector('#button-random-color');
const board = document.querySelector('#pixel-board');
const clearBoard = document.querySelector('#clear-board');

const localStorageBoard = () => {
  if (!localStorage.getItem('boardSize')) localStorage.setItem('boardSize', 5);
  const palette = JSON.parse(localStorage.getItem('colorPalette'));
  if (localStorage.getItem('colorPalette')) {
    for (let i = 1; i < color.length; i += 1) {
      color[i].style.backgroundColor = palette[i];
    }
  }
};

const localStoragePixelBoard = () => {
  if (localStorage.getItem('pixelBoard')) {
    const pixels = document.querySelectorAll('.pixel');
    const pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = pixelBoard[i];
    }
  }
};

function generateRgb() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

function randomColor() {
  const colors = [];
  buttonRandomColor.addEventListener('click', () => {
    for (let i = 1; i < color.length; i += 1) {
      color[i].style.backgroundColor = generateRgb();
      colors[i] = color[i].style.backgroundColor;
    }
    localStorage.setItem('colorPalette', JSON.stringify(colors));
  });
}

function createPixels() {
  const local = localStorage.getItem('boardSize');
  for (let i = 0; i < Number(local) * Number(local); i += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    board.appendChild(pixel);
  }
  board.style.width = Number(local) * 40 + Number(local) * 2 + 2;
}

function clearPixels() {
  for (let i = 0; i < color.length; i += 1) {
    color[i].className = 'color';
  }
}

function selectColor() {
  for (let i = 0; i < color.length; i += 1) {
    color[i].addEventListener('click', () => {
      clearPixels();
      color[i].className = 'color selected';
    });
  }
}

function coloringPixels() {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', () => {
      const selected = document.querySelector('.selected');
      if (pixels[i].style.backgroundColor !== selected.style.backgroundColor) {
        pixels[i].style.backgroundColor = selected.style.backgroundColor;
      } else {
        pixels[i].style.backgroundColor = 'white';
      }
    });
  }
  localStoragePixelBoard();
}

function savePixels() {
  const pixels = document.querySelectorAll('.pixel');
  const saved = [];
  for (let i = 0; i < pixels.length; i += 1) {
    saved[i] = pixels[i].style.backgroundColor;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(saved));
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', savePixels);
  }
}

function resetPixels() {
  const pixels = document.querySelectorAll('.pixel');
  clearBoard.addEventListener('click', () => {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'white';
    }
  });
}

const generateBoard = document.getElementById('generate-board');
const boardSize = document.getElementById('board-size');

function createNewPixels() {
  for (let i = 0; i < boardSize.value * boardSize.value; i += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    board.appendChild(pixel);
  }
  board.style.width = 40 * boardSize.value + 2 + boardSize.value * 2;
  localStorage.setItem('boardSize', boardSize.value);
  coloringPixels();
  savePixels();
}

function generaNewBoardSize() {
  generateBoard.addEventListener('click', () => {
    if (boardSize.value === '') return alert('Board inválido!');

    if (boardSize.value < 5) {
      board.innerHTML = '';
      boardSize.value = 5;
      createNewPixels();
    } else if (boardSize.value > 50) {
      board.innerHTML = '';
      boardSize.value = 50;
      createNewPixels();
    } else {
      board.innerHTML = '';
      createNewPixels();
    }
  });
}

localStorageBoard();
randomColor();
selectColor();
createPixels();
coloringPixels();
savePixels();
resetPixels();
generaNewBoardSize();
