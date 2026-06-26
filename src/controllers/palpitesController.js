const palpitesService = require('../services/palpitesService');

async function criarPalpite(req, res) {
  try {
    const usuarioId = req.usuarioId;

    const palpite = await palpitesService.criarPalpite(usuarioId, req.body);

    return res.status(201).json(palpite);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message,
    });
  }
}

async function listarMeusPalpites(req, res) {
  try {
    const usuarioId = req.usuarioId;

    const palpites = await palpitesService.listarMeusPalpites(usuarioId);

    return res.json(palpites);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message,
    });
  }
}

async function atualizarPalpite(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    const palpite = await palpitesService.atualizarPalpite(
      id,
      usuarioId,
      req.body,
    );

    return res.json(palpite);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message,
    });
  }
}

async function deletarPalpite(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    const resultado = await palpitesService.deletarPalpite(id, usuarioId);

    return res.json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message,
    });
  }
}

module.exports = {
  criarPalpite,
  listarMeusPalpites,
  atualizarPalpite,
  deletarPalpite,
};
