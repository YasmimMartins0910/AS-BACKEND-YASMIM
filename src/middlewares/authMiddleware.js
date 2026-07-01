//arquivo que roda antes das rotas privadas

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  //pego o token da aba do header/authorization e verifico se é bearer token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: 'Token não informado',
    });
  }

  //aqui eu separo o bearer do token, porque no authorization vem tudo junto
  const partes = authHeader.split(' ');

  if (partes.length !== 2) {
    return res.status(401).json({
      mensagem: 'Token inválido',
    });
  }

  const [tipo, token] = partes;

  //confiro se o tipo do token é esse
  if (tipo !== 'Bearer') {
    return res.status(401).json({
      mensagem: 'Tipo de token inválido',
    });
  }

  try {
    //valido o JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //salvo o id do usuário em req.usuarioId para depois os
    //controller e services usarem esse id pra ver quem está logado

    //eu guardo o id do usuário dentro da requisição
    req.usuarioId = decoded.id;

    //libero a rota
    return next();
  } catch (error) {
    return res.status(401).json({
      mensagem: 'Token inválido ou expirado',
    });
  }
}

module.exports = authMiddleware;
