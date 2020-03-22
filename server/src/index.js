const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    questions: (parent, args, context) => {
      return context.prisma.questions()
    },
    question: (parent, { id }, context) => {
      return context.prisma.questions({ id })
    },
    results: (parent, args, context) => {
      return context.prisma.results()
    },
  },
  Mutation: {
    createQuestion(parent, { title, code, level, answers }, context) {
      return context.prisma.createQuestion({
        title,
        code,
        level,
        answers
      })
    },
    createAnswer(parent, { text }, context) {
      return context.prisma.createAnswer({ text })
    },
    sendQuestionsAnswers(parent, args, context) {
      console.log(args)
      return context.prisma.results()
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/prisma.graphql',
  resolvers,
  context: {
    prisma,
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
