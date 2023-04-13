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
    console.log(`[[${casas[0][0]}][${casas[0][1]}][${casas[0][2]}]]\n
[[${casas[1][0]}][${casas[1][1]}][${casas[1][2]}]]\n
[[${casas[2][0]}][${casas[2][1]}][${casas[2][2]}]]`)
    }

  /*
    @brief marca determinada casa com marcador específico
    @param linha: linha da casa
    @param coluna: coluna da casa
    @param marcador: caractere a ser usado como marcador
    @return 0 se a marcação for bem sucedida e 1 caso contrário
  */
  const marcarCasa = (linha, coluna, marcador) => {
    console.log(casas[linha][coluna]);
    if (casas[linha][coluna] == '') {
      casas[linha][coluna] = marcador;
      imprimirTabuleiro();
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

function controlador() {
  tabuleiro = tabuleiro();
  tabuleiro.resetaTabuleiro();

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
      } 
      if (tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i]) {
        console.log(`Jogador ${lerJogadorAtivo().nome} ganhou!`)
        return lerJogadorAtivo();
      }
    }
    if (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]){
      console.log(`Jogador ${lerJogadorAtivo().nome} ganhou!`)
      return lerJogadorAtivo();
    }
    if (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      console.log(`Jogador ${lerJogadorAtivo().nome} ganhou!`)
      return lerJogadorAtivo();
    }
    return 1;
  }

  return {
    lerJogadorAtivo,
    trocarJogador,
    jogarRodada,
    verificarGanhador,
  }
}

let jogo = controlador();
jogo.jogarRodada(0,0);
jogo.jogarRodada(1,1);
jogo.jogarRodada(1,1);
jogo.jogarRodada(1,2);
jogo.jogarRodada(0,1);
jogo.jogarRodada(2,2);
jogo.jogarRodada(2,1);