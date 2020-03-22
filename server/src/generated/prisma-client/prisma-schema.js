module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAnswer {
  count: Int!
}

type AggregateQuestion {
  count: Int!
}

type AggregateResult {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Answer {
  id: ID!
  text: String!
  isCorrect: Boolean!
}

type AnswerConnection {
  pageInfo: PageInfo!
  edges: [AnswerEdge]!
  aggregate: AggregateAnswer!
}

input AnswerCreateInput {
  text: String!
  isCorrect: Boolean
}

input AnswerCreateManyInput {
  create: [AnswerCreateInput!]
  connect: [AnswerWhereUniqueInput!]
}

input AnswerCreateOneInput {
  create: AnswerCreateInput
  connect: AnswerWhereUniqueInput
}

type AnswerEdge {
  node: Answer!
  cursor: String!
}

enum AnswerOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  isCorrect_ASC
  isCorrect_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AnswerPreviousValues {
  id: ID!
  text: String!
  isCorrect: Boolean!
}

input AnswerScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  isCorrect: Boolean
  isCorrect_not: Boolean
  AND: [AnswerScalarWhereInput!]
  OR: [AnswerScalarWhereInput!]
  NOT: [AnswerScalarWhereInput!]
}

type AnswerSubscriptionPayload {
  mutation: MutationType!
  node: Answer
  updatedFields: [String!]
  previousValues: AnswerPreviousValues
}

input AnswerSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AnswerWhereInput
  AND: [AnswerSubscriptionWhereInput!]
  OR: [AnswerSubscriptionWhereInput!]
  NOT: [AnswerSubscriptionWhereInput!]
}

input AnswerUpdateDataInput {
  text: String
  isCorrect: Boolean
}

input AnswerUpdateInput {
  text: String
  isCorrect: Boolean
}

input AnswerUpdateManyDataInput {
  text: String
  isCorrect: Boolean
}

input AnswerUpdateManyInput {
  create: [AnswerCreateInput!]
  update: [AnswerUpdateWithWhereUniqueNestedInput!]
  upsert: [AnswerUpsertWithWhereUniqueNestedInput!]
  delete: [AnswerWhereUniqueInput!]
  connect: [AnswerWhereUniqueInput!]
  disconnect: [AnswerWhereUniqueInput!]
  deleteMany: [AnswerScalarWhereInput!]
  updateMany: [AnswerUpdateManyWithWhereNestedInput!]
}

input AnswerUpdateManyMutationInput {
  text: String
  isCorrect: Boolean
}

input AnswerUpdateManyWithWhereNestedInput {
  where: AnswerScalarWhereInput!
  data: AnswerUpdateManyDataInput!
}

input AnswerUpdateOneRequiredInput {
  create: AnswerCreateInput
  update: AnswerUpdateDataInput
  upsert: AnswerUpsertNestedInput
  connect: AnswerWhereUniqueInput
}

input AnswerUpdateWithWhereUniqueNestedInput {
  where: AnswerWhereUniqueInput!
  data: AnswerUpdateDataInput!
}

input AnswerUpsertNestedInput {
  update: AnswerUpdateDataInput!
  create: AnswerCreateInput!
}

input AnswerUpsertWithWhereUniqueNestedInput {
  where: AnswerWhereUniqueInput!
  update: AnswerUpdateDataInput!
  create: AnswerCreateInput!
}

input AnswerWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  isCorrect: Boolean
  isCorrect_not: Boolean
  AND: [AnswerWhereInput!]
  OR: [AnswerWhereInput!]
  NOT: [AnswerWhereInput!]
}

input AnswerWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

scalar DateTime

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

scalar Long

type Mutation {
  createAnswer(data: AnswerCreateInput!): Answer!
  updateAnswer(data: AnswerUpdateInput!, where: AnswerWhereUniqueInput!): Answer
  updateManyAnswers(data: AnswerUpdateManyMutationInput!, where: AnswerWhereInput): BatchPayload!
  upsertAnswer(where: AnswerWhereUniqueInput!, create: AnswerCreateInput!, update: AnswerUpdateInput!): Answer!
  deleteAnswer(where: AnswerWhereUniqueInput!): Answer
  deleteManyAnswers(where: AnswerWhereInput): BatchPayload!
  createQuestion(data: QuestionCreateInput!): Question!
  updateQuestion(data: QuestionUpdateInput!, where: QuestionWhereUniqueInput!): Question
  updateManyQuestions(data: QuestionUpdateManyMutationInput!, where: QuestionWhereInput): BatchPayload!
  upsertQuestion(where: QuestionWhereUniqueInput!, create: QuestionCreateInput!, update: QuestionUpdateInput!): Question!
  deleteQuestion(where: QuestionWhereUniqueInput!): Question
  deleteManyQuestions(where: QuestionWhereInput): BatchPayload!
  createResult(data: ResultCreateInput!): Result!
  updateResult(data: ResultUpdateInput!, where: ResultWhereUniqueInput!): Result
  updateManyResults(data: ResultUpdateManyMutationInput!, where: ResultWhereInput): BatchPayload!
  upsertResult(where: ResultWhereUniqueInput!, create: ResultCreateInput!, update: ResultUpdateInput!): Result!
  deleteResult(where: ResultWhereUniqueInput!): Result
  deleteManyResults(where: ResultWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  answer(where: AnswerWhereUniqueInput!): Answer
  answers(where: AnswerWhereInput, orderBy: AnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Answer]!
  answersConnection(where: AnswerWhereInput, orderBy: AnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AnswerConnection!
  question(where: QuestionWhereUniqueInput!): Question
  questions(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question]!
  questionsConnection(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionConnection!
  result(where: ResultWhereUniqueInput!): Result
  results(where: ResultWhereInput, orderBy: ResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Result]!
  resultsConnection(where: ResultWhereInput, orderBy: ResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ResultConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Question {
  id: ID!
  level: Level!
  title: String!
  code: String!
  answers(where: AnswerWhereInput, orderBy: AnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Answer!]
}

type QuestionConnection {
  pageInfo: PageInfo!
  edges: [QuestionEdge]!
  aggregate: AggregateQuestion!
}

input QuestionCreateInput {
  level: Level
  title: String!
  code: String!
  answers: AnswerCreateManyInput
}

input QuestionCreateOneInput {
  create: QuestionCreateInput
  connect: QuestionWhereUniqueInput
}

type QuestionEdge {
  node: Question!
  cursor: String!
}

enum QuestionOrderByInput {
  id_ASC
  id_DESC
  level_ASC
  level_DESC
  title_ASC
  title_DESC
  code_ASC
  code_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type QuestionPreviousValues {
  id: ID!
  level: Level!
  title: String!
  code: String!
}

type QuestionSubscriptionPayload {
  mutation: MutationType!
  node: Question
  updatedFields: [String!]
  previousValues: QuestionPreviousValues
}

input QuestionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: QuestionWhereInput
  AND: [QuestionSubscriptionWhereInput!]
  OR: [QuestionSubscriptionWhereInput!]
  NOT: [QuestionSubscriptionWhereInput!]
}

input QuestionUpdateDataInput {
  level: Level
  title: String
  code: String
  answers: AnswerUpdateManyInput
}

input QuestionUpdateInput {
  level: Level
  title: String
  code: String
  answers: AnswerUpdateManyInput
}

input QuestionUpdateManyMutationInput {
  level: Level
  title: String
  code: String
}

input QuestionUpdateOneRequiredInput {
  create: QuestionCreateInput
  update: QuestionUpdateDataInput
  upsert: QuestionUpsertNestedInput
  connect: QuestionWhereUniqueInput
}

input QuestionUpsertNestedInput {
  update: QuestionUpdateDataInput!
  create: QuestionCreateInput!
}

input QuestionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  level: Level
  level_not: Level
  level_in: [Level!]
  level_not_in: [Level!]
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  answers_every: AnswerWhereInput
  answers_some: AnswerWhereInput
  answers_none: AnswerWhereInput
  AND: [QuestionWhereInput!]
  OR: [QuestionWhereInput!]
  NOT: [QuestionWhereInput!]
}

input QuestionWhereUniqueInput {
  id: ID
  title: String
}

type Result {
  id: ID!
  dateTime: DateTime!
  question: Question!
  answer: Answer!
}

type ResultConnection {
  pageInfo: PageInfo!
  edges: [ResultEdge]!
  aggregate: AggregateResult!
}

input ResultCreateInput {
  dateTime: DateTime!
  question: QuestionCreateOneInput!
  answer: AnswerCreateOneInput!
}

input ResultCreateManyInput {
  create: [ResultCreateInput!]
  connect: [ResultWhereUniqueInput!]
}

type ResultEdge {
  node: Result!
  cursor: String!
}

enum ResultOrderByInput {
  id_ASC
  id_DESC
  dateTime_ASC
  dateTime_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ResultPreviousValues {
  id: ID!
  dateTime: DateTime!
}

input ResultScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  dateTime: DateTime
  dateTime_not: DateTime
  dateTime_in: [DateTime!]
  dateTime_not_in: [DateTime!]
  dateTime_lt: DateTime
  dateTime_lte: DateTime
  dateTime_gt: DateTime
  dateTime_gte: DateTime
  AND: [ResultScalarWhereInput!]
  OR: [ResultScalarWhereInput!]
  NOT: [ResultScalarWhereInput!]
}

type ResultSubscriptionPayload {
  mutation: MutationType!
  node: Result
  updatedFields: [String!]
  previousValues: ResultPreviousValues
}

input ResultSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ResultWhereInput
  AND: [ResultSubscriptionWhereInput!]
  OR: [ResultSubscriptionWhereInput!]
  NOT: [ResultSubscriptionWhereInput!]
}

input ResultUpdateDataInput {
  dateTime: DateTime
  question: QuestionUpdateOneRequiredInput
  answer: AnswerUpdateOneRequiredInput
}

input ResultUpdateInput {
  dateTime: DateTime
  question: QuestionUpdateOneRequiredInput
  answer: AnswerUpdateOneRequiredInput
}

input ResultUpdateManyDataInput {
  dateTime: DateTime
}

input ResultUpdateManyInput {
  create: [ResultCreateInput!]
  update: [ResultUpdateWithWhereUniqueNestedInput!]
  upsert: [ResultUpsertWithWhereUniqueNestedInput!]
  delete: [ResultWhereUniqueInput!]
  connect: [ResultWhereUniqueInput!]
  disconnect: [ResultWhereUniqueInput!]
  deleteMany: [ResultScalarWhereInput!]
  updateMany: [ResultUpdateManyWithWhereNestedInput!]
}

input ResultUpdateManyMutationInput {
  dateTime: DateTime
}

input ResultUpdateManyWithWhereNestedInput {
  where: ResultScalarWhereInput!
  data: ResultUpdateManyDataInput!
}

input ResultUpdateWithWhereUniqueNestedInput {
  where: ResultWhereUniqueInput!
  data: ResultUpdateDataInput!
}

input ResultUpsertWithWhereUniqueNestedInput {
  where: ResultWhereUniqueInput!
  update: ResultUpdateDataInput!
  create: ResultCreateInput!
}

input ResultWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  dateTime: DateTime
  dateTime_not: DateTime
  dateTime_in: [DateTime!]
  dateTime_not_in: [DateTime!]
  dateTime_lt: DateTime
  dateTime_lte: DateTime
  dateTime_gt: DateTime
  dateTime_gte: DateTime
  question: QuestionWhereInput
  answer: AnswerWhereInput
  AND: [ResultWhereInput!]
  OR: [ResultWhereInput!]
  NOT: [ResultWhereInput!]
}

input ResultWhereUniqueInput {
  id: ID
}

type Subscription {
  answer(where: AnswerSubscriptionWhereInput): AnswerSubscriptionPayload
  question(where: QuestionSubscriptionWhereInput): QuestionSubscriptionPayload
  result(where: ResultSubscriptionWhereInput): ResultSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String!
  results(where: ResultWhereInput, orderBy: ResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Result!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  results: ResultCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  results: ResultUpdateManyInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  results_every: ResultWhereInput
  results_some: ResultWhereInput
  results_none: ResultWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`
      }
    