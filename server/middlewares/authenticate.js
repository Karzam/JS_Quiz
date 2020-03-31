const { AuthenticationError } = require('apollo-server-core')
const { extractTokenFromHeaders, decodeToken } = require('../utils/jwt')
const jwt = require('jsonwebtoken')

const authenticate = async (resolve, root, args, context, info) => {
  if (['authorize'].includes(context.req.body.operationName)) {
    return resolve(root, args, context, info)
  }

  try {
    const token = extractTokenFromHeaders(context.req.headers)
    decodeToken(token)
  } catch (e) {
    return new AuthenticationError('Not authorised')
  }

  const result = await resolve(root, args, context, info)

  return result
}

module.exports.authenticate = authenticate