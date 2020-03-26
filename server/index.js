const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const FRAGMENT_QUESTION = `
  fragment Q on Question {
    id
    level
    title
    code
    answers {
      id
      text
      isCorrect
    }
  }
`

const resolvers = {
  Query: {
    questions(root, args, context) {
      const level = args.level || 'INTERMEDIATE'

      return context.prisma.questions({ where: { level } }).$fragment(FRAGMENT_QUESTION)
    },
  },
  Mutation: {
    /**
     * Save user answers in "Result" table
     */
    createResults(parent, args = {}, context) {
      const { data } = args
      const userId = 'ck87k1g9g9jc90a78njlzm4co'
      const dateTime = new Date()

      return data.map(item => context.prisma.createResult({
        userId,
        dateTime,
        question: { connect: { id: item.questionId }},
        answer: item.answerId ? { connect: { id: item.answerId }} : {},
      }))
    },
  },
  Result: {
    question: parent => prisma.result({ id: parent.id }).question(),
    answer: parent => prisma.result({ id: parent.id }).answer(),
    correctAnswer: async parent => {
      const correct = await prisma.result({ id: parent.id })
        .question().$fragment(FRAGMENT_QUESTION)
        .answers({ first: 1, where: { isCorrect: true } })

      return correct[0]
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