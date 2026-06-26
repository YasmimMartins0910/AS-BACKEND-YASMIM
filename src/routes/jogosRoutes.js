const express = require('express');
const jogosController = require('../controllers/jogosController');

const routes = express.Router();

routes.get('/jogos', jogosController.listarJogos);

module.exports = routes;
