const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const { authenticate } = require('./middlewares/authenticate')
const { newToken } = require('./utils/jwt')
const { requestGithubUser } = require('./utils/requestGithubUser')
const { getUser } = require('./utils/auth')

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

const FRAGMENT_RESULT_SET = `
  fragment R on ResultSet {
    id
    userId
    dateTime
    results {
      id
      question {
        id
      }
      answer {
        id
      }
    }
  }
`

const FRAGMENT_RESULT = `
  fragment R on Result {
    id
    question {
      id
      correctAnswer {
        id
      }
    }
    answer {
      id
    }
  }
`

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

      return prisma.questions({ where: { level } }).$fragment(FRAGMENT_QUESTION)
    },
    resultSets(root, args, { prisma, req }) {
      const user = getUser(req)

      return prisma.resultSets({ where: { userId: user.id } })
    },
    resultSet(root, { id }, { prisma, req }) {
      if (!id) {
        throw new Error('No passed arg id')
      }

      return prisma.resultSet({ id })
    }
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
      .question().$fragment(FRAGMENT_QUESTION)
      .correctAnswer(),
  },
  ResultSet: {
    results: parent => prisma.resultSet({ id: parent.id }).results().$fragment(FRAGMENT_RESULT),
    correctAnswersCount: async parent => {
      const results = await prisma.resultSet({ id: parent.id }).$fragment(FRAGMENT_RESULT_SET)
        .results().$fragment(FRAGMENT_RESULT)

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