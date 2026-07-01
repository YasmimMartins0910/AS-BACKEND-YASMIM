//aqui ele vai receber o email e a senha do body,

//chama o service e vai devolver a resposta com a mensagem e o token

const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const resultado = await authService.login(email, senha);

    return res.json({
      mensagem: 'Login realizado com sucesso',
      token: resultado.token,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message,
    });
  }
}

module.exports = {
  login,
};
