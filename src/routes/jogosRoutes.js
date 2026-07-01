//rota pública para consumir a API de futebol e tratar a resposta

const express = require('express');
const jogosController = require('../controllers/jogosController');

const routes = express.Router();

routes.get('/jogos', jogosController.listarJogos);

module.exports = routes;
