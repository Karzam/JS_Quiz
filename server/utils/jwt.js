const jwt = require('jsonwebtoken')

const newToken = user => jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' })

const extractTokenFromHeaders = headers => {
  const { authorization } = headers
  return authorization.slice(7, authorization.length).trimStart()
}

const decodeToken = token => jwt.verify(token, process.env.JWT_SECRET)

module.exports = { newToken, extractTokenFromHeaders, decodeToken }