const axios = require('axios');
const connection = require('../database/connection');

//função pra receber o id do usuário e os dados no body
async function criarPalpite(usuarioId, dados) {
  const { time_a, time_b, gols_a, gols_b, data_jogo } = dados;

  if (gols_a < 0 || gols_b < 0) {
    const erro = new Error('Os gols não podem ser negativos');
    erro.status = 400;
    throw erro;
  }

  //pego o ano da data
  const anoDoJogo = new Date(data_jogo).getFullYear();

  //uso o promisse.all pra buscar o dólar e os feriados ao mesmo tempo
  const [respostaDolar, respostaFeriados] = await Promise.all([
    axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL'),
    axios.get(`https://brasilapi.com.br/api/feriados/v1/${anoDoJogo}`),
  ]);

  //pego o dólar
  const dolarNoDia = respostaDolar.data.USDBRL.bid;

  const feriados = respostaFeriados.data;

  //verifico se a data é feriado
  const ehFeriado = feriados.some((feriado) => {
    return feriado.date === data_jogo;
  });

  const jogo = `${time_a} x ${time_b}`;

  //insiro no banco
  const [id] = await connection('palpites').insert({
    usuario_id: usuarioId,
    jogo,
    gols_a,
    gols_b,
    data_jogo,
    dolar_no_dia: dolarNoDia,
    dia_de_feriado: ehFeriado ? 'Sim' : 'Não',
  });

  //busco o palpite que salvou e retorno
  const palpiteSalvo = await connection('palpites').where({ id }).first();

  return palpiteSalvo;
}

//uso o id que veio do token e filtro no banco, pro usuário ver só seus próprios palpites
async function listarMeusPalpites(usuarioId) {
  const palpites = await connection('palpites')
    .where({ usuario_id: usuarioId })
    .select('*');

  return palpites;
}

async function atualizarPalpite(id, usuarioId, dados) {
  const { gols_a, gols_b } = dados;

  if (gols_a < 0 || gols_b < 0) {
    const erro = new Error('Os gols não podem ser negativos');
    erro.status = 400;
    throw erro;
  }

  const palpite = await connection('palpites').where({ id }).first();

  if (!palpite) {
    const erro = new Error('Palpite não encontrado');
    erro.status = 404;
    throw erro;
  }

  if (palpite.usuario_id !== usuarioId) {
    const erro = new Error('Você não tem permissão para alterar este palpite');
    erro.status = 403;
    throw erro;
  }

  //antes de atualizar, verifico se o palpite existe e se é daquele usuário logado
  await connection('palpites').where({ id }).update({
    gols_a,
    gols_b,
  });

  const palpiteAtualizado = await connection('palpites').where({ id }).first();

  return palpiteAtualizado;
}

async function deletarPalpite(id, usuarioId) {
  const palpite = await connection('palpites').where({ id }).first();

  if (!palpite) {
    const erro = new Error('Palpite não encontrado');
    erro.status = 404;
    throw erro;
  }

  if (palpite.usuario_id !== usuarioId) {
    const erro = new Error('Você não tem permissão para deletar este palpite');
    erro.status = 403;
    throw erro;
  }

  //segue a mesma regra para atualizar
  await connection('palpites').where({ id }).delete();

  return {
    mensagem: 'Palpite deletado com sucesso',
  };
}

module.exports = {
  criarPalpite,
  listarMeusPalpites,
  atualizarPalpite,
  deletarPalpite,
};
