const square = document.getElementsByClassName("caixa");


for (let i = 0; i < square.length; i++) {
  square[i].addEventListener('click', () => {
    square[i].innerHTML = 'X';
  })
}


