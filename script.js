function rgb() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

function corAleatoria() {
  const bottom = document.querySelector('#button-random-color');
  const color = document.getElementsByClassName('color');

  bottom.addEventListener('click', () => {
    for (let i = 1; i < color.length; i += 1) {
      color[i].style.backgroundColor = rgb();
    }
  });
}

corAleatoria();
