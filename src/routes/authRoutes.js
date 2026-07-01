const express = require('express');
const authController = require('../controllers/authController');

const routes = express.Router();

//como no app.js tem /api, authRoutes a rota vai ser /api/login (pública)
routes.post('/login', authController.login);

module.exports = routes;
