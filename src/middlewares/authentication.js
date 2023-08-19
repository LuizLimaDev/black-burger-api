const jwt = require('jsonwebtoken')

const userVerification = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ menssagem: 'Usuário não autorizado' })
  }

  const token = authorization.split(' ')[1]

  try {
    const userToken = jwt.verify(token, process.env.JWTPW)

    req.user = userToken

    next()

  } catch (error) {
    return res.status(401).json({ menssagem: 'Usuário não autorizado' })
  }
}

module.exports = userVerification