const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const { authenticate } = require('./middlewares/authenticate')
const { newToken } = require('./utils/jwt')
const { requestGithubUser } = require('./utils/requestGithubUser')
const { getUser } = require('./utils/auth')
const resultSetFragment = require('./fragments/resultSet')
const resultFragment = require('./fragments/result')
const questionFragment = require('./fragments/question')

require('dotenv').config()

const resolvers = {
  Query: {
    me(root, args, { prisma, req }) {
      try {
        const user = getUser(req)

        return prisma.user({ email: user.email })
      } catch (error) {
        throw new Error(error)
      }
    },
    questions(root, args, { prisma }) {
      const level = args.level || 'INTERMEDIATE'

      return prisma.questions({ where: { level } }).$fragment(questionFragment)
    },
    resultSets(root, args, { prisma, req }) {
      const user = getUser(req)

      return prisma.resultSets({ where: { userId: user.id } })
    },
    resultSet(root, { id }, { prisma }) {
      return prisma.resultSet({ id })
    },
    async leaderboard(root, args, { prisma }) {
      let byUser = {}
      const resultSets = await prisma.resultSets()

      resultSets.forEach(r => {
        byUser[r.userId] = byUser[r.userId] ? ++byUser[r.userId] : 1
      })

      const ordered = Object.keys(byUser).sort((a, b) => byUser[b] - byUser[a])

      return {
        users: ordered.slice(0, 10).map(async id => await prisma.user({ id }))
      }
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
     * Save user answers
     */
    createResultSet(parent, args = {}, { prisma, req }) {
      const user = getUser(req)
      const { data } = args
      const dateTime = new Date()

      const results = data.map(item => ({
        question: { connect: { id: item.questionId }},
        answer: item.answerId ? { connect: { id: item.answerId }} : {},
      }))

      return prisma.createResultSet({
        userId: user.id,
        dateTime,
        results: { create: results },
      })
    },
  },
  Result: {
    question: parent => prisma.result({ id: parent.id }).question(),
    answer: parent => prisma.result({ id: parent.id }).answer(),
    correctAnswer: parent => prisma.result({ id: parent.id })
      .question().$fragment(questionFragment)
      .correctAnswer(),
  },
  ResultSet: {
    results: parent => prisma.resultSet({ id: parent.id }).results().$fragment(resultFragment),
    correctAnswersCount: async parent => {
      const results = await prisma.resultSet({ id: parent.id }).$fragment(resultSetFragment)
        .results().$fragment(resultFragment)

      return results
      .filter(r => r.answer && r.answer.id === r.question.correctAnswer.id)
      .length
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({ prisma, req: req.request }),
  middlewares: [authenticate],
})

server.start(() => console.log(`Server is running on ${process.env.SERVER_ENDPOINT}`))