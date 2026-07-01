const axios = require('axios');

async function listarJogos() {
  //minha API consome a WorldCupAPI local
  const response = await axios.get('http://localhost:3333/games');

  //tratando os dados recebidos pela API
  const jogosTratados = response.data.map((jogo) => {
    return {
      partida: `${jogo.homeTeam?.name || 'Time não informado'} x ${jogo.outsideTeam?.name || 'Time não informado'}`,
      time_a: jogo.homeTeam?.name || 'Time não informado',
      time_b: jogo.outsideTeam?.name || 'Time não informado',
      data: jogo.date,
      estadio: jogo.stadium,
      grupo: jogo.group,
    };
  });

  //coloquei time não informado porque tem alguns que vem de WorldCupAPI

  //com o time null. Então usei o optional changing com ?. plus texto padrão pra evitar erro na API.

  return jogosTratados;
}

module.exports = {
  listarJogos,
};
