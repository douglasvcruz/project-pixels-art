const color = document.querySelectorAll('.color');
const bottom = document.querySelector('#button-random-color');
const board = document.querySelector('#pixel-board');
const reseta = document.querySelector('#clear-board');

function rgb() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

function corAleatoria() {
  const colors = [];
  bottom.addEventListener('click', () => {
    for (let i = 1; i < color.length; i += 1) {
      color[i].style.backgroundColor = rgb();
      colors[i] = color[i].style.backgroundColor;
    }
    localStorage.setItem('colorPalette', JSON.stringify(colors));
  });
}

corAleatoria();

const paleta = JSON.parse(localStorage.getItem('colorPalette'));
if (localStorage.getItem('colorPalette')) {
  for (let i = 1; i < color.length; i += 1) {
    color[i].style.backgroundColor = paleta[i];
  }
}

function pixeis() {
  for (let i = 0; i < 25; i += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    board.appendChild(pixel);
  }
  board.style.width = 5 * 40 + 5 * 2 + 2;
}

pixeis();

const pixels = document.querySelectorAll('.pixel');

function remover() {
  for (let i = 0; i < color.length; i += 1) {
    color[i].className = 'color';
  }
}

function selecionar() {
  for (let i = 0; i < color.length; i += 1) {
    color[i].addEventListener('click', () => {
      remover();
      color[i].className = 'color selected';
    });
  }
}

selecionar();

function colorir() {
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
}

colorir();

function salvarPixels() {
  const saved = [];
  for (let i = 0; i < pixels.length; i += 1) {
    saved[i] = pixels[i].style.backgroundColor;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(saved));
}

for (let i = 0; i < pixels.length; i += 1) {
  pixels[i].addEventListener('click', salvarPixels);
}

if (localStorage.getItem('pixelBoard')) {
  const pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = pixelBoard[i];
  }
}

salvarPixels();

function reset() {
  reseta.addEventListener('click', () => {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'white';
    }
  });
}

reset();

const boardSize = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');

function criar() {
  for (let i = 0; i < boardSize.value * boardSize.value; i += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    board.appendChild(pixel);
  }
  board.style.width = 40 * boardSize.value + 2 + boardSize.value * 2;
  localStorage.setItem('boardSize', boardSize.value);
}

function testando() {
  generateBoard.addEventListener('click', () => {
    if (boardSize.value === '') return alert('Board inválido!');

    if (boardSize.value < 5) {
      board.innerHTML = '';
      boardSize.value = 5;
      criar();
    } else if (boardSize.value > 50) {
      board.innerHTML = '';
      boardSize.value = 50;
      criar();
    } else {
      board.innerHTML = '';
      criar();
    }
  });
}

const local = localStorage.getItem('boardSize');

if (local) {
  board.innerHTML = '';
  boardSize.value = local;
  criar();
}

testando();
