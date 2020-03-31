const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const { authenticate } = require('./middlewares/authenticate')
const { newToken, extractTokenFromHeaders, decodeToken } = require('./utils/jwt')
const { requestGithubUser } = require('./utils/requestGithubUser')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const FRAGMENT_QUESTION = `
  fragment Q on Question {
    id
    level
    title
    code
    answers {
      id
      text
    }
    correctAnswer {
      id
      text
    }
  }
`

const resolvers = {
  Query: {
    questions(root, args, { prisma }) {
      const level = args.level || 'INTERMEDIATE'

      return prisma.questions({ where: { level } }).$fragment(FRAGMENT_QUESTION)
    },
  },
  Mutation: {
    /**
     * Auth user with GitHub
     */
    async authorize(parent, { code }, { prisma }) {
      const githubUser = await requestGithubUser({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      })

      const existingUser = await prisma.user({ email: githubUser.email })

      if (existingUser) {
        return { user: existingUser, token: newToken({ user: existingUser }) }
      }

      const newUser = await prisma.createUser({
        email: githubUser.email,
        name: githubUser.name,
        avatar: githubUser.avatar_url,
      })

      return { user: newUser, token: newToken({ user: newUser }) }
    },
    /**
     * Save user answers in "Result" table
     */
    createResults(parent, args = {}, { prisma, req }) {
      const token = extractTokenFromHeaders(req.headers)
      const { user } = decodeToken(token)
      const { data } = args
      const dateTime = new Date()

      return data.map(item => prisma.createResult({
        userId: user.id,
        dateTime,
        question: { connect: { id: item.questionId }},
        answer: item.answerId ? { connect: { id: item.answerId }} : {},
      }))
    },
  },
  Result: {
    question: parent => prisma.result({ id: parent.id }).question(),
    answer: parent => prisma.result({ id: parent.id }).answer(),
    correctAnswer: async parent => prisma.result({ id: parent.id })
      .question().$fragment(FRAGMENT_QUESTION)
      .correctAnswer(),
  },
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({ prisma, req: req.request }),
  middlewares: [authenticate],
})

server.start(() => console.log(`Server is running on ${process.env.SERVER_ENDPOINT}`))