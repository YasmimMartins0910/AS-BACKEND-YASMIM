const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: 'Token não informado',
    });
  }

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({
      mensagem: 'Token inválido ou expirado',
    });
  }
}

module.exports = authMiddleware;
