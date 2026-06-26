const axios = require('axios');

async function listarJogos() {
  const response = await axios.get('http://localhost:3333/games');

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

  return jogosTratados;
}

module.exports = {
  listarJogos,
};
