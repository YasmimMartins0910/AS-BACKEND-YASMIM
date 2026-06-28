const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

async function login(email, senha) {
  const usuario = await connection('usuarios').where({ email }).first();

  if (!usuario) {
    const erro = new Error('E-mail ou senha inválidos');
    erro.status = 401;
    throw erro;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    const erro = new Error('E-mail ou senha inválidos');
    erro.status = 401;
    throw erro;
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    token,
  };
}

module.exports = {
  login,
};
