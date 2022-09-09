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
  bottom.addEventListener('click', () => {
    for (let i = 1; i < color.length; i += 1) {
      color[i].style.backgroundColor = rgb();
    }
  });
}

corAleatoria();

function pixeis() {
  for (let i = 0; i < 25; i += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    board.appendChild(pixel);
  }
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

function reset() {
  reseta.addEventListener('click', () => {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'white';
    }
  });
}

reset();
