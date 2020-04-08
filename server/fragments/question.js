module.exports = `
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