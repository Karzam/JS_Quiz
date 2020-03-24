const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    questions(root, args, context) {
      return context.prisma.questions()
    },
    answers(root, args, context) {
      return context.prisma.answers()
    },
  },
  Mutation: {
    sendQuestionsAnswers(root, args, context) {
      return context.prisma.questions()
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))