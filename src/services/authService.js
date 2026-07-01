const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

async function login(email, senha) {
  //busco o usuário pelo email
  const usuario = await connection('usuarios').where({ email }).first();

  if (!usuario) {
    const erro = new Error('E-mail ou senha inválidos');
    erro.status = 401;
    throw erro;
  }

  //comparo as senhas a digitada com a criptografada do banco
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    const erro = new Error('E-mail ou senha inválidos');
    erro.status = 401;
    throw erro;
  }

  //gero o JWT colocando o id do usuário dentro do token
  //(pra depois as rotas privadas saberem quem está logado)

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
