const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const resultado = await authService.login(email, senha);

    return res.json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message,
    });
  }
}

module.exports = {
  login,
};
