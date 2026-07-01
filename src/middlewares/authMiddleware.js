//arquivo que roda antes das rotas privadas

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  //pego o token da aba de authorization e verifico se é bearer token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: 'Token não informado',
    });
  }

  //verifico se veio no formato certo
  const partes = authHeader.split(' ');

  if (partes.length !== 2) {
    return res.status(401).json({
      mensagem: 'Token inválido',
    });
  }

  const [tipo, token] = partes;

  if (tipo !== 'Bearer') {
    return res.status(401).json({
      mensagem: 'Tipo de token inválido',
    });
  }

  try {
    //valido o JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //salvo o id do usuário em req.usuarioId para depois os
    //controller e services usarem esse id pra ver que está logado
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
