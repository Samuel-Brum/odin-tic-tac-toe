function tabuleiro() {
  const colunas = 3;
  const linhas = 3;
  const casas = [];

  for (let i = 0; i < linhas; i++) {
    for(let j = 0; j < colunas; j++) {
      casas.push('');
    }
  }

  const lerTabuleiro = () => casas;

  const marcarCasa = (indice, marcador) => {
    if (lerTabuleiro[indice] == '') {
      casas[i] = marcador;
    }
  }

  return {
    lerTabuleiro,
    marcarCasa
  };
}

function controlador() {
  const jogadores = [
    {
      nome: jogadorUm,
      marcador: 'X'
    },
    {
      nome:jogadorDois,
      marcador: 'O'
    }
  ]

  let jogadorAtivo = jogadores[0];

  const lerJogadorAtivo = () => jogadorAtivo;

  const trocarJogador = () => {
    
  }
}

const quadrados = document.getElementsByClassName('caixa');

function controlador() {
  
}


/* 
  * @brief Limpa o estado do quadrados
  * @param {quadrados} array de elementos que compõem o quadrados 
*/
function clearBoard(quadrados) {
  for (let i = 0; i < quadrados.length; i++) {
    quadrados[i].addEventListener('click', () => {
      quadrados[i].innerHTML = '';
    })
  }
}

document.getElementById('reset').addEventListener('click', clearBoard(quadrados));