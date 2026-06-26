const express = require('express');
const palpitesController = require('../controllers/palpitesController');
const authMiddleware = require('../middlewares/authMiddleware');

const routes = express.Router();

routes.post('/palpites', authMiddleware, palpitesController.criarPalpite);
routes.get('/palpites', authMiddleware, palpitesController.listarMeusPalpites);
routes.put(
  '/palpites/:id',
  authMiddleware,
  palpitesController.atualizarPalpite,
);
routes.delete(
  '/palpites/:id',
  authMiddleware,
  palpitesController.deletarPalpite,
);

module.exports = routes;
