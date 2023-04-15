/*
  @brief função fábrica de tabuleiros de jogo da velha
  @param linhas: número de linhas do tabuleiro
  @param colunas: número de colunas do tabuleiro
  @return resetaTabuleiro, lerTabuleiro, imprimirTabuleiro, marcarCasa
*/
function tabuleiro() {
  linhas = 3;
  colunas = 3;
  let casas = [];

  /* 
    @brief limpa todas as casas do tabuleiro
  */
  const resetaTabuleiro = () => {
    casas = [[[''],[''],['']],[[''],[''],['']],[[''],[''],['']]];
  }

  const lerTabuleiro = () => casas;

  /*
    @brief imprime o estado do tabuleiro no console
  */
  const imprimirTabuleiro = () => {
    console.log(`[${casas[0][0]}][${casas[0][1]}][${casas[0][2]}]\n
[${casas[1][0]}][${casas[1][1]}][${casas[1][2]}]\n
[${casas[2][0]}][${casas[2][1]}][${casas[2][2]}]`)
    }

  /*
    @brief marca determinada casa com marcador específico
    @param linha: linha da casa
    @param coluna: coluna da casa
    @param marcador: caractere a ser usado como marcador
    @return 0 se a marcação for bem sucedida e 1 caso contrário
  */
  const marcarCasa = (linha, coluna, marcador) => {
    if (casas[linha][coluna] == '') {
      casas[linha][coluna] = marcador;
      return 0;
    } else {
      console.log('Casa já marcada, escolha outra casa.');
      return 1;
    }
  }
  return {
    resetaTabuleiro,
    lerTabuleiro,
    imprimirTabuleiro,
    marcarCasa,
  };
}

function controladorDoJogo() {
  tabuleiro = tabuleiro();
  tabuleiro.resetaTabuleiro();
  let rodada = 1;
  let fimDeJogo = 0;
  

  jogadores = [
    {
      nome: 'Jogador 1',
      marcador: 'X'
    },
    {
      nome: 'Jogador 2',
      marcador: 'O'
    }
  ]

  let jogadorAtivo = jogadores[0];

  const lerJogadorAtivo = () => jogadorAtivo;

  const reset = () => tabuleiro.resetaTabuleiro();

  const trocarJogador = () => {
    jogadorAtivo === jogadores[0] ? jogadorAtivo = jogadores[1] :
                                    jogadorAtivo = jogadores[0];
  }

  /*
    @brief realiza uma rodada do jogo
    @param casa: qual casa a ser marcada
  */
  const jogarRodada = (linha, coluna) => {
    if (tabuleiro.marcarCasa(linha, coluna, jogadorAtivo.marcador) === 0) {
      console.log(`Marcando casa [${linha}][${coluna}] no tabuleiro\n`);
      tabuleiro.imprimirTabuleiro();
      rodada++;
      verificarGanhador(tabuleiro.lerTabuleiro());
      trocarJogador();
    }
  }

  /*
    @brief verifica se há um estado vencedor no tabuleiro 
           (apenas tabuleiros 3 X 3!!)
    @param tabuleiro: tabuleiro a ser verificado
    @return retorna o jogador ativo caso haja um estado vencedor e 0 caso contrário
  */
  const verificarGanhador = (tabuleiro) => {
    for (let i = 0; i < linhas; i++) {
      if (tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) {
        console.log(`Jogador ${lerJogadorAtivo().nome} ganhou!`)
        return lerJogadorAtivo();
        fimDeJogo++;
      } 
      if (tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i]) {
        console.log(`Jogador ${lerJogadorAtivo().nome} ganhou!`)
        return lerJogadorAtivo();
        fimDeJogo++;
      }
    }
    if (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]){
      console.log(`Jogador ${lerJogadorAtivo().nome} ganhou!`)
      return lerJogadorAtivo();
      fimDeJogo++;
    }
    if (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      console.log(`Jogador ${lerJogadorAtivo().nome} ganhou!`)
      return lerJogadorAtivo();
      fimDeJogo++
    }
    if (rodada == 9) {
      console.log("O jogo empatou!")
    }
    return 1;
  }

  return {
    reset,
    lerJogadorAtivo,
    trocarJogador,
    jogarRodada,
    verificarGanhador,
  }
}

function screeenControler () {
  const jogo = controladorDoJogo();
  const casas = document.querySelectorAll('.caixa');

  casas.forEach(casa => {
    casa.addEventListener('click', function handleClick(event) {
      const param = event.target.id;
      event.target.innerHTML = jogo.lerJogadorAtivo().marcador;
      jogo.jogarRodada(param[0], param[1]);      
    });
  });

  const reset = document.getElementById('reset');
  reset.addEventListener('click', jogo.reset());
}

controlador = screeenControler();