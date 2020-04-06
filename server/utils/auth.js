const { extractTokenFromHeaders, decodeToken } = require('./jwt')

const getUser = req => {
  try {
    const token = extractTokenFromHeaders(req.headers)
    const { user } = decodeToken(token)

    return user
  } catch {
    return null
  }
}

module.exports = { getUser }